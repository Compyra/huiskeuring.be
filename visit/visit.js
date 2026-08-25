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
let activeFeatures = [];

function loadVisitState() {
    visitState = normaliseState(readJSON(STORAGE_KEYS.state, null));
}

function saveVisitState() {
    if (!writeStorage(STORAGE_KEYS.state, JSON.stringify(visitState))) {
        showToast(t('storage.failed'), 'error');
    }
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
}

function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete('room');
    url.searchParams.delete('features');
    if (currentRoom) url.searchParams.set('room', currentRoom);
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
    const isOK = !!visitState.checklist[id];
    const hasIssue = !!visitState.renovationNeeded[id];
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

function renderVisitItems() {
    const container = byId('visitItems');
    const categories = visitCategories();

    byId('visitEmpty').hidden = !!categories.length;

    container.innerHTML = categories.map(category => `
        <div class="category-group" data-category="${escapeHTML(category.category)}">
            <div class="category-header">
                <h3><i class="fas ${escapeHTML(category.icon)}" aria-hidden="true"></i> ${escapeHTML(categoryTitle(category))}</h3>
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
            total += 1;
            if (visitState.checklist[id] || visitState.renovationNeeded[id]) done += 1;
        });
    });
    box.textContent = t('visit.answered').replace('{done}', String(done)).replace('{total}', String(total));
    box.hidden = false;
}

/* ------------------------------------------------------------------ *
 * Events
 * ------------------------------------------------------------------ */
function onChipClick(e) {
    const chip = e.target.closest('[data-chip]');
    if (!chip) return;
    const slug = chip.dataset.chip;
    if (VISIT_ROOMS.includes(slug)) {
        currentRoom = currentRoom === slug ? null : slug;
    } else {
        const at = activeFeatures.indexOf(slug);
        if (at >= 0) activeFeatures.splice(at, 1);
        else activeFeatures.push(slug);
    }
    renderChips();
    syncUrl();
    renderVisitItems();
}

function onItemsChange(e) {
    const key = e.target.dataset.key;
    if (!key) return;
    if (e.target.classList.contains('renovation-checkbox')) {
        visitState.renovationNeeded[key] = e.target.checked;
        if (e.target.checked) visitState.checklist[key] = false;
    } else if (e.target.type === 'checkbox') {
        visitState.checklist[key] = e.target.checked;
        if (e.target.checked) visitState.renovationNeeded[key] = false;
    } else {
        return;
    }
    saveVisitState();
    renderVisitItems();
}

function onItemsInput(e) {
    if (!e.target.classList.contains('item-note-textarea')) return;
    visitState.notes[e.target.dataset.key] = e.target.value;
    saveVisitState();
}

function onItemsClick(e) {
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
        if (VISIT_ROOMS.includes(room)) currentRoom = room;
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
