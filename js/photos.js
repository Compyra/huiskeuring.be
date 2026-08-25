/* =====================================================================
 * huiskeuring.be - PHOTO ATTACHMENTS (index page only)
 * =====================================================================
 * Photos are stored in IndexedDB on this device only - never uploaded,
 * never part of share links or JSON backups (URLs and localStorage are
 * far too small for images). Print-outs and PDF exports made on this
 * device do include them.
 *
 * One plain <input type="file" accept="image/*" multiple> drives it:
 * phones and tablets natively offer camera or gallery, a PC opens the
 * file explorer - no user-agent sniffing needed.
 * ===================================================================== */

'use strict';

const PHOTO_LIMIT_PER_ITEM = 6;
const PHOTO_MAX_EDGE = 1400;
const PHOTO_JPEG_QUALITY = 0.82;

let photoDbPromise = null;
let photoTargetItem = null;

function photosSupported() {
    return 'indexedDB' in window;
}

function photoDb() {
    if (!photosSupported()) return Promise.reject(new Error('IndexedDB unavailable'));
    if (photoDbPromise) return photoDbPromise;
    photoDbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open('huiskeuring-photos', 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('photos')) {
                const store = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
                store.createIndex('byItem', 'itemKey', { unique: false });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => { photoDbPromise = null; reject(request.error); };
    });
    return photoDbPromise;
}

function idbRequest(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function photoStore(mode) {
    const db = await photoDb();
    return db.transaction('photos', mode).objectStore('photos');
}

async function photoAdd(record) {
    const store = await photoStore('readwrite');
    return idbRequest(store.add(record));
}

async function photoList() {
    const store = await photoStore('readonly');
    return idbRequest(store.getAll());
}

async function photoListForItem(itemKey) {
    const store = await photoStore('readonly');
    return idbRequest(store.index('byItem').getAll(itemKey));
}

async function photoGet(id) {
    const store = await photoStore('readonly');
    return idbRequest(store.get(id));
}

async function photoDelete(id) {
    const store = await photoStore('readwrite');
    return idbRequest(store.delete(id));
}

async function photoClearAll() {
    if (!photosSupported()) return;
    try {
        const store = await photoStore('readwrite');
        await idbRequest(store.clear());
    } catch (e) { /* nothing to clear */ }
}

/** Downscale + re-encode to keep IndexedDB usage sane (~150-400 KB/photo). */
function photoCompress(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
            const w = Math.max(1, Math.round(img.naturalWidth * scale));
            const h = Math.max(1, Math.round(img.naturalHeight * scale));
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            resolve({ dataUrl: canvas.toDataURL('image/jpeg', PHOTO_JPEG_QUALITY), w: w, h: h });
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('unreadable image')); };
        img.src = url;
    });
}

/* ------------------------------------------------------------------ *
 * UI: per-item strip, counts, lightbox
 * ------------------------------------------------------------------ */
function photoPickFor(itemKey) {
    photoTargetItem = itemKey;
    byId('photoInput').click();
}

