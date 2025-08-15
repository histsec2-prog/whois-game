// service-worker.js
// Service Worker لتطبيق PWA - تخزين مؤقت للملفات الأساسية

const CACHE_NAME = 'who-is-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/scripts/app.js',
  '/assets/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
