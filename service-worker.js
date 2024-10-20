self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Si está en la caché, lo devuelve
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone()); // Actualiza la caché
            return networkResponse; // Devuelve la respuesta de red
          });
        });
      })
  );
});
