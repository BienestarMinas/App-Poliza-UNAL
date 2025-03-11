const CACHE_NAME = "pwa-cache-v1.4.2"; // Cambia el número en cada actualización
const urlsToCache = [
    "/App-Poliza-UNAL/",
    "/App-Poliza-UNAL/index.html",
    "/App-Poliza-UNAL/styles.css",
    "/App-Poliza-UNAL/app.js",
    "/App-Poliza-UNAL/manifest.json",
    "/App-Poliza-UNAL/unal.png"
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

