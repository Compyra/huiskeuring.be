/* =====================================================================
 * huiskeuring.be - CORE RUNTIME
 * =====================================================================
 * Shared by index.html (the checklist), report.html (read-only report)
 * and compare.html (side-by-side comparison).
 *
 * Contains: escaping, storage, language, theme, region, state schema,
 * share links, the saved-inspection library and small UI helpers.
 * No page-specific rendering lives here.
 * ===================================================================== */

'use strict';

/* ------------------------------------------------------------------ *
 * Storage keys & schema
 * ------------------------------------------------------------------ */
const STORAGE_KEYS = {
    state: 'houseInspectionState',
    library: 'houseInspectionLibrary',
    theme: 'themeMode',
    language: 'language',
    region: 'region',
    propertyInfoCollapsed: 'propertyInfoCollapsed',
    seenHelp: 'hasSeenHelpPage',
    freshnessDismissed: 'freshnessDismissed'
};

/**
 * Item ids are `<categorySlug>-<itemIndex>`.
 * Bump this whenever items are reordered or removed inside a category,
 * so stale ticks cannot silently land on the wrong item.
 */
const SCHEMA_VERSION = 3;

/* ------------------------------------------------------------------ *
 * Tiny helpers
 * ------------------------------------------------------------------ */
const byId = (id) => document.getElementById(id);

function escapeHTML(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Only https links are ever rendered. */
function safeUrl(url) {
    if (typeof url !== 'string') return '';
    const trimmed = url.trim();
    return /^https:\/\//i.test(trimmed) ? trimmed : '';
}

function readStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

function writeStorage(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
}

function readJSON(key, fallback) {
    const raw = readStorage(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
}

function todayISO() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(value, lang) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value || '');
    return date.toLocaleDateString(lang === 'nl' ? 'nl-BE' : lang === 'fr' ? 'fr-BE' : 'en-GB');
}

function addMonths(date, months) {
    const d = new Date(date.getTime());
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() < day) d.setDate(0); // clamp e.g. 31 Jan + 1 month
    return d;
}

/* ------------------------------------------------------------------ *
 * Language
 * ------------------------------------------------------------------ */
let currentLanguage = (typeof DEFAULT_LANGUAGE !== 'undefined') ? DEFAULT_LANGUAGE : 'en';

function t(key) {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
    if (dict && dict[key] !== undefined) return dict[key];
    const fallback = TRANSLATIONS[DEFAULT_LANGUAGE];
    return (fallback && fallback[key] !== undefined) ? fallback[key] : key;
}

/** Pick the right language out of a { en, nl, fr } object. */
function pick(bundle) {
    if (bundle === null || bundle === undefined) return '';
    if (typeof bundle === 'string') return bundle;
    return bundle[currentLanguage] || bundle[DEFAULT_LANGUAGE] || '';
}

function resolveInitialLanguage() {
    const supported = SUPPORTED_LANGUAGES.map(l => l.code);
    try {
        const requested = new URLSearchParams(window.location.search).get('lang');
        if (requested && supported.includes(requested.toLowerCase())) return requested.toLowerCase();
    } catch (e) { /* ignore */ }

    const stored = readStorage(STORAGE_KEYS.language);
    if (stored && supported.includes(stored)) return stored;

    return detectBrowserLanguage();
}

function applyTranslations(root) {
    const scope = root || document;

    if (scope === document) {
        document.documentElement.setAttribute('lang', t('html.lang'));
        if (document.title !== undefined) {
            document.title = `${t(document.body.dataset.titleKey || 'app.title')} - ${t('app.tagline')}`;
        }
    }

    scope.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    scope.querySelectorAll('[data-i18n-ph]').forEach(el => { el.setAttribute('placeholder', t(el.dataset.i18nPh)); });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => { el.setAttribute('title', t(el.dataset.i18nTitle)); });
    scope.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
}

function buildLanguageSelect(select) {
    if (!select) return;
    select.innerHTML = '';
    SUPPORTED_LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.label;
        select.appendChild(option);
    });
    select.value = currentLanguage;
}

