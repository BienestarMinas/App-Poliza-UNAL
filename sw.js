const CACHE_NAME = "pwa-cache-v1.4"; // Cambia el número en cada actualización
const urlsToCache = [
    "/PWA-Bienestar-emergencias/",
    "/PWA-Bienestar-emergencias/index.html",
    "/PWA-Bienestar-emergencias/styles.css",
    "/PWA-Bienestar-emergencias/app.js",
    "/PWA-Bienestar-emergencias/manifest.json",
    "/PWA-Bienestar-emergencias/unal.png"
];

self.addEventListener("install", (event) => {
    self.skipWaiting(); // Fuerza la activación del nuevo SW inmediatamente
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    return caches.delete(cache); // Borra las versiones antiguas del caché
                })
            );
        }).then(() => {
            self.clients.claim(); // Activa el nuevo SW inmediatamente para todos los clientes
        })
    );
});

// Interceptar las solicitudes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

