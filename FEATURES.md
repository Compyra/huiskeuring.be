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
- ✅ Official lookups page incl. **municipality search** from the address (`lookup/`), with **access badges** (OSINT · free vs eID / itsme) per tool and **22+ official tools** across 7 groups (maps, parcel, water, soil, planning, environment, neighbourhood)
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

## Top requests, highest value first

1. ✅ **Photo attachments per issue** — shipped: IndexedDB storage, per-item
   camera button (phones offer camera natively), thumbnails in the report,
   photos embedded in the PDF export. Share links stay text-only by design.
2. 💡 **Deal-breaker scoring** — weight items by severity so the report opens
   with the three findings that should worry the buyer most, instead of a flat
   count of issues.
3. 💡 **Voice notes** — dictate a note per item with the Web Speech API while
   holding the phone; falls back to typing where unsupported.
4. 💡 **Photo annotations** — draw an arrow/circle on an attached photo
   (canvas overlay) to mark the crack you mean.
5. 💡 **Room-by-room visit mode** — a "next room" wizard that walks the visit
   in a sensible order with a per-room progress ring, for first-time viewers.
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
