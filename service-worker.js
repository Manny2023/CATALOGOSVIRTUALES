const CACHE_NAME = 'catalogos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/pagina1.html',
  '/pagina2.html',
  '/pagina3.html',
  '/pagina4.html',
  '/pagina5.html',
  '/manifest.json',
  '/ruta-al-logo/favicon.ico',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrNS3wMsTWGQ-2w0OIux68PadN_lIUO-774YjDf-ZSvWLsRqRrAOCqmNzRmNfo3UkNh_kKFeITDEhFiSpL77I7w5Ry7670YxxZtIWuRDpoRL9jUef6ycFzd8Mf-NPR710jg4xN8TMQAS6KbCXvRI0r57pm6rIBc1OHrUL83p_LUXCWVhNOLFo5qyEKqn8/s192/android-chrome-192x192.png'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
