/* =====================================================================
 * huiskeuring.be - READ-ONLY SHARED REPORT PAGE (report.html)
 * =====================================================================
 * Renders an inspection that is encoded in the `?data=` parameter.
 * Nothing is written to storage; the visitor cannot change anything.
 * ===================================================================== */

'use strict';

let sharedState = null;

function renderNoData() {
    byId('reportRoot').innerHTML = `
        <div class="report-container">
            <div class="report-section">
                <h3><i class="fas fa-circle-info" aria-hidden="true"></i> ${escapeHTML(t('readonly.noData'))}</h3>
                <p><a href="index.html">${escapeHTML(t('compare.backToChecklist'))}</a></p>
            </div>
        </div>`;
}

function reportList(title, icon, items, extraClass) {
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

function renderReport() {
    if (!sharedState) { renderNoData(); return; }

    const info = sharedState.propertyInfo;
    const summary = summariseState(sharedState);

    const ok = [];
    const issues = [];
    const unchecked = [];
    const notes = [];
    const documents = [];

    visibleCategories(sharedState).forEach(category => {
        category.items.forEach((item, index) => {
            const id = itemId(category, index);
            const data = {
                category: categoryTitle(category),
                text: itemText(category, index, item),
                note: sharedState.notes[id] || ''
            };
            const isOK = !!sharedState.checklist[id];
            const hasIssue = !!sharedState.renovationNeeded[id];
            if (isOK) ok.push(data);
            if (hasIssue) issues.push(data);
            if (!isOK && !hasIssue) unchecked.push(data);
            if (data.note) notes.push(data);
            if (sharedState.documentRequests[id]) documents.push(data);
        });
    });

    let html = '<div class="report-container">';

    if (info.address || info.contactPerson) {
        html += `
            <div class="report-section property-info-report">
                <h3><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${escapeHTML(t('section.propertyInfo'))}</h3>
                ${info.address ? `<p><strong>${escapeHTML(t('field.address'))}:</strong> ${escapeHTML(info.address)}</p>` : ''}
                ${info.contactPerson ? `<p><strong>${escapeHTML(t('field.contact'))}:</strong> ${escapeHTML(info.contactPerson)}</p>` : ''}
                ${info.inspectionDate ? `<p><strong>${escapeHTML(t('field.date'))}:</strong> ${escapeHTML(formatDate(info.inspectionDate, currentLanguage))}</p>` : ''}
                ${info.askingPrice ? `<p><strong>${escapeHTML(t('field.price'))}:</strong> ${escapeHTML(info.askingPrice)}</p>` : ''}
                ${info.propertyNotes ? `<p><strong>${escapeHTML(t('field.details'))}:</strong> ${escapeHTML(info.propertyNotes)}</p>` : ''}
            </div>`;
    }

    html += `
        <div class="report-section">
            <h3><i class="fas fa-info-circle" aria-hidden="true"></i> ${escapeHTML(t('report.summary'))}</h3>
            <p><strong>${escapeHTML(t('section.propertyType'))}:</strong> ${escapeHTML(sharedState.propertyType === 'apartment' ? t('type.apartment') : t('type.house'))}</p>
            <p><strong>${escapeHTML(t('field.region'))}:</strong> ${escapeHTML(regionLabel(sharedState.region))}</p>
            <p><strong>${escapeHTML(t('report.progress'))}:</strong> ${summary.checked} / ${summary.total} ${escapeHTML(t('report.itemsChecked'))} (${summary.percent}%)</p>
            <p><strong>${escapeHTML(t('progress.issues'))}:</strong> ${summary.issues} &middot;
               <strong>${escapeHTML(t('progress.requests'))}:</strong> ${summary.requests}</p>
        </div>`;

    html += reportList(t('report.documents'), 'fa-file-alt', documents);

    const findings = lookupFindings(sharedState);
    if (findings.length) {
        html += `
        <div class="report-section">
            <h3><i class="fas fa-magnifying-glass-location" aria-hidden="true"></i> ${escapeHTML(t('report.research'))} (${findings.length})</h3>
            <ul>
                ${findings.map(f => `<li><strong>${escapeHTML(pick(f.tool.label))}:</strong> ${escapeHTML(f.note)}</li>`).join('')}
            </ul>
        </div>`;
    }

    html += reportList(t('report.issues'), 'fa-exclamation-triangle', issues, 'report-issue');
    html += reportList(t('report.ok'), 'fa-check-circle', ok);
    html += reportList(t('report.unchecked'), 'fa-times-circle', unchecked);
    html += reportList(t('report.withNotes'), 'fa-sticky-note', notes);

    if (sharedState.globalNotes) {
        html += `
            <div class="report-section">
                <h3><i class="fas fa-file-alt" aria-hidden="true"></i> ${escapeHTML(t('report.generalNotes'))}</h3>
                <div class="report-note">${escapeHTML(sharedState.globalNotes)}</div>
            </div>`;
    }

    html += `<p class="report-disclaimer">${escapeHTML(t('report.disclaimer'))}</p></div>`;
    byId('reportRoot').innerHTML = html;
}

function init() {
    currentLanguage = resolveInitialLanguage();
    initTheme(null);
    buildLanguageSelect(byId('languageSelect'));
    applyTranslations();

    const encoded = new URLSearchParams(window.location.search).get('data');
    sharedState = encoded ? decodeState(encoded) : null;

    if (encoded) {
        const link = byId('openAppLink');
        const url = new URL('index.html', window.location.href);
        url.searchParams.set('data', encoded);
        link.href = url.toString();
    }

    renderReport();

    byId('languageSelect').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        writeStorage(STORAGE_KEYS.language, currentLanguage);
        applyTranslations();
        renderReport();
    });
    byId('printBtn').addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', init);
