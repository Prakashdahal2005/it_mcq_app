var CACHE_NAME = 'bitmcq-v22';
var STATIC_ASSETS = [
  './',
  './index.html',
  './cloud-sync.js',
  './question_bank.json',
  './manifest.json',
  './pwa-icon.png',
  './favicon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) { return key !== CACHE_NAME; }).map(function (key) { return caches.delete(key); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Network-first for everything: serve fresh from server when online,
  // fall back to cache only when offline. This means PWA always gets
  // the latest index.html and assets without needing a sw.js version bump.
  event.respondWith(
    fetch(request).then(function (response) {
      if (response && response.ok) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, clone); });
      }
      return response;
    }).catch(function () {
      return caches.match(request).then(function (cached) {
        return cached || new Response('Offline — please reconnect', { status: 503 });
      });
    })
  );
});
