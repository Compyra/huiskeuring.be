/* =====================================================================
 * huiskeuring.be - ROOM-BY-ROOM VISIT MODE (visit/)
 * =====================================================================
 * Pick the room you are standing in, tick which installations it has
 * (water, electricity, heating...), and only the matching checks show.
 * Everything reads and writes the SAME inspection state as the main
 * checklist - item ids are shared, so ticks, notes and photos made here
 * appear there instantly (and in the report, PDF and share links).
 * ===================================================================== */

'use strict';

const VISIT_ROOMS = ['kitchen', 'bathroom', 'bedroom', 'livingroom', 'basement', 'attic', 'exterior'];
const VISIT_FEATURES = ['plumbing', 'electrical', 'hvac', 'structural', 'asbestos'];

/* Features a room normally has - their absence is worth confirming. */
const EXPECTED_FEATURES = {
    kitchen: ['plumbing', 'electrical'],
    bathroom: ['plumbing', 'electrical', 'hvac'],
    bedroom: ['electrical', 'hvac'],
    livingroom: ['electrical', 'hvac'],
    basement: ['electrical'],
    attic: [],
    exterior: []
};

/* A confirmed absence is a DEFECT: it marks this item in the feature's
   category as an issue (matched on the stable English source text). */
const ABSENCE_ISSUE_MATCH = {
    hvac: /heating system in every room/i,
    electrical: /enough circuits and sockets per room/i,
    plumbing: /waterdruk|water pressure/i
};

/* Walking aids stay on this device - deliberately NOT in the shared state. */
const VISIT_INSTANCES_KEY = 'visitRoomInstances';
const VISIT_TICKS_KEY = 'visitInstanceTicks';

const ROOM_ICONS = {
    kitchen: 'fa-utensils', bathroom: 'fa-bath', bedroom: 'fa-bed',
    livingroom: 'fa-couch', basement: 'fa-dungeon', attic: 'fa-house-damage',
    exterior: 'fa-building'
};
const FEATURE_ICONS = {
    plumbing: 'fa-tint', electrical: 'fa-bolt', hvac: 'fa-fan',
    structural: 'fa-hard-hat', asbestos: 'fa-exclamation-triangle'
};

let visitState = null;
let currentRoom = null;
let currentInstance = 1;
let activeFeatures = [];
let instanceCounts = {};
let instanceTicks = {};

function loadVisitState() {
    visitState = normaliseState(readJSON(STORAGE_KEYS.state, null));
    instanceCounts = readJSON(VISIT_INSTANCES_KEY, {}) || {};
    instanceTicks = readJSON(VISIT_TICKS_KEY, {}) || {};
}

function saveVisitState() {
    if (!writeStorage(STORAGE_KEYS.state, JSON.stringify(visitState))) {
        showToast(t('storage.failed'), 'error');
    }
}

function saveVisitLocal() {
    writeStorage(VISIT_INSTANCES_KEY, JSON.stringify(instanceCounts));
    writeStorage(VISIT_TICKS_KEY, JSON.stringify(instanceTicks));
}

/* ------------------------------------------------------------------ *
 * Instance-aware ticks: each extra bedroom keeps its own walking
 * record; the shared checklist gets one aggregate where an issue in
 * any room instance wins over an OK elsewhere.
 * ------------------------------------------------------------------ */
function roomCount(room) {
    return Math.max(1, Number(instanceCounts[room]) || 1);
}

function tickKey(id) {
    return `${currentRoom}#${currentInstance}#${id}`;
}

function absenceKey(feature) {
    return `${currentRoom}#${currentInstance}#absent:${feature}`;
}

function itemDisplayState(id) {
    if (currentInstance === 1) {
        return { ok: !!visitState.checklist[id], issue: !!visitState.renovationNeeded[id] };
    }
    const record = instanceTicks[tickKey(id)];
    return { ok: record === 'ok', issue: record === 'issue' };
}

