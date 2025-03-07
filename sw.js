const CACHE_NAME = 'emergencias-cache-v1';
const urlsToCache = [
    "/PWA-Bienestar-emergencias/",
    "/PWA-Bienestar-emergencias/index.html",
    "/PWA-Bienestar-emergencias/styles.css",
    "/PWA-Bienestar-emergencias/app.js",
    "/PWA-Bienestar-emergencias/manifest.json",
    "/PWA-Bienestar-emergencias/unal.png"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).catch(err => console.log('Error al agregar archivos a la caché', err))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
