/* =====================================================================
 * huiskeuring.be - COMPARE PROPERTIES (compare.html)
 * =====================================================================
 * Reads the saved-inspection library from localStorage and puts up to
 * four properties side by side. Read-only: nothing is modified here
 * except which properties are selected.
 * ===================================================================== */

'use strict';

const MAX_COMPARE = 4;
let selected = [];

function decodedEntries() {
    return loadLibrary().map(entry => {
        const state = decodeState(entry.data);
        return state ? { entry: entry, state: state, summary: summariseState(state) } : null;
    }).filter(Boolean);
}

function renderPicker(entries) {
    const picker = byId('comparePicker');

    if (!entries.length) {
        picker.innerHTML = `<p class="issue-filter-empty">${escapeHTML(t('compare.empty'))}</p>`;
        return;
    }

    picker.innerHTML = entries.map(item => `
        <button type="button" class="compare-chip${selected.includes(item.entry.id) ? ' selected' : ''}"
                data-id="${escapeHTML(item.entry.id)}"
                aria-pressed="${selected.includes(item.entry.id)}">
            <i class="fas ${selected.includes(item.entry.id) ? 'fa-circle-check' : 'fa-circle'}" aria-hidden="true"></i>
            ${escapeHTML(item.entry.label)}
            <span class="compare-chip-date">${escapeHTML(formatDate(item.entry.savedAt, currentLanguage))}</span>
        </button>`).join('');

    picker.querySelectorAll('.compare-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const id = chip.dataset.id;
            if (selected.includes(id)) {
                selected = selected.filter(s => s !== id);
            } else if (selected.length < MAX_COMPARE) {
                selected.push(id);
            } else {
                showToast(t('compare.max'), 'error');
                return;
            }
            render();
        });
    });
}

function issueTags(entries) {
    const tags = new Set();
    entries.forEach(item => Object.keys(item.summary.issuesByTag).forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
}

/** Lowest value wins; returns the indexes that hold the best value. */
function bestIndexes(values, lowerIsBetter) {
    const numeric = values.map(v => (typeof v === 'number' && isFinite(v)) ? v : null).filter(v => v !== null);
    if (numeric.length < 2) return [];
    const best = lowerIsBetter ? Math.min.apply(null, numeric) : Math.max.apply(null, numeric);
    const allSame = numeric.every(v => v === best);
    if (allSame) return [];
    return values.map((v, i) => (v === best ? i : -1)).filter(i => i >= 0);
}

function row(label, values, lowerIsBetter, formatter) {
    const best = (lowerIsBetter === null || lowerIsBetter === undefined) ? [] : bestIndexes(values, lowerIsBetter);
    return `
        <tr>
            <th scope="row">${escapeHTML(label)}</th>
            ${values.map((value, index) => `
                <td class="${best.includes(index) ? 'best' : ''}">${formatter ? formatter(value) : escapeHTML(String(value))}</td>`).join('')}
        </tr>`;
}

function renderTable(entries) {
    const wrap = byId('compareTableWrap');
    const chosen = entries.filter(item => selected.includes(item.entry.id));

    if (chosen.length < 1) {
        wrap.innerHTML = '';
        return;
    }

    const tags = issueTags(chosen);

    const html = `
        <table class="compare-table">
            <thead>
                <tr>
                    <th scope="col">${escapeHTML(t('compare.metric'))}</th>
                    ${chosen.map(item => `<th scope="col">${escapeHTML(item.entry.label)}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${row(t('field.price'), chosen.map(i => i.state.propertyInfo.askingPrice || '-'), null)}
                ${row(t('section.propertyType'), chosen.map(i => i.state.propertyType === 'apartment' ? t('type.apartment') : t('type.house')), null)}
                ${row(t('field.region'), chosen.map(i => regionLabel(i.state.region)), null)}
                ${row(t('field.date'), chosen.map(i => i.state.propertyInfo.inspectionDate ? formatDate(i.state.propertyInfo.inspectionDate, currentLanguage) : '-'), null)}
                ${row(t('progress.complete'), chosen.map(i => i.summary.percent), false, (v) =>
                    `${v}%<span class="compare-bar" style="width:${Math.max(2, Math.min(100, v))}%"></span>`)}
                ${row(t('progress.issues'), chosen.map(i => i.summary.issues), true)}
                ${row(t('progress.requests'), chosen.map(i => i.summary.requests), true)}
                ${row(t('progress.checked'), chosen.map(i => i.summary.ok), false)}
                <tr><th colspan="${chosen.length + 1}" class="compare-subhead">${escapeHTML(t('compare.issuesByArea'))}</th></tr>
                ${tags.map(tag => row(tagLabel(tag), chosen.map(i => i.summary.issuesByTag[tag] || 0), true)).join('')}
                ${row(t('report.generalNotes'), chosen.map(i => i.state.globalNotes || '-'), null)}
            </tbody>
        </table>`;

    wrap.innerHTML = html;
}

function render() {
    const entries = decodedEntries();
    /* Drop selections that no longer exist. */
    selected = selected.filter(id => entries.some(e => e.entry.id === id));
    if (!selected.length) selected = entries.slice(0, Math.min(2, entries.length)).map(e => e.entry.id);
    renderPicker(entries);
    renderTable(entries);
}

function init() {
    currentLanguage = resolveInitialLanguage();
    initTheme(null);
    buildLanguageSelect(byId('languageSelect'));
    applyTranslations();
    render();

    byId('languageSelect').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        writeStorage(STORAGE_KEYS.language, currentLanguage);
        applyTranslations();
        render();
    });
    byId('printBtn').addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', init);
