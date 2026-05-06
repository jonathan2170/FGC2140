/* 富程量化 · 2140  Service Worker v3
 *
 * Caching strategy designed for "admin re-publishes HTML and viewers should see
 * new content immediately":
 *
 *   • Navigation requests (the HTML page itself):
 *     ALWAYS network-first with `cache: 'no-store'` so we bypass the browser's
 *     HTTP cache. Fall back to cached HTML only when offline.
 *
 *   • Same-origin assets (icons, manifest):
 *     Stale-while-revalidate. Show cached version instantly, refresh in
 *     background. These rarely change so freshness is non-critical.
 *
 *   • External resources (Google Fonts, FX APIs):
 *     Pass through — let the browser handle them with their own cache rules.
 */
const CACHE = 'fucheng-2140-v3';
const HTML_KEY = './index.html';

const PRECACHE = [
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-152.png',
  './icon-167.png',
  './favicon-32.png',
  './favicon-16.png'
];

self.addEventListener('install', (e) => {
  // Take over as soon as installed (don't wait for tab close)
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(PRECACHE.map(u => c.add(u).catch(() => {}))))
      // ↑ swallow individual failures so one missing icon doesn't abort install
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // ── Navigation: always go to network, bypass HTTP cache ──
  // This is the key fix — ensures viewers see freshly published HTML.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(HTML_KEY, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(HTML_KEY))
    );
    return;
  }

  // ── Same-origin assets: stale-while-revalidate ──
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(cached => {
        const fetchPromise = fetch(req).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // ── External resources: don't intercept ──
});

// Allow the page to push the SW into activation, e.g. on admin "強制更新"
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
