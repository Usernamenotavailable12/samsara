self.addEventListener('install', function(event) {
    self.skipWaiting(); // Forces the waiting service worker to become the active service worker
  });
  
  self.addEventListener('activate', function(event) {
    // Clear all caches or other persistent storage related to this service worker
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    });
  
    // Unregister this service worker
    self.registration.unregister();
  });
  