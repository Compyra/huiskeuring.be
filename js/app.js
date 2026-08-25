/* =====================================================================
 * huiskeuring.be - MAIN APPLICATION
 * =====================================================================
 * Loaded on index.html only. Depends on (in this order):
 *   i18n.js, legal.js, links.js, checklist.js, checklist.nl.js,
 *   checklist.fr.js, core.js
 * ===================================================================== */

'use strict';

let state = defaultState();
let activeIssueFilter = null;

/* ------------------------------------------------------------------ *
 * DOM references
 * ------------------------------------------------------------------ */
const checklistContainer = byId('checklistContainer');
const filterButtons = document.querySelectorAll('#filterButtons .filter-btn');
const globalNotesTextarea = byId('globalNotes');
const progressFill = byId('progressFill');
const progressBar = byId('progressBar');
const checkedCount = byId('checkedCount');
const issueCount = byId('issueCount');
const requestCount = byId('requestCount');
const totalCount = byId('totalCount');
const percentComplete = byId('percentComplete');

const propertyAddressInput = byId('propertyAddress');
const contactPersonInput = byId('contactPerson');
const inspectionDateInput = byId('inspectionDate');
const appointmentTimeInput = byId('appointmentTime');
const askingPriceInput = byId('askingPrice');
const propertyNotesInput = byId('propertyNotes');
const regionSelect = byId('regionSelect');

const reportModal = byId('reportModal');
const reportContent = byId('reportContent');
const helpModal = byId('helpModal');
const resourcesModal = byId('resourcesModal');
const infoModal = byId('infoModal');
const toolsModal = byId('toolsModal');
const questionsModal = byId('questionsModal');
const remindersModal = byId('remindersModal');

const toggleAllBtn = byId('toggleAllBtn');
const togglePropertyBtn = byId('togglePropertyBtn');
const propertyInfoCard = document.querySelector('.property-info-card');
const propertyAddressPreview = byId('propertyAddressPreview');
const scrollToTopBtn = byId('scrollToTopBtn');
const compactModeBtn = byId('compactModeBtn');

/* ------------------------------------------------------------------ *
 * State persistence
 * ------------------------------------------------------------------ */
function saveState() {
    if (!writeStorage(STORAGE_KEYS.state, JSON.stringify(state))) {
        showToast(t('storage.failed'), 'error');
    }
}

function loadState() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');

    if (encoded) {
        const shared = decodeState(encoded);
        if (shared) {
            state = shared;
            saveState();
            const url = new URL(window.location.href);
            url.search = '';
            window.history.replaceState({}, document.title, url.toString());
        }
    } else {
        const saved = readJSON(STORAGE_KEYS.state, null);
        if (saved) state = normaliseState(saved);
    }

    globalNotesTextarea.value = state.globalNotes || '';
    propertyAddressInput.value = state.propertyInfo.address || '';
    contactPersonInput.value = state.propertyInfo.contactPerson || '';
    inspectionDateInput.value = state.propertyInfo.inspectionDate || '';
    appointmentTimeInput.value = state.propertyInfo.appointmentTime || '';
    askingPriceInput.value = state.propertyInfo.askingPrice || '';
    propertyNotesInput.value = state.propertyInfo.propertyNotes || '';

    if (!inspectionDateInput.value) {
        state.propertyInfo.inspectionDate = todayISO();
        inspectionDateInput.value = state.propertyInfo.inspectionDate;
        saveState();
    }

    syncPropertyTypeButtons();
    syncCategoryFilterButtons();
    syncRegionSelect();
}

function syncPropertyTypeButtons() {
    document.querySelectorAll('.property-type-btn').forEach(btn => {
        const active = btn.dataset.propertyType === state.propertyType;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
}

function syncCategoryFilterButtons() {
    let matched = false;
    filterButtons.forEach(btn => {
        const active = btn.dataset.category === state.currentFilter;
        if (active) matched = true;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
    if (!matched) {
        state.currentFilter = 'all';
        filterButtons.forEach(btn => {
            const isAll = btn.dataset.category === 'all';
            btn.classList.toggle('active', isAll);
            btn.setAttribute('aria-pressed', String(isAll));
        });
    }
}

function syncRegionSelect() {
    if (!regionSelect) return;
    regionSelect.innerHTML = '';
    REGIONS.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = pick(region.label);
        regionSelect.appendChild(option);
    });
    regionSelect.value = state.region;
}

/* ------------------------------------------------------------------ *
 * Rendering
 * ------------------------------------------------------------------ */
function categoryMatchesFilter(category, filter) {
    if (!filter || filter === 'all') return true;
    if (category.category === filter) return true;
    return category.items.some(item => item.tags.includes(filter));
}

function renderChecklist() {
    checklistContainer.innerHTML = '';
    activeIssueFilter = null;

    const quick = state.viewMode === 'quick';
    const fragment = document.createDocumentFragment();

    visibleCategories(state).forEach(category => {
        /* Quick mode filters the rendered items but keeps the original
           indexes - item ids are position based and must never shift. */
        const indexes = [];
        category.items.forEach((item, index) => {
            if (!quick || QUICK_SET.has(itemId(category, index))) indexes.push(index);
        });
        if (!indexes.length) return;

        const group = document.createElement('div');
        group.className = 'category-group';
        group.dataset.category = category.category;

        const headerId = `cat-header-${category.category}`;
        const contentId = `cat-content-${category.category}`;

        const header = document.createElement('div');
        header.className = 'category-header';
        header.id = headerId;
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'true');
        header.setAttribute('aria-controls', contentId);
        header.innerHTML = `
            <h3><i class="fas ${escapeHTML(category.icon)}" aria-hidden="true"></i> ${escapeHTML(categoryTitle(category))}</h3>
            <i class="fas fa-chevron-down toggle-icon" aria-hidden="true"></i>
        `;

        const content = document.createElement('div');
        content.className = 'category-content';
        content.id = contentId;
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', headerId);

        indexes.forEach(index => content.appendChild(buildItem(category, category.items[index], index)));

        const toggle = () => {
            const collapsed = header.classList.toggle('collapsed');
            content.classList.toggle('collapsed', collapsed);
            header.setAttribute('aria-expanded', String(!collapsed));
            updateToggleButtonState();
        };
        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });

        group.appendChild(header);
        group.appendChild(content);
        fragment.appendChild(group);
    });

    checklistContainer.appendChild(fragment);

    checklistContainer.querySelectorAll('input[type="checkbox"]:not(.renovation-checkbox)')
        .forEach(cb => cb.addEventListener('change', handleCheckboxChange));
    checklistContainer.querySelectorAll('.renovation-checkbox')
        .forEach(cb => cb.addEventListener('change', handleRenovationChange));
    checklistContainer.querySelectorAll('.request-doc-btn')
        .forEach(btn => btn.addEventListener('click', handleDocumentRequest));
    checklistContainer.querySelectorAll('.item-note-textarea')
        .forEach(area => area.addEventListener('input', handleNoteChange));

    if (typeof photoRefreshAll === 'function') photoRefreshAll();

    updateIssueFilters();
}

