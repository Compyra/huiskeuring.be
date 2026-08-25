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
- ✅ Official lookups page incl. **municipality search** from the address (`lookup/`)
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

1. 🔜 **Photo attachments per issue** — the single most requested feature for
   viewings. Store in IndexedDB, thumbnail in the report, include in the JSON
   export. Watch the share-link size: photos cannot go in the URL, so the
   read-only link needs a "without photos" mode.
2. 💡 **Deal-breaker scoring** — weight items by severity so the report opens
   with the three findings that should worry the buyer most, instead of a flat
   count of issues.

## Language & accessibility

- 🔜 **German (Eastern Cantons)** - the engine is ready: add a `de` block to
  `TRANSLATIONS`, `HELP_CONTENT`, `BUYING_GUIDE`, `FAQ_CONTENT`, a
  `js/checklist.de.js`, `de` fields in `legal.js`/`links.js`, and hreflang
  entries.
- 💡 **Screen-reader audit with NVDA + VoiceOver** - automated checks pass,
  but nothing replaces a real run-through.

## SEO & reach

- 💡 **Backlink outreach** to notary, consumer and housing organisations -
  the tool is free and unbranded enough to be linkable.
- 💡 **Per-topic landing pages** (e.g. "renovatieverplichting uitgelegd") that
  deep-link into the checklist - high-intent search traffic.

## Explicitly rejected (and why)

- ❌ **Accounts / cloud sync** — the zero-tracking, no-server promise is the
  product. JSON export + share links cover the need.
- ❌ **Aggregate statistics** ("72% of visitors find electrical issues") —
  requires telemetry; contradicts the privacy promise. A manual survey could
  answer the same question.
- ❌ **Automated valuation** — liability and accuracy problems; the tool
  documents condition, it does not price houses.
