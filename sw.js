/* ===========================================================
   RSCollectiblesDE — Service Worker (PWA)
=========================================================== */

const CACHE_NAME = 'rscollectibles-v3-no-cache';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const requestUrl = new URL(event.request.url);
    if (!/^https?:$/.test(requestUrl.protocol)) return;
    if (requestUrl.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request, {
            cache: 'no-store',
            referrerPolicy: 'no-referrer'
        })
    );
});
