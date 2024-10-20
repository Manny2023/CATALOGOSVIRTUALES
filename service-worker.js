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

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html');
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
