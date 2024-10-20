self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/ruta-al-logo/favicon-32x32.png',
        '/ruta-al-logo/favicon-16x16.png',
        '/ruta-al-logo/apple-touch-icon.png',
        '/ruta-al-logo/icon-192x192.png',
        '/ruta-al-logo/icon-512x512.png',
        '/style.css' // Agrega aquí los demás recursos que quieras cachear
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-cache'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si hay una respuesta en la caché, la devuelve
        if (response) {
          return response;
        }
        // Si no hay respuesta en caché, intenta hacer la petición
        return fetch(event.request).catch(() => {
          // Si la petición falla, puedes manejar el error aquí
          return caches.match('/index.html');
        });
      })
  );
});