async function photoHandleFiles(fileList) {
    const itemKey = photoTargetItem;
    if (!itemKey || !fileList || !fileList.length) return;
    let existing;
    try { existing = await photoListForItem(itemKey); }
    catch (e) { showToast(t('photo.error'), 'error'); return; }

    let room = PHOTO_LIMIT_PER_ITEM - existing.length;
    let saved = 0;
    for (const file of Array.from(fileList)) {
        if (room <= 0) { showToast(t('photo.limit'), 'error'); break; }
        if (!/^image\//.test(file.type)) continue;
        try {
            const image = await photoCompress(file);
            await photoAdd({ itemKey: itemKey, dataUrl: image.dataUrl, w: image.w, h: image.h, createdAt: Date.now() });
            room -= 1;
            saved += 1;
        } catch (e) {
            showToast(t('photo.error'), 'error');
        }
    }
    if (saved) photoRefreshItem(itemKey);
}

function photoStripMarkup(photos) {
    return photos.map(photo => `
        <button type="button" class="item-photo-thumb" data-photo-id="${photo.id}"
                title="${escapeHTML(t('photo.view'))}" aria-label="${escapeHTML(t('photo.view'))}">
            <img src="${photo.dataUrl}" alt="" loading="lazy" decoding="async">
        </button>`).join('');
}

function photoPaintItem(itemKey, photos) {
    const root = document.querySelector(`.item-photos[data-photos="${CSS.escape(itemKey)}"]`);
    if (root) root.innerHTML = photoStripMarkup(photos);
    const button = document.querySelector(`.photo-btn[data-photo-add="${CSS.escape(itemKey)}"]`);
    if (button) {
        const count = button.querySelector('.photo-count');
        count.textContent = photos.length ? String(photos.length) : '';
        count.hidden = !photos.length;
        const label = photos.length ? `${t('photo.add')} (${photos.length})` : t('photo.add');
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }
}

async function photoRefreshItem(itemKey) {
    try { photoPaintItem(itemKey, await photoListForItem(itemKey)); }
    catch (e) { /* strip stays as it was */ }
}

/** Paint every strip after (re)rendering the checklist - one DB read. */
async function photoRefreshAll() {
    if (!photosSupported()) {
        document.querySelectorAll('.item-photo-row').forEach(row => { row.hidden = true; });
        return;
    }
    let photos;
    try { photos = await photoList(); } catch (e) { return; }
    const grouped = {};
    photos.forEach(photo => {
        (grouped[photo.itemKey] = grouped[photo.itemKey] || []).push(photo);
    });
    document.querySelectorAll('.item-photos[data-photos]').forEach(root => {
        const key = root.dataset.photos;
        photoPaintItem(key, grouped[key] || []);
    });
}

async function photoOpenLightbox(id) {
    let record;
    try { record = await photoGet(Number(id)); } catch (e) { return; }
    if (!record) return;
    photoExitAnnotation();
    byId('photoLightboxImg').src = record.dataUrl;
    const del = byId('photoLightboxDelete');
    del.dataset.photoId = String(record.id);
    del.dataset.itemKey = record.itemKey;
    openModal(byId('photoLightbox'));
}

async function photoDeleteFromLightbox() {
    const del = byId('photoLightboxDelete');
    const id = Number(del.dataset.photoId);
    if (!id) return;
    try {
        await photoDelete(id);
        showToast(t('photo.deleted'));
        photoRefreshItem(del.dataset.itemKey);
    } catch (e) {
        showToast(t('photo.error'), 'error');
    }
    closeModal(byId('photoLightbox'));
    byId('photoLightboxImg').src = '';
}

/* ------------------------------------------------------------------ *
 * Annotation: draw pen / arrow / circle on a photo, then flatten the
 * strokes into the JPEG so report, PDF and thumbnails need no changes.
 * ------------------------------------------------------------------ */
let annoTool = 'pen';
let annoStrokes = [];
let annoCurrent = null;
let annoPhotoId = null;

function annoLightbox() { return byId('photoLightbox'); }
function annoCanvasEl() { return byId('photoAnnoCanvas'); }

function photoStartAnnotation() {
    const img = byId('photoLightboxImg');
    if (!img.naturalWidth) return;
    annoPhotoId = Number(byId('photoLightboxDelete').dataset.photoId);
    const canvas = annoCanvasEl();
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    annoStrokes = [];
    annoCurrent = null;
    annoTool = 'pen';
    annoSyncToolButtons();
    annoLightbox().classList.add('annotating');
    annoRedraw();
}

function photoExitAnnotation() {
    annoStrokes = [];
    annoCurrent = null;
    annoLightbox().classList.remove('annotating');
}

function annoSyncToolButtons() {
    document.querySelectorAll('.anno-tool').forEach(btn => {
        const active = btn.dataset.annoTool === annoTool;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
}

function annoPos(e) {
    const canvas = annoCanvasEl();
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function annoRedraw() {
    const canvas = annoCanvasEl();
    const ctx = canvas.getContext('2d');
    ctx.drawImage(byId('photoLightboxImg'), 0, 0, canvas.width, canvas.height);
    const width = Math.max(3, Math.round(canvas.width / 300));
    const all = annoCurrent ? annoStrokes.concat([annoCurrent]) : annoStrokes;
    all.forEach(stroke => annoDrawStroke(ctx, stroke, width));
}

function annoDrawStroke(ctx, stroke, width) {
    const p = stroke.points;
    if (!p.length) return;
    ctx.save();
    ctx.strokeStyle = '#e0261a';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowBlur = width;
    ctx.beginPath();
    if (stroke.tool === 'pen') {
        ctx.moveTo(p[0].x, p[0].y);
        for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
    } else if (p.length > 1 && stroke.tool === 'circle') {
        const a = p[0], b = p[p.length - 1];
        ctx.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2,
            Math.max(width, Math.abs(b.x - a.x) / 2), Math.max(width, Math.abs(b.y - a.y) / 2), 0, 0, Math.PI * 2);
    } else if (p.length > 1 && stroke.tool === 'arrow') {
        const a = p[0], b = p[p.length - 1];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const head = width * 4;
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - head * Math.cos(angle - 0.5), b.y - head * Math.sin(angle - 0.5));
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - head * Math.cos(angle + 0.5), b.y - head * Math.sin(angle + 0.5));
    }
    ctx.stroke();
    ctx.restore();
}

async function photoSaveAnnotation() {
    if (!annoStrokes.length) { photoExitAnnotation(); return; }
    try {
        const canvas = annoCanvasEl();
        annoCurrent = null;
        annoRedraw();
        const dataUrl = canvas.toDataURL('image/jpeg', PHOTO_JPEG_QUALITY);
        const record = await photoGet(annoPhotoId);
        if (!record) { photoExitAnnotation(); return; }
        record.dataUrl = dataUrl;
        record.w = canvas.width;
        record.h = canvas.height;
        const store = await photoStore('readwrite');
        await idbRequest(store.put(record));
        byId('photoLightboxImg').src = dataUrl;
        photoRefreshItem(record.itemKey);
        showToast(t('photo.annoSaved'));
    } catch (e) {
        showToast(t('photo.error'), 'error');
    }
    photoExitAnnotation();
}

/* Shared wiring for every page that embeds the photo lightbox. */
document.addEventListener('DOMContentLoaded', () => {
    const input = byId('photoInput');
    if (!input) return;
    input.addEventListener('change', (e) => {
        photoHandleFiles(e.target.files);
        e.target.value = '';
    });
    byId('photoLightboxDelete').addEventListener('click', photoDeleteFromLightbox);
    byId('photoAnnotateBtn').addEventListener('click', photoStartAnnotation);
    byId('photoAnnoCancel').addEventListener('click', photoExitAnnotation);
    byId('photoAnnoSave').addEventListener('click', photoSaveAnnotation);
    byId('photoAnnoUndo').addEventListener('click', () => { annoStrokes.pop(); annoRedraw(); });
    document.querySelectorAll('.anno-tool').forEach(btn => {
        btn.addEventListener('click', () => { annoTool = btn.dataset.annoTool; annoSyncToolButtons(); });
    });

    const canvas = annoCanvasEl();
    canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        canvas.setPointerCapture(e.pointerId);
        annoCurrent = { tool: annoTool, points: [annoPos(e)] };
        annoRedraw();
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!annoCurrent) return;
        e.preventDefault();
        const pos = annoPos(e);
        if (annoCurrent.tool === 'pen') annoCurrent.points.push(pos);
        else annoCurrent.points[1] = pos;
        annoRedraw();
    });
    canvas.addEventListener('pointerup', () => {
        if (!annoCurrent) return;
        if (annoCurrent.points.length > 1) annoStrokes.push(annoCurrent);
        annoCurrent = null;
        annoRedraw();
    });
});
