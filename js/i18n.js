/*
 * huiskeuring.be - internationalisation (EN / NL / FR)
 * ---------------------------------------------------
 * The UI chrome, category titles, tag labels, the buying guide and the FAQ are
 * fully translated. Individual checklist item texts and their `why`
 * explanations currently live in data.js in English (with Dutch construction
 * terminology in brackets, which is what people actually see on Belgian
 * documents) and fall back gracefully. See todo.md for the translation backlog.
 *
 * Adding a language:
 *   1. add a block to TRANSLATIONS with the same keys
 *   2. add it to SUPPORTED_LANGUAGES
 *   3. add an <link rel="alternate" hreflang="..."> in index.html
 */

const SUPPORTED_LANGUAGES = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'nl', label: 'Nederlands', flag: 'NL' },
    { code: 'fr', label: 'Français', flag: 'FR' }
];

const DEFAULT_LANGUAGE = 'en';

const TRANSLATIONS = {
    en: {
        'html.lang': 'en',
        'app.title': 'huiskeuring.be Checklist',
        'app.tagline': 'The free house inspection checklist for Belgium',

        'btn.compact': 'Compact',
        'btn.reset': 'Reset All',
        'btn.report': 'Generate Report',
        'btn.share': 'Share URL',
        'btn.resources': 'Resources',
        'btn.help': 'Help',
        'btn.theme': 'Theme',
        'btn.language': 'Language',
        'btn.skip': 'Skip to checklist',
        'btn.scrollTop': 'Scroll to top',
        'btn.menu': 'Menu',
        'btn.close': 'Close',

        'theme.auto': 'System',
        'theme.light': 'Light',
        'theme.dark': 'Dark',

        'section.propertyInfo': 'Property Information',
        'field.address': 'Address',
        'field.address.ph': 'Street, Number, Postal Code, City',
        'field.contact': 'Contact Person',
        'field.contact.ph': 'Name of owner/agent',
        'field.date': 'Inspection Date',
        'field.time': 'Appointment Time',
        'field.details': 'Additional Property Details',
        'field.details.ph': 'Type of property, special features, etc.',

        'section.propertyType': 'Property Type',
        'type.house': 'House',
        'type.apartment': 'Apartment',

        'section.filterCategory': 'Filter by Category',
        'section.filterIssues': 'Filter by Toggled Issues',
        'filter.all': 'All',
        'filter.issuesHint': 'Click an issue category below to show only the items where you ticked that issue.',
        'filter.issuesEmpty': 'No issues ticked yet. Tick the ⚠ Issue box on an item and filters will appear here.',

        'progress.title': 'Inspection Progress',
        'progress.showUnchecked': 'Show Unchecked',
        'progress.showAll': 'Show All',
        'progress.collapseAll': 'Collapse All',
        'progress.expandAll': 'Expand All',
        'progress.checked': 'Checked',
        'progress.issues': 'Issues',
        'progress.requests': 'Requests',
        'progress.total': 'Total',
        'progress.complete': 'Complete',

        'item.ok': '✓ OK',
        'item.issue': '⚠ Issue',
        'item.have': '✓ Have',
        'item.request': 'Request',
        'item.requested': '✓ Requested',
        'item.addNote': 'Add note',
        'item.editNote': 'Edit note',
        'item.notes.ph': 'Add notes for this item...',
        'item.why': 'Why?',
        'item.whyTitle': 'Why this matters',
        'item.moreInfo': 'More information',

        'notes.title': 'General Notes',
        'notes.ph': 'Add general notes about the property inspection...',

        'report.title': 'Inspection Report',
        'report.print': 'Print Report',
        'report.copy': 'Copy to Clipboard',
        'report.copied': 'Copied!',
        'report.summary': 'Inspection Summary',
        'report.generated': 'Report Generated',
        'report.first': 'First Checkbox Date',
        'report.last': 'Last Checkbox Change',
        'report.progress': 'Progress',
        'report.itemsChecked': 'items checked',
        'report.documents': 'Documents to Request',
        'report.issues': 'Issues Found / Renovation Needed',
        'report.ok': 'Items Checked OK',
        'report.unchecked': 'Not Yet Checked',
        'report.withNotes': 'Items with Notes',
        'report.generalNotes': 'General Notes',
        'report.note': 'Note',
        'report.disclaimer': 'This report is a personal aid, not a certified expert survey. For a binding assessment, engage a recognised expert (architect, stability engineer, certified inspector).',

        'share.copied': 'URL Copied!',
        'share.failed': 'Could not copy the URL automatically. Copy it manually:',
        'reset.confirm': 'Are you sure you want to reset all checkboxes and notes? This cannot be undone.',

        'resources.title': 'Official Resources & Tools',
        'resources.intro': 'Verified links to Belgian government sources. Always check the official source yourself instead of relying on a listing or a seller.',

        'info.deadline': 'Deadline',
        'info.whenToCheck': 'When to check',
        'info.description': 'Description',
        'info.additional': 'Good to know',
        'info.sources': 'Official sources',
        'info.sourceFlanders': 'Flanders',
        'info.sourceWallonia': 'Wallonia',
        'info.sourceBrussels': 'Brussels',
        'info.sourceMore': 'More information',
        'info.sourceGeneric': 'Official source',

        'help.title': 'Help & Information',
        'help.tab.about': 'About',
        'help.tab.usage': 'How to Use',
        'help.tab.guide': 'Buying Guide',
        'help.tab.faq': 'FAQ',
        'help.tab.roadmap': 'Roadmap',
        'help.tab.gdpr': 'GDPR',
        'help.tab.privacy': 'Privacy',

        'guide.title': 'Buying a home in Belgium, step by step',
        'guide.intro': 'A short, realistic walkthrough. Rules differ between Flanders, Wallonia and Brussels - always verify with the official source for the region the property is in.',
        'faq.title': 'Frequently asked questions',

        'theme.slate': 'Slate',
        'theme.graphite': 'Graphite',
        'theme.paper': 'Paper',
        'theme.linen': 'Linen',
        'theme.contrast': 'High contrast',

        'field.price': 'Asking price',
        'field.region': 'Region',

        'btn.tools': 'Backup & library',
        'btn.questions': 'Questions for the seller',
        'btn.reminders': 'Deadline reminders',
        'btn.compare': 'Compare properties',
        'btn.blank': 'Print blank checklist',
        'btn.shareReport': 'Share read-only link',
        'btn.print': 'Print',
        'resources.lastCheck': 'All links were verified on {date}.',

        'footer.madeWith': 'Made with',
        'footer.by': 'by',
        'footer.moreProjects': 'More free projects at',

        'btn.lookup': 'Official lookups',
        'lookup.title': 'Official lookups',
        'lookup.intro': 'Type the address once and open every official map and registry a buyer should check: parcel, flood risk, soil, zoning, permits and more. Everything runs on the official sites themselves - this page only builds the links.',
        'lookup.addressLabel': 'Address of the property',
        'lookup.addressPh': 'Ramstraat 1, 8370 Blankenberge',
        'lookup.copy': 'Copy address',
        'lookup.copied': 'Address copied',
        'lookup.copyFail': 'Copying failed - select the address and copy it yourself',
        'lookup.manualHint': 'Most government viewers cannot receive an address through a link. For the tools marked "paste yourself", copy the address once and paste it into the search box of the tool.',
        'lookup.auto': 'address pre-filled',
        'lookup.manual': 'paste yourself',
        'lookup.open': 'Open',
        'lookup.group.maps': 'Maps & surroundings',
        'lookup.group.property': 'Parcel & ownership',
        'lookup.group.water': 'Water & flood risk',
        'lookup.group.soil': 'Soil & subsoil',
        'lookup.group.planning': 'Zoning, permits & heritage',
        'lookup.group.environment': 'Environment',

        'mode.label': 'Checklist size',
        'mode.full': 'Full checklist',
        'mode.quick': 'Quick check',
        'mode.quickHint': 'The quick check shows only the highest-impact points you can see or ask about during a short first viewing. Switch to the full checklist before you make an offer.',
        'btn.readable': 'Easy reading',
        'season.title': 'Season tip',
        'season.dismiss': 'Hide this tip',
        'season.spring': 'Spring: pollen shows how airtight windows really are, and rising damp is at its most visible after the wet winter months. You will not see how the house handles summer heat - ask about it.',
        'season.summer': 'Summer: perfect for spotting drought cracks in walls and dry gardens, and for feeling which rooms overheat. Damp problems hide in summer - look extra carefully in the cellar and plan a rainy-day revisit.',
        'season.autumn': 'Autumn: the first serious rain shows what gutters, flat roofs and cellars are worth, and falling leaves show which trees will fill the gutters every year. Check the heating now - you will be using it soon.',
        'season.winter': 'Winter: cold walls, condensation on windows and a boiler running at full load show the energy reality of the house better than any label. Drought cracks and garden condition are invisible now - ask for summer photos.',
        'btn.pdf': 'Download PDF',
        'pdf.error': 'The PDF could not be generated in this browser - use Print instead.',
        'btn.negotiation': 'Negotiation summary',
        'nego.title': 'Negotiation summary',
        'nego.intro': 'The issues you marked, with a deliberately wide indicative cost band per area - counted once per area, because three roof issues are still one roof job. Use it to decide your offer, not as a quotation.',
        'nego.area': 'Area',
        'nego.issues': 'Issues',
        'nego.band': 'Indicative cost (EUR)',
        'nego.total': 'Indicative total',
        'nego.asking': 'Asking price',
        'nego.points': 'Points to raise with the seller',
        'nego.point1': 'Ask for the missing certificates before signing anything - they are the seller\'s legal duty, not a favour.',
        'nego.point2': 'Get real quotations for the two biggest issues before the compromis; estimates convince nobody.',
        'nego.point3': 'Every deadline that transfers to you (renovation obligation, electrical re-inspection) is part of the price.',
        'nego.disclaimer': 'These bands are rough, VAT-included orders of magnitude for an average Belgian home, reviewed half-yearly. Real prices depend on access, finish level and region - only a written quotation counts.',
        'nego.empty': 'Nothing is marked as an issue yet. Tick "issue" on the points that worry you, then come back here.',
        'second.title': 'Second opinion',
        'second.hint': 'Viewed the same property with someone else? Paste their share link and see where your findings differ.',
        'second.placeholder': 'Paste the other person\'s share link here',
        'second.btn': 'Compare the two',
        'second.invalid': 'That link could not be read - it must be a share link from this tool.',
        'second.agree': 'No differences on the points you both checked.',
        'second.diffs': 'Points where you differ',
        'second.you': 'You',
        'second.them': 'The other person',
        'second.ok': 'fine',
        'second.issue': 'an issue',
        'second.open': 'not checked',
        'import.title': 'Paste from a listing',
        'import.hint': 'Copy the full text of an Immoweb/Immovlan listing and paste it here - the address, asking price and EPC label are taken over automatically. Nothing is sent anywhere.',
        'import.placeholder': 'Paste the listing text here',
        'import.btn': 'Read the listing',
        'import.done': 'Taken from the listing:',
        'import.nothing': 'Nothing recognised. Paste the text of the listing itself, not the web address.',

        'status.verified': 'verified',
        'status.unverified': 'not verified',
        'status.notApplicable': 'does not apply here',

        'info.whatToLookFor': 'What to look for',
        'info.whyItMatters': 'Why it matters',
        'info.perRegion': 'The rule per region',
        'info.yourRegion': 'your region',
        'info.unverifiedWarning': 'We could not confirm this on an official page for this region. Treat it as a prompt to ask, not as a fact - use the source link or ask your notary in writing.',
        'info.lastVerified': 'Last verified',

        'resources.regionHint': 'Showing the national links plus the ones that apply to {region}.',
        'region.changed': 'Region set to {region}. Legal deadlines and links updated.',
        'region.detected': 'Postal code recognised: region set to {region}.',

        'storage.failed': 'Could not save to this browser. Your changes are only in this tab - export a backup.',
        'report.linkCopied': 'Read-only report link copied.',

        'questions.title': 'Questions for the seller or agent',
        'questions.intro': 'Take this with you or send it in advance. It is not the same as your issue list: every finding is turned into a question with a follow-up, so you get facts, dates and documents instead of reassurance.',
        'questions.standard': 'Ask at every viewing',
        'questions.documents': 'Documents to request',
        'questions.issues': 'About the problems you found',
        'questions.legal': 'Legal deadlines to clarify',
        'questions.docTemplate': 'Can you send me "{item}" before the compromis, and who requested it?',
        'questions.issueTemplate': 'About "{item}": what exactly is the situation, when did it start, what has already been done about it, and is there an invoice or a report?',
        'questions.legalTemplate': 'Regarding {topic}: {deadline} - does this apply to this property, and can you show me the document?',

        'q.std.why': 'Why are you selling, and how long has the property been on the market?',
        'q.std.howLong': 'How long have you owned it, and did you live here yourself?',
        'q.std.works': 'Which works were carried out, in which year, and by which contractor?',
        'q.std.invoices': 'Can I see the invoices, permits and warranties for those works?',
        'q.std.neighbours': 'Are there any disputes with neighbours, or anything pending about boundaries, trees or a shared wall?',
        'q.std.bills': 'What did energy and water cost over the last two full years?',
        'q.std.offers': 'Has an offer already been made or refused, and is the price negotiable?',
        'q.std.included': 'What exactly is included in the sale, and what will be removed?',
        'q.std.roofAge': 'How old is the roof covering, and when was the roof structure last inspected?',
        'q.std.boilerAge': 'How old is the boiler, when was it last serviced, and may I see the certificates?',
        'q.std.damp': 'Has there ever been damp, a leak or water in the cellar, and what was done about it?',
        'q.std.garden': 'Where exactly is the plot boundary, and who owns and maintains the fences?',
        'q.std.charges': 'What are the monthly common charges, and what do they include?',
        'q.std.assembly': 'May I read the minutes of the last three general assemblies?',
        'q.std.reserve': 'How much is in the reserve fund, and are there any arrears?',
        'q.std.plannedWorks': 'Which major works have been voted, estimated or postponed, and who pays for them?',

        'reminders.title': 'Deadline reminders',
        'reminders.intro': 'Fill in the two dates below and download a calendar file. Your calendar will then warn you well before each legal deadline - these are the dates people forget and cannot recover.',
        'reminders.deedDate': 'Date of the notarial deed',
        'reminders.drawdownDate': 'First drawdown of the mortgage',
        'reminders.empty': 'Fill in a date above to generate reminders for your region.',
        'reminders.overdue': 'This deadline has already passed',
        'reminders.downloaded': 'Calendar file downloaded. Open it to add the reminders.',
        'reminders.download': 'Download calendar file (.ics)',
        'reminders.source': 'Created with huiskeuring.be - always verify with the official source.',

        'tools.title': 'Backup, import & saved properties',
        'tools.intro': 'Everything stays on your device. Export a file to keep a real backup, or save the inspection here so you can compare properties side by side.',
        'tools.export': 'Export as JSON',
        'tools.import': 'Import a JSON file',
        'tools.exported': 'Backup file downloaded.',
        'tools.imported': 'Inspection imported.',
        'tools.importFailed': 'That file could not be read as a huiskeuring.be backup.',
        'tools.popupBlocked': 'Your browser blocked the print window. Allow pop-ups for this site.',

        'library.title': 'Saved properties',
        'library.save': 'Save this property',
        'library.empty': 'Nothing saved yet. Save an inspection to compare it with another property later.',
        'library.load': 'Open',
        'library.delete': 'Delete',
        'library.saved': 'Property saved to your library.',
        'library.loaded': 'Property loaded.',
        'library.untitled': 'Unnamed property',

        'blank.title': 'House inspection checklist - blank',
        'blank.item': 'What to check',
        'blank.notes': 'Notes',
        'blank.footer': 'huiskeuring.be - free house inspection checklist for Belgium. This is an aid, not a certified survey.',

        'freshness.ok': 'Legal information last verified on {date}. Next review due {next}.',
        'freshness.overdue': 'The legal information is due for review (last checked {date}). Always confirm a deadline with the official source.',
        'freshness.dismiss': 'Dismiss',

        'compare.title': 'Compare properties',
        'compare.intro': 'Save an inspection from the checklist page, then compare up to four properties here.',
        'compare.empty': 'No saved properties yet. Open the checklist, fill it in and use "Save this property".',
        'compare.select': 'Choose properties to compare',
        'compare.metric': 'What',
        'compare.backToChecklist': 'Back to the checklist',
        'compare.issuesByArea': 'Issues per area',
        'compare.bestOf': 'Fewest issues',
        'compare.max': 'You can compare up to four properties at a time.',

        'readonly.title': 'Inspection report',
        'readonly.badge': 'Read-only report',
        'readonly.intro': 'This is a shared, read-only copy of an inspection. Nothing you do here is saved.',
        'readonly.openApp': 'Open in the checklist',
        'readonly.noData': 'This link does not contain any inspection data.',

        'cat.documents': 'Documents & Certificates (Belgium)',
        'cat.asbestos': 'Asbestos Detection (Asbest)',
        'cat.exterior': 'Exterior Inspection',
        'cat.kitchen': 'Kitchen Inspection (Keuken)',
        'cat.bathroom': 'Bathroom Inspection (Badkamer)',
        'cat.bedroom': 'Bedroom Inspection (Slaapkamer)',
        'cat.livingroom': 'Living Room Inspection (Woonkamer)',
        'cat.basement': 'Basement / Cellar Inspection (Kelder)',
        'cat.attic': 'Attic / Roof Space Inspection (Zolder)',
        'cat.plumbing': 'Water & Plumbing Systems (Sanitair)',
        'cat.electrical': 'Electrical Systems (Elektriciteit)',
        'cat.structural': 'Structural Elements (Structuur)',
        'cat.hvac': 'Heating & Ventilation (Verwarming & Ventilatie)',
        'cat.renovation': 'Renovation Potential (Renovatie)',
        'cat.apartment': 'Apartment Specific (Appartement)',

        'tag.documents': 'Documents',
        'tag.asbestos': 'Asbestos',
        'tag.exterior': 'Exterior',
        'tag.kitchen': 'Kitchen',
        'tag.bathroom': 'Bathroom',
        'tag.bedroom': 'Bedroom',
        'tag.livingroom': 'Living Room',
        'tag.basement': 'Basement',
        'tag.attic': 'Attic',
        'tag.plumbing': 'Water',
        'tag.electrical': 'Electrical',
        'tag.structural': 'Structural',
        'tag.hvac': 'Heating',
        'tag.renovation': 'Renovation',
        'tag.apartment': 'Apartment'
    },

    nl: {
        'html.lang': 'nl',
        'app.title': 'huiskeuring.be Checklist',
        'app.tagline': 'De gratis keuringschecklist voor woningen in België',

        'btn.compact': 'Compact',
        'btn.reset': 'Alles wissen',
        'btn.report': 'Rapport maken',
        'btn.share': 'Deel-URL',
        'btn.resources': 'Bronnen',
        'btn.help': 'Help',
        'btn.theme': 'Thema',
        'btn.language': 'Taal',
        'btn.skip': 'Ga naar de checklist',
        'btn.scrollTop': 'Naar boven',
        'btn.menu': 'Menu',
        'btn.close': 'Sluiten',

        'theme.auto': 'Systeem',
        'theme.light': 'Licht',
        'theme.dark': 'Donker',

        'section.propertyInfo': 'Gegevens van de woning',
        'field.address': 'Adres',
        'field.address.ph': 'Straat, nummer, postcode, gemeente',
        'field.contact': 'Contactpersoon',
        'field.contact.ph': 'Naam eigenaar/makelaar',
        'field.date': 'Datum bezoek',
        'field.time': 'Uur afspraak',
        'field.details': 'Extra gegevens over de woning',
        'field.details.ph': 'Type woning, bijzonderheden, ...',

        'section.propertyType': 'Type woning',
        'type.house': 'Huis',
        'type.apartment': 'Appartement',

        'section.filterCategory': 'Filter op categorie',
        'section.filterIssues': 'Filter op aangeduide problemen',
        'filter.all': 'Alles',
        'filter.issuesHint': 'Klik hieronder op een categorie om enkel de items te tonen waarbij u een probleem aanvinkte.',
        'filter.issuesEmpty': 'Nog geen problemen aangeduid. Vink ⚠ Probleem aan bij een item en de filters verschijnen hier.',

        'progress.title': 'Voortgang keuring',
        'progress.showUnchecked': 'Toon niet-nagekeken',
        'progress.showAll': 'Toon alles',
        'progress.collapseAll': 'Alles inklappen',
        'progress.expandAll': 'Alles uitklappen',
        'progress.checked': 'Nagekeken',
        'progress.issues': 'Problemen',
        'progress.requests': 'Op te vragen',
        'progress.total': 'Totaal',
        'progress.complete': 'Voltooid',

        'item.ok': '✓ OK',
        'item.issue': '⚠ Probleem',
        'item.have': '✓ Heb ik',
        'item.request': 'Opvragen',
        'item.requested': '✓ Opgevraagd',
        'item.addNote': 'Notitie toevoegen',
        'item.editNote': 'Notitie bewerken',
        'item.notes.ph': 'Notities bij dit item...',
        'item.why': 'Waarom?',
        'item.whyTitle': 'Waarom dit belangrijk is',
        'item.moreInfo': 'Meer informatie',

        'notes.title': 'Algemene notities',
        'notes.ph': 'Algemene notities over het bezoek...',

        'report.title': 'Keuringsrapport',
        'report.print': 'Rapport afdrukken',
        'report.copy': 'Kopiëren',
        'report.copied': 'Gekopieerd!',
        'report.summary': 'Samenvatting',
        'report.generated': 'Rapport gemaakt op',
        'report.first': 'Eerste aanvinking',
        'report.last': 'Laatste wijziging',
        'report.progress': 'Voortgang',
        'report.itemsChecked': 'items nagekeken',
        'report.documents': 'Op te vragen documenten',
        'report.issues': 'Gevonden problemen / renovatie nodig',
        'report.ok': 'Items in orde',
        'report.unchecked': 'Nog niet nagekeken',
        'report.withNotes': 'Items met notities',
        'report.generalNotes': 'Algemene notities',
        'report.note': 'Notitie',
        'report.disclaimer': 'Dit rapport is een persoonlijk hulpmiddel, geen keuringsverslag van een erkende expert. Schakel voor een bindend oordeel een architect, stabiliteitsingenieur of erkende keurder in.',

        'share.copied': 'URL gekopieerd!',
        'share.failed': 'De URL kon niet automatisch gekopieerd worden. Kopieer ze manueel:',
        'reset.confirm': 'Weet u zeker dat u alle vinkjes en notities wilt wissen? Dit kan niet ongedaan gemaakt worden.',

        'resources.title': 'Officiële bronnen & hulpmiddelen',
        'resources.intro': 'Geverifieerde links naar Belgische overheidsbronnen. Controleer altijd zelf de officiële bron in plaats van te vertrouwen op een advertentie of een verkoper.',

        'info.deadline': 'Termijn',
        'info.whenToCheck': 'Wanneer controleren',
        'info.description': 'Beschrijving',
        'info.additional': 'Goed om weten',
        'info.sources': 'Officiële bronnen',
        'info.sourceFlanders': 'Vlaanderen',
        'info.sourceWallonia': 'Wallonië',
        'info.sourceBrussels': 'Brussel',
        'info.sourceMore': 'Meer informatie',
        'info.sourceGeneric': 'Officiële bron',

        'help.title': 'Help & informatie',
        'help.tab.about': 'Over',
        'help.tab.usage': 'Gebruik',
        'help.tab.guide': 'Koopgids',
        'help.tab.faq': 'FAQ',
        'help.tab.roadmap': 'Roadmap',
        'help.tab.gdpr': 'GDPR',
        'help.tab.privacy': 'Privacy',

        'guide.title': 'Een woning kopen in België, stap voor stap',
        'guide.intro': 'Een korte, realistische leidraad. De regels verschillen tussen Vlaanderen, Wallonië en Brussel - controleer altijd de officiële bron van het gewest waar de woning ligt.',
        'faq.title': 'Veelgestelde vragen',

        'theme.slate': 'Leisteen',
        'theme.graphite': 'Grafiet',
        'theme.paper': 'Papier',
        'theme.linen': 'Linnen',
        'theme.contrast': 'Hoog contrast',

        'field.price': 'Vraagprijs',
        'field.region': 'Gewest',

        'btn.tools': 'Back-up & bibliotheek',
        'btn.questions': 'Vragen voor de verkoper',
        'btn.reminders': 'Herinneringen',
        'btn.compare': 'Woningen vergelijken',
        'btn.blank': 'Blanco checklist afdrukken',
        'btn.shareReport': 'Alleen-lezen link delen',
        'btn.print': 'Afdrukken',
        'resources.lastCheck': 'Alle links werden gecontroleerd op {date}.',

        'footer.madeWith': 'Gemaakt met',
        'footer.by': 'door',
        'footer.moreProjects': 'Meer gratis projecten op',

        'btn.lookup': 'Officiële opzoekingen',
        'lookup.title': 'Officiële opzoekingen',
        'lookup.intro': 'Typ het adres één keer en open elke officiële kaart en databank die een koper hoort na te kijken: perceel, overstromingsrisico, bodem, bestemming, vergunningen en meer. Alles draait op de officiële sites zelf - deze pagina bouwt alleen de links.',
        'lookup.addressLabel': 'Adres van de woning',
        'lookup.addressPh': 'Ramstraat 1, 8370 Blankenberge',
        'lookup.copy': 'Adres kopiëren',
        'lookup.copied': 'Adres gekopieerd',
        'lookup.copyFail': 'Kopiëren mislukt - selecteer het adres en kopieer het zelf',
        'lookup.manualHint': 'De meeste overheidsloketten kunnen geen adres via een link ontvangen. Kopieer voor de tools met "zelf plakken" het adres één keer en plak het in het zoekvak van de tool.',
        'lookup.auto': 'adres vooraf ingevuld',
        'lookup.manual': 'zelf plakken',
        'lookup.open': 'Openen',
        'lookup.group.maps': 'Kaarten & omgeving',
        'lookup.group.property': 'Perceel & eigendom',
        'lookup.group.water': 'Water & overstromingsrisico',
        'lookup.group.soil': 'Bodem & ondergrond',
        'lookup.group.planning': 'Bestemming, vergunningen & erfgoed',
        'lookup.group.environment': 'Milieu',

        'mode.label': 'Omvang van de checklist',
        'mode.full': 'Volledige checklist',
        'mode.quick': 'Snelle check',
        'mode.quickHint': 'De snelle check toont enkel de punten met de grootste impact die u tijdens een korte eerste bezichtiging kunt zien of vragen. Schakel over naar de volledige checklist vóór u een bod doet.',
        'btn.readable': 'Rustig lezen',
        'season.title': 'Seizoenstip',
        'season.dismiss': 'Deze tip verbergen',
        'season.spring': 'Lente: stuifmeel verraadt hoe luchtdicht ramen echt zijn, en opstijgend vocht is het best zichtbaar na de natte wintermaanden. Hoe het huis met zomerhitte omgaat ziet u nu niet - vraag ernaar.',
        'season.summer': 'Zomer: ideaal om droogtescheuren in muren en een uitgedroogde tuin te zien, en om te voelen welke kamers oververhitten. Vochtproblemen verstoppen zich in de zomer - kijk extra goed in de kelder en plan een tweede bezoek op een regendag.',
        'season.autumn': 'Herfst: de eerste echte regen toont wat goten, platte daken en kelders waard zijn, en vallende bladeren tonen welke bomen elk jaar de goten vullen. Test nu de verwarming - u gaat ze binnenkort nodig hebben.',
        'season.winter': 'Winter: koude muren, condens op de ramen en een ketel op volle kracht tonen de energierealiteit van het huis beter dan elk label. Droogtescheuren en de staat van de tuin ziet u nu niet - vraag zomerfoto\'s.',
        'btn.pdf': 'PDF downloaden',
        'pdf.error': 'De PDF kon in deze browser niet gemaakt worden - gebruik Afdrukken.',
        'btn.negotiation': 'Onderhandelingsoverzicht',
        'nego.title': 'Onderhandelingsoverzicht',
        'nego.intro': 'De problemen die u aanvinkte, met per domein een bewust brede indicatieve kostenvork - één keer per domein geteld, want drie dakproblemen blijven één dakwerk. Gebruik dit om uw bod te bepalen, niet als offerte.',
        'nego.area': 'Domein',
        'nego.issues': 'Problemen',
        'nego.band': 'Indicatieve kost (EUR)',
        'nego.total': 'Indicatief totaal',
        'nego.asking': 'Vraagprijs',
        'nego.points': 'Punten voor het gesprek met de verkoper',
        'nego.point1': 'Vraag de ontbrekende attesten op vóór u iets tekent - ze zijn een wettelijke plicht van de verkoper, geen gunst.',
        'nego.point2': 'Laat voor de twee grootste problemen echte offertes maken vóór de compromis; schattingen overtuigen niemand.',
        'nego.point3': 'Elke termijn die op u overgaat (renovatieverplichting, herkeuring elektriciteit) is een deel van de prijs.',
        'nego.disclaimer': 'Deze vorken zijn ruwe grootteordes incl. btw voor een gemiddelde Belgische woning, halfjaarlijks herbekeken. Echte prijzen hangen af van bereikbaarheid, afwerkingsniveau en regio - alleen een schriftelijke offerte telt.',
        'nego.empty': 'Er is nog niets als probleem aangevinkt. Vink "probleem" aan bij de punten die u zorgen baren en kom dan terug.',
        'second.title': 'Tweede mening',
        'second.hint': 'Samen met iemand anders dezelfde woning bezocht? Plak hier zijn of haar deellink en zie waar jullie bevindingen verschillen.',
        'second.placeholder': 'Plak hier de deellink van de andere persoon',
        'second.btn': 'Vergelijk de twee',
        'second.invalid': 'Die link kon niet gelezen worden - het moet een deellink van deze tool zijn.',
        'second.agree': 'Geen verschillen op de punten die jullie allebei bekeken.',
        'second.diffs': 'Punten waarop jullie verschillen',
        'second.you': 'U',
        'second.them': 'De andere persoon',
        'second.ok': 'in orde',
        'second.issue': 'een probleem',
        'second.open': 'niet bekeken',
        'import.title': 'Plakken uit een zoekertje',
        'import.hint': 'Kopieer de volledige tekst van een Immoweb/Immovlan-zoekertje en plak ze hier - adres, vraagprijs en EPC-label worden automatisch overgenomen. Er wordt niets verstuurd.',
        'import.placeholder': 'Plak hier de tekst van het zoekertje',
        'import.btn': 'Zoekertje lezen',
        'import.done': 'Overgenomen uit het zoekertje:',
        'import.nothing': 'Niets herkend. Plak de tekst van het zoekertje zelf, niet het webadres.',

        'status.verified': 'geverifieerd',
        'status.unverified': 'niet geverifieerd',
        'status.notApplicable': 'niet van toepassing hier',

        'info.whatToLookFor': 'Waar u op let',
        'info.whyItMatters': 'Waarom dit belangrijk is',
        'info.perRegion': 'De regel per gewest',
        'info.yourRegion': 'uw gewest',
        'info.unverifiedWarning': 'We konden dit voor dit gewest niet bevestigen op een officiële pagina. Beschouw het als een reden om het te vragen, niet als een feit - gebruik de bronlink of vraag het schriftelijk aan uw notaris.',
        'info.lastVerified': 'Laatst geverifieerd',

        'resources.regionHint': 'Toont de nationale links plus die voor {region}.',
        'region.changed': 'Gewest ingesteld op {region}. Wettelijke termijnen en links bijgewerkt.',
        'region.detected': 'Postcode herkend: gewest ingesteld op {region}.',

        'storage.failed': 'Kon niet opslaan in deze browser. Uw wijzigingen staan enkel in dit tabblad - exporteer een back-up.',
        'report.linkCopied': 'Link naar het alleen-lezen rapport gekopieerd.',

        'questions.title': 'Vragen voor de verkoper of makelaar',
        'questions.intro': 'Neem dit mee of stuur het vooraf door. Het is niet hetzelfde als uw lijst met problemen: elke vaststelling wordt een vraag met een vervolgvraag, zodat u feiten, datums en documenten krijgt in plaats van geruststelling.',
        'questions.standard': 'Vraag dit bij elk bezoek',
        'questions.documents': 'Op te vragen documenten',
        'questions.issues': 'Over de problemen die u vond',
        'questions.legal': 'Wettelijke termijnen om uit te klaren',
        'questions.docTemplate': 'Kunt u mij "{item}" bezorgen vóór de compromis, en wie heeft het aangevraagd?',
        'questions.issueTemplate': 'Over "{item}": wat is precies de situatie, sinds wanneer, wat is er al aan gedaan, en is er een factuur of verslag van?',
        'questions.legalTemplate': 'In verband met {topic}: {deadline} - geldt dit voor deze woning, en kunt u het document tonen?',

        'q.std.why': 'Waarom verkoopt u, en hoe lang staat het pand te koop?',
        'q.std.howLong': 'Hoe lang bent u eigenaar, en hebt u er zelf gewoond?',
        'q.std.works': 'Welke werken zijn uitgevoerd, in welk jaar, en door welke aannemer?',
        'q.std.invoices': 'Mag ik de facturen, vergunningen en garanties van die werken zien?',
        'q.std.neighbours': 'Zijn er geschillen met buren, of iets hangende rond perceelsgrenzen, bomen of een gemene muur?',
        'q.std.bills': 'Wat kostten energie en water in de laatste twee volledige jaren?',
        'q.std.offers': 'Is er al een bod gedaan of geweigerd, en is de prijs bespreekbaar?',
        'q.std.included': 'Wat is precies inbegrepen in de verkoop, en wat wordt meegenomen?',
        'q.std.roofAge': 'Hoe oud is de dakbedekking, en wanneer is de dakstructuur laatst nagekeken?',
        'q.std.boilerAge': 'Hoe oud is de ketel, wanneer is hij laatst onderhouden, en mag ik de attesten zien?',
        'q.std.damp': 'Is er ooit vocht, een lek of water in de kelder geweest, en wat is eraan gedaan?',
        'q.std.garden': 'Waar loopt de perceelsgrens precies, en wie is eigenaar van en onderhoudt de afsluitingen?',
        'q.std.charges': 'Hoeveel bedragen de maandelijkse gemeenschappelijke kosten, en wat zit erin?',
        'q.std.assembly': 'Mag ik de verslagen van de laatste drie algemene vergaderingen lezen?',
        'q.std.reserve': 'Hoeveel zit er in het reservefonds, en zijn er achterstallen?',
        'q.std.plannedWorks': 'Welke grote werken zijn gestemd, geraamd of uitgesteld, en wie betaalt die?',

        'reminders.title': 'Herinneringen voor termijnen',
        'reminders.intro': 'Vul de twee datums hieronder in en download een agendabestand. Uw agenda waarschuwt u dan ruim vóór elke wettelijke termijn - dit zijn net de datums die mensen vergeten en niet meer kunnen inhalen.',
        'reminders.deedDate': 'Datum van de notariële akte',
        'reminders.drawdownDate': 'Eerste kapitaalsopname van de lening',
        'reminders.empty': 'Vul hierboven een datum in om herinneringen voor uw gewest te genereren.',
        'reminders.overdue': 'Deze termijn is al verstreken',
        'reminders.downloaded': 'Agendabestand gedownload. Open het om de herinneringen toe te voegen.',
        'reminders.download': 'Agendabestand downloaden (.ics)',
        'reminders.source': 'Gemaakt met huiskeuring.be - controleer altijd de officiële bron.',

        'tools.title': 'Back-up, import & bewaarde woningen',
        'tools.intro': 'Alles blijft op uw toestel. Exporteer een bestand voor een echte back-up, of bewaar de keuring hier om woningen naast elkaar te vergelijken.',
        'tools.export': 'Exporteren als JSON',
        'tools.import': 'Een JSON-bestand importeren',
        'tools.exported': 'Back-upbestand gedownload.',
        'tools.imported': 'Keuring geïmporteerd.',
        'tools.importFailed': 'Dat bestand kon niet gelezen worden als een huiskeuring.be back-up.',
        'tools.popupBlocked': 'Uw browser blokkeerde het afdrukvenster. Sta pop-ups toe voor deze site.',

        'library.title': 'Bewaarde woningen',
        'library.save': 'Deze woning bewaren',
        'library.empty': 'Nog niets bewaard. Bewaar een keuring om ze later met een andere woning te vergelijken.',
        'library.load': 'Openen',
        'library.delete': 'Verwijderen',
        'library.saved': 'Woning bewaard in uw bibliotheek.',
        'library.loaded': 'Woning geladen.',
        'library.untitled': 'Naamloze woning',

        'blank.title': 'Keuringschecklist woning - blanco',
        'blank.item': 'Wat controleren',
        'blank.notes': 'Notities',
        'blank.footer': 'huiskeuring.be - gratis keuringschecklist voor woningen in België. Dit is een hulpmiddel, geen keuringsverslag van een erkende expert.',

        'freshness.ok': 'Juridische informatie laatst geverifieerd op {date}. Volgende controle voorzien op {next}.',
        'freshness.overdue': 'De juridische informatie is toe aan een controle (laatst nagekeken op {date}). Bevestig een termijn altijd bij de officiële bron.',
        'freshness.dismiss': 'Sluiten',

        'compare.title': 'Woningen vergelijken',
        'compare.intro': 'Bewaar een keuring op de checklistpagina en vergelijk hier tot vier woningen.',
        'compare.empty': 'Nog geen bewaarde woningen. Open de checklist, vul ze in en gebruik "Deze woning bewaren".',
        'compare.select': 'Kies woningen om te vergelijken',
        'compare.metric': 'Wat',
        'compare.backToChecklist': 'Terug naar de checklist',
        'compare.issuesByArea': 'Problemen per domein',
        'compare.bestOf': 'Minste problemen',
        'compare.max': 'U kunt maximaal vier woningen tegelijk vergelijken.',

        'readonly.title': 'Keuringsrapport',
        'readonly.badge': 'Alleen-lezen rapport',
        'readonly.intro': 'Dit is een gedeelde, alleen-lezen kopie van een keuring. Niets wat u hier doet wordt bewaard.',
        'readonly.openApp': 'Openen in de checklist',
        'readonly.noData': 'Deze link bevat geen keuringsgegevens.',

        'cat.documents': 'Documenten & attesten (België)',
        'cat.asbestos': 'Asbest opsporen',
        'cat.exterior': 'Buitenkant',
        'cat.kitchen': 'Keuken',
        'cat.bathroom': 'Badkamer',
        'cat.bedroom': 'Slaapkamer',
        'cat.livingroom': 'Woonkamer',
        'cat.basement': 'Kelder',
        'cat.attic': 'Zolder & dakstructuur',
        'cat.plumbing': 'Water & sanitair',
        'cat.electrical': 'Elektriciteit',
        'cat.structural': 'Structuur & stabiliteit',
        'cat.hvac': 'Verwarming & ventilatie',
        'cat.renovation': 'Renovatiepotentieel',
        'cat.apartment': 'Specifiek voor appartementen',

        'tag.documents': 'Documenten',
        'tag.asbestos': 'Asbest',
        'tag.exterior': 'Buiten',
        'tag.kitchen': 'Keuken',
        'tag.bathroom': 'Badkamer',
        'tag.bedroom': 'Slaapkamer',
        'tag.livingroom': 'Woonkamer',
        'tag.basement': 'Kelder',
        'tag.attic': 'Zolder',
        'tag.plumbing': 'Water',
        'tag.electrical': 'Elektriciteit',
        'tag.structural': 'Structuur',
        'tag.hvac': 'Verwarming',
        'tag.renovation': 'Renovatie',
        'tag.apartment': 'Appartement'
    },

    fr: {
        'html.lang': 'fr',
        'app.title': 'Check-list huiskeuring.be',
        'app.tagline': 'La check-list gratuite pour visiter une maison en Belgique',

        'btn.compact': 'Compact',
        'btn.reset': 'Tout effacer',
        'btn.report': 'Générer le rapport',
        'btn.share': 'Lien de partage',
        'btn.resources': 'Ressources',
        'btn.help': 'Aide',
        'btn.theme': 'Thème',
        'btn.language': 'Langue',
        'btn.skip': 'Aller à la check-list',
        'btn.scrollTop': 'Haut de page',
        'btn.menu': 'Menu',
        'btn.close': 'Fermer',

        'theme.auto': 'Système',
        'theme.light': 'Clair',
        'theme.dark': 'Sombre',

        'section.propertyInfo': 'Informations sur le bien',
        'field.address': 'Adresse',
        'field.address.ph': 'Rue, numéro, code postal, commune',
        'field.contact': 'Personne de contact',
        'field.contact.ph': 'Nom du propriétaire/agent',
        'field.date': 'Date de la visite',
        'field.time': 'Heure du rendez-vous',
        'field.details': 'Détails supplémentaires',
        'field.details.ph': 'Type de bien, particularités, ...',

        'section.propertyType': 'Type de bien',
        'type.house': 'Maison',
        'type.apartment': 'Appartement',

        'section.filterCategory': 'Filtrer par catégorie',
        'section.filterIssues': 'Filtrer par problèmes cochés',
        'filter.all': 'Tout',
        'filter.issuesHint': 'Cliquez sur une catégorie ci-dessous pour n\'afficher que les points où vous avez coché un problème.',
        'filter.issuesEmpty': 'Aucun problème coché. Cochez ⚠ Problème sur un point et les filtres apparaîtront ici.',

        'progress.title': 'Progression de la visite',
        'progress.showUnchecked': 'Afficher non vérifiés',
        'progress.showAll': 'Tout afficher',
        'progress.collapseAll': 'Tout replier',
        'progress.expandAll': 'Tout déplier',
        'progress.checked': 'Vérifiés',
        'progress.issues': 'Problèmes',
        'progress.requests': 'À demander',
        'progress.total': 'Total',
        'progress.complete': 'Complété',

        'item.ok': '✓ OK',
        'item.issue': '⚠ Problème',
        'item.have': '✓ Reçu',
        'item.request': 'Demander',
        'item.requested': '✓ Demandé',
        'item.addNote': 'Ajouter une note',
        'item.editNote': 'Modifier la note',
        'item.notes.ph': 'Notes pour ce point...',
        'item.why': 'Pourquoi ?',
        'item.whyTitle': 'Pourquoi c\'est important',
        'item.moreInfo': 'Plus d\'informations',

        'notes.title': 'Notes générales',
        'notes.ph': 'Notes générales sur la visite...',

        'report.title': 'Rapport de visite',
        'report.print': 'Imprimer le rapport',
        'report.copy': 'Copier',
        'report.copied': 'Copié !',
        'report.summary': 'Résumé',
        'report.generated': 'Rapport généré le',
        'report.first': 'Première coche',
        'report.last': 'Dernière modification',
        'report.progress': 'Progression',
        'report.itemsChecked': 'points vérifiés',
        'report.documents': 'Documents à demander',
        'report.issues': 'Problèmes constatés / rénovation nécessaire',
        'report.ok': 'Points en ordre',
        'report.unchecked': 'Pas encore vérifiés',
        'report.withNotes': 'Points avec notes',
        'report.generalNotes': 'Notes générales',
        'report.note': 'Note',
        'report.disclaimer': 'Ce rapport est une aide personnelle, pas une expertise certifiée. Pour un avis contraignant, faites appel à un architecte, un ingénieur en stabilité ou un expert agréé.',

        'share.copied': 'Lien copié !',
        'share.failed': 'Impossible de copier le lien automatiquement. Copiez-le manuellement :',
        'reset.confirm': 'Voulez-vous vraiment effacer toutes les cases et notes ? Cette action est irréversible.',

        'resources.title': 'Ressources et outils officiels',
        'resources.intro': 'Liens vérifiés vers les sources officielles belges. Vérifiez toujours la source officielle plutôt que de vous fier à une annonce ou à un vendeur.',

        'info.deadline': 'Délai',
        'info.whenToCheck': 'Quand vérifier',
        'info.description': 'Description',
        'info.additional': 'Bon à savoir',
        'info.sources': 'Sources officielles',
        'info.sourceFlanders': 'Flandre',
        'info.sourceWallonia': 'Wallonie',
        'info.sourceBrussels': 'Bruxelles',
        'info.sourceMore': 'Plus d\'informations',
        'info.sourceGeneric': 'Source officielle',

        'help.title': 'Aide & informations',
        'help.tab.about': 'À propos',
        'help.tab.usage': 'Utilisation',
        'help.tab.guide': 'Guide d\'achat',
        'help.tab.faq': 'FAQ',
        'help.tab.roadmap': 'Feuille de route',
        'help.tab.gdpr': 'RGPD',
        'help.tab.privacy': 'Vie privée',

        'guide.title': 'Acheter un logement en Belgique, étape par étape',
        'guide.intro': 'Un parcours court et réaliste. Les règles diffèrent entre la Flandre, la Wallonie et Bruxelles - vérifiez toujours la source officielle de la région où se trouve le bien.',
        'faq.title': 'Questions fréquentes',

        'theme.slate': 'Ardoise',
        'theme.graphite': 'Graphite',
        'theme.paper': 'Papier',
        'theme.linen': 'Lin',
        'theme.contrast': 'Contraste élevé',

        'field.price': 'Prix demandé',
        'field.region': 'Région',

        'btn.tools': 'Sauvegarde & bibliothèque',
        'btn.questions': 'Questions au vendeur',
        'btn.reminders': 'Rappels d\'échéance',
        'btn.compare': 'Comparer des biens',
        'btn.blank': 'Imprimer une check-list vierge',
        'btn.shareReport': 'Partager un lien en lecture seule',
        'btn.print': 'Imprimer',
        'resources.lastCheck': 'Tous les liens ont été vérifiés le {date}.',

        'footer.madeWith': 'Fait avec',
        'footer.by': 'par',
        'footer.moreProjects': 'Plus de projets gratuits sur',

        'btn.lookup': 'Recherches officielles',
        'lookup.title': 'Recherches officielles',
        'lookup.intro': 'Saisissez l\'adresse une seule fois et ouvrez chaque carte et registre officiels qu\'un acheteur doit consulter : parcelle, risque d\'inondation, sol, affectation, permis et plus. Tout fonctionne sur les sites officiels eux-mêmes - cette page ne fait que construire les liens.',
        'lookup.addressLabel': 'Adresse du bien',
        'lookup.addressPh': 'Ramstraat 1, 8370 Blankenberge',
        'lookup.copy': 'Copier l\'adresse',
        'lookup.copied': 'Adresse copiée',
        'lookup.copyFail': 'La copie a échoué - sélectionnez l\'adresse et copiez-la vous-même',
        'lookup.manualHint': 'La plupart des guichets officiels ne peuvent pas recevoir une adresse via un lien. Pour les outils marqués « à coller soi-même », copiez l\'adresse une fois et collez-la dans leur champ de recherche.',
        'lookup.auto': 'adresse pré-remplie',
        'lookup.manual': 'à coller soi-même',
        'lookup.open': 'Ouvrir',
        'lookup.group.maps': 'Cartes & environs',
        'lookup.group.property': 'Parcelle & propriété',
        'lookup.group.water': 'Eau & risque d\'inondation',
        'lookup.group.soil': 'Sol & sous-sol',
        'lookup.group.planning': 'Affectation, permis & patrimoine',
        'lookup.group.environment': 'Environnement',

        'mode.label': 'Taille de la check-list',
        'mode.full': 'Check-list complète',
        'mode.quick': 'Contrôle rapide',
        'mode.quickHint': 'Le contrôle rapide ne montre que les points à plus fort impact, visibles ou à demander lors d\'une première visite courte. Repassez à la check-list complète avant de faire une offre.',
        'btn.readable': 'Lecture facile',
        'season.title': 'Conseil de saison',
        'season.dismiss': 'Masquer ce conseil',
        'season.spring': 'Printemps : le pollen révèle l\'étanchéité réelle des fenêtres, et l\'humidité ascensionnelle est la plus visible après les mois humides de l\'hiver. Vous ne verrez pas comment la maison gère la chaleur d\'été - posez la question.',
        'season.summer': 'Été : idéal pour repérer les fissures de sécheresse dans les murs et sentir quelles pièces surchauffent. Les problèmes d\'humidité se cachent en été - inspectez la cave avec soin et prévoyez une seconde visite un jour de pluie.',
        'season.autumn': 'Automne : la première vraie pluie montre ce que valent gouttières, toits plats et caves, et les feuilles qui tombent montrent quels arbres rempliront les gouttières chaque année. Testez le chauffage maintenant - vous en aurez bientôt besoin.',
        'season.winter': 'Hiver : murs froids, condensation aux fenêtres et chaudière à plein régime montrent la réalité énergétique de la maison mieux que tout label. Fissures de sécheresse et état du jardin sont invisibles - demandez des photos d\'été.',
        'btn.pdf': 'Télécharger le PDF',
        'pdf.error': 'Le PDF n\'a pas pu être généré dans ce navigateur - utilisez Imprimer.',
        'btn.negotiation': 'Synthèse de négociation',
        'nego.title': 'Synthèse de négociation',
        'nego.intro': 'Les problèmes que vous avez cochés, avec par domaine une fourchette de coût indicative volontairement large - comptée une fois par domaine, car trois problèmes de toiture restent un seul chantier. Utilisez-la pour décider votre offre, pas comme devis.',
        'nego.area': 'Domaine',
        'nego.issues': 'Problèmes',
        'nego.band': 'Coût indicatif (EUR)',
        'nego.total': 'Total indicatif',
        'nego.asking': 'Prix demandé',
        'nego.points': 'Points à aborder avec le vendeur',
        'nego.point1': 'Demandez les attestations manquantes avant de signer quoi que ce soit - c\'est une obligation légale du vendeur, pas une faveur.',
        'nego.point2': 'Faites établir de vrais devis pour les deux plus gros problèmes avant le compromis ; les estimations ne convainquent personne.',
        'nego.point3': 'Chaque délai qui vous est transféré (obligation de rénovation, recontrôle électrique) fait partie du prix.',
        'nego.disclaimer': 'Ces fourchettes sont des ordres de grandeur TVA comprise pour un logement belge moyen, revus tous les six mois. Les prix réels dépendent de l\'accès, du niveau de finition et de la région - seul un devis écrit compte.',
        'nego.empty': 'Rien n\'est encore marqué comme problème. Cochez « problème » sur les points qui vous inquiètent, puis revenez ici.',
        'second.title': 'Second avis',
        'second.hint': 'Vous avez visité le même bien avec quelqu\'un d\'autre ? Collez son lien de partage et voyez où vos constats diffèrent.',
        'second.placeholder': 'Collez ici le lien de partage de l\'autre personne',
        'second.btn': 'Comparer les deux',
        'second.invalid': 'Ce lien n\'a pas pu être lu - il doit s\'agir d\'un lien de partage de cet outil.',
        'second.agree': 'Aucune différence sur les points que vous avez tous deux vérifiés.',
        'second.diffs': 'Points où vous différez',
        'second.you': 'Vous',
        'second.them': 'L\'autre personne',
        'second.ok': 'en ordre',
        'second.issue': 'un problème',
        'second.open': 'non vérifié',
        'import.title': 'Coller depuis une annonce',
        'import.hint': 'Copiez le texte complet d\'une annonce Immoweb/Immovlan et collez-le ici - l\'adresse, le prix demandé et le label PEB sont repris automatiquement. Rien n\'est envoyé nulle part.',
        'import.placeholder': 'Collez ici le texte de l\'annonce',
        'import.btn': 'Lire l\'annonce',
        'import.done': 'Repris de l\'annonce :',
        'import.nothing': 'Rien de reconnu. Collez le texte de l\'annonce elle-même, pas l\'adresse web.',

        'status.verified': 'vérifié',
        'status.unverified': 'non vérifié',
        'status.notApplicable': 'ne s\'applique pas ici',

        'info.whatToLookFor': 'Ce qu\'il faut regarder',
        'info.whyItMatters': 'Pourquoi c\'est important',
        'info.perRegion': 'La règle par région',
        'info.yourRegion': 'votre région',
        'info.unverifiedWarning': 'Nous n\'avons pas pu le confirmer sur une page officielle pour cette région. Considérez-le comme une raison de poser la question, pas comme un fait : utilisez le lien source ou demandez-le par écrit à votre notaire.',
        'info.lastVerified': 'Dernière vérification',

        'resources.regionHint': 'Affiche les liens nationaux et ceux qui concernent {region}.',
        'region.changed': 'Région définie sur {region}. Échéances légales et liens mis à jour.',
        'region.detected': 'Code postal reconnu : région définie sur {region}.',

        'storage.failed': 'Impossible d\'enregistrer dans ce navigateur. Vos modifications ne vivent que dans cet onglet - exportez une sauvegarde.',
        'report.linkCopied': 'Lien du rapport en lecture seule copié.',

        'questions.title': 'Questions au vendeur ou à l\'agent',
        'questions.intro': 'Emportez-la ou envoyez-la à l\'avance. Ce n\'est pas votre liste de problèmes : chaque constat devient une question avec une relance, pour obtenir des faits, des dates et des documents plutôt que des paroles rassurantes.',
        'questions.standard': 'À demander à chaque visite',
        'questions.documents': 'Documents à réclamer',
        'questions.issues': 'À propos des problèmes constatés',
        'questions.legal': 'Échéances légales à clarifier',
        'questions.docTemplate': 'Pouvez-vous me transmettre « {item} » avant le compromis, et qui l\'a demandé ?',
        'questions.issueTemplate': 'À propos de « {item} » : quelle est exactement la situation, depuis quand, qu\'a-t-on déjà fait, et existe-t-il une facture ou un rapport ?',
        'questions.legalTemplate': 'Concernant {topic} : {deadline} - cela s\'applique-t-il à ce bien, et pouvez-vous me montrer le document ?',

        'q.std.why': 'Pourquoi vendez-vous, et depuis combien de temps le bien est-il en vente ?',
        'q.std.howLong': 'Depuis quand êtes-vous propriétaire, et y avez-vous habité vous-même ?',
        'q.std.works': 'Quels travaux ont été réalisés, en quelle année, et par quel entrepreneur ?',
        'q.std.invoices': 'Puis-je voir les factures, permis et garanties de ces travaux ?',
        'q.std.neighbours': 'Y a-t-il des litiges de voisinage, ou quelque chose en cours concernant les limites, les arbres ou un mur mitoyen ?',
        'q.std.bills': 'Combien ont coûté l\'énergie et l\'eau lors des deux dernières années complètes ?',
        'q.std.offers': 'Une offre a-t-elle déjà été faite ou refusée, et le prix est-il négociable ?',
        'q.std.included': 'Qu\'est-ce qui est exactement compris dans la vente, et qu\'est-ce qui sera emporté ?',
        'q.std.roofAge': 'Quel âge a la couverture de toiture, et quand la charpente a-t-elle été contrôlée pour la dernière fois ?',
        'q.std.boilerAge': 'Quel âge a la chaudière, quand a-t-elle été entretenue, et puis-je voir les attestations ?',
        'q.std.damp': 'Y a-t-il déjà eu de l\'humidité, une fuite ou de l\'eau en cave, et qu\'a-t-on fait ?',
        'q.std.garden': 'Où passe exactement la limite de parcelle, et qui possède et entretient les clôtures ?',
        'q.std.charges': 'À combien s\'élèvent les charges communes mensuelles, et que comprennent-elles ?',
        'q.std.assembly': 'Puis-je lire les procès-verbaux des trois dernières assemblées générales ?',
        'q.std.reserve': 'Quel est le montant du fonds de réserve, et y a-t-il des arriérés ?',
        'q.std.plannedWorks': 'Quels travaux importants ont été votés, estimés ou reportés, et qui les paie ?',

        'reminders.title': 'Rappels d\'échéance',
        'reminders.intro': 'Complétez les deux dates ci-dessous et téléchargez un fichier d\'agenda. Votre agenda vous préviendra bien avant chaque échéance légale : ce sont précisément les dates que l\'on oublie et qui ne se rattrapent pas.',
        'reminders.deedDate': 'Date de l\'acte notarié',
        'reminders.drawdownDate': 'Premier prélèvement du crédit',
        'reminders.empty': 'Complétez une date ci-dessus pour générer les rappels de votre région.',
        'reminders.overdue': 'Cette échéance est déjà dépassée',
        'reminders.downloaded': 'Fichier d\'agenda téléchargé. Ouvrez-le pour ajouter les rappels.',
        'reminders.download': 'Télécharger le fichier d\'agenda (.ics)',
        'reminders.source': 'Créé avec huiskeuring.be - vérifiez toujours la source officielle.',

        'tools.title': 'Sauvegarde, import et biens enregistrés',
        'tools.intro': 'Tout reste sur votre appareil. Exportez un fichier pour une vraie sauvegarde, ou enregistrez la visite ici pour comparer des biens côte à côte.',
        'tools.export': 'Exporter en JSON',
        'tools.import': 'Importer un fichier JSON',
        'tools.exported': 'Fichier de sauvegarde téléchargé.',
        'tools.imported': 'Visite importée.',
        'tools.importFailed': 'Ce fichier n\'a pas pu être lu comme une sauvegarde huiskeuring.be.',
        'tools.popupBlocked': 'Votre navigateur a bloqué la fenêtre d\'impression. Autorisez les pop-ups pour ce site.',

        'library.title': 'Biens enregistrés',
        'library.save': 'Enregistrer ce bien',
        'library.empty': 'Rien d\'enregistré. Enregistrez une visite pour la comparer plus tard avec un autre bien.',
        'library.load': 'Ouvrir',
        'library.delete': 'Supprimer',
        'library.saved': 'Bien enregistré dans votre bibliothèque.',
        'library.loaded': 'Bien chargé.',
        'library.untitled': 'Bien sans nom',

        'blank.title': 'Check-list de visite - vierge',
        'blank.item': 'À vérifier',
        'blank.notes': 'Notes',
        'blank.footer': 'huiskeuring.be - check-list gratuite de visite pour la Belgique. Une aide, pas une expertise certifiée.',

        'freshness.ok': 'Informations juridiques vérifiées le {date}. Prochaine révision prévue le {next}.',
        'freshness.overdue': 'Les informations juridiques doivent être revues (dernière vérification le {date}). Confirmez toujours une échéance auprès de la source officielle.',
        'freshness.dismiss': 'Fermer',

        'compare.title': 'Comparer des biens',
        'compare.intro': 'Enregistrez une visite depuis la check-list, puis comparez ici jusqu\'à quatre biens.',
        'compare.empty': 'Aucun bien enregistré. Ouvrez la check-list, complétez-la et utilisez « Enregistrer ce bien ».',
        'compare.select': 'Choisissez les biens à comparer',
        'compare.metric': 'Critère',
        'compare.backToChecklist': 'Retour à la check-list',
        'compare.issuesByArea': 'Problèmes par domaine',
        'compare.bestOf': 'Le moins de problèmes',
        'compare.max': 'Vous pouvez comparer quatre biens au maximum à la fois.',

        'readonly.title': 'Rapport de visite',
        'readonly.badge': 'Rapport en lecture seule',
        'readonly.intro': 'Ceci est une copie partagée, en lecture seule, d\'une visite. Rien de ce que vous faites ici n\'est enregistré.',
        'readonly.openApp': 'Ouvrir dans la check-list',
        'readonly.noData': 'Ce lien ne contient aucune donnée de visite.',

        'cat.documents': 'Documents & certificats (Belgique)',
        'cat.asbestos': 'Détection de l\'amiante',
        'cat.exterior': 'Extérieur',
        'cat.kitchen': 'Cuisine',
        'cat.bathroom': 'Salle de bain',
        'cat.bedroom': 'Chambre',
        'cat.livingroom': 'Séjour',
        'cat.basement': 'Cave',
        'cat.attic': 'Grenier & charpente',
        'cat.plumbing': 'Eau & sanitaires',
        'cat.electrical': 'Électricité',
        'cat.structural': 'Structure & stabilité',
        'cat.hvac': 'Chauffage & ventilation',
        'cat.renovation': 'Potentiel de rénovation',
        'cat.apartment': 'Spécifique aux appartements',

        'tag.documents': 'Documents',
        'tag.asbestos': 'Amiante',
        'tag.exterior': 'Extérieur',
        'tag.kitchen': 'Cuisine',
        'tag.bathroom': 'Salle de bain',
        'tag.bedroom': 'Chambre',
        'tag.livingroom': 'Séjour',
        'tag.basement': 'Cave',
        'tag.attic': 'Grenier',
        'tag.plumbing': 'Eau',
        'tag.electrical': 'Électricité',
        'tag.structural': 'Structure',
        'tag.hvac': 'Chauffage',
        'tag.renovation': 'Rénovation',
        'tag.apartment': 'Appartement'
    }
};