function recordTick(id, kind, on) {
    if (on) instanceTicks[tickKey(id)] = kind;
    else delete instanceTicks[tickKey(id)];
    saveVisitLocal();

    const suffix = '#' + id;
    const records = Object.keys(instanceTicks)
        .filter(key => key.endsWith(suffix) && !key.includes('#absent:'))
        .map(key => instanceTicks[key]);
    if (records.includes('issue')) {
        visitState.renovationNeeded[id] = true;
        visitState.checklist[id] = false;
    } else if (records.includes('ok')) {
        visitState.checklist[id] = true;
        visitState.renovationNeeded[id] = false;
    } else {
        visitState.checklist[id] = false;
        visitState.renovationNeeded[id] = false;
    }
    saveVisitState();
}

function roomInstanceLabel() {
    const base = tagLabel(currentRoom);
    return (roomCount(currentRoom) > 1) ? `${base} ${currentInstance}` : base;
}

/* ------------------------------------------------------------------ *
 * Selection chips
 * ------------------------------------------------------------------ */
function chipMarkup(slug, icon, pressed) {
    return `
        <button class="filter-btn ${pressed ? 'active' : ''}" data-chip="${escapeHTML(slug)}" aria-pressed="${pressed}">
            <i class="fas ${escapeHTML(icon)}" aria-hidden="true"></i> <span>${escapeHTML(tagLabel(slug))}</span>
        </button>`;
}

function renderChips() {
    byId('visitRooms').innerHTML = VISIT_ROOMS
        .map(room => chipMarkup(room, ROOM_ICONS[room], room === currentRoom)).join('');
    byId('visitFeatures').innerHTML = VISIT_FEATURES
        .map(f => chipMarkup(f, FEATURE_ICONS[f], activeFeatures.includes(f))).join('');
    renderInstances();
}

/** One chip per copy of the selected room (Bedroom 1, Bedroom 2, ...) + [+]. */
function renderInstances() {
    const bar = byId('visitInstances');
    if (!currentRoom) { bar.hidden = true; bar.innerHTML = ''; return; }
    const count = roomCount(currentRoom);
    const addLabel = t('visit.another').replace('{room}', tagLabel(currentRoom));
    bar.hidden = false;
    bar.innerHTML = Array.from({ length: count }, (unused, i) => {
        const n = i + 1;
        return `
            <button class="filter-btn ${n === currentInstance ? 'active' : ''}" data-instance="${n}" aria-pressed="${n === currentInstance}">
                <i class="fas ${escapeHTML(ROOM_ICONS[currentRoom])}" aria-hidden="true"></i> <span>${escapeHTML(tagLabel(currentRoom))} ${n}</span>
            </button>`;
    }).join('') + `
            <button class="filter-btn visit-add-instance" data-add-instance title="${escapeHTML(addLabel)}" aria-label="${escapeHTML(addLabel)}">
                <i class="fas fa-plus" aria-hidden="true"></i>
            </button>`;
}

function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete('room');
    url.searchParams.delete('features');
    url.searchParams.delete('n');
    if (currentRoom) {
        url.searchParams.set('room', currentRoom);
        if (currentInstance > 1) url.searchParams.set('n', String(currentInstance));
    }
    if (activeFeatures.length) url.searchParams.set('features', activeFeatures.join(','));
    window.history.replaceState({}, document.title, url.toString());
}

/* ------------------------------------------------------------------ *
 * Item rendering (lean variant of the main checklist's buildItem)
 * ------------------------------------------------------------------ */
function visitCategories() {
    if (!currentRoom) return [];
    return [currentRoom].concat(activeFeatures)
        .map(slug => checklistData.find(c => c.category === slug))
        .filter(Boolean);
}

