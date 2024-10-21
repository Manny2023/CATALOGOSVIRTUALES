self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/ruta-al-logo/favicon.ico',
        '/ruta-al-service-worker/service-worker.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
