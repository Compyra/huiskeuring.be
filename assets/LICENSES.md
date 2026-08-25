# Third-party assets and their licences

Everything in this folder is bundled with huiskeuring.be so the site makes **no
third-party requests**. That protects visitor privacy (no IP address leaks to a
CDN), removes a single point of failure, and improves Core Web Vitals.

All bundled assets are redistributable under their own licence.

## Fonts (`assets/fonts/`, loaded via `assets/vendor/fonts.css`)

| Font | Licence | Copyright |
|------|---------|-----------|
| Montserrat (weights 600, 700) | SIL Open Font License 1.1 | The Montserrat Project Authors |
| Roboto (weights 400, 500, 700) | Apache License 2.0 | Google LLC |

Only the `latin` and `latin-ext` subsets are shipped, which covers Dutch, French,
English and German. Both licences explicitly permit redistribution, embedding and
self-hosting of the font files.

- SIL OFL 1.1: <https://scripts.sil.org/OFL>
- Apache 2.0: <https://www.apache.org/licenses/LICENSE-2.0>

## Icons (`assets/webfonts/`, loaded via `assets/vendor/fontawesome.min.css` and `assets/vendor/fa-solid.min.css`)

Font Awesome Free 6.5.2 - <https://fontawesome.com>

| Part | Licence |
|------|---------|
| Icons (SVG/graphics) | CC BY 4.0 |
| Fonts (the `.woff2` / `.ttf` files) | SIL OFL 1.1 |
| Code (the CSS) | MIT |

Font Awesome Free is free to use, including commercially, provided attribution is
given - which this file, together with the attribution in the Help panel, provides.

Only the **solid** style is bundled, because that is the only style the interface
uses. If a future change needs the regular or brands style, download the matching
CSS and `.woff2` into the same folders.

## PDF generation (`assets/vendor/jspdf.umd.min.js`)

jsPDF 2.5.2 - <https://github.com/parallax/jsPDF> - MIT License,
copyright (c) 2010-2021 James Hall and the jsPDF contributors.

Loaded lazily, only when the user clicks "Download PDF"; it is never fetched from
a CDN. The MIT licence permits redistribution with this notice.

## Refreshing these assets

Both sets were fetched with a small script that pins the exact version, keeps only
the needed subsets, and rewrites the `url()` references to point at the local
folders. Re-run it if you need to upgrade, and re-check this file afterwards.
