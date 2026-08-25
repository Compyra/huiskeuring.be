/* =====================================================================
 * huiskeuring.be - service worker (offline support)
 * =====================================================================
 * Cache-first for the app shell so the checklist works in a cellar with
 * no signal. Bump VERSION together with the ?v cache-busting parameter
 * in the HTML files at every release - the activate step removes every
 * older cache.
 * ===================================================================== */

'use strict';

const VERSION = 'v20';
const CACHE = 'huiskeuring-' + VERSION;

const SHELL = [
    '/',
    '/index.html',
    '/report.html',
    '/compare.html',
    '/404.html',
    '/lookup/',
    '/lookup/index.html',
    '/style.css?' + VERSION,
    '/js/i18n.js?' + VERSION,
    '/js/legal.js?' + VERSION,
    '/js/links.js?' + VERSION,
    '/js/checklist.js?' + VERSION,
    '/js/checklist.nl.js?' + VERSION,
    '/js/checklist.fr.js?' + VERSION,
    '/js/core.js?' + VERSION,
    '/js/photos.js?' + VERSION,
    '/js/app.js?' + VERSION,
    '/js/report.js?' + VERSION,
    '/js/compare.js?' + VERSION,
    '/lookup/lookup.js?' + VERSION,
    '/assets/vendor/fonts.css?' + VERSION,
    '/assets/vendor/fontawesome.min.css?' + VERSION,
    '/assets/vendor/fa-solid.min.css?' + VERSION,
    '/assets/vendor/jspdf.umd.min.js',
    '/assets/fonts/montserrat-600-latin.woff2',
    '/assets/fonts/montserrat-700-latin.woff2',
    '/assets/fonts/roboto-400-latin.woff2',
    '/assets/fonts/roboto-500-latin.woff2',
    '/assets/fonts/roboto-700-latin.woff2',
    '/assets/webfonts/fa-solid-900.woff2',
    '/logo.png',
    '/favicon.ico',
    '/site.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(request).then(hit => {
            if (hit) return hit;
            // A stale ?v in a cached page must not break offline use:
            // fall back to a query-ignoring match before the network.
            return caches.match(request, { ignoreSearch: true }).then(pathHit => {
                if (pathHit) return pathHit;
                return fetch(request).then(response => {
                    if (response.ok && response.type === 'basic') {
                        const copy = response.clone();
                        caches.open(CACHE).then(cache => cache.put(request, copy));
                    }
                    return response;
                }).catch(() => {
                    if (request.mode === 'navigate') return caches.match('/index.html');
                    return Response.error();
                });
            });
        })
    );
});
