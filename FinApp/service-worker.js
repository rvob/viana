// Service worker da casca do PWA.
// Importante: o conteúdo real do controle financeiro vive dentro do <iframe>,
// servido pelo Google Apps Script — ele NÃO é cacheado aqui (é de outra origem
// e precisa de internet para falar com a planilha). Este service worker só
// deixa a "casca" (index.html, manifest, ícones) disponível rapidamente,
// dando a sensação de app instalado.

const CACHE_NAME = "controle-financeiro-shell-v1";
const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-144.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/apple-touch-icon-152.png",
  "./icons/apple-touch-icon-167.png",
  "./icons/favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Só intercepta pedidos da própria casca (mesma origem).
  // Pedidos feitos de dentro do iframe (script.google.com) não passam por aqui.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});
