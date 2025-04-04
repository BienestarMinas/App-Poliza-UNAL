const CACHE_NAME = "pwa-cache-v1.4.8"; // Increment this when updating cache
const urlsToCache = [
    "/App-Poliza-UNAL/",
    "/App-Poliza-UNAL/index.html",
    "/App-Poliza-UNAL/styles.css",
    "/App-Poliza-UNAL/app.js",
    "/App-Poliza-UNAL/manifest.json",
    "/App-Poliza-UNAL/unal.png"
];

// Install event: Cache the necessary files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activates the new service worker immediately
});

// Activate event: Remove old caches, but keep the new one
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log(`Deleting old cache: ${cache}`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: Serve from cache first, fallback to network if not cached
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    // Cache the new response for future offline use
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => {
            // Fallback: If request is a navigation request, return cached homepage
            if (event.request.mode === "navigate") {
                return caches.match("/App-Poliza-UNAL/index.html");
            }
        })
    );
});