/* ------------------------------------------------------------------ *
 * Buying guide (rendered in the Help modal, "Buying Guide" tab)
 * ------------------------------------------------------------------ */
const BUYING_GUIDE = {
    en: [
        {
            icon: 'fa-magnifying-glass',
            title: '1. Before the visit - know the address',
            body: 'Look the address up on the cadastral map (CadGIS), the flood maps and, in Flanders, the Woningpas. Check the EPC label mentioned in the advertisement, and check median prices for the municipality on Statbel. Ten minutes here tells you more than an hour at the viewing.'
        },
        {
            icon: 'fa-clipboard-check',
            title: '2. During the visit - look, do not listen',
            body: 'Work through this checklist. Start outside: sight along the roof ridge, look at the gutters, the pointing and the ground level against the wall. Inside, open every window and door, run every tap, feel every radiator and look inside every cupboard under a sink. Photograph everything you tick as an issue.'
        },
        {
            icon: 'fa-file-contract',
            title: '3. Ask for the documents in writing',
            body: 'EPC, asbestos certificate, electrical inspection report, soil certificate, heating maintenance certificates, permits and - for an apartment - the base deed, the last three general assembly minutes and the reserve fund balance. Do this before you make an offer, not after.'
        },
        {
            icon: 'fa-euro-sign',
            title: '4. Build the real budget',
            body: 'Purchase price + registration duty + notary fees + mortgage costs + the renovation quotations you obtained + 15-20% contingency. If the home has a Flemish label E or F, the renovation obligation to label D within 6 years belongs in that budget as a legal cost, not as a wish.'
        },
        {
            icon: 'fa-file-signature',
            title: '5. The compromis is already binding',
            body: 'In Belgium the private sale agreement (compromis) binds you, not the deed. Have it read by your notary first, and insert suspensive conditions - typically financing, but also a structural survey, a soil condition or a permit check if you found something.'
        },
        {
            icon: 'fa-shield-halved',
            title: '6. After signing - the things people forget',
            body: 'Apply for the free Verzekering Gewaarborgd Wonen within 1 year of the first drawdown of your loan. Take over the fire insurance, register the meters with Fluvius, and diarise the deadlines: 18 months for a non-compliant electrical installation, 6 years for the renovation obligation.'
        }
    ],
    nl: [
        {
            icon: 'fa-magnifying-glass',
            title: '1. Vóór het bezoek - ken het adres',
            body: 'Zoek het adres op in het kadasterplan (CadGIS), op de overstromingskaarten en in de Woningpas. Controleer het EPC-label uit de advertentie en de mediaanprijzen van de gemeente bij Statbel. Tien minuten voorbereiding leert u meer dan een uur ter plaatse.'
        },
        {
            icon: 'fa-clipboard-check',
            title: '2. Tijdens het bezoek - kijk zelf',
            body: 'Overloop deze checklist. Begin buiten: kijk langs de nok van het dak, bekijk de goten, het voegwerk en het maaiveld tegen de gevel. Binnen: open elk raam en elke deur, laat elke kraan lopen, voel elke radiator en kijk onder elke lavabo. Fotografeer alles wat u als probleem aanduidt.'
        },
        {
            icon: 'fa-file-contract',
            title: '3. Vraag de documenten schriftelijk op',
            body: 'EPC, asbestattest, keuringsverslag elektriciteit, bodemattest, onderhoudsattesten verwarming, vergunningen en - bij een appartement - de basisakte, de verslagen van de laatste drie algemene vergaderingen en het saldo van het reservefonds. Doe dit vóór uw bod, niet erna.'
        },
        {
            icon: 'fa-euro-sign',
            title: '4. Maak een realistisch budget',
            body: 'Aankoopprijs + registratiebelasting + notariskosten + kredietkosten + de offertes die u opvroeg + 15 à 20% reserve. Bij een label E of F hoort de renovatieverplichting naar label D binnen 6 jaar in dat budget als een wettelijke kost, niet als een wens.'
        },
        {
            icon: 'fa-file-signature',
            title: '5. De compromis bindt u al',
            body: 'In België bindt de onderhandse verkoopovereenkomst u, niet de notariële akte. Laat ze eerst nalezen door uw notaris en neem opschortende voorwaarden op: financiering, maar ook een stabiliteitsonderzoek, een bodemvoorwaarde of een vergunningscontrole als u iets vond.'
        },
        {
            icon: 'fa-shield-halved',
            title: '6. Na de ondertekening - wat men vergeet',
            body: 'Vraag de gratis verzekering gewaarborgd wonen aan binnen het jaar na de eerste kapitaalsopname. Neem de brandverzekering over, meld de meterstanden bij Fluvius en zet de termijnen in uw agenda: 18 maanden voor een niet-conforme elektrische installatie, 6 jaar voor de renovatieverplichting.'
        }
    ],
    fr: [
        {
            icon: 'fa-magnifying-glass',
            title: '1. Avant la visite - connaître l\'adresse',
            body: 'Recherchez l\'adresse sur le plan cadastral (CadGIS), sur les cartes d\'inondation et, en Flandre, dans le Woningpas. Vérifiez le label PEB annoncé et les prix médians de la commune chez Statbel. Dix minutes de préparation valent mieux qu\'une heure sur place.'
        },
        {
            icon: 'fa-clipboard-check',
            title: '2. Pendant la visite - regardez vous-même',
            body: 'Parcourez cette check-list. Commencez dehors : visez le long du faîte de la toiture, examinez les gouttières, les joints et le niveau du sol contre la façade. À l\'intérieur : ouvrez chaque fenêtre et chaque porte, laissez couler chaque robinet, touchez chaque radiateur et regardez sous chaque évier. Photographiez chaque problème coché.'
        },
        {
            icon: 'fa-file-contract',
            title: '3. Demandez les documents par écrit',
            body: 'PEB, attestation amiante, rapport de contrôle électrique, attestation du sol, attestations d\'entretien du chauffage, permis et - pour un appartement - l\'acte de base, les trois derniers procès-verbaux d\'assemblée générale et le solde du fonds de réserve. Faites-le avant votre offre.'
        },
        {
            icon: 'fa-euro-sign',
            title: '4. Construisez le budget réel',
            body: 'Prix d\'achat + droits d\'enregistrement + frais de notaire + frais de crédit + les devis obtenus + 15 à 20 % de réserve. En Flandre, si le label est E ou F, l\'obligation de rénovation vers le label D dans les 6 ans est un coût légal à intégrer au budget.'
        },
        {
            icon: 'fa-file-signature',
            title: '5. Le compromis vous engage déjà',
            body: 'En Belgique, c\'est le compromis de vente qui vous engage, pas l\'acte notarié. Faites-le relire par votre notaire et prévoyez des conditions suspensives : le financement, mais aussi une expertise de stabilité, une condition sur le sol ou une vérification des permis.'
        },
        {
            icon: 'fa-shield-halved',
            title: '6. Après la signature - ce que l\'on oublie',
            body: 'En Flandre, demandez l\'assurance logement garanti gratuite dans l\'année qui suit le premier prélèvement du crédit. Reprenez l\'assurance incendie, relevez les compteurs et notez les délais : 18 mois pour une installation électrique non conforme, 6 ans pour l\'obligation de rénovation.'
        }
    ]
};

