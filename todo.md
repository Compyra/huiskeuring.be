# huiskeuring.be - Working log, backlog and ideas

> **Mission:** be the go-to resource for anyone buying or viewing a house in Belgium -
> fast, trustworthy, multilingual, accurate per region, and genuinely helpful.

**Live:** <https://huiskeuring.be/> · **Source of truth for legal facts:** `js/legal.js`

Companion files: [FACTCHECK.md](FACTCHECK.md) (fact register per topic/region/source)
and [FEATURES.md](FEATURES.md) (suggested and often-requested features).

---

## 1. Original brief (kept for reference)

1. **Multilingual** - EN / NL / FR, auto-detection, easy switcher, culturally adapted.
2. **Exceptional SEO** - Core Web Vitals, structured data, meta tags, Belgian buyer intent.
3. **UX excellence** - mobile-first, fast, WCAG 2.1 AA, clear journey.
4. **Themes** - multiple professional themes, system detection, manual override, persistence.
5. **Accurate, up-to-date information** - audits, official sources, version control on changes.
6. **Official resources** - cadastre, flood maps, guaranteed housing insurance, EPC, portals, municipal rules.
7. **Key sections** - buying guide, what to look for, legal requirements, good to know, regional guides, resource library, FAQ.
8. **Technical stack** - performant, SEO-friendly, secure.

---

## 2. File map (after the pass-2 split)

| File | Purpose | Review cadence |
|------|---------|----------------|
| `index.html` | Checklist app, SEO metadata, structured data, static help content | on change |
| `report.html` | Shareable **read-only** report page | on change |
| `compare.html` | **Side-by-side property comparison** | on change |
| `lookup/` | **Address-driven links to official registries** (`index.html` + `lookup.js`) | on change |
| `style.css` | All styling, 6 themes, responsive rules, print stylesheets | on change |
| `js/i18n.js` | UI strings EN/NL/FR, buying guide, FAQ, language detection | on change |
| **`js/legal.js`** | **Legal facts, deadlines and amounts per region + `lastVerified`** | **every 6 months** |
| **`js/links.js`** | **Every external URL in the project, incl. `LOOKUP_TOOLS`** | **every 6 months** |
| `js/checklist.js` | Checklist items (English source) + `why` explanations | on change |
| `js/checklist.nl.js` | Dutch item translations, keyed by item id | on change |
| `js/checklist.fr.js` | French item translations, keyed by item id | on change |
| `js/core.js` | Shared runtime: escaping, storage, i18n, themes, region, state, share links, library | on change |
| `js/app.js` | Checklist page logic | on change |
| `js/report.js` | Read-only report page logic | on change |
| `js/compare.js` | Comparison page logic | on change |
| `sw.js` | Offline service worker - `VERSION` must match `?v` | on every release |
| **`tools/verify.ps1`** | **Automated pre-release verification, 11 checks** | **before every release** |
| `assets/fonts/`, `assets/webfonts/`, `assets/vendor/` | Self-hosted fonts and icons | on version bump |
| `assets/LICENSES.md` | Third-party licence attribution | on version bump |
| `site.webmanifest`, `robots.txt`, `sitemap.xml` | PWA + search engine directives | on change |

**Rule:** no legal rule, deadline, tax rate or external URL may live anywhere except
`js/legal.js` and `js/links.js`. That is what makes the 6-month review tractable.

---

## 3. Changelog

### 2026-08-28 - Pass 19: checklist size in the top bar, property type in the menu + first-visit chooser

Cache **v23 → v24**.

- **"Checklist size" moved to the top bar** as a segmented control
  (Full checklist | Quick check) between the primary actions and the
  language/theme selects; full-width row inside the mobile drawer. The
  quick-mode hint remains on the page, now just above the filters. The
  page section (title + buttons + two dividers) is gone.
- **"Property type" moved into the header menu** as its own first section
  (House / Apartment, accent-highlighted active state). Existing document-
  wide listeners and syncs kept working unchanged - every surface
  (menu, first-visit chooser) stays in sync.
- **First-visit chooser**: new visitors now get a small "What are you
  viewing?" modal (two large icon buttons + "you can change this later via
  the menu") *before* the help introduction; choosing - or dismissing -
  chains into the help modal. Skipped for share links and deep-link hashes,
  never shown again afterwards (verified). +2 i18n keys ×3 (352/language).
- **Real SW bug found while testing and fixed**: `cache.addAll(SHELL)`
  fetched through the HTTP cache, so a *new* service-worker version could
  re-precache a stale `index.html` from disk cache. Install now uses
  `Request(url, { cache: 'reload' })`, guaranteeing every new version
  precaches fresh bytes.

Verified on a fresh origin: chooser→help chain with apartment applied
(204 items) and all surfaces synced; header toggle switches 234↔33 items
with hint; menu switch back to house; no modals for returning visitors;
NL labels (Volledige checklist/Snelle check, Type woning, Wat gaat u
bezichtigen?); old page sections gone; mobile drawer segment full-width,
0 overflow; 0 console errors; all verifier checks pass.

---

### 2026-08-28 - Pass 18: symmetric container padding next to the quick-action rail

The 84 px right padding that keeps content clear of the floating rail
(compact mode ≥ 1200 px, normal mode 1200-1560 px) is now **mirrored on the
left**, so the content stays centred instead of hugging the left edge.
Verified at 1152 / 1536 / 1760 CSS px in both modes: padding symmetric
everywhere (84/84 where the rail reserves room, 10/10 resp. 15/15 outside
those ranges), rail still clear of the content, zero overflow, zero console
errors. Cache bump **v22 → v23**; all verifier checks pass.

---

### 2026-08-25 - Pass 17: absence = red issue, rent estimators, triple check

