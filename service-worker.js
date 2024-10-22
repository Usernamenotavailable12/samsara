// Cache name
const CACHE_NAME = 'samsara-cache-v1';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/assets/images/logo-192x192.png',
    '/assets/images/logo-512x512.png',
    '/assets/css/style.css',
    '/assets/js/script.js'
];

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch resources
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached file if it exists, or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate the service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
