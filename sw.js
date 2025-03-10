const CACHE_NAME = "pwa-cache-v2"; // Cambia el número en cada actualización
const urlsToCache = [
    "/PWA-Bienestar-emergencias/",
    "/PWA-Bienestar-emergencias/index.html",
    "/PWA-Bienestar-emergencias/styles.css",
    "/PWA-Bienestar-emergencias/app.js",
    "/PWA-Bienestar-emergencias/manifest.json",
    "/PWA-Bienestar-emergencias/unal.png"
];

// Instalar y cachear archivos
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activar el Service Worker y borrar caché antigua
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Borrando caché antigua:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptar las solicitudes y actualizar en segundo plano
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