/* ------------------------------------------------------------------ *
 * Themes
 * ------------------------------------------------------------------ */
const THEMES = [
    { id: 'auto', labelKey: 'theme.auto', resolvesToSystem: true },
    { id: 'light', labelKey: 'theme.light' },
    { id: 'dark', labelKey: 'theme.dark' },
    { id: 'slate', labelKey: 'theme.slate' },
    { id: 'paper', labelKey: 'theme.paper' },
    { id: 'contrast', labelKey: 'theme.contrast' }
];

const DARK_THEMES = ['dark', 'slate'];

let themeMode = 'auto';

function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function resolveTheme(mode) {
    if (mode === 'auto') return systemPrefersDark() ? 'dark' : 'light';
    return THEMES.some(th => th.id === mode) ? mode : 'light';
}

function applyTheme() {
    const resolved = resolveTheme(themeMode);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-mode', themeMode);
    document.documentElement.style.colorScheme = DARK_THEMES.includes(resolved) ? 'dark' : 'light';
}

function setThemeMode(mode) {
    themeMode = THEMES.some(th => th.id === mode) ? mode : 'auto';
    writeStorage(STORAGE_KEYS.theme, themeMode);
    applyTheme();
}

function initTheme(selectEl) {
    themeMode = readStorage(STORAGE_KEYS.theme) || 'auto';
    if (!THEMES.some(th => th.id === themeMode)) themeMode = 'auto';
    applyTheme();

    if (selectEl) {
        selectEl.innerHTML = '';
        THEMES.forEach(th => {
            const option = document.createElement('option');
            option.value = th.id;
            option.textContent = t(th.labelKey);
            option.dataset.i18n = th.labelKey;
            selectEl.appendChild(option);
        });
        selectEl.value = themeMode;
    }

    if (window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => { if (themeMode === 'auto') applyTheme(); };
        if (typeof media.addEventListener === 'function') media.addEventListener('change', onChange);
        else if (typeof media.addListener === 'function') media.addListener(onChange);
    }
}

/* ------------------------------------------------------------------ *
 * Region
 * ------------------------------------------------------------------ */
function regionLabel(regionId) {
    const region = REGIONS.find(r => r.id === regionId);
    return region ? pick(region.label) : regionId;
}

/**
 * Returns the region block for a topic, following `sameAs` (used where a
 * rule is federal and therefore identical in all three regions).
 */
function topicForRegion(topic, regionId) {
    if (!topic || !topic.regions) return null;
    let block = topic.regions[regionId];
    if (block && block.sameAs) block = topic.regions[block.sameAs];
    return block || null;
}

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */
function defaultState() {
    return {
        schemaVersion: SCHEMA_VERSION,
        checklist: {},
        renovationNeeded: {},
        documentRequests: {},
        notes: {},
        globalNotes: '',
        currentFilter: 'all',
        propertyType: 'house',
        region: 'flanders',
        propertyInfo: {
            address: '',
            contactPerson: '',
            inspectionDate: '',
            appointmentTime: '',
            askingPrice: '',
            propertyNotes: ''
        },
        keyDates: { deedDate: '', drawdownDate: '' },
        firstCheckboxDate: null,
        lastCheckboxChangeDate: null,
        compactMode: false,
        showUncheckedOnly: false
    };
}

function plainMap(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const result = {};
    Object.keys(value).forEach(key => {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
        result[key] = value[key];
    });
    return result;
}

