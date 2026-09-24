const CACHE_NAME = 'livro-cotw-shell-v5';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Nunca interceptar o Google Apps Script (nem qualquer outra origem).
  if (url.origin !== self.location.origin) return;

  if (event.request.method !== 'GET') return;

  // Stale-while-revalidate: responde com o cache na hora (rápido, funciona
  // offline), mas sempre busca uma versão nova em paralelo pra atualizar o
  // cache — assim, na próxima visita, o shell já está atualizado sozinho,
  // sem precisar lembrar de trocar o CACHE_NAME a cada deploy.
  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(event.request);
      const rede = fetch(event.request).then(response => {
        if (response && response.ok) cache.put(event.request, response.clone());
        return response;
      }).catch(() => cached);
      return cached || rede;
    })
  );
});