function buildVisitItem(category, item, index) {
    const id = itemId(category, index);
    const safeId = escapeHTML(id);
    const shown = itemDisplayState(id);
    const isOK = shown.ok;
    const hasIssue = shown.issue;
    const note = visitState.notes[id] || '';

    const why = itemWhy(category, index, item);
    const whyId = `why-${id}`;
    const whyBlock = why
        ? `<button class="why-toggle" type="button" data-why-target="${escapeHTML(whyId)}" aria-expanded="false" aria-controls="${escapeHTML(whyId)}">
               <i class="fas fa-circle-question" aria-hidden="true"></i> ${escapeHTML(t('item.why'))}
           </button>
           <div class="item-why" id="${escapeHTML(whyId)}" hidden>
               <strong>${escapeHTML(t('item.whyTitle'))}:</strong> ${escapeHTML(why)}
           </div>`
        : '';

    return `
        <div class="checklist-item" data-key="${safeId}">
            <div class="checkbox-container">
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="item-${safeId}" ${isOK ? 'checked' : ''} data-key="${safeId}">
                    <label for="item-${safeId}" class="checkbox-label ok-label">${escapeHTML(t('item.ok'))}</label>
                </div>
                <div class="checkbox-wrapper renovation-check">
                    <input type="checkbox" id="reno-${safeId}" ${hasIssue ? 'checked' : ''} data-key="${safeId}" class="renovation-checkbox">
                    <label for="reno-${safeId}" class="checkbox-label issue-label">${escapeHTML(t('item.issue'))}</label>
                </div>
            </div>
            <div class="item-content">
                <div class="item-text ${isOK ? 'checked' : ''} ${hasIssue ? 'needs-renovation' : ''}">${escapeHTML(itemText(category, index, item))}</div>
                ${whyBlock}
                <div class="item-photo-row">
                    <button type="button" class="photo-btn" data-photo-add="${safeId}" title="${escapeHTML(t('photo.add'))}" aria-label="${escapeHTML(t('photo.add'))}">
                        <i class="fas fa-camera" aria-hidden="true"></i><span class="photo-count" hidden></span>
                    </button>
                    <div class="item-photos" data-photos="${safeId}"></div>
                </div>
                <div class="item-notes">
                    <label class="visually-hidden" for="note-${safeId}">${escapeHTML(t('item.notes.ph'))}</label>
                    <textarea id="note-${safeId}" placeholder="${escapeHTML(t('item.notes.ph'))}" data-key="${safeId}" class="item-note-textarea">${escapeHTML(note)}</textarea>
                </div>
            </div>
        </div>`;
}

/** Prompts for expected-but-unselected features ("no heating here?"). */
function missingFeatureMarkup() {
    if (!currentRoom) return '';
    return (EXPECTED_FEATURES[currentRoom] || [])
        .filter(feature => !activeFeatures.includes(feature))
        .map(feature => {
            const label = tagLabel(feature).toLocaleLowerCase();
            if (instanceTicks[absenceKey(feature)]) {
                const noted = t('visit.absenceNoted')
                    .replace('{feature}', label)
                    .replace('{room}', roomInstanceLabel());
                return `
                    <div class="visit-missing answered">
                        <i class="fas fa-check" aria-hidden="true"></i>
                        <span>${escapeHTML(noted)}</span>
                        <button type="button" class="visit-absence-undo" data-absence-undo="${escapeHTML(feature)}"
                                title="${escapeHTML(t('visit.absenceUndo'))}" aria-label="${escapeHTML(t('visit.absenceUndo'))}">
                            <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>`;
            }
            return `
                <div class="visit-missing">
                    <p><i class="fas fa-circle-question" aria-hidden="true"></i> ${escapeHTML(t('visit.missing').replace(/\{feature\}/g, label))}</p>
                    <div class="visit-missing-actions">
                        <button type="button" class="btn btn-secondary" data-missing-confirm="${escapeHTML(feature)}">${escapeHTML(t('visit.missingConfirm').replace('{feature}', label))}</button>
                        <button type="button" class="btn btn-primary" data-missing-add="${escapeHTML(feature)}">${escapeHTML(t('visit.missingAdd').replace('{feature}', label))}</button>
                    </div>
                </div>`;
        }).join('');
}

function renderVisitItems() {
    const container = byId('visitItems');
    const categories = visitCategories();

    byId('visitEmpty').hidden = !!categories.length;

    container.innerHTML = missingFeatureMarkup() + categories.map(category => `
        <div class="category-group" data-category="${escapeHTML(category.category)}">
            <div class="category-header">
                <h3><i class="fas ${escapeHTML(category.icon)}" aria-hidden="true"></i> ${escapeHTML(categoryTitle(category))}${roomCount(currentRoom) > 1 && category.category === currentRoom ? ' ' + currentInstance : ''}</h3>
            </div>
            <div class="category-content">
                ${category.items.map((item, index) => buildVisitItem(category, item, index)).join('')}
            </div>
        </div>`).join('');

    if (typeof photoRefreshAll === 'function') photoRefreshAll();
    updateVisitProgress();
}