function normaliseState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== 'object') return base;

    const compatible = Number(raw.schemaVersion) === SCHEMA_VERSION;
    const region = REGIONS.some(r => r.id === raw.region) ? raw.region : 'flanders';

    return {
        schemaVersion: SCHEMA_VERSION,
        checklist: compatible ? plainMap(raw.checklist) : {},
        renovationNeeded: compatible ? plainMap(raw.renovationNeeded) : {},
        documentRequests: compatible ? plainMap(raw.documentRequests) : {},
        notes: compatible ? plainMap(raw.notes) : {},
        globalNotes: typeof raw.globalNotes === 'string' ? raw.globalNotes : '',
        currentFilter: typeof raw.currentFilter === 'string' ? raw.currentFilter : 'all',
        propertyType: raw.propertyType === 'apartment' ? 'apartment' : 'house',
        region: region,
        propertyInfo: Object.assign({}, base.propertyInfo, plainMap(raw.propertyInfo)),
        keyDates: Object.assign({}, base.keyDates, plainMap(raw.keyDates)),
        firstCheckboxDate: compatible ? (raw.firstCheckboxDate || null) : null,
        lastCheckboxChangeDate: compatible ? (raw.lastCheckboxChangeDate || null) : null,
        compactMode: !!raw.compactMode,
        showUncheckedOnly: !!raw.showUncheckedOnly
    };
}

/* ------------------------------------------------------------------ *
 * Checklist helpers
 * ------------------------------------------------------------------ */
function itemId(category, itemIndex) {
    return `${category.category}-${itemIndex}`;
}

/** Translated item text, falling back to the English source. */
function itemText(category, index, item) {
    const bundle = window.CHECKLIST_I18N && window.CHECKLIST_I18N[currentLanguage];
    const entry = bundle && bundle[itemId(category, index)];
    return (entry && entry.text) || item.text;
}

/** Translated "why" explanation, falling back to the English source. */
function itemWhy(category, index, item) {
    const bundle = window.CHECKLIST_I18N && window.CHECKLIST_I18N[currentLanguage];
    const entry = bundle && bundle[itemId(category, index)];
    return (entry && entry.why) || item.why || '';
}

function categoryTitle(category) {
    const key = 'cat.' + category.category;
    const translated = t(key);
    return translated === key ? category.title : translated;
}

function tagLabel(tag) {
    const key = 'tag.' + tag;
    const translated = t(key);
    return translated === key ? tag : translated;
}

function visibleCategories(state) {
    return checklistData.filter(category => {
        if (state.propertyType === 'house' && category.category === 'apartment') return false;
        if (state.propertyType === 'apartment' &&
            (category.category === 'basement' || category.category === 'attic')) return false;
        return true;
    });
}

function lookupTopic(key) {
    if (!key) return null;
    if (LEGAL_TOPICS[key]) return { kind: 'legal', key: key, topic: LEGAL_TOPICS[key] };
    if (ADVISORY_TOPICS[key]) return { kind: 'advisory', key: key, topic: ADVISORY_TOPICS[key] };
    return null;
}

/* ------------------------------------------------------------------ *
 * Share links (state lives in the URL, never on a server)
 * ------------------------------------------------------------------ */
function bytesToBase64(bytes) {
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
}

function encodeState(state) {
    const compact = {
        v: SCHEMA_VERSION,
        c: state.checklist,
        r: state.renovationNeeded,
        d: state.documentRequests,
        n: state.notes,
        g: state.globalNotes,
        f: state.currentFilter !== 'all' ? state.currentFilter : undefined,
        t: state.propertyType !== 'house' ? state.propertyType : undefined,
        x: state.region !== 'flanders' ? state.region : undefined,
        p: state.propertyInfo,
        k: state.keyDates
    };
    Object.keys(compact).forEach(key => {
        const value = compact[key];
        if (value === undefined || value === '' ||
            (value && typeof value === 'object' && Object.keys(value).length === 0)) {
            delete compact[key];
        }
    });
    return bytesToBase64(new TextEncoder().encode(JSON.stringify(compact)));
}

function decodeState(encoded) {
    try {
        const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
        const compact = JSON.parse(new TextDecoder().decode(bytes));
        return normaliseState({
            schemaVersion: compact.v,
            checklist: compact.c,
            renovationNeeded: compact.r,
            documentRequests: compact.d,
            notes: compact.n,
            globalNotes: compact.g,
            currentFilter: compact.f,
            propertyType: compact.t,
            region: compact.x,
            propertyInfo: compact.p,
            keyDates: compact.k
        });
    } catch (error) {
        console.error('Could not read the shared inspection data:', error);
        return null;
    }
}