/* ------------------------------------------------------------------ *
 * FAQ (also mirrored as FAQPage structured data in index.html)
 * ------------------------------------------------------------------ */
const FAQ_CONTENT = {
    en: [
        { q: 'Which documents are mandatory when buying a house in Belgium?', a: 'At minimum: the EPC (energy performance certificate), the soil certificate (bodemattest, before the compromis), the electrical inspection report, and in Flanders the asbestos certificate for buildings from before 2001. For an apartment you must also receive the base deed, the rules of co-ownership, the recent general assembly minutes and the financial situation of the co-ownership.' },
        { q: 'Why should I check whether the roof ridge is straight?', a: 'A sagging, wavy or twisted ridge means the roof structure is no longer carrying its load as designed. The usual causes are rot or woodworm after a long-standing leak, rafters cut for a dormer or roof window without proper support, spreading or settling walls, or extra weight from heavier tiles, insulation or solar panels. Because a roof structure repair costs thousands and slow leaks are usually not covered by insurance, a crooked ridge is a reason to make your offer conditional on an expert report.' },
        { q: 'What is the Verzekering Gewaarborgd Wonen and why should I apply?', a: 'It is a free insurance from the Flemish government that helps pay your mortgage instalments if you lose your income through involuntary unemployment, incapacity for work or the forced end of self-employment. Cover runs for 10 years, with a 3-month waiting period and support for up to 3 years. You must apply at the Vlaams Woningfonds within one year of the first drawdown of your loan - miss that window and you cannot apply for that loan any more.' },
        { q: 'What does the renovation obligation for label E or F mean?', a: 'Since 1 January 2023 the buyer of a Flemish home with EPC label E or F must renovate it to at least label D. The deadline was extended from 5 to 6 years after the notarial deed. It follows the property: if you sell within that period, the next buyer inherits the remaining time. Non-compliance can lead to an administrative fine (500 - 5,000 EUR for a residential unit) and a new deadline.' },
        { q: 'What happens if the electrical inspection report says "niet conform"?', a: 'The sale can still go ahead, but as the buyer you have 18 months from the deed to bring the installation into conformity and have it re-inspected. Read the actual report: the infractions can range from a missing cover plate to a full rewire, and the difference is thousands of euros - which makes it one of the strongest price-negotiation arguments you have.' },
        { q: 'How do I check flood risk for an address?', a: 'Use the official maps rather than local reputation. In Flanders, consult waterinfo.be and the Woningpas; a property receives a P-score for the plot and a G-score for the building, from A (not sensitive) to D (very sensitive). Wallonia and Brussels publish equivalent maps on their geoportals. A flood-sensitive address affects insurability, value and what you may build.' },
        { q: 'What does damp in the cellar or saltpeter on the wall tell me?', a: 'White crystalline deposits (saltpeter/efflorescence) are salts carried out of the brick by evaporating water, which proves moisture is actively moving through the wall. A tide mark up to about a metre high indicates rising damp - common in Belgian houses built before a damp-proof course was standard. It lowers the insulation value of the wall, damages plaster, raises heating costs and feeds mould. Freshly painted or newly plastered strips low on a wall are a classic cover-up.' },
        { q: 'Do I need an infiltratieput, infiltratiekrat or rainwater tank?', a: 'In Flanders the regional rainwater regulation (GSV Hemelwater) has applied since 2 October 2023. It requires a rainwater tank and an infiltration facility - an infiltration well, buried crates or a shallow planted hollow - whenever you build or extend, renovate in a way that changes the drainage, lay a terrace or driveway, install a pool, or add artificial grass or other paving. It also applies to works that are exempt from a permit: if they do not comply, the exemption lapses. In Brussels the rules come through the environmental permit and require a tank of at least 33 litres per m² of roof plus "zero discharge" of rainwater to the sewer. Municipalities may be stricter. Retro-fitting all this through a finished garden is the expensive route, so check what already exists before you buy.' },
        { q: 'What is a bezinkput and why should I lift the lid?', a: 'A bezinkput or zandvang is a settling pit that catches sand, leaves and grit before they reach the infiltration facility or the sewer. It needs emptying. If it is full of sludge, everything downstream of it is silting up too - the crates, the soakaway and the connection - and unblocking or replacing a buried infiltration system is a garden-destroying job. Lifting the lid takes ten seconds and tells you how the property has been maintained.' },
        { q: 'Why are diagonal cracks around windows a warning sign?', a: 'They are the classic pattern of foundation movement, and after a run of dry summers clay shrinkage has become one of the fastest-growing damage causes in Belgium. Large parts of the country sit on plastic clay that swells when wet and shrinks when dry; when one corner of the building moves more than the rest you get diagonal cracks from the corners of openings, wider at one end. Databank Ondergrond Vlaanderen publishes a free map of sensitive soils, and the Flemish drought damage register only accepts cracks wider than 3 mm - a useful severity threshold. Large trees close to the facade make it worse. Underpinning a foundation costs tens of thousands, so this is worth a stability survey before you sign.' },
        { q: 'Is this tool a replacement for a professional survey?', a: 'No. It is a structured aid that helps you look at the right things, ask the right questions and document what you found, so that you arrive at a viewing prepared and leave with usable notes. For a binding assessment of stability, roof structure, asbestos or electrics, engage a recognised expert - but do it after you have used this checklist to narrow down where to spend that money.' },
        { q: 'Is my data stored anywhere?', a: 'No. Everything you type stays in your own browser (localStorage). There is no server, no account, no tracking and no analytics. The "Share URL" button encodes your data into the link itself, so the data still never touches a server - which also means anyone with that link can read the inspection, so share it carefully.' }
    ],
    nl: [
        { q: 'Welke documenten zijn verplicht bij de aankoop van een woning in België?', a: 'Minimaal: het EPC, het bodemattest (vóór de compromis), het keuringsverslag van de elektrische installatie, en in Vlaanderen het asbestattest voor gebouwen van vóór 2001. Bij een appartement krijgt u ook de basisakte, het reglement van mede-eigendom, de recente verslagen van de algemene vergadering en de financiële toestand van de vereniging.' },
        { q: 'Waarom moet ik controleren of de nok van het dak recht is?', a: 'Een doorzakkende, golvende of scheve nok betekent dat de dakstructuur de last niet meer draagt zoals bedoeld. De klassieke oorzaken zijn houtrot of houtworm na een jarenlange lek, kepers die weggezaagd zijn voor een dakkapel of dakraam zonder bijkomende ondersteuning, uitwijkende of verzakte muren, of extra gewicht door zwaardere pannen, isolatie of zonnepanelen. Omdat herstel van een dakstructuur duizenden euro\'s kost en trage lekken doorgaans niet verzekerd zijn, is een scheve nok een reden om uw bod afhankelijk te maken van een expertverslag.' },
        { q: 'Wat is de verzekering gewaarborgd wonen en waarom zou ik ze aanvragen?', a: 'Het is een gratis verzekering van de Vlaamse overheid die helpt bij het aflossen van uw hypothecaire lening als u uw inkomen verliest door onvrijwillige werkloosheid, arbeidsongeschiktheid of gedwongen stopzetting als zelfstandige. De dekking loopt 10 jaar, met een wachttijd van 3 maanden en een tegemoetkoming voor maximaal 3 jaar. U vraagt ze aan bij het Vlaams Woningfonds binnen het jaar na de eerste kapitaalsopname - daarna kan het niet meer.' },
        { q: 'Wat houdt de renovatieverplichting bij label E of F in?', a: 'Sinds 1 januari 2023 moet de koper van een Vlaamse woning met EPC-label E of F die woning renoveren tot minstens label D. De termijn werd verlengd van 5 naar 6 jaar na de notariële akte. De verplichting volgt het gebouw: verkoopt u binnen die termijn, dan erft de volgende koper de resterende tijd. Niet naleven kan leiden tot een administratieve boete (500 tot 5.000 euro voor een woning) én een nieuwe termijn.' },
        { q: 'Wat als het keuringsverslag elektriciteit "niet conform" is?', a: 'De verkoop kan doorgaan, maar als koper hebt u 18 maanden vanaf de akte om de installatie in orde te brengen en opnieuw te laten keuren. Lees het verslag zelf: de inbreuken gaan van een ontbrekend afdekplaatje tot een volledige herbekabeling, en dat verschil bedraagt duizenden euro\'s - meteen ook een van uw sterkste onderhandelingsargumenten.' },
        { q: 'Hoe controleer ik het overstromingsrisico van een adres?', a: 'Gebruik de officiële kaarten en niet de reputatie van de buurt. In Vlaanderen raadpleegt u waterinfo.be en de Woningpas; een pand krijgt een P-score voor het perceel en een G-score voor het gebouw, van A (niet gevoelig) tot D (zeer gevoelig). Wallonië en Brussel publiceren gelijkaardige kaarten. Een overstromingsgevoelig adres beïnvloedt verzekerbaarheid, waarde en bouwmogelijkheden.' },
        { q: 'Wat betekent vocht in de kelder of salpeter op de muur?', a: 'Die witte kristallen zijn zouten die door verdampend water uit de baksteen worden meegevoerd: het bewijs dat er actief vocht door de muur beweegt. Een vochtband tot ongeveer een meter hoog wijst op opstijgend vocht, klassiek in Belgische woningen van vóór de veralgemening van een waterkerende laag. Het verlaagt de isolatiewaarde, tast pleister aan, verhoogt de stookkosten en voedt schimmel. Een vers geschilderde of opnieuw bepleisterde strook onderaan een muur is een klassieke doofpot.' },
        { q: 'Heb ik een infiltratieput, infiltratiekrat of hemelwaterput nodig?', a: 'In Vlaanderen geldt de gewestelijke hemelwaterverordening (GSV Hemelwater) sinds 2 oktober 2023. Ze vereist een hemelwaterput én een infiltratievoorziening - een infiltratieput, ingegraven kratten of een ondiepe beplante kom - telkens u bouwt of uitbreidt, renoveert op een manier die de afwatering wijzigt, een terras of oprit aanlegt, een zwembad plaatst, of kunstgras of andere verharding aanbrengt. Ze geldt ook voor vergunningsvrije werken: voldoen die niet, dan vervalt de vrijstelling. In Brussel komen de regels via de milieuvergunning en vragen ze een put van minstens 33 liter per m² dak plus "nul lozing" van regenwater op de riolering. Gemeenten mogen strenger zijn. Dit alles achteraf aanleggen door een afgewerkte tuin is de dure weg, dus kijk vóór de aankoop na wat er al is.' },
        { q: 'Wat is een bezinkput en waarom zou ik het deksel oplichten?', a: 'Een bezinkput of zandvang houdt zand, bladeren en gruis tegen voor ze de infiltratievoorziening of de riolering bereiken. Hij moet geledigd worden. Zit hij vol slib, dan slibt ook alles erachter dicht - de kratten, de infiltratieput en de aansluiting - en een ingegraven infiltratiesysteem ontstoppen of vervangen is een werk dat de tuin vernielt. Het deksel oplichten kost tien seconden en toont meteen hoe het pand onderhouden is.' },
        { q: 'Waarom zijn diagonale scheuren rond ramen een waarschuwing?', a: 'Ze vormen het klassieke patroon van funderingsbeweging, en na een reeks droge zomers is krimpende klei een van de snelst groeiende schadeoorzaken in België geworden. Grote delen van het land liggen op plastische klei die zwelt bij nat weer en krimpt bij droogte; beweegt één hoek van het gebouw meer dan de rest, dan krijgt u diagonale scheuren vanaf de hoeken van openingen, breder aan één uiteinde. Databank Ondergrond Vlaanderen publiceert een gratis kaart van gevoelige gronden, en het Vlaamse registratiepunt droogteschade aanvaardt enkel scheuren breder dan 3 mm - een bruikbare ernstdrempel. Grote bomen dicht bij de gevel maken het erger. Een fundering ondervangen kost tienduizenden euro\'s, dus dit is een stabiliteitsonderzoek waard vóór u tekent.' },
        { q: 'Vervangt deze tool een professionele keuring?', a: 'Nee. Het is een gestructureerd hulpmiddel dat u helpt naar de juiste dingen te kijken, de juiste vragen te stellen en uw vaststellingen te documenteren. Voor een bindend oordeel over stabiliteit, dakstructuur, asbest of elektriciteit schakelt u een erkende expert in - maar gebruik eerst deze checklist om te bepalen waar u dat geld het best aan besteedt.' },
        { q: 'Worden mijn gegevens ergens bewaard?', a: 'Nee. Alles wat u invult blijft in uw eigen browser (localStorage). Er is geen server, geen account, geen tracking en geen analytics. De knop "Deel-URL" verwerkt uw gegevens in de link zelf, dus ook dan raakt er niets een server - maar iedereen met die link kan uw keuring lezen, dus deel ze bewust.' }
    ],
    fr: [
        { q: 'Quels documents sont obligatoires lors de l\'achat d\'un logement en Belgique ?', a: 'Au minimum : le certificat PEB, l\'attestation du sol (avant le compromis), le rapport de contrôle de l\'installation électrique et, en Flandre, l\'attestation amiante pour les bâtiments antérieurs à 2001. Pour un appartement, vous recevez également l\'acte de base, le règlement de copropriété, les procès-verbaux récents et la situation financière de la copropriété.' },
        { q: 'Pourquoi vérifier si le faîte de la toiture est droit ?', a: 'Un faîte qui s\'affaisse, ondule ou se vrille signifie que la charpente ne reprend plus les charges comme prévu. Les causes habituelles sont la pourriture ou les vrillettes après une fuite ancienne, des chevrons coupés pour une lucarne ou une fenêtre de toit sans renfort, des murs qui s\'écartent ou se tassent, ou un surpoids dû à des tuiles plus lourdes, à l\'isolation ou à des panneaux solaires. Comme la réparation d\'une charpente coûte plusieurs milliers d\'euros et que les fuites lentes ne sont généralement pas couvertes, un faîte tordu justifie de conditionner votre offre à une expertise.' },
        { q: 'Qu\'est-ce que l\'assurance logement garanti et pourquoi la demander ?', a: 'C\'est une assurance gratuite de la Région flamande qui aide à rembourser votre crédit hypothécaire en cas de perte de revenus (chômage involontaire, incapacité de travail, cessation forcée d\'une activité indépendante). La couverture dure 10 ans, avec un délai d\'attente de 3 mois et une intervention pendant 3 ans maximum. La demande se fait au Vlaams Woningfonds dans l\'année suivant le premier prélèvement du crédit.' },
        { q: 'Que signifie l\'obligation de rénovation pour un label E ou F ?', a: 'Depuis le 1er janvier 2023, l\'acheteur d\'un logement flamand avec un label PEB E ou F doit le rénover jusqu\'au label D minimum. Le délai a été porté de 5 à 6 ans après l\'acte notarié. L\'obligation suit le bien : si vous revendez dans ce délai, l\'acheteur suivant hérite du temps restant. Le non-respect peut entraîner une amende administrative (500 à 5 000 EUR pour un logement) et un nouveau délai.' },
        { q: 'Que faire si le rapport de contrôle électrique est "non conforme" ?', a: 'La vente peut avoir lieu, mais en tant qu\'acheteur vous disposez de 18 mois à partir de l\'acte pour mettre l\'installation en conformité et la faire recontrôler. Lisez le rapport lui-même : les infractions vont d\'un simple couvercle manquant à un recâblage complet, soit plusieurs milliers d\'euros d\'écart - et donc un argument de négociation puissant.' },
        { q: 'Comment vérifier le risque d\'inondation d\'une adresse ?', a: 'Utilisez les cartes officielles plutôt que la réputation du quartier. En Flandre : waterinfo.be et le Woningpas, avec un score P pour la parcelle et un score G pour le bâtiment, de A (non sensible) à D (très sensible). La Wallonie et Bruxelles publient des cartes équivalentes sur leurs géoportails. Une adresse sensible aux inondations influence l\'assurabilité, la valeur et les possibilités de construire.' },
        { q: 'Que signifie l\'humidité en cave ou le salpêtre sur un mur ?', a: 'Ces cristaux blancs sont des sels transportés hors de la brique par l\'eau qui s\'évapore : la preuve qu\'une humidité circule activement dans le mur. Une marque jusqu\'à environ un mètre de haut indique une humidité ascensionnelle, fréquente dans les maisons belges antérieures à la généralisation de la membrane d\'étanchéité. Elle réduit l\'isolation, détruit l\'enduit, augmente la facture de chauffage et nourrit les moisissures. Une bande fraîchement peinte ou ré-enduite en bas d\'un mur est un camouflage classique.' },
        { q: 'Ai-je besoin d\'un puits d\'infiltration, de caissons ou d\'une citerne d\'eau de pluie ?', a: 'En Flandre, le règlement régional sur l\'eau de pluie (GSV Hemelwater) s\'applique depuis le 2 octobre 2023. Il impose une citerne et un dispositif d\'infiltration - puits, caissons enterrés ou cuvette plantée peu profonde - dès que vous construisez ou agrandissez, rénovez d\'une manière qui modifie l\'évacuation, posez une terrasse ou une allée, installez une piscine, ou ajoutez du gazon artificiel ou un autre revêtement. Il s\'applique aussi aux travaux dispensés de permis : s\'ils ne sont pas conformes, la dispense tombe. À Bruxelles, les règles passent par le permis d\'environnement et exigent une citerne d\'au moins 33 litres par m² de toiture ainsi que le « 0 rejet » d\'eau de pluie à l\'égout. Les communes peuvent être plus strictes. Installer tout cela après coup à travers un jardin fini est la voie coûteuse : vérifiez donc avant d\'acheter ce qui existe déjà.' },
        { q: 'Qu\'est-ce qu\'un puits de décantation et pourquoi en soulever le couvercle ?', a: 'Un puits de décantation (bezinkput) ou dessableur retient le sable, les feuilles et les graviers avant qu\'ils n\'atteignent le dispositif d\'infiltration ou l\'égout. Il doit être vidé. S\'il est plein de boue, tout ce qui se trouve en aval se colmate aussi - les caissons, le puits d\'infiltration et le raccordement - et déboucher ou remplacer un système d\'infiltration enterré est un chantier qui détruit le jardin. Soulever le couvercle prend dix secondes et vous renseigne immédiatement sur l\'entretien du bien.' },
        { q: 'Pourquoi les fissures diagonales autour des fenêtres sont-elles un signal d\'alarme ?', a: 'C\'est le schéma classique d\'un mouvement de fondation, et après une série d\'étés secs, le retrait de l\'argile est devenu l\'une des causes de dégâts qui progressent le plus vite en Belgique. De vastes régions du pays reposent sur une argile plastique qui gonfle par temps humide et se rétracte par temps sec ; lorsqu\'un angle du bâtiment bouge plus que le reste, des fissures diagonales apparaissent aux angles des baies, plus larges à une extrémité. La Databank Ondergrond Vlaanderen publie une carte gratuite des sols sensibles, et le registre flamand des dégâts de sécheresse n\'accepte que les fissures de plus de 3 mm - un seuil de gravité utile. Les grands arbres proches de la façade aggravent le phénomène. Reprendre une fondation en sous-œuvre coûte des dizaines de milliers d\'euros : une expertise de stabilité avant signature en vaut la peine.' },
        { q: 'Cet outil remplace-t-il une expertise professionnelle ?', a: 'Non. C\'est une aide structurée pour regarder les bons éléments, poser les bonnes questions et documenter vos constats. Pour un avis contraignant sur la stabilité, la charpente, l\'amiante ou l\'électricité, faites appel à un expert agréé - mais utilisez d\'abord cette check-list pour cibler où investir cet argent.' },
        { q: 'Mes données sont-elles conservées quelque part ?', a: 'Non. Tout ce que vous saisissez reste dans votre propre navigateur (localStorage). Aucun serveur, aucun compte, aucun tracking, aucune analytique. Le bouton « Lien de partage » encode vos données dans le lien lui-même : rien ne transite par un serveur, mais toute personne disposant du lien peut lire votre visite - partagez-le donc avec prudence.' }
    ]
};