function updateVisitProgress() {
    const box = byId('visitProgress');
    const categories = visitCategories();
    if (!categories.length) { box.hidden = true; return; }
    let total = 0;
    let done = 0;
    categories.forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            const shown = itemDisplayState(id);
            total += 1;
            if (shown.ok || shown.issue) done += 1;
        });
    });
    box.textContent = t('visit.answered').replace('{done}', String(done)).replace('{total}', String(total));
    box.hidden = false;
}

/* ------------------------------------------------------------------ *
 * Events
 * ------------------------------------------------------------------ */
function onChipClick(e) {
    const add = e.target.closest('[data-add-instance]');
    if (add && currentRoom) {
        instanceCounts[currentRoom] = roomCount(currentRoom) + 1;
        currentInstance = instanceCounts[currentRoom];
        saveVisitLocal();
        renderChips();
        syncUrl();
        renderVisitItems();
        return;
    }
    const instance = e.target.closest('[data-instance]');
    if (instance) {
        currentInstance = Number(instance.dataset.instance) || 1;
        renderChips();
        syncUrl();
        renderVisitItems();
        return;
    }
    const chip = e.target.closest('[data-chip]');
    if (!chip) return;
    const slug = chip.dataset.chip;
    if (VISIT_ROOMS.includes(slug)) {
        currentRoom = currentRoom === slug ? null : slug;
        currentInstance = 1;
    } else {
        const at = activeFeatures.indexOf(slug);
        if (at >= 0) activeFeatures.splice(at, 1);
        else {
            activeFeatures.push(slug);
            clearAbsence(slug); // selecting the feature contradicts a noted absence
        }
    }
    renderChips();
    syncUrl();
    renderVisitItems();
}

function absenceNoteLine(feature) {
    return t('visit.absenceLine')
        .replace('{room}', roomInstanceLabel())
        .replace('{feature}', tagLabel(feature).toLocaleLowerCase());
}

/** The checklist item that a confirmed absence flags as an issue. */
function absenceIssueItem(feature) {
    const pattern = ABSENCE_ISSUE_MATCH[feature];
    const category = checklistData.find(c => c.category === feature);
    if (!pattern || !category) return null;
    const index = category.items.findIndex(item => pattern.test(item.text));
    return index >= 0 ? itemId(category, index) : null;
}

function confirmAbsence(feature) {
    const line = absenceNoteLine(feature);
    // store the exact line so undo still matches after adding rooms or switching language
    instanceTicks[absenceKey(feature)] = line;
    saveVisitLocal();
    const target = absenceIssueItem(feature);
    if (target) {
        // red flag: missing heating/electricity/water IS a defect
        recordTick(target, 'issue', true);
        const existing = visitState.notes[target] || '';
        if (!existing.includes(line)) {
            visitState.notes[target] = existing ? existing + '\n' + line : line;
        }
    } else if (!visitState.globalNotes.includes(line)) {
        visitState.globalNotes = visitState.globalNotes ? visitState.globalNotes + '\n' + line : line;
    }
    saveVisitState();
    showToast(t('visit.absenceNoted')
        .replace('{feature}', tagLabel(feature).toLocaleLowerCase())
        .replace('{room}', roomInstanceLabel()));
    renderVisitItems();
}

function clearAbsence(feature) {
    if (!currentRoom || !instanceTicks[absenceKey(feature)]) return;
    const stored = instanceTicks[absenceKey(feature)];
    const line = typeof stored === 'string' ? stored : absenceNoteLine(feature);
    delete instanceTicks[absenceKey(feature)];
    saveVisitLocal();
    const target = absenceIssueItem(feature);
    if (target) {
        visitState.notes[target] = (visitState.notes[target] || '')
            .split('\n').filter(entry => entry.trim() !== line).join('\n').trim();
        // drops only this room's record; another room's absence keeps the issue
        recordTick(target, 'issue', false);
    } else {
        visitState.globalNotes = visitState.globalNotes
            .split('\n').filter(entry => entry.trim() !== line).join('\n');
    }
    saveVisitState();
}