#### Confirmed absence is now a red ISSUE (report included)
A confirmed "no heating / no electricity / no water here" is a **defect**,
not a side note. Answering "correct - there is none" now:
- marks the matching checklist item as an **issue** (red) - matched on the
  stable English source text (`ABSENCE_ISSUE_MATCH`: heating → *"Test the
  heating system in every room"*, electrical → *"enough circuits and sockets
  per room"*, water → *"Test waterdruk"*);
- writes the absence line into **that item's note** ("Slaapkamer 2: geen
  verwarming aanwezig."), so the report's *Issues* section shows it in red
  with context - also in the PDF and share links;
- records an instance tick so the issue **persists while any room copy**
  still has the absence (undo removes only that room's line; the issue
  clears only when no absences remain). Fixed during testing: the stored
  note line is now saved verbatim with the absence marker, so undo still
  matches after adding rooms or switching language.

#### Official lookups: rent estimators complete the picture (64 tools)
All three official rent references verified and added to *Prices & market*:
**Huurschatter** (VL), **loyers.brussels** grid (BXL), **loyerswallonie.be**
grid (WAL) - the honest yield check for buy-to-let. Rejected: `elia.be`
(bot-blocked), `huurschatter.vlaanderen.be` (redirect host refuses; the
`www.huurschatter.be` entry works), Fluxys (KLIM-CICC covers pipelines).
Verdict on completeness: maps (7 incl. history), parcel/ownership, prices &
rents (7), water/sewage incl. all three operators, soil, planning & heritage
per region, environment (air, radon, Seveso, solar, energy, antennas,
earthquakes, climate), neighbourhood (fibre ×3, grid operators ×3, roadworks
×3, stats ×2, schools ×2, childcare, cables & pipes ×2, energy regulators
×3) - every linkable official/free source we could verify is in;
the bot-blocked remainder is tracked in FEATURES.md.

#### Triple check (bug / view / language)
- **Bug**: absence round-trips incl. the two-bedroom + undo-after-add-room
  regression (fixed, see above); reset clears everything; 0 console errors
  throughout.
- **View**: 5 pages × 5 widths (320/375/768/1024/1536) = **25/25 zero
  horizontal overflow**.
- **Language**: DOM-wide scan (EN/NL/FR × index+lookup+visit, help modal
  open) for unreplaced `{placeholders}`, `undefined`/`null` leaks and raw
  i18n keys → only brand names flagged (allowed). Found & fixed real
  grammar bugs: FR *"pas de eau"* → strings reworked to elision-safe forms
  (« électricité ». Cette pièce n'en a pas ? / Chambre 1 : sans chauffage.)
  and EN to quote-style ("no "electrical"" → *You did not select
  "electrical". Is there none in this room?*). NL was already correct.

All 11 verifier checks pass, **145 external links HTTP 200**,
i18n 350 keys/language, links.js 270 strings/language.

---

### 2026-08-25 - Pass 16: missing-feature prompts + multiple rooms of the same type

Cache version bumped **v21 → v22** everywhere. No new external URLs.

#### "You didn't select heating - is there no heating in this room?"
Each room type now declares its *expected* installations
(`EXPECTED_FEATURES`: bathroom → water+electricity+heating, bedroom/living →
electricity+heating, kitchen → water+electricity, basement → electricity).
For every expected feature the user did **not** select, a true/false prompt
appears above the checks:
- **"Correct - no heating here"** → the absence is recorded per room copy
  and written as a line into the general notes
  ("Slaapkamer 2: geen verwarming aanwezig.") so it lands in the **report,
  PDF and share links**; the prompt collapses to a ✓-chip with an undo that
  also removes the note line.
- **"There is heating - show those checks"** → activates the feature chip
  (and clears a previously noted absence, since that would contradict it).

#### Second / third / fourth bedroom
The selected room gets an **instance bar**: `Slaapkamer 1 · Slaapkamer 2 · +`.
Every extra copy keeps its own walking record (OK/issue per point) in
device-local storage (`visitInstanceTicks`), deliberately **not** in the
shared state. The main checklist keeps one shared answer per item with an
explicit, verified rule: **an issue found in any room copy wins** over an OK
elsewhere (aggregation recomputed on every tick). Instance 1 shows the
shared answers directly. Absence prompts are answered per room copy; the
note line carries the copy number when there is more than one. Deep link
extended with `&n=2`; a `?n=` beyond the known count creates the copies.
*Reset All* on the main page now also wipes both visit-local maps. A second
hint line explains the walking-aid semantics in all three languages.

Verified in the browser: bedroom shows the two expected-feature prompts and
`Bedroom 1 · +`; confirm-absence → chip + general-notes line + toast; undo
removes the line; "there is electrical" activates the chip and the URL;
`+` creates Bedroom 2 (header "… 2", `n=2` in the URL); issue in copy 2 →
global issue; OK on the same item in copy 1 → **global stays issue**
(issue-anywhere-wins confirmed); NL strings correct incl.
"Slaapkamer 2: geen verwarming aanwezig."; the absence reaches the report;
Reset clears both local maps; 0 px overflow at 320 px; 0 console errors.
i18n **350 keys/language**; all 11 verifier checks pass.

---

### 2026-08-25 - Pass 15: room-by-room visit mode, photo annotation, 7 more sources

Cache version bumped **v20 → v21** in all HTML pages and `sw.js` (which now
also precaches `/visit/`).

#### Room-by-room visit mode (new page `visit/`)
The requested walk-through flow: pick the room you are standing in
(7 rooms), tick which installations it has (water, electricity, heating,
structure, asbestos) and **only the matching checks appear** - e.g.
*bedroom + water* for a bedroom with a sink shows the bedroom checks plus
the plumbing checks (verified: 30 items). Everything reads/writes the
**same inspection state and item ids** as the main checklist: ticks, notes
and photos made here appear there, in the report and in the PDF instantly
(verified end-to-end). Full item UI: OK/issue, why-explanations, notes,
photos incl. annotation. Deep-linkable (`?room=bedroom&features=plumbing`,
URL kept in sync), translated ×3 (room/feature labels reuse the `tag.*`
keys), indexed + in the sitemap + SW shell, focus-refresh when returning
from another tab, 0 overflow at 320/360 px.

#### Photo annotation
New in the photo lightbox on both index and visit: **pen, arrow and circle**
tools (red with white glow, stroke width scales with photo size), undo,
cancel, save. Saving **flattens the strokes into the JPEG** in IndexedDB, so
thumbnails, report, print and PDF need zero extra handling. Pointer-events
based (mouse/touch/pen), coordinates scaled canvas↔natural size. Lightbox
wiring moved from app.js into photos.js so both pages share it.

#### 7 more verified sources (60 tools total)
| Tool | Regions | Group |
|---|---|---|
| KLIP cables & pipes | VL | neighbourhood |
| KLIM-CICC cables & pipes | WAL+BXL | neighbourhood |
| CREG (CREG Scan energy contracts) | all | neighbourhood |
| Brugel · CWaPE (regional energy regulators) | BXL / WAL | neighbourhood |
| Seismology (Royal Observatory) | all | environment |
| RMI climate statistics | all | environment |

`vreg.be` (V-test) added to the blocked list in FEATURES.md. Card counts
now **VL 38 · WAL 32 · BXL 32**; every card keeps its finding input.

Verified in the browser: bedroom+water story, ticks/notes/photos sync to
index + report, annotation flattens (stored JPEG changes, toast, mode
exits), deep link + NL labels, room-off clears cleanly, chips at 320/360 px,
60 unique tool ids, 0 console errors. All **142 external links 200**,
i18n **342 keys/language**, links.js **264 strings/language**, all 11
verifier checks pass (visit files registered in every enumeration + byId
pairs incl. the shared photos.js).

---

### 2026-08-25 - Pass 14: complete pre-release bughunt - GO for publication

Full-surface audit before going public. Two release gaps found and fixed,
everything else verified clean.

#### Fixed
| # | Issue | Fix |
|---|-------|-----|
| 1 | **No 404 page** (GitHub Pages serves its own otherwise) | New `404.html`: JS-free by design, trilingual inline, themed pre-paint, links back to checklist & lookups, `noindex`, added to the SW shell, exempted from verifier check 10 like `<noscript>` |
| 2 | **compare.html sat in the sitemap while being `noindex`** - the classic Search Console complaint | removed from `sitemap.xml` (page stays linked & crawlable-but-noindex) |

#### Verified end-to-end in the browser (0 console errors throughout)
- **Fresh-user journey**: first-visit help → address `4000 Liège` → region
  auto-detect (wallonia) → card auto-collapses to address bar with lookup
  link → OK/issue/note/doc-request ticks → photo attach → all 5 menu modals
  open → readable + compact toggles from the menu.
- **Findings loop**: lookup (region followed the state) → BDES finding →
  report modal shows all 8 sections in order (documents, address research,
  issues, unchecked, notes, photos) → PDF 6 pages/51 KB with photo →
  negotiation 1 row → 537-char share link → report.html shows research +
  issues → library save → compare table renders.
- **Data safety**: JSON export/import round-trip preserves notes, findings
  and address; second opinion finds the 1 planted difference; .ics valid
  with 1 event.
- **Print**: exactly 1 modal visible, research section included, rail +
  header hidden.
- **UI matrix**: quick mode 34 items; FR menu sections/labels; all 7 fixed
  themes paint header menu tokens; 0 px overflow at 320/360/768/1024/1280
  on index + lookup; `#cat-electrical` deep link flashes.
- **Offline**: all 33 SW shell entries fetch OK at v20.
- **Hygiene**: no console.log/TODO/FIXME in shipped JS; robots.txt +
  sitemap consistent; report noindex,nofollow; canonicals correct;
  all 135 external links HTTP 200; 326 i18n keys ×3; legal facts verified
  2026-08-25, next review 2027-02-25.

**Verdict: ready to publish.** Deploy = commit + push; then test SW
installability once on the live HTTPS domain (the embedded test browser
cannot complete `serviceWorker.register()`).

---

### 2026-08-25 - Pass 13: every remaining source - 19 new lookup tools (53 total)

Systematic sweep for anything a buyer can still consult about an address;
every URL verified HTTP 200 with the plain client before inclusion. New
**Prices & market** group added (`lookup.group.prices` ×3).

| Tool | Regions | Group |
|---|---|---|
| Google Earth (auto, time slider!) · Mapillary | all | maps |
| **Statbel property prices** · **Notary barometer** · **Biddit auctions** | all | *new:* prices & market |
| Walloon flood portal (inondations.wallonie.be) | WAL | water |
| Aquafin sewer works | VL | water |
| OpenPermits · Brussels heritage inventory | BXL | planning |
| Walloon heritage agency (AWaP) | WAL | planning |
| Flemish energy map · BIPT antenna-site map | VL / all | environment |
| Fluvius · ORES · Sibelga (grid operators) | VL / WAL / BXL | neighbourhood |
| Provinces-in-figures · WalStat (official stats) | VL / WAL | neighbourhood |
| FR-community school directory · Kind en Gezin childcare | WAL+BXL / VL | neighbourhood |

Rejected this pass: `lampspw.wallonie.be` heritage inventory and
`census2021.be` (plain-client blocked; AWaP resp. Statbel cover the need).
Card counts per region: **VL 34 · WAL 28 · BXL 28**; every card keeps its
finding input feeding the report's Address-research section.

Verified: 53 unique tool ids, 0 duplicate ids, all groups valid, Google
Earth auto-URL builds correctly with the address, NL group titles render,
0 overflow at 320 px, 0 console errors, all **135 external links 200**,
i18n **326 keys/language**, links.js **250 strings/language**.
(Correction: the pass-12 entry said "23 total" - that was the Flemish card
count; the tool total then was 34.)

---

### 2026-08-25 - Pass 12: header menu, self-collapsing property card, 12 new lookups, findings in the report

Cache version bumped **v19 → v20** in all four HTML pages and `sw.js`.

#### Header menu
Secondary actions moved under one **Menu** button with four labelled
sections: *During the visit* (Questions, Reminders), *Your data* (Backup,
Compare, Reset), *Lookups & information* (Official lookups, Resources, Help)
and *Display* (Easy reading, Compact). **Report and Share stay primary**;
language and theme selects stay visible. Dropdown on desktop (outside click,
Escape and item-click close it; caret rotates; `aria-haspopup`/`aria-expanded`),
expands **in place inside the mobile drawer** (`position: static`), and the
menu button is excluded from the drawer's close-on-click list so it can toggle
its own panel.

#### Self-collapsing property card
Once an address is filled in and focus leaves the form, the property card
collapses to a single bar: **the address plus a jump-to-lookups link**
(`lookup/?address=…`). Also collapses on load whenever an address exists
(unless the user explicitly expanded before - stored `'false'` wins).
Re-expanding by hand disables auto-collapse for the rest of the visit.

#### Official lookups: 12 new tools (34 total)
| Tool | Regions | Group |
|---|---|---|
| Bing Maps · Apple Maps (auto) | all | maps - independent aerial imagery |
| NGI topographic viewer | all | maps - relief & runoff |
| SPGE (PASH sewage zoning) | WAL | water |
| Vivaqua (water & sewers) | BXL | water |
| Solar map (zonnekaart) | VL | environment |
| Fiberklaar · Wyre | VL | neighbourhood - fixed networks |
| Unifiber | WAL | neighbourhood - fibre |
| GIPOD roadworks | VL | neighbourhood - works in the street |
| Osiris roadworks | BXL | neighbourhood |
| Trafiroutes | WAL | neighbourhood |

Dropped during verification: **Cartesius** (serves a *revoked TLS
certificate* - recorded in FEATURES.md for re-checking), solarclick.be and
deep vmm.be paths (bot-blocked). All **119 external links verify 200**.

#### Findings → report ("add a location to collect this info")
Every lookup card now has a **one-line finding input** ("P-score C…"). Values
live in the shared state (`state.lookupNotes`, keyed by tool id - stable
across schema bumps), survive re-renders and language switches, and appear as
a new **Address research (official lookups)** section in the report modal,
the **PDF export**, and **shared report links** (encoded as `l`).

#### Verified in the browser
Menu: 4 sections (2/3/3/2 buttons), opens/closes via button, outside click,
Escape and item-click; Escape priority order menu → modal → drawer; mobile
drawer expands inline, closes both layers on item click · property card
auto-collapses on focus-out with address bar + working lookup deep link,
manual expand sticks · findings: typed on lookup → localStorage → report
modal section (2 items) → PDF (7 pages) → shared report.html section (2
items, after v20 bump) → still shown back on the lookup page · 0 page
overflow at 320 px on index and lookup · 0 console errors.
i18n: **325 keys/language**; links.js **212 strings/language**.

---

### 2026-08-25 - Pass 11: bughunt on the pass-10 features

Seven issues found by code audit + browser verification, all fixed:

| # | Issue | Fix |
|---|-------|-----|
| 1 | Deep link to an item hidden by a **persisted category filter** landed nowhere (target had `display:none`) | `deepLinkEnsureVisible()` resets the category/issue filters when the target is hidden |
| 2 | Same with **"Show unchecked"** active and a checked target item | same fix, `showUncheckedOnly` cleared and button synced |
| 3 | Malformed hash (`#item-%`) threw `URIError` from `decodeURIComponent` | try/catch, deep link ignored |
| 4 | **Hidden rail was keyboard-focusable** (`opacity:0` + `pointer-events:none` don't remove tab stops) - invisible focus for keyboard/AT users, also while a modal was open | `visibility: hidden` with a transition-delay, matching the scroll-to-top pattern |
| 5 | Rail **overlapped the content edge** on 1200-1560 px screens (and always in compact mode, which is full-width) | reserve `padding-right: 84px` on `.main-content .container` in exactly those ranges |
| 6 | **Compact mode wasn't compact**: the photo row kept full-size buttons/thumbs while tags and notes collapse | compact-specific sizes (34 px thumbs, smaller button) |
| 7 | PDF: a photo **caption could orphan** at a page bottom with its image on the next page | page-break pre-check keeps caption + image together |

Also: the photo **count is now in the button's accessible name**
("Add photo (2)" / "Foto toevoegen (2)" / "Ajouter une photo (2)"), not just a
visual badge.

Verified in the browser: deep link beats persisted filter + show-unchecked
(filter buttons re-synced), malformed hash loads clean, rail unfocusable when
hidden / focusable when shown, content clear of the rail at 1536 px in both
modes, compact thumbs 34px, PDF 7 pages / 53 KB with pagination pre-check,
NL aria labels correct, 0 console errors. All verifier checks pass.

---

### 2026-08-25 - Pass 10: photos, quick-action rail, deep links, clearer page, more lookups

Cache version bumped **v18 → v19** in all four HTML pages *and* `sw.js`
(which also precaches the new `js/photos.js`).

#### Photo attachments (new `js/photos.js`)
Every checklist item has a camera button. One shared
`<input type="file" accept="image/*" multiple>` drives it: phones and tablets
natively offer **camera or gallery**, a PC opens the **file explorer** - no
user-agent sniffing. Photos are downscaled to 1400 px JPEG (~150-400 KB) and
stored in **IndexedDB on-device**, max 6 per item. Thumbnails render under the
item with a lightbox (view + delete). The report modal appends a *Photos*
section (prints correctly), and the **PDF export embeds the images** scaled to
the page. Honest limits, stated in the UI: photos are never part of share
links or JSON backups. *Reset All* wipes them together with the state.

#### Floating quick-action rail
On screens ≥ 1200 px, scrolling past 400 px slides in a right-hand rail:
back-to-top, live progress %, generate report, share link, save to library,
help. Hidden while a modal is open, hidden in print, translated (3 languages),
`aria-label`led. The share handler was factored into `shareInspectionUrl()`
and reused by both the header and rail buttons.

#### Clearer standard page
- **"How it works" strip**: a dismissible 1-2-3 explainer (address → tick &
  photograph → report/PDF/share) at the top of the checklist; dismissal is
  persisted (`howItWorksDismissed`).
- **Header buttons regrouped** into three labelled clusters with dividers:
  *actions* (Report & Share first, as primary), *display & language*
  (selects + easy reading + compact), and *reset + help* last - instead of
  14 controls in one undifferentiated row. In the mobile drawer the groups
  stack with full-width separators.

#### Deep links
- `?type=house|apartment`, `?region=<id>`, `?view=quick` presets applied on
  load (and persisted); `?lang` and `?data` already existed.
- `#cat-<category>` scrolls to and flashes a category header;
  `#item-<itemId>` scrolls to a single item - if quick mode hides that item,
  the view **falls back to the full checklist automatically** (bug found in
  testing: the target silently did not exist with `viewMode=quick` persisted).
- The first-visit help modal is skipped when a deep-link hash is present.
- `lookup/?region=` now overrides postal-code detection (`?address=` existed).

#### Official lookups: 6 new verified tools (22 total)
| Tool | Regions | Group |
|---|---|---|
| **Woningpas** (eID/itsme badge) | VL | parcel & ownership |
| **Radon risk map** (FANC/AFCN) | all | environment |
| **Seveso sites register** | all | environment |
| **BIPT broadband atlas** | all | *new group:* neighbourhood & daily life |
| **School finder** (onderwijs.vlaanderen) | VL | neighbourhood & daily life |
| **Brussels neighbourhood monitor** | BXL | neighbourhood & daily life |

`belgiantrain.be` was tried and dropped: NMBS 403-blocks non-browser clients,
so it can never pass the 6-monthly link verification. `stat.police.be` is
plain unreachable - crime stats stay out until an official source is linkable.

#### Backlink outreach
New [OUTREACH.md](OUTREACH.md): tiered target list (housing & consumer
organisations, media, communities), deep-link table per use case, NL/FR/EN
mail templates under 120 words, tracking table, and explicit no-paid-links
rules. FEATURES.md gained new ideas (voice notes, photo annotations,
room-by-room wizard, embeddable widget, deal-breaker scoring).

#### Verified in the browser (localhost, fresh origin)
Photos: attach 2 → thumbs + count, lightbox opens (JPEG), report shows
*Photos (2)* with caption, delete works, PDF = 6 pages / 51 KB **with the
image embedded**, reset clears IndexedDB · rail: appears >400 px scroll on
wide screens, hides at top/in modals/print/below 1200 px, progress % syncs,
all 6 buttons work · deep links: params + both hash forms + quick-mode
fallback + no first-visit modal over a deep link · header groups: 3 groups +
2 dividers, column layout in the burger drawer · NL/FR spot checks pass ·
language switch keeps thumbnails · 0 page overflow at 320/360 px · print
shows only the open modal incl. photos · 0 console errors throughout.
i18n: **316 keys/language** (+16), links.js 190 strings/language.

> Test-harness notes: the embedded browser reports CSS px (min-width media
> queries!) at devicePixelRatio 1.25, freezes rAF + scroll events and smooth
> scrolling in non-visible tabs, and cannot open native file choosers -
> stub `requestAnimationFrame`, dispatch `scroll` manually and inject `File`
> objects straight into the handler instead.

---

### 2026-08-25 - Pass 9: help-modal overflow, compact full width, lookup access badges

Cache version bumped **v17 → v18** in all four HTML pages *and* `sw.js`.

#### Help modal - no horizontal scrolling at any width
| Root cause | Fix |
|---|---|
| Desktop tab bar (`.help-tabs`) had no `flex-wrap`; at 1280 px the 8 tabs overflowed the 800 px modal by 193 px | `flex-wrap: wrap` + tighter gap |
| Long modal titles pushed the close button outside (h2 default `min-width: auto`) | `.modal-header h2` gets `flex: 1 1 auto; min-width: 0; flex-wrap: wrap`, `.close-btn` gets `flex: 0 0 auto` |
| Mobile tabs overflowed 6 px at 320 px | smaller tab padding + `min-width: 0` in the mobile media block |
| Sub-pixel/border artifacts (`border-left: 3px` on active items) still reported ~3 px scroll width | `.help-modal-content { overflow-x: hidden }` - chrome may never scroll horizontally; wide content scrolls inside `.modal-body` |
| Header chrome too large below 320 px | new `@media (max-width: 340px)` block shrinks header/body/footer padding |

Verified in the browser at **300, 320, 360, 414, 768, 1024, 1280 and 1600 px**
via the real first-visit flow (`localStorage.clear()` → modal auto-opens):
0 px clipped, close button and all tabs inside the card, 0 page scroll, 0
console errors at every width.

#### Compact view now uses the whole screen
`body.compact-mode .container` was `98%` wide but still capped at the normal
`max-width`. Now `width: 100%; max-width: none; padding: 0 10px`. Verified at
1920 px: container 1375 px (normal, capped) → **1528 px = full viewport** with
compact on, zero overflow.

#### Lookup page - access badges on every tool
Every card on `/lookup/` now shows **two** badges: an access badge
(**"OSINT · free"**, green outline - or **"eID / itsme"**, blue outline, for
login-gated tools) plus the existing auto/manual badge. Data lives in
`LOOKUP_TOOLS` (`js/links.js`) as `access: 'login'`; only MyMinfin is
login-gated today, everything else defaults to free. Strings
`lookup.freeBadge` / `lookup.loginBadge` added ×3 languages (i18n now **300
keys/language**). Verified on NL: 11 cards = 10 free + 1 login, 0 overflow at
320 px.

> **Testing traps (embedded browser, documented for the future):** the SW's
> `ignoreSearch` fallback serves stale CSS on `127.0.0.1` during dev
> iteration and `serviceWorker.register()`/`unregister()` never settle - test
> fresh CSS on `http://localhost:<port>` (different origin, no SW).

All 11 verifier checks pass, including all 102 external links.

---

### 2026-08-25 - Pass 8: quick check, offline, PDF, negotiation and easy reading

Everything below shipped in one pass; all 11 verifier checks pass and each
feature was exercised in the browser (results in the table at the end).

#### Quick check ↔ full checklist
`QUICK_CHECK_IDS` in `js/checklist.js` marks the 37 highest-impact points
(34 visible for a house, apartment red flags included for flats). The toggle
above the property-type buttons filters **rendering only** - item ids stay
position-based, ticks made in one mode survive in the other, and the progress
bar counts the visible subset. `state.viewMode` persists locally but is not
encoded into share links.

#### New features
| Feature | Where | Notes |
|---|---|---|
| **Offline PWA** | `sw.js` + registration in `core.js` | Precaches the 32-entry shell, cache-first, stale-`?v` fallback via `ignoreSearch`, navigation fallback to `index.html`. **Bump `VERSION` in `sw.js` together with `?v` at every release.** |
| **PDF export** | report modal → `exportPdf()` in `app.js` | jsPDF 2.5.2 vendored (`assets/vendor/`, MIT, in LICENSES.md), lazy-loaded on first click; text-based A4 report with page numbers. Verified: 6 pages, 49 KB for a filled inspection. |
| **Negotiation summary** | report modal → `showNegotiation()` | Issues grouped per cost area × `COST_BANDS` (new, in `js/legal.js` - amounts stay in the 6-month-review file), counted once per area, indicative total + printable one-pager with disclaimer. |
| **Second opinion** | tools modal | Paste the other viewer's share link → decodes their state and lists every item where the verdicts differ, with their notes. Invalid links rejected. |
| **Paste-from-listing** | tools modal | Client-side regex over pasted listing text: address (+ region auto-detect), asking price, EPC label. Rejects bare URLs honestly - no server, no scraping. |
| **Municipality enrichment** | lookup page | New auto tool searches the official website of the commune extracted from the address (`query: 'city'`). |
| **Seasonal hints** | banner on index | Month → season, what shows/hides now, per-season dismissal. |
| **Easy reading mode** | header toggle (index + lookup) | Dyslexia-friendly typography: 1.8 line-height, wider tracking, 68ch measures, no italics; applied pre-paint on every page, persisted. |

#### Fixes
| # | Issue | Fix |
|---|-------|-----|
| 1 | Open issue: re-saving a property overwrote the library entry with the same address | `saveToLibrary` now always keeps history; the compare picker shows the saved date per entry so versions are distinguishable. |
| 2 | **Print printed every populated hidden modal**, not just the open one (`.modal { display:block }` in print) | Print now hides `.modal` and shows only `.modal.show`. Verified with print-media emulation: exactly one modal visible. |

#### SEO
HowTo structured data for the six-step buying guide (next to the existing
FAQPage), sitemap lastmod bumped. hreflang, canonical, og and font preloads
were already in place; the service worker now also improves repeat-visit CWV.

#### Verified in the browser
Quick 214→34 items with persistence and correct progress · seasonal hint
renders and dismisses · readable mode toggles, persists, pre-paints ·
negotiation modal: 2 areas, totals, asking price, disclaimer · second opinion:
2 differences found incl. their note, invalid link handled · import: address +
price + EPC + region from Dutch listing text · PDF: 6 pages / 49 KB via the
real code path · print: only the open modal · library: 2 entries same address ·
sw.js compiles, all 32 shell URLs reachable · NL/FR zero leakage · 0 console
errors · 0 overflow at 320 px.

> The embedded test browser cannot complete `serviceWorker.register()` (the
> promise never settles) - registration, compilation and the precache list were
> verified separately; test installability on the live HTTPS domain after
> deploying.

---

### 2026-08-25 - Pass 7: repo move, zero unverified facts, two professional themes

#### Repo move
The site moved from `house/` to the repository root (done outside git; the
working tree shows the old paths as deletions plus untracked root files - to be
committed by the owner). `tools/verify.ps1` needed no change: it resolves the
project root from its own location. The only stale reference was in `todo.txt`,
now corrected. All 11 checks pass at the new root.

#### Every legal fact is now verified - 11 blocks upgraded
Each fact below was read on the official page on 2026-08-25 (sources tested
HTTP 200 with the verifier's method, 3 attempts). Full register: FACTCHECK.md.

| Topic / region | Was | Now verified |
|---|---|---|
| epc / wallonia | "validity could not be confirmed" | PEB max **10 years**, required **before advertising**, indicators in every advert; no purchase-triggered renovation duty |
| soil / brussels | timing unknown | attestation du sol for **every** parcel transfer, buyer informed **at compromis/offer stage** |
| heating / wallonia | interval unknown | oil/solid **yearly**, gas ≤ 100 kW **3-yearly** (> 100 kW 2-yearly), clock from first commissioning |
| heating / brussels | interval unknown | PEB periodic control: gas **2-yearly**, oil/solid **yearly**, Brussels-approved technician |
| smokedetector / wallonia | number/placement unknown | Art. 4bis Code wallon, since **2004**, ≥ 1 working detector per dwelling, NBN EN 14604/BOSEC, owner installs / tenant maintains |
| smokedetector / brussels | date unknown | since **1-1-2025 ALL dwellings** (was rentals only), ≥ 1 per floor, ≥ 4 → interconnected (decree 28-09-2023) |
| oiltank / flanders | intervals unknown | < 6,000 l: buried **5-yearly**, above-ground **no periodic check since 1-3-2009** (cellar = above-ground); ≥ 6,000 l stricter; green/orange/red markers |
| oiltank / brussels | thresholds unknown | above-ground < **3,000 l** not classified; larger/buried → declaration or environmental permit |
| registration / wallonia | "3% could not be confirmed" | **3%** sole own home since **1-1-2025** (ordinary 12.5%), incl. building land/on-plan, no CI condition - now on wallonie.be itself |
| water / wallonia | "no equivalent confirmed" | **CertIBEau** since **1-6-2021** for every first water connection; sanitation via règlement général d'assainissement |
| permit / brussels | procedure unverified | **renseignements urbanistiques mandatory for every sale (art. 275 CoBAT)**, via the commune, usually by the notary |

Also sharpened: oiltank / wallonia (≥ 3,000 l = class 3 declaration + periodic
control, AGW 17-07-2003). `LEGAL_META` bumped: lastFullReview 2026-08-25,
nextReviewDue 2027-02-25, contentVersion 2026.08 (freshness banner re-shows).

#### Two new professional themes (6 → 8)
- **Graphite** - neutral corporate dark, steel-blue accent (`#6ea8dc` on `#1f2226`).
- **Linen** - professional light neutral, deep navy accent (`#274e73` on `#fdfcf9`).
Registered in `THEMES`/`DARK_THEMES` (core.js), labels ×3 languages, token
blocks in the THEMES section of style.css. All tokens measured ≥ 4.5:1 (AA)
against the card background on the rendered page.

#### New markdown files
- **FACTCHECK.md** - the fact register: every topic × region with the checked
  fact, source and date, plus the review procedure.
- **FEATURES.md** - suggested/often-requested features, ranked, with shipped
  and explicitly-rejected lists.

#### Fixes
- `todo.txt` pointed to `house/todo.md` (path died in the move) - corrected.
- verify.ps1 check 1 now also covers `FACTCHECK.md` and `FEATURES.md`.
- Cache-busting bumped to `?v16`.

---

### 2026-08-24 - Pass 6: "Official lookups" address page (lookup/)

Type the address once, open every official map and registry for that address.

#### What it does
- **One address field** (example placeholder: `Ramstraat 1, 8370 Blankenberge`).
  The 4-digit postal code auto-selects the region (`regionFromPostalCode`), a
  select allows overriding, and the tool list re-renders per region.
- **Two kinds of tools.** `auto` tools receive the address in the URL
  (Google Maps via the documented Maps URLs API, OpenStreetMap, and the heritage
  inventory - the latter with a street-only query because full addresses return
  nothing there). All other government viewers cannot take an address in a link,
  so they carry a "paste yourself" badge and there is one **Copy address** button
  (Clipboard API with an `execCommand` fallback for denied permissions).
- **Prefill**: `?address=` URL parameter first, else the address already typed in
  the checklist (`houseInspectionState.propertyInfo.address`).
- **15 tools, 6 groups** (maps, parcel/ownership, water, soil, planning/heritage,
  environment): Google Maps, OpenStreetMap, CadGIS, MyMinfin, Waterinfo,
  Brussels flood maps, DOV (plastische gronden), BDES, Brussels soil inventory,
  Geopunt, Omgevingsloket publiek, heritage inventory, WalOnMap, BruGIS,
  IRCEL-CELINE. A Flanders address shows 10 cards, Wallonia 7, Brussels 8.

#### Where things live
- The page lives in its **own folder**: `lookup/index.html` + `lookup/lookup.js`,
  served as `https://huiskeuring.be/lookup/`. Shared runtime stays at the root
  (`../style.css`, `../js/...`).
- Tool data = `LOOKUP_TOOLS` in **`js/links.js`** - the "URLs only in legal.js
  and links.js" rule still holds, and the 6-month link review covers them.
- UI strings = 18 new keys ×3 in `js/i18n.js` (233 → 251); styles = `.lookup-*`
  block in `style.css`.
- `lookup/` is **indexable** (canonical + hreflang in `sitemap.xml`),
  unlike report/compare which stay noindex.
- Nav button on the checklist header (`btn.lookup`); back-link reuses
  `compare.backToChecklist`. Cache-busting bumped to `?v15`.
- `tools/verify.ps1`: every file-enumerating check now also scans `lookup\`,
  check 6 pairs `lookup\index.html` ↔ `lookup\lookup.js`, and check 7 resolves
  relative asset paths against each HTML file's own folder (needed for `../`).

#### Verified
- All 15 tool URLs (and the two URL-template prefixes, exactly as they appear in
  the source) return HTTP 200 with the verifier's own method - the first Brusoil
  candidate 404'd and was replaced by the stable explainer page.
- All icon classes exist in the bundled Font Awesome subset (checked before use).
- Browser: `Ramstraat 1, 8370 Blankenberge` → flanders, correctly encoded
  hrefs; Namur → wallonia; Bruxelles → brussels. NL/FR fully translated, zero
  console errors, zero horizontal overflow at 320/360/768 px. An address of
  `"><img onerror=...>` is inert: URL-encoded in hrefs, escaped in HTML.
- `verify.ps1`: all 11 checks pass (251 keys, 90 external links).

---

### 2026-07-30 - Pass 5: footer credit, contrast fix, two new verification checks

#### Bugs found and fixed
| # | Issue | Impact |
|---|-------|--------|
| 1 | **"Made with ♥ by" was hard-coded English on all three pages** | A Dutch or French visitor saw an English footer. The verifier could not see it: check 2 compares *keys*, and this text had no `data-i18n` attribute at all, so there was no key to compare. Now `footer.madeWith` / `footer.by`. |
| 2 | Light-theme accent `#1f8a4c` failed WCAG AA at **4.38:1** on white | It is the colour of *every link* in the light and paper themes, so this was a site-wide accessibility failure, not a footer detail. Darkened to `#1a7d43` → **5.17:1**. |
| 3 | Light-theme `--issue-color` `#c2620a` failed AA at **4.16:1** | Used for issue/warning text. Darkened to `#a85408` → **5.33:1**. |

Contrast measured programmatically on the rendered page across all five themes:
**zero AA failures** now (accent, issue, ok, info, body text, secondary text, and
both footer lines, each against its real computed background).

#### Added
- **Footer projects link**: "More free projects at **labidi.eu**", translated
  (`footer.moreProjects`), on all three pages, `rel="noopener noreferrer"`,
  stacked under the Compyra credit and verified not to overflow at 320 px.
- **Check 10 - untranslated text in HTML.** Strips scripts, styles, comments, the
  trilingual `<noscript>` and every element carrying `data-i18n`, then flags any
  visible text left over. Brand names (`huiskeuring.be`, `Compyra`, `labidi.eu`)
  are whitelisted. **This is the check that would have caught bug 1.**
- **Check 11 - long-form content parity.** `BUYING_GUIDE` (6), `FAQ_CONTENT` (12)
  and `HELP_CONTENT` (33 sections) must have equal counts per language, and
  `legal.js` / `links.js` must have equal `en:` / `nl:` / `fr:` string counts
  (149 and 144). Check 2 only covers the flat `TRANSLATIONS` keys, so none of
  this was verified before.

#### Verified
All **11** checks pass, 75/75 external links HTTP 200, 233 i18n keys in parity,
230/230 items translated. Footer confirmed in en/nl/fr on all three pages, 0
console errors, 0 horizontal overflow at 320/360/768/1440 px, XSS regression
still blocked, help modal renders all 7 panels.

Check 10 was **proved** by re-introducing the exact bug it was written for:
it failed with `index.html: Made with`, then passed again after restoring.

> **Two traps worth remembering.** (1) `[System.IO.File]::ReadAllText('rel\path')`
> resolves against .NET's current directory, *not* PowerShell's `Set-Location`, so
> an inline test silently read a different file and made a broken check look like
> it passed. Use absolute paths in ad-hoc checks. `tools/verify.ps1` is unaffected
> because a child `powershell -File` process starts with both in sync.
> (2) When measuring contrast, walk up to the first non-transparent ancestor
> background - comparing against `--bg-color` reported a false 1.2:1 for a footer
> that actually sits on a white card.

---

### 2026-07-28 - Pass 4: rainwater law, drought damage, 2026 rule changes

Research pass against primary Belgian sources. Everything below was read on the
official page on 2026-07-28, not recalled from memory.

#### The big gap: rainwater and drainage had no legal topic at all
The checklist told users to look at gutters, tanks and where the rainwater goes,
but nothing told them what the **law** requires - and this is the single most
expensive surprise in a Belgian purchase, because retro-fitting infiltration
through a finished garden costs thousands.

New legal topic **`water`** in `js/legal.js`, covering two stacked obligations:

| Region | Status | What was verified |
|--------|--------|-------------------|
| Flanders | **verified** | GSV Hemelwater in force since **2 October 2023**; triggered by new build, extension, renovation that changes drainage, terrace/driveway, pool, artificial grass and other paving. Requires a rainwater tank of minimum volume, maximum reuse where drinking quality is not needed, and infiltration/buffer/delayed discharge. Must stay in use from occupation. **Also applies to permit-exempt works - if they do not comply, the exemption lapses.** Provinces and municipalities may be stricter. Plus the **keuring privéwaterafvoer**: compulsory since 1 July 2011, extended 1 Jan 2021, new technical specifications since **12 January 2026**, required in 4 cases (new build/rebuild; new connection or IBA; separate sewer in the street with disconnection duty, unless a compliant certificate < 5 years old; after an infringement). The **zoneringsplan** decides sewer vs IBA vs septic tank. |
| Brussels | **verified** (was going to be "unverified" - the official page turned out to be precise) | Imposed through the environmental permit. Triggered by new build, demolition-reconstruction, transformation adding > 20 m² ground area, works changing roof water collection, or landscaping changing impermeable surface by > 20 m². Tank of **at least 33 l per m² of roof** in horizontal projection (~50 l/m² advised for bare roofs), connected to **at least one outside tap and one or more WCs**. Green roof with ≥ 10 cm substrate and ≥ 8 l/m² reserve need not be counted. Target is **"0 rejet"** to the sewer. Drainage time 24 h for a hollow, up to 72 h under permeable paving. Two official calculators. Derogation only for polluted soil or catchment protection zone 3 - explicitly **not** for low permeability, high water table or flood zone. |
| Wallonia | unverified | No direct equivalent of the GSV found on an official source. Imposed via the permit and municipal rules; the *règlement général d'assainissement* classifies the address as collective, autonomous or transitory sanitation, which decides sewer vs individual treatment. Ask the commune for the regime of the exact address. |

#### Second gap: drought cracks and clay subsidence
One of the fastest-growing damage causes in Belgium after the recent dry summers,
and the checklist said nothing about it. New advisory topic **`drought`**:
diagonal cracks from the corners of openings, wider at one end; trees close to the
facade; felling a large tree is as damaging as planting one. Databank Ondergrond
Vlaanderen publishes a free **plastische gronden** map, and the Flemish drought
damage register only accepts cracks **wider than 3 mm** or visible tilting - a
useful severity threshold to give the user. Drought is recognised as a natural
disaster, but insurers still dispute which costs are covered.

#### Rule changes found and corrected
| Topic | Change |
|-------|--------|
| Registration duty (Flanders) | **Conditions tightened on 1 January 2026** and the file did not say so: buyers must all be natural persons (a legal-entity co-buyer taxes the whole purchase at the ordinary rate); only **full ownership** qualifies, split usufruct / bare-ownership purchases are excluded, judged per buyer; the buyer must register at the address within 3 years and stay registered **at least one uninterrupted year**. Also added: the **deed date** decides the 2% rate, not the compromis, and the 1% rate for a thorough energy renovation and for protected monuments. |
| Renovation obligation | Re-confirmed: 6 years (raised from 5, final approval 12/12/2025, applies to running *and* new transfers); tightening path to C/B/A abolished; residential fine 500-5,000 EUR. Already correct in the file. |
| Minimum EPC label 2030 | Re-confirmed for rentals: open/semi-detached E (2030) → D (2035) → C (2040); terraced and apartments D (2030) → C (2035). Already correct. |
| Asbestos certificate | Re-confirmed: pre-2001, < 20 m² exemption unless the total is ≥ 20 m² or part of a larger complex, present at the transfer agreement, **all owners from 2032**, validity 10 years, OVAM retribution 59 EUR since 05/02/2025. Already correct. |

#### Content added
- **7 new checklist items** (223 → 230), all with `why` in en/nl/fr:
  keuringsattest privéwaterafvoer, infiltratievoorziening (infiltratieput /
  infiltratiekrat / wadi), bezinkput / zandvang, zoneringsplan, crack width and
  the diagonal drought pattern, plastische-gronden map lookup, large trees near
  the facade.
- **3 new FAQ entries per language** (9 → 12): infiltration requirements,
  what a bezinkput is and why to lift the lid, why diagonal cracks matter.
  These also feed the `FAQPage` structured data.
- **10 new verified links** (64 → 74): GSV Hemelwater, Groenblauwpeil calculator,
  keuring privéwaterafvoer, Brussels rainwater obligations, DOV plastische
  gronden, DOV drought damage register.
- `LEGAL_META.contentVersion` bumped to `2026.07b` so the freshness banner
  re-appears for returning users.

#### SEO
- Description, keywords, `og:description` and the `featureList` updated: 230
  checks, and the new subjects are now discoverable terms (hemelwaterverordening,
  infiltratieput, infiltratiekrat, bezinkput, septische put, keuring
  privéwaterafvoer, droogteschade, plastische gronden, renovatieverplichting).
- Three new `Question` entries in the JSON-LD `FAQPage`.

#### Verified after the change
`tools/verify.ps1`: all 9 checks pass, **74/74 external links HTTP 200**,
230/230 items translated in nl and fr, 230 i18n keys in parity.
Browser: en/nl/fr, 0 console errors, 0 failed requests, 0 horizontal overflow at
320/360/414 px, and both new topic panels open and fit inside a 280 px viewport.
House view 214 items, apartment view 204 - both confirmed in the browser.

The link check now **retries three times** before declaring a link dead: a
transient DNS failure on `onroerenderfgoed.be` during this pass produced a false
negative, and a release gate must not fail on a network blip.

---

### 2026-07-28 - Pass 3: completion, full translation, verification

#### Translation is now complete
- **All 223 checklist items have a translated `text` AND a translated `why` in Dutch and
  French.** Verified by script: `nl: entries=223 withWhy=223 missingWhy=0`, same for `fr`.
- **The help modal is no longer hard-coded English.** The About, How to use, Roadmap, GDPR
  and Privacy tabs were 220 lines of untranslatable HTML. They now live in `HELP_CONTENT`
  in `js/i18n.js` (39 sections per language) and are rendered by `renderHelpContent()`,
  so they follow the language switcher like everything else.
  The "How to use" tab was also rewritten from 9 to 12 steps to cover the region selector,
  the question sheet, the reminders and the backup/compare tools that pass 2 added.
- **The `<noscript>` message is now shown in all three languages at once** - it cannot be
  translated by JavaScript, so all three are always present.
- **UI key parity verified by script:** en=230, nl=230, fr=230, with zero keys missing or
  extra in either direction, and all 96 `data-i18n` attributes in the HTML resolve.

#### Bugs found and fixed in this pass
| # | Issue | Impact |
|---|-------|--------|
| 1 | Help modal tabs (About/Usage/Roadmap/GDPR/Privacy) were hard-coded English | A Dutch or French visitor got an English privacy policy and English GDPR rights - the two texts where language matters most legally. |
| 2 | `<noscript>` warning was English only | Users with JavaScript disabled got no message they could read. |
| 3 | Duplicate `:root` and `[data-theme="dark"]` blocks at the top of `style.css` | Two competing sets of design tokens; whichever came last silently won. Removed, with a comment at the old location explaining why nothing may be defined there. |
| 4 | "How to use" documented a 9-step flow that no longer matched the app | Users could not find the region selector, reminders, question sheet or backup tools. |
| 5 | `compare.html` print button reused the `report.print` key ("Print report") | Wrong label on a page that is not a report. Added a generic `btn.print` key. |
| 6 | The closed mobile drawer let the page scroll ~13-85 px sideways below 768 px | `overflow-x: hidden` was only on `body`, which does not contain a `position: fixed` child. Added it to `html` as well. |
| 7 | Every control inside the closed mobile drawer was still keyboard focusable | Tabbing through the page walked into an invisible off-screen menu. The drawer is now `visibility: hidden` until opened, which removes it from the tab order and from the screen reader tree. |
| 8 | The header comment of `js/checklist.js` documented fields that do not exist (`legal:`, `ask:`) and omitted the real one (`deadline:`) | Anyone extending the checklist from the documentation would have written a field the app silently ignores. |

#### Verification performed (all automated, all passing)

All of it is now permanent: **`tools/verify.ps1`**, 9 checks, run with
`powershell -ExecutionPolicy Bypass -File tools\verify.ps1` (add `-SkipLinks` to skip the
network check). It exits 1 on the first problem, so it can gate a release.

| Check | Result |
|-------|--------|
| Strict UTF-8 validity + double-encoding + replacement characters, all JS/HTML/CSS/MD | clean |
| Every external URL in `js/*.js` and `*.html` | **64 URLs, 64 x HTTP 200** |
| Every local `src=` / `href=` in the three HTML pages | all resolve |
| Every `url()` in the bundled font CSS | all resolve |
| Every `byId()` call against the actual element ids | all resolve (`deedDate` / `drawdownDate` are created at runtime inside the reminders modal) |
| Every `deadline:` / `info:` key against `LEGAL_TOPICS` + `ADVISORY_TOPICS` | all resolve |
| Consistency of the key legal figures across all three languages | 6 years 8/8/8, 18 months 8/8/8, 25 years 6/6/6 - symmetric, no stale "5 years" anywhere |
| Browser run of all three pages in all three languages | zero console errors, zero failed requests |
| Horizontal overflow at 320 / 360 / 400 / 768 / 1024 / 1440 px on all three pages | 0 px everywhere, page cannot be scrolled sideways |
| Mobile drawer open / close cycle at 320 px | hidden and off-screen when closed, fully on-screen when open, correctly re-hidden after closing, `aria-expanded` tracks state |
| XSS regression: HTML in the address field and in a note | not executed, not injected into the report |

#### Small additions
- **`tools/verify.ps1`** - the whole checklist above as one command, so it stops being
  rewritten by hand before each release.
- The Resources panel now states **when the links were last verified**, next to the region
  hint, so the freshness promise is visible where the links are used.
- Generic `btn.print` label added in all three languages.
- Cache-busting parameters bumped to `?v12` across the three HTML pages.

---

### 2026-07-28 - Pass 2: regions, split, features, self-hosting

#### Architecture: split for maintenance
- `data.js` split into **`js/legal.js`** (the 6-month review file) and **`js/links.js`**
  (every external URL), with the checklist content in **`js/checklist.js`**.
- New **`js/core.js`** holds everything shared by the three pages, so `app.js`,
  `report.js` and `compare.js` only contain page-specific logic.
- `SCHEMA_VERSION` raised to 3 (new `region`, `keyDates` and `askingPrice` fields).

#### Legal accuracy per region (brief items 5 and 7)
- Every legal topic now carries a block **per region** (Flanders / Wallonia / Brussels,
  plus `federal` where a rule is federal) with `status`, `lastVerified` and `sources`.
- Honest `status` model: `verified`, `unverified`, `not-applicable`. The UI shows an
  explicit warning for anything we could not confirm on an official page instead of
  presenting a guess as a fact. **This was a deliberate choice** - Wallonia and Brussels
  publish far less machine-readable guidance than Flanders, and a confident-sounding
  wrong deadline is worse than an honest "go and ask".
- A **region selector** was added, auto-detected from the postal code in the address.
  It changes the legal panel, the resource links and the reminders.

**Verified this pass (with official source URLs in `js/legal.js`):**

| Topic | Flanders | Wallonia | Brussels |
|---|---|---|---|
| EPC/PEB validity | 10 years | not verified | 10 years |
| Renovation obligation E/F to D | **6 years** after the deed (raised from 5, final 12/12/2025), fine 500-5,000 EUR | none confirmed | none confirmed |
| Electrical inspection | federal: valid 25 y, **18 months** to correct | same (federal) | same (federal) |
| Asbestos certificate | mandatory pre-2001 buildings, all owners by 2032, max 10 y | **does not exist** | **does not exist** |
| Soil | bodemattest before compromis (OVAM) | **extrait conforme BDES** before any transfer | attestation exists, timing not verified |
| Heating maintenance | mazout yearly, gas every 2 years | interval not verified | interval not verified |
| Smoke detectors | every home, every storey, since 1 Jan 2020 | details not verified | details not verified |
| Oil tank | VLAREM, interval not verified | periodic control compulsory | permit thresholds not verified |
| Registration duty | **2%** sole own home (1 Jan 2025), **12%** otherwise | 3% / 12.5% not confirmed on a government page | **12.5%** with abattement on the first 200,000 EUR |
| Minimum EPC for rentals | phased from 1 Jan 2030 to 2040 | not verified | not verified |
| Verzekering Gewaarborgd Wonen | free, apply within 1 year, 10 y cover, 3 m wait, max 3 y | **does not exist** | **does not exist** |

#### Self-hosted fonts and icons (legality + privacy + performance)
- **Montserrat** (SIL OFL 1.1) and **Roboto** (Apache 2.0) downloaded into
  `assets/fonts/`, latin + latin-ext subsets only, with a generated `@font-face`
  stylesheet. Both licences explicitly allow redistribution and self-hosting.
- **Font Awesome Free 6.5.2** (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT) bundled
  locally, **solid style only** because that is all the interface uses.
- Attribution written to `assets/LICENSES.md`.
- Result: **zero third-party requests**. No visitor IP reaches a CDN, the site keeps
  working if a CDN is blocked or down, and render-blocking latency drops.

#### New features
| Feature | Where | Notes |
|---|---|---|
| **Deadline reminders** | Reminders button | Enter the deed date and the first drawdown; generates a standards-compliant `.ics` with alarms 30-365 days ahead, filtered by region. Covers the insurance 1-year window, the electrical 18 months, the 6-year renovation obligation, boiler servicing, detector lifetime and asbestos certificate expiry. |
| **Print-friendly blank checklist** | Backup panel | Opens a clean A4 print view with OK / Issue tick boxes and a notes column, in the current language and for the selected property type. For people who prefer a clipboard. |
| **Shareable read-only report** | Report modal, "Share read-only link" | `report.html?data=...` renders the inspection with no editable controls and `noindex`. The data still lives in the link, never on a server. |
| **Import / export JSON** | Backup panel | Real, portable backups with a `format` marker and schema version. Import validates and normalises before applying. |
| **Multiple complete themes** | Theme selector | System, Daylight, Midnight, **Slate**, **Paper**, **High contrast**. All six define the same CSS variable contract, so a seventh is one CSS block plus one line in `core.js`. |
| **Content freshness banner** | Top of the checklist | Shows when the legal content was last verified and when the next review is due, turns amber when overdue, is dismissible per content version, and **hides itself below 620 px** so it never eats space on a phone. |
| **Seller / agent question sheet** | Questions button | Deliberately *not* the issue list: standard questions for every viewing (different for house vs apartment), a request line per document, a "what exactly, since when, what was done, is there an invoice" follow-up per issue found, and a legal-deadline question per relevant topic with the deadline for your region. Printable and copyable. |
| **Compare properties side by side** | `compare.html` | Save inspections to a local library, then compare up to four on price, progress, issues, documents outstanding and issues per area. The best value in each row is highlighted. |

#### Multilingual (brief item 1)
- Checklist item **text and `why` explanations** are now translatable per item, keyed by
  item id, with graceful per-item fallback to English.
- Complete in NL and FR: all UI chrome, category titles, tag labels, progress and
  report labels, the buying guide, the FAQ, all legal topics and their per-region
  detail, all resource link labels and notes, the question sheet and the reminders.
- Item titles were translated in this pass; the long-form `why` explanations were
  completed in pass 3.

#### Other improvements
- Asking price field, used by the comparison table.
- Resource links are filtered by region and labelled per language.
- `report.html` and `compare.html` share the theme and language preference.
- Storage failures (private mode, quota) now surface a toast telling the user to export
  a backup instead of silently losing data.

---

## 4. Issues found and fixed

### Fixed in pass 2
| # | Issue | Impact |
|---|---|---|
| 1 | All legal deadlines were presented as if they applied everywhere in Belgium | Wrong for two of the three regions. Now modelled per region with explicit status. |
| 2 | `heatinginspection` topic key had no matching topic after the data split | Info button would have silently done nothing. |
| 3 | Fonts and icons loaded from Google Fonts and cdnjs | Every visitor's IP was exposed to two third parties; a GDPR and performance liability. Now fully self-hosted with licence attribution. |
| 4 | `deadlineInfo` presented advisory topics under a "Deadline" heading | Misleading: "look at this from the street" is not a legal deadline. Advisory topics now have their own layout. |
| 5 | Item ids were position based with no protection against reordering | A reordered category would have moved every tick. `SCHEMA_VERSION` is now documented at the top of `checklist.js` and enforced in `core.js`. |
| 6 | No way to keep more than one inspection | Users had to juggle share URLs. Local library + JSON export now cover it. |
| 7 | `state` had no place for the deed / drawdown dates | The most valuable deadlines could not be computed at all. |
| 8 | Header overflowed horizontally once more buttons were added | Fixed with `flex: 1 1 auto; min-width: 0` and wrapping. |
| 9 | Two source URLs used in pass 1 were 404 (`energie.wallonie.be/fr/certificat-peb.html`, `economie.fgov.be/.../elektriciteit-controles-en`) | Replaced with pages verified to return 200. |
| 10 | Skip link used `left: -9999px` | Contributed to horizontal scroll width. Now uses a transform. |

### Fixed in pass 1 (kept for the record)
XSS through unescaped notes and the `?data=` share link; notes containing `</textarea>`;
reset dropping `propertyType`; progress counting hidden categories; filter buttons not
restored on load; category filter cancelling "show unchecked"; `navigator.clipboard`
assumed to exist; malformed `href` on the OVAM source; O(n^2) filter reset; missing
favicons/manifest/description/canonical/OG; no Escape-to-close or focus management on
modals; non-keyboard-operable category headers; unthrottled scroll listener;
stack overflow on `btoa` for large inspections; `bodematttest` typo.

### Known open issues
- `compare.html` and `report.html` are `noindex`; if the read-only report should ever be
  indexable, it needs its own canonical strategy.
- The `apartment` category has 16 items, so the visible total is 214 for a house and 204
  for an apartment (basement and attic are hidden). That is intended, but it means the
  two property types are not directly comparable on "issues found" alone.
- The checklist item texts keep the Dutch construction term in brackets in the English
  version ("Check muren (walls)..."), because that is the wording that appears on Belgian
  documents. The NL and FR versions do not need the bracket and do not have it. This is
  intentional, not an inconsistency.
- The embedded test browser cannot complete `serviceWorker.register()`; offline
  installability still needs one manual check on the live HTTPS domain.

---

## 5. Backlog

### Next up

> Feature priorities, with rationale and the often-requested list, now live in
> [FEATURES.md](FEATURES.md). The short version:

1. **Photo attachments per issue.** Store in IndexedDB, thumbnail in the report, include
   in the JSON export. Most requested thing for a viewing on a phone.
2. **German translation** for the Eastern Cantons. The engine is ready: add a `de` block
   to `TRANSLATIONS`, `HELP_CONTENT`, `BUYING_GUIDE` and `FAQ_CONTENT`, a
   `js/checklist.de.js`, a `de` entry in `SUPPORTED_LANGUAGES`, `de` fields in the
   `legal.js` and `links.js` bundles, and an `hreflang` link in the three HTML pages.

### Ideas and feature requests
- **Deal-breaker scoring** - weight items by severity so the report opens with the three
  things that should worry the buyer most.
- **Municipality enrichment** - from the postal code, deep-link to that commune's planning
  department and to the flood map for the exact address.
- **Seasonal hints** - some defects only show in specific conditions (damp after rain,
  overheating in summer, cold bridges in winter). Suggest a second visit at a better time.
- **Second-opinion mode** - two people inspect the same property on their own phones and
  merge the two share links into one report.
- **Negotiation summary** - one page with the issues, their indicative cost and the
  resulting suggested offer, ready to send to the agent.
- **Timeline view** - all deadlines for a purchase on one horizontal timeline.
- **Print-friendly one-page summary** next to the full report.
- **Import from an Immoweb / Immovlan listing URL** to pre-fill address, price and EPC.
- **Accessibility audit with a real screen reader** (NVDA + VoiceOver) rather than only
  automated checks.
- **German translation** for the Eastern Cantons - the fourth official language area.
- **Dyslexia-friendly typography option** on top of the existing Paper theme.
- **Anonymous opt-in aggregate statistics** ("72% of visitors find an issue with the
  electrical installation"). Requires a backend, so weigh it carefully against the
  current zero-tracking promise - probably better as a manual survey.
- **Backlink strategy** - reach out to Belgian notary, real estate and consumer sites and
  offer the checklist as an open, free resource with attribution.
- **Structured data for the buying guide** (HowTo) in addition to the FAQPage.

---

## 6. Maintenance checklist

### Every 6 months (next due: **2027-02-25**)
- [ ] Open every URL in `js/links.js` and every `sources` entry in `js/legal.js`; confirm HTTP 200.
- [ ] Re-verify each `verified` region block against its official source; update `lastVerified`.
- [ ] Re-attempt every `unverified` block - regional portals do publish more over time.
- [ ] Confirm the EPC renovation obligation term and fine range.
- [ ] Confirm the electrical inspection validity and the 18-month correction window.
- [ ] Confirm the asbestos certificate scope and the 2032 date.
- [ ] Confirm registration duty rates and the Brussels abattement amount and ceiling.
- [ ] Confirm the Verzekering Gewaarborgd Wonen conditions and the 1-year window.
- [ ] Update `LEGAL_META.lastFullReview`, `LEGAL_META.nextReviewDue` and
      `LEGAL_META.contentVersion` (bumping the version re-shows the freshness banner).
- [ ] Update `LINKS_META.lastCheck`.
- [ ] Update `lastmod` in `sitemap.xml`.
- [ ] Bump the `?v=` cache-busting parameters in `index.html`, `report.html`, `compare.html`,
      `lookup/index.html` **and `VERSION` in `sw.js`** - they must move together, or
      returning offline users keep the old shell.

### On every asset upgrade
- [ ] Re-download the fonts / Font Awesome, keep the subsets small, re-check `assets/LICENSES.md`.

### Before every release

Run the automated suite first - it covers ten of the points below:

```powershell
cd house
powershell -ExecutionPolicy Bypass -File tools\verify.ps1
# add -SkipLinks for a fast run that does not hit the network
```

It exits with code 1 if anything fails, so it can gate a commit or a deploy.

- [ ] `tools\verify.ps1` reports **everything passed**.
- [ ] Load the three pages with the console open: zero errors, zero failed requests.
- [ ] Switch through all three languages and all six themes.
- [ ] Test with a share link containing HTML in the notes (XSS regression test).
- [ ] Check the layout at 320, 768, 1024 and 1440 px for horizontal overflow, and open
      and close the mobile drawer at 320 px.
- [ ] Print the report, the question sheet and the blank checklist.

> **Note for browser testing:** CSS transitions do not advance while the tab is in the
> background, so an automated check reads the *pre-transition* value and reports themes
> or the mobile drawer as broken when they are fine. Inject
> `*{transition:none !important;animation:none !important}` before measuring.
