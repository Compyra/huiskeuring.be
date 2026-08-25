# FEATURES — suggested and often-requested features

What users of house-viewing checklists ask for most, mapped against what
huiskeuring.be already has. Ordered by expected value for a buyer standing in
a house with a phone in one hand.

Status legend: 💡 idea · 🔜 planned (see [todo.md](todo.md) backlog) · ✅ shipped

## Already shipped (for reference)

- ✅ 230-item checklist with a plain-language *why* per item, EN/NL/FR
- ✅ Regional legal deadlines (VL/WAL/BXL) with official sources, verified per
  half-year — see [FACTCHECK.md](FACTCHECK.md)
- ✅ Official lookups page: type the address once, open cadastre, flood, soil,
  zoning, permits, heritage and air-quality tools (`lookup/`)
- ✅ Seller question sheet, deadline reminders (.ics), read-only share link,
  side-by-side comparison of saved properties, JSON backup, print variants
- ✅ 8 themes incl. high-contrast; zero tracking; everything client-side

## Top requests, highest value first

1. 🔜 **Photo attachments per issue** — the single most requested feature for
   viewings. Store in IndexedDB, thumbnail in the report, include in the JSON
   export. Watch the share-link size: photos cannot go in the URL, so the
   read-only link needs a "without photos" mode.
2. 🔜 **Offline PWA** — a cellar has no signal. Service worker + cache
   manifest + install prompt. The app is already fully client-side, so this is
   packaging, not architecture.
3. 🔜 **Deal-breaker scoring** — weight items by severity so the report opens
   with the three findings that should worry the buyer most, instead of a flat
   count of issues.
4. 🔜 **Renovation cost estimator** — attach an indicative price range per
   issue, sum the ticked ones into a negotiation figure, index yearly to ABEX.
   Needs a visible "indicative only" disclaimer to stay honest.
5. 🔜 **Proper PDF export** — the browser print dialog confuses non-technical
   users; a real PDF also survives being e-mailed to a co-buyer or notary.
6. 💡 **Negotiation summary page** — one printable page: issues, indicative
   cost, resulting suggested offer. Pairs with 3 and 4.
7. 💡 **Second-opinion mode** — two people inspect the same property on their
   own phones and merge the two share links into one report showing where they
   disagree.
8. 💡 **Import from a listing URL** (Immoweb/Immovlan) to pre-fill address,
   price and EPC label. Fragile (scraping), so treat as best-effort paste-help.
9. 💡 **Municipality enrichment** — from the postal code, deep-link to the
   commune's planning department and the flood map for the exact address
   (extends the existing lookup page).
10. 💡 **Seasonal hints** — damp shows after rain, overheating in summer, cold
    bridges in winter: suggest what a second visit at a better moment would
    reveal.

## Language & accessibility

- 🔜 **German (Eastern Cantons)** — the engine is ready: add a `de` block to
  `TRANSLATIONS`, `HELP_CONTENT`, `BUYING_GUIDE`, `FAQ_CONTENT`, a
  `js/checklist.de.js`, `de` fields in `legal.js`/`links.js`, and hreflang
  entries.
- 💡 **Dyslexia-friendly typography option** on top of the Paper/Linen themes.
- 💡 **Screen-reader audit with NVDA + VoiceOver** — automated checks pass,
  but nothing replaces a real run-through.

## SEO & reach

- 💡 **HowTo structured data** for the buying guide (FAQPage already ships).
- 💡 **Backlink outreach** to notary, consumer and housing organisations —
  the tool is free and unbranded enough to be linkable.
- 💡 **Per-topic landing pages** (e.g. "renovatieverplichting uitgelegd") that
  deep-link into the checklist — high-intent search traffic.

## Explicitly rejected (and why)

- ❌ **Accounts / cloud sync** — the zero-tracking, no-server promise is the
  product. JSON export + share links cover the need.
- ❌ **Aggregate statistics** ("72% of visitors find electrical issues") —
  requires telemetry; contradicts the privacy promise. A manual survey could
  answer the same question.
- ❌ **Automated valuation** — liability and accuracy problems; the tool
  documents condition, it does not price houses.