function buildShareUrl(state, page) {
    const url = new URL(page || 'index.html', window.location.href);
    url.search = '';
    url.searchParams.set('data', encodeState(state));
    if (currentLanguage !== DEFAULT_LANGUAGE) url.searchParams.set('lang', currentLanguage);
    return url.toString();
}

/* ------------------------------------------------------------------ *
 * Saved inspection library (used by the compare page)
 * ------------------------------------------------------------------ */
function loadLibrary() {
    const list = readJSON(STORAGE_KEYS.library, []);
    return Array.isArray(list) ? list : [];
}

function saveLibrary(list) {
    return writeStorage(STORAGE_KEYS.library, JSON.stringify(list.slice(0, 30)));
}

function summariseState(state) {
    const categories = visibleCategories(state);
    let total = 0;
    let ok = 0;
    let issues = 0;
    let requests = 0;
    const issuesByTag = {};

    categories.forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            total += 1;
            const hasIssue = !!state.renovationNeeded[id];
            if (hasIssue) {
                issues += 1;
                item.tags.forEach(tag => { issuesByTag[tag] = (issuesByTag[tag] || 0) + 1; });
            } else if (state.checklist[id]) {
                ok += 1;
            }
            if (state.documentRequests[id]) requests += 1;
        });
    });

    const checked = ok + issues;
    return {
        total: total,
        ok: ok,
        issues: issues,
        requests: requests,
        checked: checked,
        percent: total ? Math.round((checked / total) * 100) : 0,
        issuesByTag: issuesByTag
    };
}

function saveToLibrary(state) {
    const list = loadLibrary();
    const label = (state.propertyInfo.address || '').trim() || t('library.untitled');
    const entry = {
        id: 'insp-' + Date.now().toString(36),
        label: label,
        savedAt: new Date().toISOString(),
        summary: summariseState(state),
        data: encodeState(state)
    };
    const existing = list.findIndex(e => e.label === label);
    if (existing >= 0) list.splice(existing, 1, entry);
    else list.unshift(entry);
    return saveLibrary(list) ? entry : null;
}

/* ------------------------------------------------------------------ *
 * Clipboard / download / toast
 * ------------------------------------------------------------------ */
async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
}

function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: (mime || 'text/plain') + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function slugify(value) {
    return String(value || 'inspection')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'inspection';
}

let toastTimer = null;
function showToast(message, tone) {
    const toast = byId('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('toast-error');
    if (tone === 'error') toast.classList.add('toast-error');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ------------------------------------------------------------------ *
 * Modals (shared behaviour: Escape, backdrop, focus trap & restore)
 * ------------------------------------------------------------------ */
let lastFocusedElement = null;

function openModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    const target = modal.querySelector('.close-btn') || modal;
    window.setTimeout(() => target.focus(), 30);
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('show');
    if (!document.querySelector('.modal.show')) document.body.classList.remove('modal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function closeTopModal() {
    const open = Array.from(document.querySelectorAll('.modal.show')).pop();
    if (open) closeModal(open);
}

function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const modal = document.querySelector('.modal.show');
    if (!modal) return;
    const focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function wireModal(modal, closeButtonId) {
    if (!modal) return;
    const closeBtn = closeButtonId ? byId(closeButtonId) : modal.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
}

/* ------------------------------------------------------------------ *
 * Content freshness
 * ------------------------------------------------------------------ */
function freshnessInfo() {
    const reviewed = new Date(LEGAL_META.lastFullReview);
    const due = new Date(LEGAL_META.nextReviewDue);
    const now = new Date();
    const monthsOld = (now.getFullYear() - reviewed.getFullYear()) * 12 + (now.getMonth() - reviewed.getMonth());
    return {
        lastReview: LEGAL_META.lastFullReview,
        nextReview: LEGAL_META.nextReviewDue,
        monthsOld: monthsOld,
        overdue: now > due
    };
}
