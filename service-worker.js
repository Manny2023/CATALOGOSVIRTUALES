self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKKdAL_4jH9recUZix18lMrP6dfqqUAcmfDFm9zwSELnq4MwJVMHY4wvNdIbyp1QEw0Gr8lTR61l2t4sufBah-tyLKcN0l2PEJz7ngIfT77CCm_09dacwx1Mw65BzUVZNVYrQrC08o76ULsCGBFgyXAAabVgAzcmS_Y6dMGUCyMQ58h_Y58bYnlMm1ZGI/s32/favicon-32x32.png',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJx1aVxE_89OAItrvjC5gwWs3Elb4koell3i5PZNbav6f7qsyRVbskA5zVUQnA1Ru8m2d5KbI_kCRbxc9oEDQz-WwNjlmLMqXw0R8NVVVL_NQFVXqEOwTBkNRoYFDQXpaOxmvuB70KgerTcxko1V8JhF4k0CgHARwrA5Sxd6gG_xHAK9syrsAAEPZhxk4/s16/favicon-16x16.png',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrNS3wMsTWGQ-2w0OIux68PadN_lIUO-774YjDf-ZSvWLsRqRrAOCqmNzRmNfo3UkNh_kKFeITDEhFiSpL77I7w5Ry7670YxxZtIWuRDpoRL9jUef6ycFzd8Mf-NPR710jg4xN8TMQAS6KbCXvRI0r57pm6rIBc1OHrUL83p_LUXCWVhNOLFo5qyEKqn8/s180/apple-touch-icon.png
',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTShEIt3vRu7H_cFeBJuHuvGtlJT1MH5zB8GDuOVytHKi7ts9tTCpX4hwhvL7Yy9sL1XEApjQCWq9yD_RZ_DUkDZQ12cdhZQL2kumtcKoc8CbHb6AH-ZAqitAYTE7DQng1KkNnUnN1I5AY0U2g7dcnABbNFcnbXBKTprf4GFATPRG2s6MgE09ZaHHUDxQ/s192/android-chrome-192x192.png
',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBiHhITYcbBEIirt8u6shTW_VYryQFaW7d2le9SsfiLTx0Q8064PRQ5ql9zkZZRJZI8pbGxfr0pWTnx5OUhmP0bHrtmbrOcFcd4r5VwyE7INd6Qrlfn-cmXzuztqHAQz9KgYiLBePEg27jfc76dZxZsJOlkjxCzcIWKTuf1Q2uS4qkYCDEBNMImyI8cns/s512/android-chrome-512x512.png',
        '/style.css', 
        '/main.js', // Agrega cualquier otro archivo necesario para la PWA
        '/offline.html' // Página offline para mostrar en caso de fallo
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
            return caches.delete(cacheName); // Elimina cachés no utilizados
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, devuélvelo
      if (response) {
        return response;
      }
      // Si no está en caché, intenta hacerlo desde la red
      return fetch(event.request).catch(() => {
        // Si la red falla, muestra una página offline
        return caches.match('/offline.html');
      });
    })
  );
});
