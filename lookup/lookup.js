/* =====================================================================
 * huiskeuring.be - OFFICIAL LOOKUPS (lookup.html)
 * =====================================================================
 * The user types the address once; this page builds links to every
 * official map and registry for the detected region. Tools that accept
 * an address in the URL get it appended; the rest get a copy button.
 * Tool data lives in LOOKUP_TOOLS in js/links.js - the file that is
 * re-verified every 6 months. Nothing here talks to a server.
 * ===================================================================== */

'use strict';

const GROUP_ORDER = ['maps', 'property', 'prices', 'water', 'soil', 'planning', 'environment', 'living'];

let region = 'flanders';
/* The full inspection state: findings typed here appear in the report. */
let appState = null;

function loadAppState() {
    appState = normaliseState(readJSON(STORAGE_KEYS.state, null));
}

function saveAppState() {
    if (!writeStorage(STORAGE_KEYS.state, JSON.stringify(appState))) {
        showToast(t('storage.failed'), 'error');
    }
}

function currentAddress() {
    return byId('lookupAddress').value.trim();
}

/** Street + municipality only - registries choke on house numbers and postcodes. */
function streetQuery(address) {
    return address.replace(/\d+[a-zA-Z]?/g, ' ').replace(/[,;]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** The municipality: everything after the 4-digit postal code, else the last word. */
function cityQuery(address) {
    const match = address.match(/\b\d{4}\b\s*[,]?\s*([A-Za-z\u00C0-\u017F' -]+)$/);
    if (match) return match[1].trim();
    const words = streetQuery(address).split(' ');
    return words.length ? words[words.length - 1] : '';
}

function toolHref(tool, address) {
    const base = safeUrl(tool.url);
    if (!tool.auto || !address) return base;
    let query = address;
    if (tool.query === 'street') query = streetQuery(address);
    if (tool.query === 'city') {
        const city = cityQuery(address);
        if (!city) return base;
        query = city + ' gemeente commune site officiel officiele website';
    }
    if (!query) return base;
    return base + encodeURIComponent(query);
}

function buildRegionSelect() {
    const select = byId('lookupRegion');
    select.innerHTML = '';
    REGIONS.forEach(r => {
        const option = document.createElement('option');
        option.value = r.id;
        option.textContent = pick(r.label);
        select.appendChild(option);
    });
    select.value = region;
}

function renderTools() {
    const address = currentAddress();
    const container = byId('lookupGroups');

    container.innerHTML = GROUP_ORDER.map(group => {
        const tools = LOOKUP_TOOLS.filter(tool => tool.group === group && tool.regions.includes(region));
        if (!tools.length) return '';
        return `
            <section class="lookup-group">
                <h2 class="lookup-group-title">${escapeHTML(t('lookup.group.' + group))}</h2>
                <div class="lookup-cards">
                    ${tools.map(tool => `
                        <article class="lookup-card">
                            <div class="lookup-card-head">
                                <i class="fas ${escapeHTML(tool.icon)}" aria-hidden="true"></i>
                                <h3>${escapeHTML(pick(tool.label))}</h3>
                                <span class="lookup-badge ${tool.access === 'login' ? 'login' : 'free'}">${escapeHTML(t(tool.access === 'login' ? 'lookup.loginBadge' : 'lookup.freeBadge'))}</span>
                                <span class="lookup-badge ${tool.auto ? 'auto' : 'manual'}">${escapeHTML(t(tool.auto ? 'lookup.auto' : 'lookup.manual'))}</span>
                            </div>
                            <p class="lookup-card-note">${escapeHTML(pick(tool.note))}</p>
                            <a class="btn btn-primary lookup-open" target="_blank" rel="noopener noreferrer"
                               href="${escapeHTML(toolHref(tool, address))}">
                                <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                ${escapeHTML(t('lookup.open'))}
                            </a>
                            <input type="text" class="lookup-finding" data-tool="${escapeHTML(tool.id)}"
                                   value="${escapeHTML(appState.lookupNotes[tool.id] || '')}"
                                   placeholder="${escapeHTML(t('lookup.finding.ph'))}"
                                   aria-label="${escapeHTML(t('lookup.findingLabel'))}">
                        </article>`).join('')}
                </div>
            </section>`;
    }).join('');
}

function legacyCopy(text) {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    helper.remove();
    return ok;
}

function copyAddress() {
    const address = currentAddress();
    if (!address) {
        byId('lookupAddress').focus();
        return;
    }
    const fallback = () => {
        if (legacyCopy(address)) showToast(t('lookup.copied'), 'success');
        else showToast(t('lookup.copyFail'), 'error');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address)
            .then(() => showToast(t('lookup.copied'), 'success'))
            .catch(fallback);
    } else {
        fallback();
    }
}

function initialAddress() {
    try {
        const fromUrl = new URLSearchParams(window.location.search).get('address');
        if (fromUrl) return fromUrl;
    } catch (e) { /* ignore */ }
    const state = readJSON(STORAGE_KEYS.state, null);
    return (state && state.propertyInfo && state.propertyInfo.address) || '';
}

function initialRegion(address) {
    try {
        const fromUrl = (new URLSearchParams(window.location.search).get('region') || '').toLowerCase();
        if (REGIONS.some(r => r.id === fromUrl)) return fromUrl;
    } catch (e) { /* ignore */ }
    const detected = regionFromPostalCode(address);
    if (detected) return detected;
    const stored = readStorage(STORAGE_KEYS.region);
    if (REGIONS.some(r => r.id === stored)) return stored;
    const state = readJSON(STORAGE_KEYS.state, null);
    if (state && REGIONS.some(r => r.id === state.region)) return state.region;
    return 'flanders';
}

function init() {
    currentLanguage = resolveInitialLanguage();
    initTheme(null);
    buildLanguageSelect(byId('languageSelect'));
    loadAppState();

    const address = initialAddress();
    byId('lookupAddress').value = address;
    region = initialRegion(address);

    applyTranslations();
    buildRegionSelect();
    renderTools();

    byId('lookupGroups').addEventListener('input', (e) => {
        const input = e.target.closest('.lookup-finding');
        if (!input) return;
        appState.lookupNotes[input.dataset.tool] = input.value;
        saveAppState();
    });

    byId('languageSelect').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        writeStorage(STORAGE_KEYS.language, currentLanguage);
        applyTranslations();
        buildRegionSelect();
        renderTools();
    });

    byId('lookupAddress').addEventListener('input', (e) => {
        const detected = regionFromPostalCode(e.target.value);
        if (detected && detected !== region) {
            region = detected;
            byId('lookupRegion').value = region;
        }
        renderTools();
    });

    byId('lookupRegion').addEventListener('change', (e) => {
        region = e.target.value;
        writeStorage(STORAGE_KEYS.region, region);
        renderTools();
    });

    byId('copyAddressBtn').addEventListener('click', copyAddress);
}

document.addEventListener('DOMContentLoaded', init);
