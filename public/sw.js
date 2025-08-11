// Service Worker for Offline Support
const CACHE_NAME = 'sai-motors-v1';
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  // Add your car images
  '/src/assets/car-family.jpg',
  '/src/assets/car-sedan.jpg',
  '/src/assets/car-sports.jpg',
  '/src/assets/car-suv.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // If not in cache and offline, return a basic offline page
        if (!navigator.onLine) {
          return new Response(
            '<html><body><h1>Offline - Sai Motors</h1><p>Please check your connection</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
        
        return fetch(event.request);
      }
    )
  );
});