function buildItem(category, item, index) {
    const id = itemId(category, index);
    const isOK = !!state.checklist[id];
    const hasIssue = !!state.renovationNeeded[id];
    const requested = !!state.documentRequests[id];
    const note = state.notes[id] || '';
    const isDocument = category.category === 'documents';

    const el = document.createElement('div');
    el.className = 'checklist-item';
    el.dataset.key = id;
    el.dataset.index = String(index);

    const safeId = escapeHTML(id);
    let checkboxHTML;
    if (isDocument) {
        checkboxHTML = `
            <div class="checkbox-wrapper"${requested ? ' style="opacity:0.5;"' : ''}>
                <input type="checkbox" id="item-${safeId}" ${isOK ? 'checked' : ''} ${requested ? 'disabled' : ''} data-key="${safeId}">
                <label for="item-${safeId}" class="checkbox-label ok-label">${escapeHTML(t('item.have'))}</label>
            </div>
            <button class="request-doc-btn ${requested ? 'requested' : ''}" data-key="${safeId}" aria-pressed="${requested}">
                ${escapeHTML(requested ? t('item.requested') : t('item.request'))}
            </button>`;
    } else {
        checkboxHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" id="item-${safeId}" ${isOK ? 'checked' : ''} data-key="${safeId}">
                <label for="item-${safeId}" class="checkbox-label ok-label">${escapeHTML(t('item.ok'))}</label>
            </div>
            <div class="checkbox-wrapper renovation-check">
                <input type="checkbox" id="reno-${safeId}" ${hasIssue ? 'checked' : ''} data-key="${safeId}" class="renovation-checkbox">
                <label for="reno-${safeId}" class="checkbox-label issue-label">${escapeHTML(t('item.issue'))}</label>
            </div>`;
    }

    const topicKey = item.deadline || item.info;
    const topic = lookupTopic(topicKey);
    const infoButton = topic
        ? `<button class="info-topic-btn" data-topic="${escapeHTML(topicKey)}" title="${escapeHTML(t('item.moreInfo'))}" aria-label="${escapeHTML(t('item.moreInfo'))}"><i class="fas fa-info-circle" aria-hidden="true"></i></button>`
        : '';

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

    const noteDisplay = note
        ? `<span class="note-text">${escapeHTML(note)}</span> <button class="edit-note-btn" data-key="${safeId}" title="${escapeHTML(t('item.editNote'))}" aria-label="${escapeHTML(t('item.editNote'))}"><i class="fas fa-pencil-alt" aria-hidden="true"></i></button>`
        : `<button class="add-note-btn" data-key="${safeId}" title="${escapeHTML(t('item.addNote'))}"><i class="fas fa-plus-circle" aria-hidden="true"></i> ${escapeHTML(t('item.addNote'))}</button>`;

    const photoRow = `
        <div class="item-photo-row">
            <button type="button" class="photo-btn" data-photo-add="${safeId}" title="${escapeHTML(t('photo.add'))}" aria-label="${escapeHTML(t('photo.add'))}">
                <i class="fas fa-camera" aria-hidden="true"></i><span class="photo-count" hidden></span>
            </button>
            <div class="item-photos" data-photos="${safeId}"></div>
        </div>`;

    el.innerHTML = `
        <div class="checkbox-container">${checkboxHTML}</div>
        <div class="item-content">
            <div class="item-text-wrapper">
                <div class="item-text ${isOK ? 'checked' : ''} ${hasIssue ? 'needs-renovation' : ''}" id="text-${safeId}">
                    ${escapeHTML(itemText(category, index, item))}
                    ${infoButton}
                </div>
                <div class="compact-note-display" data-key="${safeId}">${noteDisplay}</div>
            </div>
            ${whyBlock}
            <div class="item-tags">
                ${item.tags.map(tag => `<span class="tag">${escapeHTML(tagLabel(tag))}</span>`).join('')}
            </div>
            ${photoRow}
            <div class="item-notes">
                <label class="visually-hidden" for="note-${safeId}">${escapeHTML(t('item.notes.ph'))}</label>
                <textarea id="note-${safeId}" placeholder="${escapeHTML(t('item.notes.ph'))}" data-key="${safeId}" class="item-note-textarea">${escapeHTML(note)}</textarea>
            </div>
        </div>`;

    if (state.showUncheckedOnly && isOK) el.style.display = 'none';
    return el;
}

/* ------------------------------------------------------------------ *
 * Filters
 * ------------------------------------------------------------------ */
function getCategoryIcon(tag) {
    const icons = {
        documents: 'fas fa-file-contract', asbestos: 'fas fa-exclamation-triangle',
        exterior: 'fas fa-building', kitchen: 'fas fa-utensils', bathroom: 'fas fa-bath',
        bedroom: 'fas fa-bed', livingroom: 'fas fa-couch', basement: 'fas fa-dungeon',
        attic: 'fas fa-house-damage', plumbing: 'fas fa-tint', electrical: 'fas fa-bolt',
        structural: 'fas fa-hard-hat', hvac: 'fas fa-fan', renovation: 'fas fa-tools',
        apartment: 'fas fa-building'
    };
    return icons[tag] || 'fas fa-tag';
}

function updateIssueFilters() {
    const container = byId('issueFilterButtons');
    if (!container) return;

    const counts = {};
    visibleCategories(state).forEach(category => {
        category.items.forEach((item, index) => {
            if (!state.renovationNeeded[itemId(category, index)]) return;
            item.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; });
        });
    });

    container.innerHTML = '';
    const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    if (!tags.length) {
        const empty = document.createElement('p');
        empty.className = 'issue-filter-empty';
        empty.textContent = t('filter.issuesEmpty');
        container.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'issue-filter-btn' + (activeIssueFilter === tag ? ' active' : '');
        button.dataset.issueCategory = tag;
        button.setAttribute('aria-pressed', String(activeIssueFilter === tag));
        button.innerHTML = `
            <i class="${escapeHTML(getCategoryIcon(tag))}" aria-hidden="true"></i>
            ${escapeHTML(tagLabel(tag))}
            <span class="issue-count">${counts[tag]}</span>`;
        button.addEventListener('click', () => handleIssueFilterClick(button, tag));
        fragment.appendChild(button);
    });
    container.appendChild(fragment);
}

function handleIssueFilterClick(button, tag) {
    const wasActive = button.classList.contains('active');
    document.querySelectorAll('.issue-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    activeIssueFilter = wasActive ? null : tag;
    if (!wasActive) {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
    }
    applyFilters();
}

function applyFilters() {
    document.querySelectorAll('.category-group').forEach(group => {
        const category = checklistData.find(c => c.category === group.dataset.category);
        if (!category) return;

        const categoryVisible = categoryMatchesFilter(category, state.currentFilter);
        let anyVisible = false;

        group.querySelectorAll('.checklist-item').forEach(el => {
            const item = category.items[Number(el.dataset.index)];
            const id = el.dataset.key;
            if (!item) return;

            let visible = categoryVisible;
            if (visible && activeIssueFilter) {
                visible = !!state.renovationNeeded[id] && item.tags.includes(activeIssueFilter);
            }
            if (visible && state.showUncheckedOnly && state.checklist[id]) visible = false;

            el.style.display = visible ? 'flex' : 'none';
            if (visible) anyVisible = true;
        });

        const show = categoryVisible && (anyVisible || (!activeIssueFilter && !state.showUncheckedOnly));
        group.classList.toggle('hidden', !show);
    });
}

/* ------------------------------------------------------------------ *
 * Interaction
 * ------------------------------------------------------------------ */
function updateCheckboxDates() {
    const now = new Date().toISOString();
    if (!state.firstCheckboxDate) {
        const any = Object.values(state.checklist).some(Boolean) ||
            Object.values(state.renovationNeeded).some(Boolean) ||
            Object.values(state.documentRequests).some(Boolean);
        if (any) state.firstCheckboxDate = now;
    }
    state.lastCheckboxChangeDate = now;
}

function handleCheckboxChange(e) {
    const key = e.target.dataset.key;
    state.checklist[key] = e.target.checked;
    updateCheckboxDates();
    const textEl = byId(`text-${key}`);
    if (textEl) textEl.classList.toggle('checked', e.target.checked);
    saveState();
    updateProgress();
    if (state.showUncheckedOnly) applyFilters();
}

function handleRenovationChange(e) {
    const key = e.target.dataset.key;
    state.renovationNeeded[key] = e.target.checked;
    updateCheckboxDates();
    const textEl = byId(`text-${key}`);
    if (textEl) textEl.classList.toggle('needs-renovation', e.target.checked);
    saveState();
    updateProgress();
    updateIssueFilters();
    if (activeIssueFilter) applyFilters();
}

function handleDocumentRequest(e) {
    const button = e.currentTarget;
    const key = button.dataset.key;
    state.documentRequests[key] = !state.documentRequests[key];
    updateCheckboxDates();

    const requested = state.documentRequests[key];
    const have = byId(`item-${key}`);

    button.classList.toggle('requested', requested);
    button.textContent = requested ? t('item.requested') : t('item.request');
    button.setAttribute('aria-pressed', String(requested));

    if (requested) {
        state.checklist[key] = false;
        if (have) {
            have.checked = false;
            have.disabled = true;
            have.parentElement.style.opacity = '0.5';
        }
        const textEl = byId(`text-${key}`);
        if (textEl) textEl.classList.remove('checked');
    } else if (have) {
        have.disabled = false;
        have.parentElement.style.opacity = '';
    }

    saveState();
    updateProgress();
}

function handleNoteChange(e) {
    const key = e.target.dataset.key;
    state.notes[key] = e.target.value;
    updateCompactNoteDisplay(key);
    saveState();
}

function updateCompactNoteDisplay(key) {
    const display = document.querySelector(`.compact-note-display[data-key="${CSS.escape(key)}"]`);
    if (!display) return;
    const note = state.notes[key] || '';
    display.innerHTML = note
        ? `<span class="note-text">${escapeHTML(note)}</span> <button class="edit-note-btn" data-key="${escapeHTML(key)}" title="${escapeHTML(t('item.editNote'))}" aria-label="${escapeHTML(t('item.editNote'))}"><i class="fas fa-pencil-alt" aria-hidden="true"></i></button>`
        : `<button class="add-note-btn" data-key="${escapeHTML(key)}" title="${escapeHTML(t('item.addNote'))}"><i class="fas fa-plus-circle" aria-hidden="true"></i> ${escapeHTML(t('item.addNote'))}</button>`;
}

function handleCompactNoteEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    const button = e.target.closest('.add-note-btn, .edit-note-btn');
    if (!button) return;
    const itemEl = button.closest('.checklist-item');
    if (!itemEl) return;
    const textarea = itemEl.querySelector('.item-note-textarea');
    const notes = itemEl.querySelector('.item-notes');
    if (!textarea) return;

    if (notes) notes.classList.add('editing');
    textarea.style.display = 'block';
    textarea.style.visibility = 'visible';
    textarea.style.minHeight = '80px';
    setTimeout(() => { textarea.focus(); if (textarea.value) textarea.select(); }, 10);

    const hide = () => {
        if (state.compactMode) {
            textarea.style.display = '';
            textarea.style.visibility = '';
            textarea.style.minHeight = '';
            if (notes) notes.classList.remove('editing');
        }
        textarea.removeEventListener('blur', hide);
    };
    textarea.addEventListener('blur', hide);
}

/* ------------------------------------------------------------------ *
 * Progress
 * ------------------------------------------------------------------ */
function updateProgress() {
    const summary = state.viewMode === 'quick' ? summariseQuick(state) : summariseState(state);
    progressFill.style.width = `${summary.percent}%`;
    if (progressBar) progressBar.setAttribute('aria-valuenow', String(summary.percent));
    checkedCount.textContent = summary.ok;
    issueCount.textContent = summary.issues;
    requestCount.textContent = summary.requests;
    totalCount.textContent = summary.total;
    percentComplete.textContent = `${summary.percent}%`;
    const railText = byId('railProgressText');
    if (railText) railText.textContent = `${summary.percent}%`;
}

/** Progress over the quick-check subset only. */
function summariseQuick(state) {
    let total = 0, ok = 0, issues = 0, requests = 0;
    visibleCategories(state).forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            if (!QUICK_SET.has(id)) return;
            total += 1;
            if (state.renovationNeeded[id]) issues += 1;
            else if (state.checklist[id]) ok += 1;
            if (state.documentRequests[id]) requests += 1;
        });
    });
    const checked = ok + issues;
    return { total, ok, issues, requests, checked, percent: total ? Math.round((checked / total) * 100) : 0 };
}

/* ------------------------------------------------------------------ *
 * Info modal (legal + advisory topics, region aware)
 * ------------------------------------------------------------------ */
function statusBadge(status) {
    const map = {
        verified: { cls: 'ok', key: 'status.verified' },
        unverified: { cls: 'warn', key: 'status.unverified' },
        'not-applicable': { cls: 'muted', key: 'status.notApplicable' }
    };
    const entry = map[status] || map.unverified;
    return `<span class="status-badge status-${entry.cls}">${escapeHTML(t(entry.key))}</span>`;
}

function sourcesHTML(sources) {
    const list = (sources || []).map(s => ({ label: s.label, url: safeUrl(s.url) })).filter(s => s.url);
    if (!list.length) return '';
    return `<ul class="source-list">${list.map(s => `
        <li><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${escapeHTML(s.label)}
        </a></li>`).join('')}</ul>`;
}

function showTopic(topicKey) {
    const found = lookupTopic(topicKey);
    if (!found) return;

    const titleEl = byId('infoModalTitle');
    const bodyEl = byId('infoModalBody');
    titleEl.innerHTML = `<i class="fas ${escapeHTML(found.topic.icon || 'fa-info-circle')}" aria-hidden="true"></i> ${escapeHTML(pick(found.topic.title))}`;

    if (found.kind === 'advisory') {
        bodyEl.innerHTML = `
            <div class="info-section">
                <h3><i class="fas fa-clock" aria-hidden="true"></i> ${escapeHTML(t('info.whenToCheck'))}</h3>
                <p class="info-highlight">${escapeHTML(pick(found.topic.when))}</p>
            </div>
            <div class="info-section">
                <h3><i class="fas fa-eye" aria-hidden="true"></i> ${escapeHTML(t('info.whatToLookFor'))}</h3>
                <p>${escapeHTML(pick(found.topic.description))}</p>
            </div>
            <div class="info-section">
                <h3><i class="fas fa-lightbulb" aria-hidden="true"></i> ${escapeHTML(t('info.whyItMatters'))}</h3>
                <p>${escapeHTML(pick(found.topic.detail))}</p>
            </div>`;
        openModal(infoModal);
        return;
    }

    const topic = found.topic;
    let html = `
        <div class="info-section">
            <h3><i class="fas fa-info-circle" aria-hidden="true"></i> ${escapeHTML(t('info.description'))}</h3>
            <p>${escapeHTML(pick(topic.description))}</p>
        </div>
        <div class="info-section">
            <h3><i class="fas fa-lightbulb" aria-hidden="true"></i> ${escapeHTML(t('info.whyItMatters'))}</h3>
            <p>${escapeHTML(pick(topic.why))}</p>
        </div>
        <h3 class="info-region-heading"><i class="fas fa-scale-balanced" aria-hidden="true"></i> ${escapeHTML(t('info.perRegion'))}</h3>`;

    REGIONS.forEach(region => {
        const block = topicForRegion(topic, region.id);
        if (!block) return;
        const isCurrent = region.id === state.region;
        html += `
            <div class="info-section region-block${isCurrent ? ' region-current' : ''}">
                <h4>
                    <i class="fas fa-location-dot" aria-hidden="true"></i> ${escapeHTML(pick(region.label))}
                    ${statusBadge(block.status)}
                    ${isCurrent ? `<span class="region-current-tag">${escapeHTML(t('info.yourRegion'))}</span>` : ''}
                </h4>
                <p class="info-highlight">${escapeHTML(pick(block.deadline))}</p>
                <p>${escapeHTML(pick(block.detail))}</p>
                ${block.status === 'unverified' ? `<p class="info-warning"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> ${escapeHTML(t('info.unverifiedWarning'))}</p>` : ''}
                ${sourcesHTML(block.sources)}
                <p class="info-verified">${escapeHTML(t('info.lastVerified'))}: ${escapeHTML(formatDate(block.lastVerified, currentLanguage))}</p>
            </div>`;
    });

    bodyEl.innerHTML = html;
    openModal(infoModal);
}

/* ------------------------------------------------------------------ *
 * Resources (region filtered)
 * ------------------------------------------------------------------ */
function renderResources() {
    const container = byId('resourcesContent');
    if (!container) return;

    container.innerHTML = LINK_GROUPS.map(group => {
        const links = group.links
            .filter(link => !link.regions || link.regions.includes(state.region))
            .map(link => Object.assign({}, link, { url: safeUrl(link.url) }))
            .filter(link => link.url);
        if (!links.length) return '';
        return `
            <div class="help-section resource-group">
                <h4><i class="fas ${escapeHTML(group.icon)}" aria-hidden="true"></i> ${escapeHTML(pick(group.title))}</h4>
                <p>${escapeHTML(pick(group.intro))}</p>
                <ul class="resource-list">
                    ${links.map(link => `
                        <li>
                            <a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${escapeHTML(pick(link.label))}
                            </a>
                            ${link.note ? `<span class="resource-note">${escapeHTML(pick(link.note))}</span>` : ''}
                        </li>`).join('')}
                </ul>
            </div>`;
    }).join('');

    const hint = byId('resourcesRegionHint');
    if (hint) {
        hint.textContent = t('resources.regionHint').replace('{region}', regionLabel(state.region)) +
            ' ' + t('resources.lastCheck').replace('{date}', formatDate(LINKS_META.lastCheck, currentLanguage));
    }
}

function renderGuide() {
    const container = byId('guideContent');
    if (!container) return;
    const steps = BUYING_GUIDE[currentLanguage] || BUYING_GUIDE[DEFAULT_LANGUAGE];
    container.innerHTML = steps.map(step => `
        <div class="help-section">
            <h4><i class="fas ${escapeHTML(step.icon)}" aria-hidden="true"></i> ${escapeHTML(step.title)}</h4>
            <p>${escapeHTML(step.body)}</p>
        </div>`).join('');
}

function renderFaq() {
    const container = byId('faqContent');
    if (!container) return;
    const entries = FAQ_CONTENT[currentLanguage] || FAQ_CONTENT[DEFAULT_LANGUAGE];
    container.innerHTML = entries.map(entry => `
        <details class="faq-item">
            <summary>${escapeHTML(entry.q)}</summary>
            <p>${escapeHTML(entry.a)}</p>
        </details>`).join('');
}

/**
 * Renders the About / How to use / Roadmap / GDPR / Privacy tabs from
 * HELP_CONTENT so they follow the language like everything else.
 * `linkify` turns the few known references into real links after escaping,
 * so no untrusted HTML is ever injected.
 */
function linkifyHelp(text) {
    return escapeHTML(text)
        .replace(/huiskeuring@compyra\.com/g, '<a href="mailto:huiskeuring@compyra.com">huiskeuring@compyra.com</a>')
        .replace(/(^|[\s(])compyra\.com/g, '$1<a href="https://compyra.com" target="_blank" rel="noopener noreferrer">compyra.com</a>');
}

function renderHelpContent() {
    const bundle = HELP_CONTENT[currentLanguage] || HELP_CONTENT[DEFAULT_LANGUAGE];
    const fallback = HELP_CONTENT[DEFAULT_LANGUAGE];

    ['about', 'usage', 'roadmap', 'gdpr', 'privacy'].forEach(tab => {
        const panel = byId(`${tab}-tab`);
        if (!panel) return;
        const content = (bundle && bundle[tab]) || (fallback && fallback[tab]);
        if (!content) return;

        panel.innerHTML = `
            <h3>${escapeHTML(content.heading)}</h3>
            ${content.sections.map(section => `
                <div class="help-section">
                    <h4><i class="fas ${escapeHTML(section.icon)}" aria-hidden="true"></i> ${escapeHTML(section.title)}</h4>
                    ${(section.p || []).map(p => `<p>${linkifyHelp(p)}</p>`).join('')}
                    ${section.ul ? `<ul>${section.ul.map(li => `<li>${linkifyHelp(li)}</li>`).join('')}</ul>` : ''}
                </div>`).join('')}`;
    });
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */
function collectItems() {
    const result = { ok: [], issues: [], unchecked: [], notes: [], documents: [] };
    visibleCategories(state).forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            const data = {
                id: id,
                category: categoryTitle(category),
                categorySlug: category.category,
                text: itemText(category, index, item),
                why: itemWhy(category, index, item),
                note: state.notes[id] || '',
                tags: item.tags,
                topic: item.deadline || item.info || null
            };
            const isOK = !!state.checklist[id];
            const hasIssue = !!state.renovationNeeded[id];
            if (isOK) result.ok.push(data);
            if (hasIssue) result.issues.push(data);
            if (!isOK && !hasIssue) result.unchecked.push(data);
            if (data.note) result.notes.push(data);
            if (state.documentRequests[id]) result.documents.push(data);
        });
    });
    return result;
}

function reportListHTML(title, icon, items, extraClass) {
    if (!items.length) return '';
    return `
        <div class="report-section">
            <h3><i class="fas ${icon}" aria-hidden="true"></i> ${escapeHTML(title)} (${items.length})</h3>
            <ul>
                ${items.map(item => `
                    <li class="${extraClass || ''}">
                        <strong>${escapeHTML(item.category)}:</strong> ${escapeHTML(item.text)}
                        ${item.note ? `<div class="report-note"><strong>${escapeHTML(t('report.note'))}:</strong> ${escapeHTML(item.note)}</div>` : ''}
                    </li>`).join('')}
            </ul>
        </div>`;
}

function buildReportHTML() {
    const info = state.propertyInfo;
    const summary = summariseState(state);
    const groups = collectItems();
    let html = '<div class="report-container">';

    if (info.address || info.contactPerson) {
        html += `
            <div class="report-section property-info-report">
                <h3><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${escapeHTML(t('section.propertyInfo'))}</h3>
                ${info.address ? `<p><strong>${escapeHTML(t('field.address'))}:</strong> ${escapeHTML(info.address)}</p>` : ''}
                ${info.contactPerson ? `<p><strong>${escapeHTML(t('field.contact'))}:</strong> ${escapeHTML(info.contactPerson)}</p>` : ''}
                ${info.inspectionDate ? `<p><strong>${escapeHTML(t('field.date'))}:</strong> ${escapeHTML(formatDate(info.inspectionDate, currentLanguage))}</p>` : ''}
                ${info.appointmentTime ? `<p><strong>${escapeHTML(t('field.time'))}:</strong> ${escapeHTML(info.appointmentTime)}</p>` : ''}
                ${info.askingPrice ? `<p><strong>${escapeHTML(t('field.price'))}:</strong> ${escapeHTML(info.askingPrice)}</p>` : ''}
                ${info.propertyNotes ? `<p><strong>${escapeHTML(t('field.details'))}:</strong> ${escapeHTML(info.propertyNotes)}</p>` : ''}
            </div>`;
    }

    html += `
        <div class="report-section">
            <h3><i class="fas fa-info-circle" aria-hidden="true"></i> ${escapeHTML(t('report.summary'))}</h3>
            <p><strong>${escapeHTML(t('report.generated'))}:</strong> ${escapeHTML(formatDate(new Date().toISOString(), currentLanguage))}</p>
            <p><strong>${escapeHTML(t('section.propertyType'))}:</strong> ${escapeHTML(state.propertyType === 'apartment' ? t('type.apartment') : t('type.house'))}</p>
            <p><strong>${escapeHTML(t('field.region'))}:</strong> ${escapeHTML(regionLabel(state.region))}</p>
            <p><strong>${escapeHTML(t('report.progress'))}:</strong> ${summary.checked} / ${summary.total} ${escapeHTML(t('report.itemsChecked'))} (${summary.percent}%)</p>
        </div>`;

    html += reportListHTML(t('report.documents'), 'fa-file-alt', groups.documents);

    const findings = lookupFindings(state);
    if (findings.length) {
        html += `
        <div class="report-section">
            <h3><i class="fas fa-magnifying-glass-location" aria-hidden="true"></i> ${escapeHTML(t('report.research'))} (${findings.length})</h3>
            <ul>
                ${findings.map(f => `<li><strong>${escapeHTML(pick(f.tool.label))}:</strong> ${escapeHTML(f.note)}</li>`).join('')}
            </ul>
        </div>`;
    }

    html += reportListHTML(t('report.issues'), 'fa-exclamation-triangle', groups.issues, 'report-issue');
    html += reportListHTML(t('report.ok'), 'fa-check-circle', groups.ok);
    html += reportListHTML(t('report.unchecked'), 'fa-times-circle', groups.unchecked);
    html += reportListHTML(t('report.withNotes'), 'fa-sticky-note', groups.notes);

    if (state.globalNotes) {
        html += `
            <div class="report-section">
                <h3><i class="fas fa-file-alt" aria-hidden="true"></i> ${escapeHTML(t('report.generalNotes'))}</h3>
                <div class="report-note">${escapeHTML(state.globalNotes)}</div>
            </div>`;
    }

    html += `<p class="report-disclaimer">${escapeHTML(t('report.disclaimer'))}</p>`;
    return html + '</div>';
}

function generateReport() {
    reportContent.innerHTML = buildReportHTML();
    appendReportPhotos();
    openModal(reportModal);
}

/** Item id -> "Category: item text" for photo captions. */
function itemTextMap() {
    const map = new Map();
    visibleCategories(state).forEach(category => {
        category.items.forEach((item, index) => {
            map.set(itemId(category, index), `${categoryTitle(category)}: ${itemText(category, index, item)}`);
        });
    });
    return map;
}

/** Photos live in IndexedDB, so they are appended after the sync render. */
async function appendReportPhotos() {
    if (typeof photoList !== 'function' || !photosSupported()) return;
    let photos;
    try { photos = await photoList(); } catch (e) { return; }
    if (!photos.length) return;

    const captions = itemTextMap();
    const grouped = {};
    photos.forEach(photo => { (grouped[photo.itemKey] = grouped[photo.itemKey] || []).push(photo); });

    const blocks = Object.keys(grouped)
        .filter(key => captions.has(key))
        .map(key => `
            <div class="report-photo-group">
                <p><strong>${escapeHTML(captions.get(key))}</strong></p>
                <div class="report-photos">
                    ${grouped[key].map(photo => `<img src="${photo.dataUrl}" alt="" loading="lazy">`).join('')}
                </div>
            </div>`);
    if (!blocks.length) return;

    const section = document.createElement('div');
    section.className = 'report-section';
    section.innerHTML = `
        <h3><i class="fas fa-images" aria-hidden="true"></i> ${escapeHTML(t('photo.title'))} (${photos.length})</h3>
        ${blocks.join('')}
        <p class="report-note">${escapeHTML(t('photo.hint'))}</p>`;
    const container = reportContent.querySelector('.report-container');
    const disclaimer = container ? container.querySelector('.report-disclaimer') : null;
    if (container) container.insertBefore(section, disclaimer);
}

/* ------------------------------------------------------------------ *
 * Seller / agent question sheet
 * ------------------------------------------------------------------ *
 * Deliberately NOT the same as the issue list: it turns findings into
 * questions with a follow-up, adds the documents to request, and adds the
 * standard questions that apply to every viewing.
 * ------------------------------------------------------------------ */
const STANDARD_QUESTIONS = {
    all: ['q.std.why', 'q.std.howLong', 'q.std.works', 'q.std.invoices', 'q.std.neighbours', 'q.std.bills', 'q.std.offers', 'q.std.included'],
    house: ['q.std.roofAge', 'q.std.boilerAge', 'q.std.damp', 'q.std.garden'],
    apartment: ['q.std.charges', 'q.std.assembly', 'q.std.reserve', 'q.std.plannedWorks']
};

function buildQuestionSheet() {
    const groups = collectItems();
    const sections = [];

    const standard = STANDARD_QUESTIONS.all
        .concat(state.propertyType === 'apartment' ? STANDARD_QUESTIONS.apartment : STANDARD_QUESTIONS.house)
        .map(key => t(key));
    sections.push({ title: t('questions.standard'), icon: 'fa-comments', items: standard });

    if (groups.documents.length) {
        sections.push({
            title: t('questions.documents'),
            icon: 'fa-file-contract',
            items: groups.documents.map(item => t('questions.docTemplate').replace('{item}', item.text))
        });
    }

    if (groups.issues.length) {
        sections.push({
            title: t('questions.issues'),
            icon: 'fa-triangle-exclamation',
            items: groups.issues.map(item => {
                const base = t('questions.issueTemplate').replace('{item}', item.text);
                return item.note ? `${base} (${t('report.note')}: ${item.note})` : base;
            })
        });
    }

    const legalTopics = new Set();
    groups.issues.concat(groups.documents).forEach(item => {
        if (item.topic && LEGAL_TOPICS[item.topic]) legalTopics.add(item.topic);
    });
    if (legalTopics.size) {
        sections.push({
            title: t('questions.legal'),
            icon: 'fa-scale-balanced',
            items: Array.from(legalTopics).map(key => {
                const block = topicForRegion(LEGAL_TOPICS[key], state.region);
                const deadline = block ? pick(block.deadline) : '';
                return t('questions.legalTemplate')
                    .replace('{topic}', pick(LEGAL_TOPICS[key].title))
                    .replace('{deadline}', deadline);
            })
        });
    }

    return sections;
}

function showQuestionSheet() {
    const container = byId('questionsContent');
    const sections = buildQuestionSheet();
    container.innerHTML = `
        <p class="tab-intro">${escapeHTML(t('questions.intro'))}</p>
        ${sections.map(section => `
            <div class="help-section">
                <h4><i class="fas ${escapeHTML(section.icon)}" aria-hidden="true"></i> ${escapeHTML(section.title)}</h4>
                <ol class="question-list">
                    ${section.items.map(q => `<li>${escapeHTML(q)}</li>`).join('')}
                </ol>
            </div>`).join('')}`;
    openModal(questionsModal);
}

function questionSheetAsText() {
    const lines = [t('questions.title'), '='.repeat(40), ''];
    if (state.propertyInfo.address) lines.push(`${t('field.address')}: ${state.propertyInfo.address}`, '');
    buildQuestionSheet().forEach(section => {
        lines.push(section.title, '-'.repeat(section.title.length));
        section.items.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
        lines.push('');
    });
    return lines.join('\n');
}

/* ------------------------------------------------------------------ *
 * Deadline reminders (.ics)
 * ------------------------------------------------------------------ */
function activeReminders() {
    return LEGAL_REMINDERS.filter(reminder => {
        if (reminder.regions && !reminder.regions.includes(state.region)) return false;
        if (reminder.anchor === 'deed' && !state.keyDates.deedDate) return false;
        if (reminder.anchor === 'drawdown' && !state.keyDates.drawdownDate) return false;
        return true;
    }).map(reminder => {
        let anchorDate;
        if (reminder.anchor === 'deed') anchorDate = new Date(state.keyDates.deedDate);
        else if (reminder.anchor === 'drawdown') anchorDate = new Date(state.keyDates.drawdownDate);
        else anchorDate = new Date();

        const due = addMonths(anchorDate, reminder.offsetMonths);
        return {
            def: reminder,
            due: due,
            overdue: due < new Date(),
            title: pick(reminder.title),
            body: pick(reminder.body)
        };
    }).sort((a, b) => a.due - b.due);
}

function icsEscape(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\r?\n/g, '\\n');
}

function icsDate(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '');
}

function buildIcs(reminders) {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const address = state.propertyInfo.address || '';
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//huiskeuring.be//Inspection reminders//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];

    reminders.forEach(reminder => {
        const end = new Date(reminder.due.getTime() + 86400000);
        lines.push(
            'BEGIN:VEVENT',
            `UID:${reminder.def.id}-${icsDate(reminder.due)}@huiskeuring.be`,
            `DTSTAMP:${stamp}`,
            `DTSTART;VALUE=DATE:${icsDate(reminder.due)}`,
            `DTEND;VALUE=DATE:${icsDate(end)}`,
            `SUMMARY:${icsEscape(reminder.title + (address ? ' - ' + address : ''))}`,
            `DESCRIPTION:${icsEscape(reminder.body + '\n\n' + t('reminders.source'))}`,
            address ? `LOCATION:${icsEscape(address)}` : 'X-HK-NOLOC:1',
            'BEGIN:VALARM',
            `TRIGGER:-P${reminder.def.leadDays}D`,
            'ACTION:DISPLAY',
            `DESCRIPTION:${icsEscape(reminder.title)}`,
            'END:VALARM',
            'END:VEVENT'
        );
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
}

function showReminders() {
    const container = byId('remindersContent');
    const reminders = activeReminders();

    const dateFields = `
        <div class="reminder-dates">
            <div class="form-group">
                <label for="deedDate">${escapeHTML(t('reminders.deedDate'))}</label>
                <input type="date" id="deedDate" value="${escapeHTML(state.keyDates.deedDate || '')}">
            </div>
            <div class="form-group">
                <label for="drawdownDate">${escapeHTML(t('reminders.drawdownDate'))}</label>
                <input type="date" id="drawdownDate" value="${escapeHTML(state.keyDates.drawdownDate || '')}">
            </div>
        </div>`;

    const list = reminders.length
        ? `<ul class="reminder-list">${reminders.map(r => `
            <li class="${r.overdue ? 'reminder-overdue' : ''}">
                <span class="reminder-date">${escapeHTML(formatDate(r.due.toISOString(), currentLanguage))}</span>
                <strong>${escapeHTML(r.title)}</strong>
                <p>${escapeHTML(r.body)}</p>
                ${r.overdue ? `<span class="reminder-flag">${escapeHTML(t('reminders.overdue'))}</span>` : ''}
            </li>`).join('')}</ul>`
        : `<p class="issue-filter-empty">${escapeHTML(t('reminders.empty'))}</p>`;

    container.innerHTML = `
        <p class="tab-intro">${escapeHTML(t('reminders.intro'))}</p>
        ${dateFields}
        ${list}`;

    byId('deedDate').addEventListener('change', (e) => {
        state.keyDates.deedDate = e.target.value;
        saveState();
        showReminders();
    });
    byId('drawdownDate').addEventListener('change', (e) => {
        state.keyDates.drawdownDate = e.target.value;
        saveState();
        showReminders();
    });

    const download = byId('downloadIcsBtn');
    if (download) download.disabled = reminders.length === 0;

    openModal(remindersModal);
}

function downloadReminders() {
    const reminders = activeReminders();
    if (!reminders.length) {
        showToast(t('reminders.empty'), 'error');
        return;
    }
    downloadFile(`huiskeuring-${slugify(state.propertyInfo.address)}-reminders.ics`, buildIcs(reminders), 'text/calendar');
    showToast(t('reminders.downloaded'));
}

/* ------------------------------------------------------------------ *
 * Import / export / library
 * ------------------------------------------------------------------ */
function exportJSON() {
    const payload = {
        format: 'huiskeuring.be/inspection',
        formatVersion: 1,
        schemaVersion: SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        language: currentLanguage,
        state: state
    };
    downloadFile(
        `huiskeuring-${slugify(state.propertyInfo.address)}-${todayISO()}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
    );
    showToast(t('tools.exported'));
}

