const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  'https://example.com/favicon.png' // Agrega tus recursos aquí
];

// Evento install: cachea los recursos necesarios
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Recursos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento activate: limpia cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cache antiguo eliminado:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento fetch: implementa una estrategia de caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve la respuesta en caché o realiza la solicitud de red
        return response || fetch(event.request);
      })
  );
});
