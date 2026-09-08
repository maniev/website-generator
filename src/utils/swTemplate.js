// Service Worker Template for Image Caching across page navigations

export const SERVICE_WORKER_CODE = `
const CACHE_NAME = 'site-images-cache-v1';
const IMAGE_REGEX = /\\.(?:png|jpg|jpeg|svg|gif|webp|ico)(?:\\?.*)?$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache strategy for images (local images or remote images like Unsplash)
  if (IMAGE_REGEX.test(url.pathname) || event.request.destination === 'image' || url.hostname.includes('unsplash.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached image instantly, and fetch network update asynchronously
            fetch(event.request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
            }).catch(() => {});
            return cachedResponse;
          }

          // Fetch from network and store in cache
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  }
});
`;

export const SW_REGISTER_SCRIPT = `
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log('Image Cache Service Worker registered:', reg.scope);
      }).catch(function(err) {
        console.log('Service Worker registration failed:', err);
      });
    });
  }
</script>
`;
