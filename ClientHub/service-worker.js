// Service worker simples do ClientHub.
// O conteúdo real (Index.html do Apps Script) vive dentro do iframe e é
// sempre buscado online — aqui só cacheamos o "casco" do PWA (o próprio
// index.html, manifest e ícones) para o app abrir rápido e poder ser
// instalado. Não há funcionamento offline dos dados dos clientes.

const CACHE_NAME = 'clienthub-shell-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  const url = event.request.url;

  // Nunca interceptar chamadas para o Google Apps Script (o app em si) —
  // isso precisa sempre ir para a rede, nunca vir do cache.
  if (url.indexOf('script.google.com') !== -1 || url.indexOf('script.googleusercontent.com') !== -1) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});