function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(String(reader.result));
            const incoming = parsed && parsed.state ? parsed.state : parsed;
            const next = normaliseState(incoming);
            if (!next) throw new Error('unrecognised');

            state = next;
            saveState();
            loadState();
            renderChecklist();
            applyFilters();
            updateProgress();
            updateToggleButtonState();
            renderResources();
            showToast(t('tools.imported'));
            closeModal(toolsModal);
        } catch (error) {
            console.error('Import failed:', error);
            showToast(t('tools.importFailed'), 'error');
        }
    };
    reader.onerror = () => showToast(t('tools.importFailed'), 'error');
    reader.readAsText(file);
}

function renderLibrary() {
    const container = byId('libraryList');
    if (!container) return;
    const list = loadLibrary();

    if (!list.length) {
        container.innerHTML = `<p class="issue-filter-empty">${escapeHTML(t('library.empty'))}</p>`;
        return;
    }

    container.innerHTML = `<ul class="library-list">${list.map(entry => `
        <li>
            <div>
                <strong>${escapeHTML(entry.label)}</strong>
                <span class="library-meta">${escapeHTML(formatDate(entry.savedAt, currentLanguage))} &middot;
                ${entry.summary.issues} ${escapeHTML(t('progress.issues').toLowerCase())} &middot;
                ${entry.summary.percent}% ${escapeHTML(t('progress.complete').toLowerCase())}</span>
            </div>
            <button class="btn btn-secondary btn-small" data-load-library="${escapeHTML(entry.id)}">${escapeHTML(t('library.load'))}</button>
            <button class="btn btn-secondary btn-small" data-delete-library="${escapeHTML(entry.id)}" aria-label="${escapeHTML(t('library.delete'))}"><i class="fas fa-trash" aria-hidden="true"></i></button>
        </li>`).join('')}</ul>`;

    container.querySelectorAll('[data-load-library]').forEach(btn => {
        btn.addEventListener('click', () => {
            const entry = loadLibrary().find(e => e.id === btn.dataset.loadLibrary);
            if (!entry) return;
            const decoded = decodeState(entry.data);
            if (!decoded) { showToast(t('tools.importFailed'), 'error'); return; }
            state = decoded;
            saveState();
            loadState();
            renderChecklist();
            applyFilters();
            updateProgress();
            renderResources();
            closeModal(toolsModal);
            showToast(t('library.loaded'));
        });
    });

    container.querySelectorAll('[data-delete-library]').forEach(btn => {
        btn.addEventListener('click', () => {
            saveLibrary(loadLibrary().filter(e => e.id !== btn.dataset.deleteLibrary));
            renderLibrary();
        });
    });
}