function onItemsChange(e) {
    const key = e.target.dataset.key;
    if (!key) return;
    if (e.target.classList.contains('renovation-checkbox')) {
        recordTick(key, 'issue', e.target.checked);
    } else if (e.target.type === 'checkbox') {
        recordTick(key, 'ok', e.target.checked);
    } else {
        return;
    }
    renderVisitItems();
}

function onItemsInput(e) {
    if (!e.target.classList.contains('item-note-textarea')) return;
    visitState.notes[e.target.dataset.key] = e.target.value;
    saveVisitState();
}

function onItemsClick(e) {
    const confirmBtn = e.target.closest('[data-missing-confirm]');
    if (confirmBtn) { confirmAbsence(confirmBtn.dataset.missingConfirm); return; }
    const addBtn = e.target.closest('[data-missing-add]');
    if (addBtn) {
        const feature = addBtn.dataset.missingAdd;
        clearAbsence(feature);
        if (!activeFeatures.includes(feature)) activeFeatures.push(feature);
        renderChips();
        syncUrl();
        renderVisitItems();
        return;
    }
    const undoBtn = e.target.closest('[data-absence-undo]');
    if (undoBtn) { clearAbsence(undoBtn.dataset.absenceUndo); renderVisitItems(); return; }

    const whyBtn = e.target.closest('.why-toggle');
    if (whyBtn) {
        const panel = byId(whyBtn.dataset.whyTarget);
        if (panel) {
            const expanded = whyBtn.getAttribute('aria-expanded') === 'true';
            whyBtn.setAttribute('aria-expanded', String(!expanded));
            whyBtn.classList.toggle('open', !expanded);
            panel.hidden = expanded;
        }
        return;
    }
    const photoBtn = e.target.closest('.photo-btn');
    if (photoBtn && typeof photoPickFor === 'function') {
        photoPickFor(photoBtn.dataset.photoAdd);
        return;
    }
    const thumb = e.target.closest('.item-photo-thumb');
    if (thumb && typeof photoOpenLightbox === 'function') photoOpenLightbox(thumb.dataset.photoId);
}

/* ------------------------------------------------------------------ *
 * Bootstrap
 * ------------------------------------------------------------------ */
function applyVisitDeepLink() {
    try {
        const params = new URLSearchParams(window.location.search);
        const room = params.get('room');
        if (VISIT_ROOMS.includes(room)) {
            currentRoom = room;
            const n = Number(params.get('n')) || 1;
            if (n > roomCount(room)) { instanceCounts[room] = n; saveVisitLocal(); }
            currentInstance = Math.max(1, n);
        }
        (params.get('features') || '').split(',')
            .filter(f => VISIT_FEATURES.includes(f))
            .forEach(f => activeFeatures.push(f));
    } catch (e) { /* ignore malformed URLs */ }
}

function init() {
    currentLanguage = resolveInitialLanguage();
    initTheme(null);
    buildLanguageSelect(byId('languageSelect'));
    loadVisitState();
    applyVisitDeepLink();

    applyTranslations();
    renderChips();
    renderVisitItems();

    byId('visitRooms').addEventListener('click', onChipClick);
    byId('visitFeatures').addEventListener('click', onChipClick);
    byId('visitInstances').addEventListener('click', onChipClick);
    const items = byId('visitItems');
    items.addEventListener('change', onItemsChange);
    items.addEventListener('input', onItemsInput);
    items.addEventListener('click', onItemsClick);

    byId('languageSelect').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        writeStorage(STORAGE_KEYS.language, currentLanguage);
        applyTranslations();
        renderChips();
        renderVisitItems();
    });

    wireModal(byId('photoLightbox'));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.modal.show')) closeTopModal();
        trapFocus(e);
    });

    /* Another tab (the main checklist) may change the state while this
       page is open - reload it when we regain focus. */
    window.addEventListener('focus', () => {
        loadVisitState();
        renderVisitItems();
    });
}

document.addEventListener('DOMContentLoaded', init);