/* ------------------------------------------------------------------ *
 * Help modal content (About / How to use / Roadmap / GDPR / Privacy)
 * ------------------------------------------------------------------ *
 * Rendered by renderHelpContent() in app.js. Structure per tab:
 *   { heading, sections: [ { icon, title, p: [..], ul: [..] } ] }
 * Keep the three languages in sync - the renderer falls back to English
 * for a whole tab if a language is missing.
 * ------------------------------------------------------------------ */
const HELP_CONTENT = {
    en: {
        about: {
            heading: 'Why this tool exists',
            sections: [
                {
                    icon: 'fa-lightbulb', title: 'The power of knowledge',
                    p: [
                        'There is a French saying, "Un homme averti en vaut deux", and a Dutch one, "Een gewaarschuwd man telt voor twee": a person who is forewarned is worth two. That is exactly why this tool exists.',
                        'When buying or inspecting a property, knowledge is your greatest asset. Being informed and prepared saves you from costly mistakes and gives you the confidence to make better decisions.'
                    ]
                },
                {
                    icon: 'fa-hands-helping', title: 'A tool born from helping others',
                    p: [
                        'I built this because I genuinely enjoy helping people navigate property inspection. Over the years I have seen too many people lose money or face unpleasant surprises simply because they did not know what to look for.',
                        'Some arrived at viewings unprepared, others missed critical details, and many only realised what mattered when it was too late. Every time, I thought: there must be a better way.'
                    ]
                },
                {
                    icon: 'fa-clipboard-check', title: 'What this tool does for you',
                    ul: [
                        'Stay organised: never forget to check something important during a viewing.',
                        'Understand why: every item explains what a problem usually indicates and what it can cost.',
                        'Document everything: track what is fine, what needs attention and which documents you still need.',
                        'Decide with facts: have everything in front of you when it is time to make an offer.',
                        'Save money: spot problems before they become expensive surprises.',
                        'Feel confident: walk in knowing exactly what to look for.'
                    ]
                },
                {
                    icon: 'fa-shield-alt', title: 'Protect yourself with preparation',
                    p: [
                        'Buying a home is one of the biggest decisions of your life. Most sellers and agents are honest, but a lack of knowledge still leaves you exposed to overlooking problems or accepting unfavourable terms.',
                        'This tool levels the playing field. It gives you a systematic approach so nothing slips through the cracks, whether you are a first-time buyer or an experienced investor.'
                    ]
                },
                {
                    icon: 'fa-triangle-exclamation', title: 'Important disclaimer',
                    p: [
                        'This checklist is an aid, not a certified survey. It does not replace an architect, a stability engineer, a certified asbestos expert or a recognised electrical inspector. Legislation differs between Flanders, Wallonia and Brussels and changes over time - always verify with the official source linked in the Resources panel, and take professional advice before you commit.'
                    ]
                },
                {
                    icon: 'fa-users', title: 'Free, private and made with care',
                    p: [
                        'This tool is completely free and respects your privacy. Everything stays on your device: no tracking, no data collection, no third-party requests. Good luck with your search.'
                    ]
                }
            ]
        },
        usage: {
            heading: 'How to use this tool',
            sections: [
                { icon: 'fa-location-dot', title: '1. Set the region', p: ['Choose Flanders, Wallonia or Brussels, or simply type the address - the region is detected from the postal code. Legal deadlines, official links and reminders all depend on it, because the rules genuinely differ.'] },
                { icon: 'fa-home', title: '2. Enter the property details', p: ['Address, contact person, date, time and asking price. This appears in your report and in the comparison table.'] },
                { icon: 'fa-filter', title: '3. Use the filters', p: ['Pick House or Apartment first - the checklist adapts. Then use the category buttons to focus on one area, or the issue filters to review only the problems you already ticked.'] },
                { icon: 'fa-check-square', title: '4. The dual checkbox system', ul: ['OK (green): the item passes.', 'Issue (orange): needs attention, repair or renovation.', 'Request (documents): track which documents you still have to ask for.'] },
                { icon: 'fa-circle-question', title: '5. Read the "Why?" explanation', p: ['Every item has a Why? button explaining what the check is really about, what a bad result usually indicates and roughly what it can cost - so you know whether something is cosmetic or a reason to walk away.'] },
                { icon: 'fa-info-circle', title: '6. Open the info button for the law', p: ['Items with an info button show the legal deadline for each of the three regions, with the official source and the date we last verified it. Anything we could not confirm is clearly marked as unverified.'] },
                { icon: 'fa-sticky-note', title: '7. Add notes', p: ['Record your own observations and measurements per item. Photograph anything you tick as an issue - your notes plus a photo are what you will negotiate with.'] },
                { icon: 'fa-comments', title: '8. Take the question sheet with you', p: ['The Questions button turns your findings into questions with follow-ups, adds the documents to request and the standard questions for every viewing. Print it or send it in advance.'] },
                { icon: 'fa-calendar-check', title: '9. Set your deadline reminders', p: ['After you buy, enter the date of the deed and the first drawdown of your loan, then download the calendar file. Your calendar will warn you before each legal deadline - these are the dates people forget and cannot recover.'] },
                { icon: 'fa-file-lines', title: '10. Generate a report', p: ['A summary with the property info, documents to request, issues found, items in order and all your notes. Print it, copy it, or share a read-only link.'] },
                { icon: 'fa-box-archive', title: '11. Back up and compare', p: ['Export a JSON backup, save the property to your local library, and compare up to four properties side by side. Everything stays on your device.'] },
                { icon: 'fa-print', title: '12. Prefer paper?', p: ['The Backup panel can print a blank checklist with tick boxes and a notes column, in your language and for the property type you selected.'] }
            ]
        },
        roadmap: {
            heading: 'Roadmap',
            sections: [
                { icon: 'fa-check', title: 'Recently shipped', ul: ['"Why?" explanations on every checklist item', 'Legal deadlines per region, with an honest verified / not verified status', 'Deadline reminders as a calendar file', 'Question sheet for the seller or agent', 'Side-by-side property comparison', 'JSON backup and restore', 'Six complete themes and a printable blank checklist', 'Self-hosted fonts and icons: no third-party requests at all'] },
                { icon: 'fa-spinner', title: 'Currently working on', ul: ['Translating the long-form explanations into Dutch and French', 'Verifying the remaining Walloon and Brussels rules against primary sources', 'Photo attachments per issue'] },
                { icon: 'fa-lightbulb', title: 'Ideas for later', ul: ['Renovation cost estimator that totals your issues into a negotiation figure', 'Offline mode so the checklist works in a cellar with no signal', 'A proper PDF export', 'German for the Eastern Cantons'] },
                { icon: 'fa-envelope', title: 'Feature requests', p: ['Ideas or suggestions? Send them to huiskeuring@compyra.com.'] }
            ]
        },
        gdpr: {
            heading: 'GDPR compliance',
            sections: [
                { icon: 'fa-database', title: 'Data storage', p: ['This application stores all data locally in your browser using localStorage. No data is transmitted to any server or third party.'] },
                { icon: 'fa-user-shield', title: 'Your rights', ul: ['Access: all your data is visible on this page.', 'Deletion: "Reset All" deletes everything stored.', 'Portability: export a JSON file, copy the report, or create a share link.', 'Rectification: you can edit anything at any time.'] },
                { icon: 'fa-shield-alt', title: 'Data controller', p: ['Because all data stays on your device, you are the data controller. Compyra does not collect, process or have access to your inspection data.'] },
                { icon: 'fa-cookie-bite', title: 'Cookies', p: ['This application does not use cookies. It only uses localStorage to save your progress, language, region and theme preference on your device.'] },
                { icon: 'fa-cloud', title: 'Third-party requests', p: ['There are none. Fonts and icons are served from this domain, so no external provider ever sees your IP address.'] }
            ]
        },
        privacy: {
            heading: 'Privacy policy',
            sections: [
                { icon: 'fa-lock', title: 'Data collection', p: ['We do not collect any personal data. This is a client-side application that runs entirely in your browser. Everything you enter stays on your device.'] },
                { icon: 'fa-laptop', title: 'Local storage only', ul: ['Property information you enter', 'Checkbox states (OK / Issue / Requested)', 'Notes and observations', 'Saved properties in your local library', 'Theme, language and region preferences'] },
                { icon: 'fa-server', title: 'No server communication', p: ['This application does not send data to external servers, does not use analytics or tracking, does not connect to databases and does not share information with third parties.'] },
                { icon: 'fa-link', title: 'Share links', p: ['The share and read-only report links encode your inspection inside the link itself. The data is never uploaded, but the link contains it - so treat a share link like the document it represents.'] },
                { icon: 'fa-trash-alt', title: 'Deleting your data', p: ['Click "Reset All", delete entries from the saved-properties library, or clear your browser\'s site data for this domain.'] },
                { icon: 'fa-envelope', title: 'Contact', p: ['Questions? Visit compyra.com or e-mail huiskeuring@compyra.com.'] }
            ]
        }
    },

    nl: {
        about: {
            heading: 'Waarom deze tool bestaat',
            sections: [
                {
                    icon: 'fa-lightbulb', title: 'De kracht van kennis',
                    p: [
                        'Er bestaat een Franse uitdrukking, "Un homme averti en vaut deux", en een Nederlandse, "Een gewaarschuwd man telt voor twee". Precies daarom bestaat deze tool.',
                        'Bij het kopen of bezoeken van een woning is kennis uw grootste troef. Goed geïnformeerd en voorbereid zijn behoedt u voor dure vergissingen en geeft u het vertrouwen om betere beslissingen te nemen.'
                    ]
                },
                {
                    icon: 'fa-hands-helping', title: 'Ontstaan uit mensen helpen',
                    p: [
                        'Ik heb dit gemaakt omdat ik mensen graag help hun weg te vinden in een woningkeuring. Door de jaren heen zag ik te veel mensen geld verliezen of voor onaangename verrassingen staan, simpelweg omdat ze niet wisten waar ze op moesten letten.',
                        'Sommigen kwamen onvoorbereid op bezoek, anderen misten cruciale details, en velen beseften pas wat belangrijk was toen het te laat was. Telkens dacht ik: dit moet beter kunnen.'
                    ]
                },
                {
                    icon: 'fa-clipboard-check', title: 'Wat deze tool voor u doet',
                    ul: [
                        'Georganiseerd blijven: nooit meer iets belangrijks vergeten tijdens een bezoek.',
                        'Begrijpen waarom: elk item legt uit wat een probleem meestal betekent en wat het kan kosten.',
                        'Alles documenteren: bijhouden wat in orde is, wat aandacht vraagt en welke documenten u nog nodig hebt.',
                        'Beslissen op basis van feiten: alles voor u hebben wanneer u een bod doet.',
                        'Geld besparen: problemen zien vóór ze dure verrassingen worden.',
                        'Zelfvertrouwen: binnenstappen met de wetenschap waar u precies op moet letten.'
                    ]
                },
                {
                    icon: 'fa-shield-alt', title: 'Bescherm uzelf door voorbereiding',
                    p: [
                        'Een woning kopen is een van de grootste beslissingen van uw leven. De meeste verkopers en makelaars zijn eerlijk, maar een gebrek aan kennis maakt u nog altijd kwetsbaar om problemen over het hoofd te zien of ongunstige voorwaarden te aanvaarden.',
                        'Deze tool maakt het speelveld gelijk. Ze geeft u een systematische aanpak zodat niets door de mazen glipt, of u nu voor het eerst koopt of een ervaren investeerder bent.'
                    ]
                },
                {
                    icon: 'fa-triangle-exclamation', title: 'Belangrijke disclaimer',
                    p: [
                        'Deze checklist is een hulpmiddel, geen keuringsverslag. Ze vervangt geen architect, stabiliteitsingenieur, gecertificeerd asbestdeskundige of erkend keuringsorganisme voor elektriciteit. De wetgeving verschilt tussen Vlaanderen, Wallonië en Brussel en verandert in de tijd - controleer altijd de officiële bron in het paneel Bronnen, en win professioneel advies in vóór u zich verbindt.'
                    ]
                },
                {
                    icon: 'fa-users', title: 'Gratis, privé en met zorg gemaakt',
                    p: [
                        'Deze tool is volledig gratis en respecteert uw privacy. Alles blijft op uw toestel: geen tracking, geen gegevensverzameling, geen verzoeken naar derden. Veel succes met uw zoektocht.'
                    ]
                }
            ]
        },
        usage: {
            heading: 'Hoe u deze tool gebruikt',
            sections: [
                { icon: 'fa-location-dot', title: '1. Stel het gewest in', p: ['Kies Vlaanderen, Wallonië of Brussel, of typ gewoon het adres - het gewest wordt uit de postcode afgeleid. Wettelijke termijnen, officiële links en herinneringen hangen ervan af, want de regels verschillen echt.'] },
                { icon: 'fa-home', title: '2. Vul de gegevens van de woning in', p: ['Adres, contactpersoon, datum, uur en vraagprijs. Dit verschijnt in uw rapport en in de vergelijkingstabel.'] },
                { icon: 'fa-filter', title: '3. Gebruik de filters', p: ['Kies eerst Huis of Appartement - de checklist past zich aan. Gebruik daarna de categorieknoppen om op één domein te focussen, of de probleemfilters om enkel de aangeduide problemen te overlopen.'] },
                { icon: 'fa-check-square', title: '4. Het dubbele aanvinksysteem', ul: ['OK (groen): het item is in orde.', 'Probleem (oranje): vraagt aandacht, herstel of renovatie.', 'Opvragen (documenten): houd bij welke documenten u nog moet vragen.'] },
                { icon: 'fa-circle-question', title: '5. Lees de uitleg bij "Waarom?"', p: ['Elk item heeft een Waarom?-knop die uitlegt waar de controle echt over gaat, wat een slecht resultaat meestal betekent en wat het ruwweg kan kosten - zo weet u of iets cosmetisch is of een reden om af te haken.'] },
                { icon: 'fa-info-circle', title: '6. Open de infoknop voor de wetgeving', p: ['Items met een infoknop tonen de wettelijke termijn voor elk van de drie gewesten, met de officiële bron en de datum waarop wij het laatst controleerden. Wat we niet konden bevestigen, staat duidelijk als niet-geverifieerd aangeduid.'] },
                { icon: 'fa-sticky-note', title: '7. Voeg notities toe', p: ['Noteer uw eigen vaststellingen en metingen per item. Fotografeer alles wat u als probleem aanduidt - uw notities plus een foto zijn waarmee u onderhandelt.'] },
                { icon: 'fa-comments', title: '8. Neem de vragenlijst mee', p: ['De knop Vragen zet uw vaststellingen om in vragen met vervolgvragen, voegt de op te vragen documenten toe en de standaardvragen voor elk bezoek. Druk ze af of stuur ze vooraf door.'] },
                { icon: 'fa-calendar-check', title: '9. Stel uw herinneringen in', p: ['Vul na de aankoop de datum van de akte en van de eerste kapitaalsopname in en download het agendabestand. Uw agenda waarschuwt u vóór elke wettelijke termijn - net de datums die mensen vergeten en niet kunnen inhalen.'] },
                { icon: 'fa-file-lines', title: '10. Maak een rapport', p: ['Een samenvatting met de gegevens van de woning, de op te vragen documenten, de gevonden problemen, de items in orde en al uw notities. Afdrukken, kopiëren of delen als alleen-lezen link.'] },
                { icon: 'fa-box-archive', title: '11. Back-up en vergelijken', p: ['Exporteer een JSON-back-up, bewaar de woning in uw lokale bibliotheek en vergelijk tot vier woningen naast elkaar. Alles blijft op uw toestel.'] },
                { icon: 'fa-print', title: '12. Liever op papier?', p: ['Het back-uppaneel kan een blanco checklist afdrukken met aankruisvakjes en een notitiekolom, in uw taal en voor het gekozen type woning.'] }
            ]
        },
        roadmap: {
            heading: 'Roadmap',
            sections: [
                { icon: 'fa-check', title: 'Recent opgeleverd', ul: ['"Waarom?"-uitleg bij elk item van de checklist', 'Wettelijke termijnen per gewest, met een eerlijke status geverifieerd / niet geverifieerd', 'Herinneringen voor termijnen als agendabestand', 'Vragenlijst voor de verkoper of makelaar', 'Woningen naast elkaar vergelijken', 'JSON-back-up en herstel', 'Zes volwaardige thema\'s en een afdrukbare blanco checklist', 'Lokaal gehoste lettertypes en pictogrammen: geen enkel verzoek naar derden'] },
                { icon: 'fa-spinner', title: 'Waar we nu aan werken', ul: ['De uitgebreide uitleg vertalen naar het Nederlands en het Frans', 'De resterende Waalse en Brusselse regels bevestigen bij primaire bronnen', 'Foto\'s toevoegen per probleem'] },
                { icon: 'fa-lightbulb', title: 'Ideeën voor later', ul: ['Renovatiekostenraming die uw problemen optelt tot een onderhandelingsbedrag', 'Offlinemodus zodat de checklist werkt in een kelder zonder bereik', 'Een echte pdf-export', 'Duits voor de Oostkantons'] },
                { icon: 'fa-envelope', title: 'Suggesties', p: ['Ideeën of voorstellen? Stuur ze naar huiskeuring@compyra.com.'] }
            ]
        },
        gdpr: {
            heading: 'GDPR-conformiteit',
            sections: [
                { icon: 'fa-database', title: 'Gegevensopslag', p: ['Deze toepassing bewaart alle gegevens lokaal in uw browser via localStorage. Er worden geen gegevens naar een server of derde partij verzonden.'] },
                { icon: 'fa-user-shield', title: 'Uw rechten', ul: ['Inzage: al uw gegevens zijn zichtbaar op deze pagina.', 'Verwijdering: "Alles wissen" verwijdert alles wat bewaard is.', 'Overdraagbaarheid: exporteer een JSON-bestand, kopieer het rapport of maak een deel-link.', 'Verbetering: u kunt alles op elk moment aanpassen.'] },
                { icon: 'fa-shield-alt', title: 'Verwerkingsverantwoordelijke', p: ['Omdat alle gegevens op uw toestel blijven, bent u de verwerkingsverantwoordelijke. Compyra verzamelt, verwerkt of raadpleegt uw keuringsgegevens niet.'] },
                { icon: 'fa-cookie-bite', title: 'Cookies', p: ['Deze toepassing gebruikt geen cookies. Ze gebruikt enkel localStorage om uw voortgang, taal, gewest en themavoorkeur op uw toestel te bewaren.'] },
                { icon: 'fa-cloud', title: 'Verzoeken naar derden', p: ['Die zijn er niet. Lettertypes en pictogrammen worden vanaf dit domein geleverd, zodat geen enkele externe partij uw IP-adres te zien krijgt.'] }
            ]
        },
        privacy: {
            heading: 'Privacybeleid',
            sections: [
                { icon: 'fa-lock', title: 'Gegevensverzameling', p: ['Wij verzamelen geen persoonsgegevens. Dit is een toepassing die volledig in uw browser draait. Alles wat u invult blijft op uw toestel.'] },
                { icon: 'fa-laptop', title: 'Enkel lokale opslag', ul: ['De gegevens van de woning die u invult', 'De status van de vinkjes (OK / Probleem / Opgevraagd)', 'Notities en vaststellingen', 'Bewaarde woningen in uw lokale bibliotheek', 'Voorkeuren voor thema, taal en gewest'] },
                { icon: 'fa-server', title: 'Geen servercommunicatie', p: ['Deze toepassing verzendt geen gegevens naar externe servers, gebruikt geen analytics of tracking, maakt geen verbinding met databanken en deelt geen informatie met derden.'] },
                { icon: 'fa-link', title: 'Deel-links', p: ['De deel-link en de alleen-lezen rapportlink verwerken uw keuring in de link zelf. De gegevens worden nooit geüpload, maar de link bevat ze - behandel een deel-link dus als het document dat ze voorstelt.'] },
                { icon: 'fa-trash-alt', title: 'Uw gegevens verwijderen', p: ['Klik op "Alles wissen", verwijder items uit de bibliotheek met bewaarde woningen, of wis de sitegegevens van dit domein in uw browser.'] },
                { icon: 'fa-envelope', title: 'Contact', p: ['Vragen? Surf naar compyra.com of mail naar huiskeuring@compyra.com.'] }
            ]
        }
    },

    fr: {
        about: {
            heading: 'Pourquoi cet outil existe',
            sections: [
                {
                    icon: 'fa-lightbulb', title: 'La force de l\'information',
                    p: [
                        'Il y a ce proverbe français, « Un homme averti en vaut deux », et son équivalent néerlandais, « Een gewaarschuwd man telt voor twee ». C\'est exactement la raison d\'être de cet outil.',
                        'Lors de l\'achat ou de la visite d\'un bien, l\'information est votre meilleur atout. Être informé et préparé vous évite des erreurs coûteuses et vous donne la confiance nécessaire pour mieux décider.'
                    ]
                },
                {
                    icon: 'fa-hands-helping', title: 'Né de l\'envie d\'aider',
                    p: [
                        'J\'ai créé cet outil parce que j\'aime aider les gens à s\'y retrouver dans une visite technique. Au fil des années, j\'ai vu trop de personnes perdre de l\'argent ou découvrir de mauvaises surprises simplement parce qu\'elles ne savaient pas quoi regarder.',
                        'Certains arrivaient sans préparation, d\'autres passaient à côté de détails cruciaux, et beaucoup ne comprenaient l\'importance de certains points que trop tard. À chaque fois, je me suis dit : il doit y avoir une meilleure façon de faire.'
                    ]
                },
                {
                    icon: 'fa-clipboard-check', title: 'Ce que cet outil vous apporte',
                    ul: [
                        'Rester organisé : ne plus jamais oublier un point important pendant une visite.',
                        'Comprendre pourquoi : chaque point explique ce qu\'un problème révèle habituellement et ce qu\'il peut coûter.',
                        'Tout documenter : noter ce qui va, ce qui demande attention et quels documents vous manquent encore.',
                        'Décider sur des faits : avoir tout sous les yeux au moment de faire une offre.',
                        'Économiser : repérer les problèmes avant qu\'ils ne deviennent des surprises coûteuses.',
                        'Être serein : entrer en sachant exactement quoi regarder.'
                    ]
                },
                {
                    icon: 'fa-shield-alt', title: 'Se protéger par la préparation',
                    p: [
                        'Acheter un logement est l\'une des plus grandes décisions d\'une vie. La plupart des vendeurs et des agents sont honnêtes, mais un manque de connaissances vous expose encore à passer à côté d\'un défaut ou à accepter des conditions défavorables.',
                        'Cet outil rétablit l\'équilibre. Il vous donne une méthode systématique pour que rien ne passe entre les mailles du filet, que vous soyez primo-acquéreur ou investisseur expérimenté.'
                    ]
                },
                {
                    icon: 'fa-triangle-exclamation', title: 'Avertissement important',
                    p: [
                        'Cette check-list est une aide, pas une expertise certifiée. Elle ne remplace pas un architecte, un ingénieur en stabilité, un expert amiante certifié ou un organisme agréé pour le contrôle électrique. La législation diffère entre la Flandre, la Wallonie et Bruxelles et évolue - vérifiez toujours la source officielle dans le panneau Ressources et prenez conseil avant de vous engager.'
                    ]
                },
                {
                    icon: 'fa-users', title: 'Gratuit, privé et fait avec soin',
                    p: [
                        'Cet outil est entièrement gratuit et respecte votre vie privée. Tout reste sur votre appareil : aucun traçage, aucune collecte, aucune requête vers un tiers. Bonne recherche.'
                    ]
                }
            ]
        },
        usage: {
            heading: 'Comment utiliser cet outil',
            sections: [
                { icon: 'fa-location-dot', title: '1. Définissez la région', p: ['Choisissez la Flandre, la Wallonie ou Bruxelles, ou tapez simplement l\'adresse : la région est déduite du code postal. Les échéances légales, les liens officiels et les rappels en dépendent, car les règles diffèrent réellement.'] },
                { icon: 'fa-home', title: '2. Encodez les données du bien', p: ['Adresse, personne de contact, date, heure et prix demandé. Ces informations apparaissent dans votre rapport et dans le tableau comparatif.'] },
                { icon: 'fa-filter', title: '3. Utilisez les filtres', p: ['Choisissez d\'abord Maison ou Appartement : la check-list s\'adapte. Utilisez ensuite les boutons de catégorie pour vous concentrer sur un domaine, ou les filtres de problèmes pour ne revoir que ce que vous avez coché.'] },
                { icon: 'fa-check-square', title: '4. Le double système de cases', ul: ['OK (vert) : le point est en ordre.', 'Problème (orange) : demande attention, réparation ou rénovation.', 'Demander (documents) : suivez les documents qu\'il vous reste à réclamer.'] },
                { icon: 'fa-circle-question', title: '5. Lisez l\'explication « Pourquoi ? »', p: ['Chaque point dispose d\'un bouton Pourquoi ? qui explique l\'enjeu réel du contrôle, ce qu\'un mauvais résultat révèle généralement et ce que cela peut coûter - de quoi distinguer un défaut cosmétique d\'une raison de renoncer.'] },
                { icon: 'fa-info-circle', title: '6. Ouvrez le bouton info pour la loi', p: ['Les points munis d\'un bouton info affichent l\'échéance légale pour chacune des trois régions, avec la source officielle et la date de notre dernière vérification. Ce que nous n\'avons pas pu confirmer est clairement signalé comme non vérifié.'] },
                { icon: 'fa-sticky-note', title: '7. Ajoutez des notes', p: ['Consignez vos constats et vos mesures point par point. Photographiez tout ce que vous cochez comme problème : vos notes et une photo sont vos arguments de négociation.'] },
                { icon: 'fa-comments', title: '8. Emportez la liste de questions', p: ['Le bouton Questions transforme vos constats en questions avec relances, y ajoute les documents à réclamer et les questions standard de toute visite. Imprimez-la ou envoyez-la à l\'avance.'] },
                { icon: 'fa-calendar-check', title: '9. Programmez vos rappels d\'échéance', p: ['Après l\'achat, encodez la date de l\'acte et celle du premier prélèvement du crédit, puis téléchargez le fichier d\'agenda. Votre agenda vous préviendra avant chaque échéance légale : ce sont précisément les dates que l\'on oublie et qui ne se rattrapent pas.'] },
                { icon: 'fa-file-lines', title: '10. Générez un rapport', p: ['Un résumé avec les données du bien, les documents à demander, les problèmes constatés, les points en ordre et toutes vos notes. À imprimer, copier ou partager en lecture seule.'] },
                { icon: 'fa-box-archive', title: '11. Sauvegardez et comparez', p: ['Exportez une sauvegarde JSON, enregistrez le bien dans votre bibliothèque locale et comparez jusqu\'à quatre biens côte à côte. Tout reste sur votre appareil.'] },
                { icon: 'fa-print', title: '12. Plutôt papier ?', p: ['Le panneau de sauvegarde peut imprimer une check-list vierge avec cases à cocher et colonne de notes, dans votre langue et pour le type de bien sélectionné.'] }
            ]
        },
        roadmap: {
            heading: 'Feuille de route',
            sections: [
                { icon: 'fa-check', title: 'Livré récemment', ul: ['Explications « Pourquoi ? » sur chaque point de la check-list', 'Échéances légales par région, avec un statut honnête vérifié / non vérifié', 'Rappels d\'échéance sous forme de fichier d\'agenda', 'Liste de questions pour le vendeur ou l\'agent', 'Comparaison de biens côte à côte', 'Sauvegarde et restauration JSON', 'Six thèmes complets et une check-list vierge imprimable', 'Polices et icônes hébergées localement : aucune requête vers un tiers'] },
                { icon: 'fa-spinner', title: 'En cours', ul: ['Traduction des explications longues en néerlandais et en français', 'Vérification des règles wallonnes et bruxelloises restantes auprès de sources primaires', 'Ajout de photos par problème'] },
                { icon: 'fa-lightbulb', title: 'Idées pour plus tard', ul: ['Estimateur de coût de rénovation totalisant vos problèmes en un montant de négociation', 'Mode hors ligne pour utiliser la check-list dans une cave sans réseau', 'Un véritable export PDF', 'L\'allemand pour les Cantons de l\'Est'] },
                { icon: 'fa-envelope', title: 'Suggestions', p: ['Des idées ou des propositions ? Envoyez-les à huiskeuring@compyra.com.'] }
            ]
        },
        gdpr: {
            heading: 'Conformité RGPD',
            sections: [
                { icon: 'fa-database', title: 'Stockage des données', p: ['Cette application enregistre toutes les données localement dans votre navigateur via localStorage. Aucune donnée n\'est transmise à un serveur ni à un tiers.'] },
                { icon: 'fa-user-shield', title: 'Vos droits', ul: ['Accès : toutes vos données sont visibles sur cette page.', 'Effacement : « Tout effacer » supprime tout ce qui est enregistré.', 'Portabilité : exportez un fichier JSON, copiez le rapport ou créez un lien de partage.', 'Rectification : vous pouvez tout modifier à tout moment.'] },
                { icon: 'fa-shield-alt', title: 'Responsable du traitement', p: ['Comme toutes les données restent sur votre appareil, vous êtes le responsable du traitement. Compyra ne collecte, ne traite ni ne consulte vos données de visite.'] },
                { icon: 'fa-cookie-bite', title: 'Cookies', p: ['Cette application n\'utilise pas de cookies. Elle utilise uniquement localStorage pour enregistrer votre progression, votre langue, votre région et votre thème sur votre appareil.'] },
                { icon: 'fa-cloud', title: 'Requêtes vers des tiers', p: ['Il n\'y en a aucune. Les polices et les icônes sont servies depuis ce domaine : aucun prestataire externe ne voit votre adresse IP.'] }
            ]
        },
        privacy: {
            heading: 'Politique de vie privée',
            sections: [
                { icon: 'fa-lock', title: 'Collecte de données', p: ['Nous ne collectons aucune donnée personnelle. Cette application fonctionne entièrement dans votre navigateur. Tout ce que vous encodez reste sur votre appareil.'] },
                { icon: 'fa-laptop', title: 'Stockage local uniquement', ul: ['Les informations du bien que vous encodez', 'L\'état des cases (OK / Problème / Demandé)', 'Les notes et constats', 'Les biens enregistrés dans votre bibliothèque locale', 'Vos préférences de thème, de langue et de région'] },
                { icon: 'fa-server', title: 'Aucune communication serveur', p: ['Cette application n\'envoie pas de données vers des serveurs externes, n\'utilise ni analytique ni traçage, ne se connecte à aucune base de données et ne partage rien avec des tiers.'] },
                { icon: 'fa-link', title: 'Liens de partage', p: ['Le lien de partage et le lien de rapport en lecture seule encodent votre visite dans le lien lui-même. Les données ne sont jamais téléversées, mais le lien les contient : traitez-le comme le document qu\'il représente.'] },
                { icon: 'fa-trash-alt', title: 'Supprimer vos données', p: ['Cliquez sur « Tout effacer », supprimez des entrées de la bibliothèque des biens enregistrés, ou effacez les données de site de ce domaine dans votre navigateur.'] },
                { icon: 'fa-envelope', title: 'Contact', p: ['Des questions ? Rendez-vous sur compyra.com ou écrivez à huiskeuring@compyra.com.'] }
            ]
        }
    }
};

/**
 * Detect the best supported language from the browser settings.
 * Falls back to DEFAULT_LANGUAGE when nothing matches.
 */
function detectBrowserLanguage() {
    const codes = SUPPORTED_LANGUAGES.map(l => l.code);
    const candidates = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE];

    for (const candidate of candidates) {
        if (!candidate) continue;
        const base = String(candidate).toLowerCase().split('-')[0];
        if (codes.includes(base)) {
            return base;
        }
    }
    return DEFAULT_LANGUAGE;
}
