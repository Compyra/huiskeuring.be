# FEATURES — suggested and often-requested features

What users of house-viewing checklists ask for most, mapped against what
huiskeuring.be already has. Ordered by expected value for a buyer standing in
a house with a phone in one hand.

Status legend: 💡 idea · 🔜 planned (see [todo.md](todo.md) backlog) · ✅ shipped

## Already shipped (for reference)

- ✅ 230-item checklist with a plain-language *why* per item, EN/NL/FR
- ✅ **Quick check mode** — the 37 highest-impact points for a first viewing,
  switchable with the full checklist, position-stable item ids
- ✅ Regional legal deadlines (VL/WAL/BXL) with official sources, verified per
  half-year — see [FACTCHECK.md](FACTCHECK.md)
- ✅ Official lookups page incl. **municipality search** from the address (`lookup/`), with **access badges** (OSINT · free vs eID / itsme) per tool and **53 official/free tools** across 8 groups (maps incl. Bing/Apple/Earth-history/Mapillary/topo, parcel, **prices & market** (Statbel, notary barometer, Biddit), water & sewage incl. operators, soil, planning & heritage in all 3 regions, environment incl. solar/energy/radon/Seveso/antennas, neighbourhood incl. fibre, grid operators, roadworks, stats, schools & childcare)
- ✅ **Per-tool findings** on the lookup page - one line per source ("P-score C"), stored in the state, listed as **Address research** in the report, the PDF and shared report links
- ✅ **Header menu** - secondary actions grouped under one Menu button in four labelled sections (visit / data / lookups & info / display); Report and Share stay primary
- ✅ **Self-collapsing property card** - once the address is filled in and focus leaves the form, only an address bar with a jump-to-lookups link remains
- ✅ **Photo attachments per item** — stored in IndexedDB on-device, thumbnails + lightbox, included in print & PDF, honest "not in share links" hint (`js/photos.js`)
- ✅ **Deep links** — `?lang` `?type` `?region` `?view=quick`, `#cat-<category>`, `#item-<id>`, `lookup/?address=&region=` — see [OUTREACH.md](OUTREACH.md) for how to use them
- ✅ **Floating quick-action rail** on large screens (top, progress, report, share, save, help)
- ✅ **"How it works" first-steps strip** — dismissible 1-2-3 explainer on the main page
- ✅ **Offline PWA** — service worker precaches the whole shell (`sw.js`)
- ✅ **PDF export** — vendored jsPDF, lazy-loaded on first use
- ✅ **Renovation cost estimator + negotiation summary** — indicative bands per
  area (`COST_BANDS` in `js/legal.js`), printable one-pager
- ✅ **Second-opinion mode** — paste the other viewer's share link, see where
  you disagree
- ✅ **Paste-from-listing import** — address, price and EPC parsed client-side
- ✅ **Seasonal hints** — what this season shows and hides, dismissible
- ✅ **Easy-reading (dyslexia-friendly) mode** — typography toggle, persisted
- ✅ Seller question sheet, deadline reminders (.ics), read-only share link,
  side-by-side comparison **with saved history per address**, JSON backup
- ✅ 8 themes incl. high-contrast; zero tracking; everything client-side
- ✅ SEO: FAQPage + **HowTo** structured data, hreflang, canonical, font preloads

## More lookup sources to add when they verify

The link checker only admits URLs that answer HTTP 200 to a plain client;
these are useful but currently bot-blocked or unstable - retry each review:

- 🔜 **Solarclick / Brussels solar map** (`solarclick.be` blocks plain clients)
- 🔜 **V-test (VREG)** (`vreg.be` blocks plain clients; CREG Scan covers the need federally)
- 🔜 **Cartesius historical maps** (`cartesius.be` currently serves a **revoked TLS certificate** - re-check at the next review; NGI's topo viewer covers part of the value)
- 🔜 **VMM sewer & rainwater pages** (deep vmm.be paths intermittently refuse)
- 🔜 **Hinder in Kaart** (Flemish roadworks portal; GIPOD covers it meanwhile)
- 🔜 **Crime statistics** (`stat.police.be` unreachable to plain clients)
- 💡 **Walloon solar map layer** (WalOnMap has one - needs a stable deep link)
- 💡 **Noise maps per region** (environment agencies publish Lden/Lnight maps)
- 💡 **Mobility score** (public-transport reach per address, e.g. De Lijn/STIB/TEC stop finders - all bot-block today)
- 💡 **Immo price statistics** (Statbel publishes median sale prices per municipality - CSV, could ship as a local dataset)

## Top requests, highest value first

1. ✅ **Photo attachments per issue** — shipped: IndexedDB storage, per-item
   camera button (phones offer camera natively), thumbnails in the report,
   photos embedded in the PDF export. Share links stay text-only by design.
2. 💡 **Deal-breaker scoring** — weight items by severity so the report opens
   with the three findings that should worry the buyer most, instead of a flat
   count of issues.
3. 💡 **Voice notes** — dictate a note per item with the Web Speech API while
   holding the phone; falls back to typing where unsupported.
4. ✅ **Photo annotations** — pen, arrow and circle tools in the lightbox;
   strokes are flattened into the JPEG so reports, PDFs and thumbnails need
   no special handling.
5. ✅ **Room-by-room visit mode** (`/visit/`) — pick the room you are in,
   tick which installations it has (water, electricity, heating, structure,
   asbestos) and only the matching checks appear; everything syncs with the
   main checklist state, including notes and photos. Deep-linkable
   (`?room=bedroom&features=plumbing,electrical`).
6. 💡 **Cost-band editor** — let users adjust the indicative renovation bands
   to current quotes; store locally, never claim market accuracy.
7. 💡 **EPC photo import** — point the camera at the EPC label page and parse
   the label + kWh/m² client-side (OCR via WASM tesseract is ~2 MB — weigh
   against the no-bloat principle).

## Language & accessibility

- 🔜 **German (Eastern Cantons)** - the engine is ready: add a `de` block to
  `TRANSLATIONS`, `HELP_CONTENT`, `BUYING_GUIDE`, `FAQ_CONTENT`, a
  `js/checklist.de.js`, `de` fields in `legal.js`/`links.js`, and hreflang
  entries.
- 💡 **Screen-reader audit with NVDA + VoiceOver** - automated checks pass,
  but nothing replaces a real run-through.

## SEO & reach

- ✅ **Backlink outreach plan** — targets, angles, deep links and mail
  templates in [OUTREACH.md](OUTREACH.md); execution is a human job.
- 💡 **Per-topic landing pages** (e.g. "renovatieverplichting uitgelegd") that
  deep-link into the checklist - high-intent search traffic.
- 💡 **Embeddable widget** — a one-line `<iframe>`/`<script>` snippet so
  housing sites can embed the quick check; every embed is a live backlink.

## Explicitly rejected (and why)

- ❌ **Accounts / cloud sync** — the zero-tracking, no-server promise is the
  product. JSON export + share links cover the need.
- ❌ **Aggregate statistics** ("72% of visitors find electrical issues") —
  requires telemetry; contradicts the privacy promise. A manual survey could
  answer the same question.
- ❌ **Automated valuation** — liability and accuracy problems; the tool
  documents condition, it does not price houses.