/* ------------------------------------------------------------------ *
 * Blank printable checklist
 * ------------------------------------------------------------------ */
function printBlankChecklist() {
    const categories = visibleCategories(state);
    const rows = categories.map(category => `
        <section class="blank-category">
            <h2>${escapeHTML(categoryTitle(category))}</h2>
            <table>
                <thead>
                    <tr>
                        <th class="col-check">${escapeHTML(t('item.ok'))}</th>
                        <th class="col-check">${escapeHTML(t('item.issue'))}</th>
                        <th>${escapeHTML(t('blank.item'))}</th>
                        <th class="col-notes">${escapeHTML(t('blank.notes'))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${category.items.map((item, index) => `
                        <tr>
                            <td class="col-check"></td>
                            <td class="col-check"></td>
                            <td>${escapeHTML(itemText(category, index, item))}</td>
                            <td class="col-notes"></td>
                        </tr>`).join('')}
                </tbody>
            </table>
        </section>`).join('');

    const win = window.open('', '_blank');
    if (!win) { showToast(t('tools.popupBlocked'), 'error'); return; }

    win.document.write(`<!DOCTYPE html>
<html lang="${escapeHTML(t('html.lang'))}">
<head>
<meta charset="utf-8">
<title>${escapeHTML(t('blank.title'))}</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif; font-size: 10pt; color: #000; margin: 14mm; }
  h1 { font-size: 16pt; margin: 0 0 2mm; }
  .meta { display: flex; gap: 8mm; flex-wrap: wrap; font-size: 9pt; margin-bottom: 6mm; }
  .meta span { border-bottom: 1px solid #000; min-width: 55mm; padding-bottom: 1mm; }
  .blank-category { page-break-inside: avoid; margin-bottom: 6mm; }
  h2 { font-size: 11pt; margin: 4mm 0 1mm; border-bottom: 2px solid #000; padding-bottom: 1mm; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 1.4mm 2mm; text-align: left; vertical-align: top; font-size: 9pt; }
  th { background: #eee; font-size: 8pt; text-transform: uppercase; letter-spacing: .04em; }
  .col-check { width: 11mm; text-align: center; }
  .col-notes { width: 46mm; }
  tbody tr { height: 8mm; }
  footer { margin-top: 6mm; font-size: 8pt; color: #444; }
  @page { size: A4; margin: 12mm; }
</style>
</head>
<body>
  <h1>${escapeHTML(t('blank.title'))}</h1>
  <div class="meta">
    <span>${escapeHTML(t('field.address'))}: </span>
    <span>${escapeHTML(t('field.date'))}: </span>
    <span>${escapeHTML(t('field.contact'))}: </span>
    <span>${escapeHTML(t('field.price'))}: </span>
  </div>
  ${rows}
  <footer>${escapeHTML(t('blank.footer'))}</footer>
</body>
</html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
}

/* ------------------------------------------------------------------ *
 * Freshness banner
 * ------------------------------------------------------------------ */
function renderFreshnessBanner() {
    const banner = byId('freshnessBanner');
    if (!banner) return;

    if (readStorage(STORAGE_KEYS.freshnessDismissed) === LEGAL_META.contentVersion) {
        banner.hidden = true;
        return;
    }
    /* Only show it where there is room; on very small screens the space is
       better spent on the checklist itself. */
    if (window.innerWidth < 620) {
        banner.hidden = true;
        return;
    }

    const info = freshnessInfo();
    const text = (info.overdue ? t('freshness.overdue') : t('freshness.ok'))
        .replace('{date}', formatDate(info.lastReview, currentLanguage))
        .replace('{next}', formatDate(info.nextReview, currentLanguage));

    byId('freshnessText').textContent = text;
    banner.classList.toggle('freshness-overdue', info.overdue);
    banner.hidden = false;
}

/* ------------------------------------------------------------------ *
 * View helpers
 * ------------------------------------------------------------------ */
function toggleCompactMode() {
    state.compactMode = !state.compactMode;
    document.body.classList.toggle('compact-mode', state.compactMode);
    compactModeBtn.classList.toggle('active', state.compactMode);
    compactModeBtn.setAttribute('aria-pressed', String(state.compactMode));
    saveState();
}

function loadCompactModeState() {
    document.body.classList.toggle('compact-mode', state.compactMode);
    if (compactModeBtn) {
        compactModeBtn.classList.toggle('active', state.compactMode);
        compactModeBtn.setAttribute('aria-pressed', String(state.compactMode));
    }
}

function updateShowUncheckedButton() {
    const button = byId('showUncheckedBtn');
    if (!button) return;
    const label = button.querySelector('.toggle-text');
    const icon = button.querySelector('i');
    button.classList.toggle('active', state.showUncheckedOnly);
    button.setAttribute('aria-pressed', String(state.showUncheckedOnly));
    if (label) label.textContent = state.showUncheckedOnly ? t('progress.showAll') : t('progress.showUnchecked');
    if (icon) icon.className = state.showUncheckedOnly ? 'fas fa-eye' : 'fas fa-filter';
}

function toggleShowUnchecked() {
    state.showUncheckedOnly = !state.showUncheckedOnly;
    updateShowUncheckedButton();
    applyFilters();
    saveState();
}

function toggleAllCategories() {
    const headers = Array.from(document.querySelectorAll('.category-header'));
    if (!headers.length) return;
    const allCollapsed = headers.every(h => h.classList.contains('collapsed'));
    headers.forEach(header => {
        const content = header.nextElementSibling;
        header.classList.toggle('collapsed', !allCollapsed);
        header.setAttribute('aria-expanded', String(allCollapsed));
        if (content) content.classList.toggle('collapsed', !allCollapsed);
    });
    updateToggleButtonState();
}

function updateToggleButtonState() {
    if (!toggleAllBtn) return;
    const headers = Array.from(document.querySelectorAll('.category-header'));
    const label = toggleAllBtn.querySelector('.toggle-text');
    const icon = toggleAllBtn.querySelector('i');
    const allCollapsed = headers.length > 0 && headers.every(h => h.classList.contains('collapsed'));
    toggleAllBtn.classList.toggle('collapsed', allCollapsed);
    if (label) label.textContent = allCollapsed ? t('progress.expandAll') : t('progress.collapseAll');
    if (icon) icon.className = allCollapsed ? 'fas fa-expand-alt' : 'fas fa-compress-alt';
}

function togglePropertyInfo() {
    const collapsed = propertyInfoCard.classList.toggle('collapsed');
    togglePropertyBtn.setAttribute('aria-expanded', String(!collapsed));
    writeStorage(STORAGE_KEYS.propertyInfoCollapsed, String(collapsed));
    if (!collapsed) propertyInfoUserExpanded = true; // don't auto-collapse again this visit
    updatePropertyAddressPreview();
}

function updatePropertyAddressPreview() {
    const address = propertyAddressInput.value.trim();
    if (address && propertyInfoCard.classList.contains('collapsed')) {
        const href = 'lookup/?address=' + encodeURIComponent(address);
        propertyAddressPreview.innerHTML = `
            ${escapeHTML(address)}
            <a class="preview-lookup-link" href="${escapeHTML(href)}"
               title="${escapeHTML(t('prop.lookupLink'))}" aria-label="${escapeHTML(t('prop.lookupLink'))}">
                <i class="fas fa-magnifying-glass-location" aria-hidden="true"></i>
            </a>`;
    } else {
        propertyAddressPreview.textContent = '';
    }
}

let propertyInfoUserExpanded = false;

function loadPropertyInfoState() {
    const stored = readStorage(STORAGE_KEYS.propertyInfoCollapsed);
    const address = (state.propertyInfo.address || '').trim();
    // Filled-in info gets out of the way: only an address bar remains.
    if (stored === 'true' || (address && stored !== 'false')) {
        propertyInfoCard.classList.add('collapsed');
        togglePropertyBtn.setAttribute('aria-expanded', 'false');
        updatePropertyAddressPreview();
    }
}

/** Collapse the card once focus leaves it with an address filled in. */
function autoCollapsePropertyInfo(e) {
    if (propertyInfoUserExpanded) return;
    if (propertyInfoCard.classList.contains('collapsed')) return;
    if (!propertyAddressInput.value.trim()) return;
    const next = e.relatedTarget;
    if (next && propertyInfoCard.contains(next)) return; // still inside the card
    propertyInfoCard.classList.add('collapsed');
    togglePropertyBtn.setAttribute('aria-expanded', 'false');
    writeStorage(STORAGE_KEYS.propertyInfoCollapsed, 'true');
    updatePropertyAddressPreview();
}

let scrollTicking = false;
function handleScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 300;
        scrollToTopBtn.classList.toggle('visible', scrolled);
        const rail = byId('sideRail');
        if (rail) rail.classList.toggle('visible', window.scrollY > 400);
        scrollTicking = false;
    });
}

function resetChecklist() {
    if (!window.confirm(t('reset.confirm'))) return;
    const compact = state.compactMode;
    const type = state.propertyType;
    const region = state.region;

    if (typeof photoClearAll === 'function') photoClearAll();
    try {
        localStorage.removeItem('visitRoomInstances');
        localStorage.removeItem('visitInstanceTicks');
    } catch (e) { /* storage blocked */ }

    state = defaultState();
    state.compactMode = compact;
    state.propertyType = type;
    state.region = region;
    state.propertyInfo.inspectionDate = todayISO();

    globalNotesTextarea.value = '';
    propertyAddressInput.value = '';
    contactPersonInput.value = '';
    inspectionDateInput.value = state.propertyInfo.inspectionDate;
    appointmentTimeInput.value = '';
    askingPriceInput.value = '';
    propertyNotesInput.value = '';

    activeIssueFilter = null;
    saveState();
    syncPropertyTypeButtons();
    syncCategoryFilterButtons();
    updateShowUncheckedButton();
    updatePropertyAddressPreview();
    renderChecklist();
    applyFilters();
    updateProgress();
    updateToggleButtonState();
}

/* ------------------------------------------------------------------ *
 * Language switching
 * ------------------------------------------------------------------ */
function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.some(l => l.code === lang)) return;
    currentLanguage = lang;
    writeStorage(STORAGE_KEYS.language, lang);

    applyTranslations();
    initTheme(byId('themeSelect'));
    syncRegionSelect();
    renderChecklist();
    applyFilters();
    updateProgress();
    updateToggleButtonState();
    updateShowUncheckedButton();
    syncViewModeButtons();
    renderResources();
    renderGuide();
    renderFaq();
    renderHelpContent();
    renderFreshnessBanner();
    renderSeasonHint();
}

/* ------------------------------------------------------------------ *
 * Events
 * ------------------------------------------------------------------ */
function closeMobileMenu() {
    const burger = byId('burgerMenu');
    if (!burger) return;
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    byId('headerActions').classList.remove('active');
    byId('menuOverlay').classList.remove('active');
    document.body.classList.remove('menu-open');
}

function setupEventListeners() {
    const burger = byId('burgerMenu');
    const headerActions = byId('headerActions');
    const overlay = byId('menuOverlay');

    if (burger && overlay) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = !burger.classList.contains('active');
            burger.classList.toggle('active', open);
            burger.setAttribute('aria-expanded', String(open));
            headerActions.classList.toggle('active', open);
            overlay.classList.toggle('active', open);
            document.body.classList.toggle('menu-open', open);
        });
        overlay.addEventListener('click', closeMobileMenu);
        // #menuBtn only toggles its own panel - it must not close the drawer
        headerActions.querySelectorAll('.btn:not(#menuBtn)').forEach(btn => btn.addEventListener('click', closeMobileMenu));
    }

    /* Header menu (grouped secondary actions) */
    const menuBtn = byId('menuBtn');
    const headerMenu = byId('headerMenu');
    const closeHeaderMenu = () => {
        if (headerMenu.hidden) return;
        headerMenu.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = headerMenu.hidden;
        headerMenu.hidden = !open;
        menuBtn.setAttribute('aria-expanded', String(open));
    });
    headerMenu.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', closeHeaderMenu));
    document.addEventListener('click', (e) => {
        if (!headerMenu.hidden && !e.target.closest('.header-menu-wrap')) closeHeaderMenu();
    });

    byId('languageSelect').addEventListener('change', (e) => setLanguage(e.target.value));
    byId('themeSelect').addEventListener('change', (e) => setThemeMode(e.target.value));

    if (regionSelect) {
        regionSelect.addEventListener('change', (e) => {
            state.region = e.target.value;
            saveState();
            renderResources();
            showToast(t('region.changed').replace('{region}', regionLabel(state.region)));
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            state.currentFilter = btn.dataset.category;
            activeIssueFilter = null;
            document.querySelectorAll('.issue-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            applyFilters();
            saveState();
        });
    });

    document.querySelectorAll('.property-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.propertyType = btn.dataset.propertyType;
            syncPropertyTypeButtons();
            saveState();
            renderChecklist();
            applyFilters();
            updateProgress();
            updateToggleButtonState();
        });
    });

    byId('generateReportBtn').addEventListener('click', generateReport);
    byId('resetBtn').addEventListener('click', resetChecklist);
    byId('printReport').addEventListener('click', () => window.print());
    byId('downloadPdfBtn').addEventListener('click', exportPdf);
    byId('negotiationBtn').addEventListener('click', showNegotiation);
    byId('printNegotiation').addEventListener('click', () => window.print());

    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => setViewMode(btn.dataset.viewMode));
    });

    byId('secondOpinionBtn').addEventListener('click', compareSecondOpinion);
    byId('importListingBtn').addEventListener('click', importFromListing);

    byId('copyReport').addEventListener('click', async () => {
        const ok = await copyText(reportContent.innerText);
        showToast(ok ? t('report.copied') : t('share.failed'), ok ? '' : 'error');
    });

    byId('shareReportBtn').addEventListener('click', async () => {
        const url = buildShareUrl(state, 'report.html');
        const ok = await copyText(url);
        if (ok) showToast(t('report.linkCopied'));
        else window.prompt(t('share.failed'), url);
    });

    byId('shareUrlBtn').addEventListener('click', shareInspectionUrl);

    /* Floating quick-action rail (large screens, appears on scroll) */
    byId('railTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    byId('railProgress').addEventListener('click', () => {
        document.querySelector('.progress-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    byId('railReport').addEventListener('click', generateReport);
    byId('railShare').addEventListener('click', shareInspectionUrl);
    byId('railSave').addEventListener('click', () => {
        const entry = saveToLibrary(state);
        showToast(entry ? t('library.saved') : t('storage.failed'), entry ? '' : 'error');
    });
    byId('railHelp').addEventListener('click', () => openModal(helpModal));

    /* Photo input, lightbox and annotation are wired inside js/photos.js */

    const howToDismiss = byId('howItWorksDismiss');
    if (howToDismiss) {
        howToDismiss.addEventListener('click', () => {
            writeStorage(STORAGE_KEYS.howto, '1');
            byId('howItWorks').hidden = true;
        });
    }

    byId('helpBtn').addEventListener('click', () => openModal(helpModal));
    byId('helpBtnHeader').addEventListener('click', () => openModal(helpModal));
    byId('resourcesBtn').addEventListener('click', () => { renderResources(); openModal(resourcesModal); });
    byId('toolsBtn').addEventListener('click', () => { renderLibrary(); openModal(toolsModal); });
    byId('questionsBtn').addEventListener('click', showQuestionSheet);
    byId('remindersBtn').addEventListener('click', showReminders);

    byId('downloadIcsBtn').addEventListener('click', downloadReminders);
    byId('printQuestionsBtn').addEventListener('click', () => window.print());
    byId('copyQuestionsBtn').addEventListener('click', async () => {
        const ok = await copyText(questionSheetAsText());
        showToast(ok ? t('report.copied') : t('share.failed'), ok ? '' : 'error');
    });

    byId('exportJsonBtn').addEventListener('click', exportJSON);
    byId('importJsonInput').addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) importJSON(e.target.files[0]);
        e.target.value = '';
    });
    byId('saveLibraryBtn').addEventListener('click', () => {
        const entry = saveToLibrary(state);
        showToast(entry ? t('library.saved') : t('storage.failed'), entry ? '' : 'error');
        renderLibrary();
    });
    byId('blankChecklistBtn').addEventListener('click', printBlankChecklist);

    [reportModal, helpModal, resourcesModal, infoModal, toolsModal, questionsModal, remindersModal, byId('negotiationModal'), byId('photoLightbox')]
        .forEach(modal => wireModal(modal));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const menu = byId('headerMenu');
            if (menu && !menu.hidden) {
                menu.hidden = true;
                byId('menuBtn').setAttribute('aria-expanded', 'false');
            } else if (document.querySelector('.modal.show')) {
                closeTopModal();
            } else {
                closeMobileMenu();
            }
        }
        trapFocus(e);
    });

    globalNotesTextarea.addEventListener('input', (e) => { state.globalNotes = e.target.value; saveState(); });

    propertyAddressInput.addEventListener('input', (e) => {
        state.propertyInfo.address = e.target.value;
        const detected = regionFromPostalCode(e.target.value);
        if (detected && detected !== state.region) {
            state.region = detected;
            syncRegionSelect();
            renderResources();
            showToast(t('region.detected').replace('{region}', regionLabel(detected)));
        }
        saveState();
        updatePropertyAddressPreview();
    });
    contactPersonInput.addEventListener('input', (e) => { state.propertyInfo.contactPerson = e.target.value; saveState(); });
    inspectionDateInput.addEventListener('change', (e) => { state.propertyInfo.inspectionDate = e.target.value; saveState(); });
    appointmentTimeInput.addEventListener('change', (e) => { state.propertyInfo.appointmentTime = e.target.value; saveState(); });
    askingPriceInput.addEventListener('input', (e) => { state.propertyInfo.askingPrice = e.target.value; saveState(); });
    propertyNotesInput.addEventListener('input', (e) => { state.propertyInfo.propertyNotes = e.target.value; saveState(); });

    document.querySelectorAll('.help-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.help-tab').forEach(t2 => {
                t2.classList.remove('active');
                t2.setAttribute('aria-selected', 'false');
            });
            document.querySelectorAll('.help-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = byId(`${tab.dataset.tab}-tab`);
            if (panel) panel.classList.add('active');
        });
    });

    toggleAllBtn.addEventListener('click', toggleAllCategories);
    byId('showUncheckedBtn').addEventListener('click', toggleShowUnchecked);
    togglePropertyBtn.addEventListener('click', togglePropertyInfo);
    byId('propertyInfoGrid').addEventListener('focusout', autoCollapsePropertyInfo);
    compactModeBtn.addEventListener('click', toggleCompactMode);

    scrollToTopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToTopBtn.classList.add('clicking');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => scrollToTopBtn.classList.remove('clicking'), 600);
    });
    byId('logoContainer').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', renderFreshnessBanner);

    const dismiss = byId('freshnessDismiss');
    if (dismiss) {
        dismiss.addEventListener('click', () => {
            writeStorage(STORAGE_KEYS.freshnessDismissed, LEGAL_META.contentVersion);
            byId('freshnessBanner').hidden = true;
        });
    }

    checklistContainer.addEventListener('click', (e) => {
        const infoBtn = e.target.closest('.info-topic-btn');
        if (infoBtn) {
            e.stopPropagation();
            showTopic(infoBtn.dataset.topic);
            return;
        }
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
        const noteBtn = e.target.closest('.add-note-btn, .edit-note-btn');
        if (noteBtn && state.compactMode) handleCompactNoteEdit(e);

        const photoBtn = e.target.closest('.photo-btn');
        if (photoBtn && typeof photoPickFor === 'function') {
            photoPickFor(photoBtn.dataset.photoAdd);
            return;
        }
        const thumb = e.target.closest('.item-photo-thumb');
        if (thumb && typeof photoOpenLightbox === 'function') photoOpenLightbox(thumb.dataset.photoId);
    });
}

function checkFirstVisit() {
    if (readStorage(STORAGE_KEYS.seenHelp)) return;
    if (new URLSearchParams(window.location.search).get('data')) return;
    if (window.location.hash) return; // a deep link should land on its target, not under a modal
    openModal(helpModal);
    writeStorage(STORAGE_KEYS.seenHelp, 'true');
}

async function shareInspectionUrl() {
    const url = buildShareUrl(state, 'index.html');
    const ok = await copyText(url);
    if (ok) showToast(t('share.copied'));
    else window.prompt(t('share.failed'), url);
}

function renderHowItWorks() {
    const box = byId('howItWorks');
    if (!box) return;
    box.hidden = readStorage(STORAGE_KEYS.howto) === '1';
}

/* ------------------------------------------------------------------ *
 * Deep links
 * ------------------------------------------------------------------ *
 * ?type=house|apartment  ?region=flanders|wallonia|brussels  ?view=quick
 * #cat-<category>        scrolls to a category header
 * #item-<itemId>         scrolls to a single checklist item
 * (?lang= is handled in resolveInitialLanguage, ?data= in loadState.)
 * ------------------------------------------------------------------ */
function applyDeepLinkParams() {
    let changed = false;
    try {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        if ((type === 'house' || type === 'apartment') && type !== state.propertyType) {
            state.propertyType = type;
            changed = true;
        }
        const region = (params.get('region') || '').toLowerCase();
        if (REGIONS.some(r => r.id === region) && region !== state.region) {
            state.region = region;
            changed = true;
        }
        if (params.get('view') === 'quick' && state.viewMode !== 'quick') {
            state.viewMode = 'quick';
            changed = true;
        }
    } catch (e) { /* ignore malformed URLs */ }
    if (changed) {
        saveState();
        syncPropertyTypeButtons();
        syncRegionSelect();
        syncViewModeButtons();
    }
}

function focusDeepLinkTarget() {
    let hash = '';
    try { hash = decodeURIComponent(window.location.hash || '').replace(/^#/, ''); }
    catch (e) { return; /* malformed percent-encoding in the hash */ }
    if (!hash) return;
    let target = null;
    if (hash.startsWith('cat-')) {
        target = byId('cat-header-' + hash.slice(4)) || byId(hash);
    } else if (hash.startsWith('item-')) {
        const key = hash.slice(5);
        target = checklistContainer.querySelector(`[data-key="${CSS.escape(key)}"]`);
        if (!target && state.viewMode === 'quick') {
            // The linked item is filtered out by quick mode - show it anyway.
            setViewMode('full');
            target = checklistContainer.querySelector(`[data-key="${CSS.escape(key)}"]`);
        }
    }
    if (!target) return;
    deepLinkEnsureVisible(target);
    window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('deep-link-flash');
        window.setTimeout(() => target.classList.remove('deep-link-flash'), 2600);
    }, 200);
}

/** A persisted category filter or "show unchecked" can hide the linked
 *  target - reset those filters so the deep link actually lands. */
function deepLinkEnsureVisible(target) {
    const group = target.closest('.category-group');
    const itemHidden = target.classList.contains('checklist-item') && target.style.display === 'none';
    const groupHidden = !!group && group.classList.contains('hidden');
    if (!itemHidden && !groupHidden) return;
    state.currentFilter = 'all';
    state.showUncheckedOnly = false;
    activeIssueFilter = null;
    saveState();
    syncCategoryFilterButtons();
    updateShowUncheckedButton();
    document.querySelectorAll('.issue-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
}

/* ------------------------------------------------------------------ *
 * Quick check / full checklist toggle
 * ------------------------------------------------------------------ */
const QUICK_SET = new Set(QUICK_CHECK_IDS);

function syncViewModeButtons() {
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        const active = btn.dataset.viewMode === state.viewMode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
    const hint = byId('viewModeHint');
    if (hint) {
        hint.textContent = state.viewMode === 'quick' ? t('mode.quickHint') : '';
        hint.hidden = state.viewMode !== 'quick';
    }
}

function setViewMode(mode) {
    state.viewMode = mode === 'quick' ? 'quick' : 'full';
    saveState();
    syncViewModeButtons();
    renderChecklist();
    applyFilters();
    updateProgress();
    updateToggleButtonState();
}

/* ------------------------------------------------------------------ *
 * Seasonal hint
 * ------------------------------------------------------------------ */
function currentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

function renderSeasonHint() {
    const box = byId('seasonHint');
    if (!box) return;
    const season = currentSeason();
    if (readStorage(STORAGE_KEYS.seasonDismissed) === season) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = `
        <i class="fas fa-cloud-sun" aria-hidden="true"></i>
        <div class="seasonal-text">
            <strong>${escapeHTML(t('season.title'))}</strong>
            <p>${escapeHTML(t('season.' + season))}</p>
        </div>
        <button type="button" class="seasonal-dismiss" aria-label="${escapeHTML(t('season.dismiss'))}" title="${escapeHTML(t('season.dismiss'))}">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>`;
    box.querySelector('.seasonal-dismiss').addEventListener('click', () => {
        writeStorage(STORAGE_KEYS.seasonDismissed, season);
        box.hidden = true;
    });
}

/* ------------------------------------------------------------------ *
 * PDF export (jsPDF, vendored, loaded only when asked for)
 * ------------------------------------------------------------------ */
let jspdfLoading = null;
function loadJsPdf() {
    if (window.jspdf) return Promise.resolve();
    if (jspdfLoading) return jspdfLoading;
    jspdfLoading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'assets/vendor/jspdf.umd.min.js';
        script.onload = resolve;
        script.onerror = () => { jspdfLoading = null; reject(new Error('jspdf failed to load')); };
        document.head.appendChild(script);
    });
    return jspdfLoading;
}

async function exportPdf() {
    try {
        await loadJsPdf();
        const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
        const pageW = 210, margin = 15, maxW = pageW - margin * 2;
        let y = margin;

        const line = (text, size, style, gap) => {
            doc.setFontSize(size);
            doc.setFont('helvetica', style || 'normal');
            doc.splitTextToSize(text, maxW).forEach(row => {
                if (y > 282 - 6) { doc.addPage(); y = margin; }
                doc.text(row, margin, y);
                y += (size * 0.45);
            });
            y += (gap === undefined ? 2 : gap);
        };

        const info = state.propertyInfo;
        const summary = summariseState(state);
        const groups = collectItems();

        line('huiskeuring.be', 20, 'bold', 1);
        line(t('app.tagline'), 11, 'normal', 4);
        if (info.address) line(`${t('field.address')}: ${info.address}`, 12, 'bold', 1);
        if (info.askingPrice) line(`${t('field.price')}: ${info.askingPrice}`, 11, 'normal', 1);
        line(`${t('report.generated')}: ${formatDate(new Date().toISOString(), currentLanguage)}  |  ${t('field.region')}: ${regionLabel(state.region)}`, 10, 'normal', 2);
        line(`${t('report.progress')}: ${summary.checked}/${summary.total} (${summary.percent}%)  |  ${t('progress.issues')}: ${summary.issues}  |  ${t('progress.requests')}: ${summary.requests}`, 10, 'normal', 5);

        const section = (title, items, bullet) => {
            if (!items.length) return;
            line(`${title} (${items.length})`, 13, 'bold', 2);
            items.forEach(item => {
                line(`${bullet} ${item.category}: ${item.text}`, 10, 'normal', 0.5);
                if (item.note) line(`   ${t('report.note')}: ${item.note}`, 9, 'italic', 0.5);
            });
            y += 3;
        };

        section(t('report.documents'), groups.documents, '[>]');

        const findings = lookupFindings(state);
        if (findings.length) {
            line(`${t('report.research')} (${findings.length})`, 13, 'bold', 2);
            findings.forEach(f => line(`[i] ${pick(f.tool.label)}: ${f.note}`, 10, 'normal', 0.5));
            y += 3;
        }

        section(t('report.issues'), groups.issues, '[!]');
        section(t('report.withNotes'), groups.notes.filter(n => !groups.issues.some(i => i.id === n.id)), '[~]');
        section(t('report.unchecked'), groups.unchecked, '[ ]');

        if (state.globalNotes) {
            line(t('report.generalNotes'), 13, 'bold', 2);
            line(state.globalNotes, 10, 'normal', 3);
        }

        if (typeof photoList === 'function' && photosSupported()) {
            let photos = [];
            try { photos = await photoList(); } catch (e) { /* skip photos */ }
            if (photos.length) {
                const captions = itemTextMap();
                line(`${t('photo.title')} (${photos.length})`, 13, 'bold', 2);
                for (const photo of photos) {
                    if (!captions.has(photo.itemKey)) continue;
                    const ratio = photo.h / photo.w;
                    let wMm = Math.min(90, maxW);
                    let hMm = wMm * ratio;
                    if (hMm > 90) { hMm = 90; wMm = hMm / ratio; }
                    // keep the caption on the same page as its image
                    if (y + 10 + hMm > 282) { doc.addPage(); y = margin; }
                    line(captions.get(photo.itemKey), 9, 'italic', 1);
                    if (y + hMm > 282) { doc.addPage(); y = margin; }
                    doc.addImage(photo.dataUrl, 'JPEG', margin, y, wMm, hMm);
                    y += hMm + 5;
                }
                y += 2;
            }
        }

        line(t('report.disclaimer'), 8, 'italic', 0);

        const pages = doc.getNumberOfPages();
        for (let p = 1; p <= pages; p++) {
            doc.setPage(p);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text(`huiskeuring.be - ${p}/${pages}`, pageW - margin, 291, { align: 'right' });
        }

        doc.save(`huiskeuring-${slugify(info.address)}-${todayISO()}.pdf`);
    } catch (e) {
        showToast(t('pdf.error'), 'error');
    }
}

/* ------------------------------------------------------------------ *
 * Negotiation summary (issues x indicative cost bands)
 * ------------------------------------------------------------------ */
function negotiationRows() {
    const groups = collectItems();
    const perBand = {};
    groups.issues.forEach(item => {
        // The first tag that has a cost band decides the area - counted once per area.
        const tag = item.tags.find(tg => COST_BANDS[tg]) || item.categorySlug;
        const band = COST_BANDS[tag] || COST_BANDS.renovation;
        const key = COST_BANDS[tag] ? tag : 'renovation';
        if (!perBand[key]) perBand[key] = { band: band, items: [] };
        perBand[key].items.push(item);
    });
    return Object.values(perBand).sort((a, b) => b.band.high - a.band.high);
}

function euro(n) {
    return n.toLocaleString(currentLanguage === 'en' ? 'en-GB' : currentLanguage + '-BE') + ' EUR';
}

function showNegotiation() {
    const body = byId('negotiationBody');
    const rows = negotiationRows();

    if (!rows.length) {
        body.innerHTML = `<p class="nego-empty">${escapeHTML(t('nego.empty'))}</p>`;
        openModal(byId('negotiationModal'));
        return;
    }

    const totalLow = rows.reduce((s, r) => s + r.band.low, 0);
    const totalHigh = rows.reduce((s, r) => s + r.band.high, 0);
    const asking = state.propertyInfo.askingPrice;

    body.innerHTML = `
        <p class="tab-intro">${escapeHTML(t('nego.intro'))}</p>
        ${asking ? `<p><strong>${escapeHTML(t('nego.asking'))}:</strong> ${escapeHTML(asking)}</p>` : ''}
        <table class="nego-table">
            <thead><tr>
                <th>${escapeHTML(t('nego.area'))}</th>
                <th>${escapeHTML(t('nego.issues'))}</th>
                <th>${escapeHTML(t('nego.band'))}</th>
            </tr></thead>
            <tbody>
                ${rows.map(row => `
                    <tr>
                        <td><strong>${escapeHTML(pick(row.band.label))}</strong></td>
                        <td>
                            <ul class="nego-issues">
                                ${row.items.map(item => `<li>${escapeHTML(item.text)}${item.note ? ` <em>(${escapeHTML(item.note)})</em>` : ''}</li>`).join('')}
                            </ul>
                        </td>
                        <td class="nego-band">${escapeHTML(euro(row.band.low))} - ${escapeHTML(euro(row.band.high))}</td>
                    </tr>`).join('')}
            </tbody>
            <tfoot><tr>
                <th colspan="2">${escapeHTML(t('nego.total'))}</th>
                <th class="nego-band">${escapeHTML(euro(totalLow))} - ${escapeHTML(euro(totalHigh))}</th>
            </tr></tfoot>
        </table>
        <h3 class="nego-points-title">${escapeHTML(t('nego.points'))}</h3>
        <ul class="nego-points">
            <li>${escapeHTML(t('nego.point1'))}</li>
            <li>${escapeHTML(t('nego.point2'))}</li>
            <li>${escapeHTML(t('nego.point3'))}</li>
        </ul>
        <p class="report-disclaimer">${escapeHTML(t('nego.disclaimer'))}</p>`;
    openModal(byId('negotiationModal'));
}

/* ------------------------------------------------------------------ *
 * Second opinion: compare a pasted share link against this inspection
 * ------------------------------------------------------------------ */
function itemStatus(st, id) {
    if (st.renovationNeeded[id]) return 'issue';
    if (st.checklist[id]) return 'ok';
    return 'open';
}

function compareSecondOpinion() {
    const input = byId('secondOpinionInput');
    const out = byId('secondOpinionResult');
    let data = '';
    try {
        const url = new URL(input.value.trim());
        data = url.searchParams.get('data') || '';
    } catch (e) {
        data = input.value.trim();
    }
    const theirs = data ? decodeState(data) : null;
    if (!theirs) {
        out.innerHTML = `<p class="second-invalid">${escapeHTML(t('second.invalid'))}</p>`;
        return;
    }

    const diffs = [];
    visibleCategories(state).forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            const mine = itemStatus(state, id);
            const other = itemStatus(theirs, id);
            if (mine === 'open' && other === 'open') return;
            if (mine !== other) {
                diffs.push({
                    text: itemText(category, index, item),
                    category: categoryTitle(category),
                    mine, other,
                    myNote: state.notes[id] || '',
                    theirNote: theirs.notes[id] || ''
                });
            }
        });
    });

    if (!diffs.length) {
        out.innerHTML = `<p class="second-agree"><i class="fas fa-circle-check" aria-hidden="true"></i> ${escapeHTML(t('second.agree'))}</p>`;
        return;
    }

    const word = (s) => t('second.' + s);
    out.innerHTML = `
        <h4>${escapeHTML(t('second.diffs'))} (${diffs.length})</h4>
        <ul class="second-diffs">
            ${diffs.map(d => `
                <li>
                    <strong>${escapeHTML(d.category)}:</strong> ${escapeHTML(d.text)}
                    <div class="second-verdicts">
                        <span class="second-${d.mine}">${escapeHTML(t('second.you'))}: ${escapeHTML(word(d.mine))}</span>
                        <span class="second-${d.other}">${escapeHTML(t('second.them'))}: ${escapeHTML(word(d.other))}</span>
                    </div>
                    ${d.theirNote ? `<div class="report-note">${escapeHTML(t('second.them'))}: ${escapeHTML(d.theirNote)}</div>` : ''}
                </li>`).join('')}
        </ul>`;
}

/* ------------------------------------------------------------------ *
 * Paste-from-listing import (client-side text parsing, nothing is sent)
 * ------------------------------------------------------------------ */
function importFromListing() {
    const raw = byId('listingInput').value;
    if (!raw.trim() || /^https?:\/\/\S+$/.test(raw.trim())) {
        showToast(t('import.nothing'), 'error');
        return;
    }
    const found = [];

    const price = raw.match(/(?:€|EUR)\s?([\d.\s]{4,12}\d)/i) || raw.match(/([\d.]{6,12})\s?(?:€|EUR)/i);
    if (price) {
        const cleaned = price[1].replace(/[\s.]/g, '');
        if (Number(cleaned) >= 10000) {
            state.propertyInfo.askingPrice = Number(cleaned).toLocaleString(currentLanguage === 'en' ? 'en-GB' : currentLanguage + '-BE') + ' EUR';
            byId('askingPrice').value = state.propertyInfo.askingPrice;
            found.push(t('field.price'));
        }
    }

    const addr = raw.match(/([A-ZÀ-Ž][\w'’.\-]+(?:\s+[\w'’.\-]+){0,4}\s+\d+[a-zA-Z]?)\s*,?\s*(\d{4})\s+([A-ZÀ-Ž][\w'’\-]+(?:[\s-][A-ZÀ-Ž][\w'’\-]+)*)/u);
    if (addr) {
        state.propertyInfo.address = `${addr[1]}, ${addr[2]} ${addr[3]}`;
        byId('propertyAddress').value = state.propertyInfo.address;
        const detected = regionFromPostalCode(addr[2]);
        if (detected) { state.region = detected; syncRegionSelect(); renderResources(); }
        found.push(t('field.address'));
        updatePropertyAddressPreview();
    }

    const epc = raw.match(/\b(?:EPC|PEB)[\s:‐-]*(?:label\s*)?([A-G])(?![a-z0-9])/i) || raw.match(/\blabel\s+([A-G])\b/i);
    if (epc) {
        const label = 'EPC ' + epc[1].toUpperCase();
        state.propertyInfo.propertyNotes = state.propertyInfo.propertyNotes
            ? (state.propertyInfo.propertyNotes.includes(label) ? state.propertyInfo.propertyNotes : state.propertyInfo.propertyNotes + ' | ' + label)
            : label;
        byId('propertyNotes').value = state.propertyInfo.propertyNotes;
        found.push('EPC');
    }

    if (!found.length) {
        showToast(t('import.nothing'), 'error');
        return;
    }
    saveState();
    showToast(`${t('import.done')} ${found.join(', ')}`);
    byId('listingInput').value = '';
}

/* ------------------------------------------------------------------ *
 * Bootstrap
 * ------------------------------------------------------------------ */
function init() {
    currentLanguage = resolveInitialLanguage();
    initTheme(byId('themeSelect'));
    buildLanguageSelect(byId('languageSelect'));
    applyTranslations();

    loadState();
    applyDeepLinkParams();
    loadCompactModeState();
    loadPropertyInfoState();
    updateShowUncheckedButton();
    syncViewModeButtons();

    renderChecklist();
    applyFilters();
    updateProgress();
    updateToggleButtonState();

    renderResources();
    renderGuide();
    renderFaq();
    renderHelpContent();
    renderFreshnessBanner();
    renderSeasonHint();
    renderHowItWorks();

    const yearEl = byId('footerYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    setupEventListeners();
    checkFirstVisit();
    focusDeepLinkTarget();
}

document.addEventListener('DOMContentLoaded', init);
