// Service worker da casca do PWA.
// Importante: o conteúdo real do controle financeiro vive dentro do <iframe>,
// servido pelo Google Apps Script — ele NÃO é cacheado aqui (é de outra
// origem e precisa de internet para falar com a planilha). Este service
// worker só deixa a "casca" (index.html, manifest, ícones) disponível
// rapidamente, dando a sensação de app instalado.
//
// Estratégia: network-first para HTML/manifest (para nunca ficar preso numa
// versão antiga depois de você atualizar os arquivos), cache-first para os
// ícones (que raramente mudam). Sempre que você alterar estes arquivos,
// aumente o número da versão abaixo — isso força o navegador a descartar o
// cache antigo.

const CACHE_VERSION = "v3";
const CACHE_NAME = "controle-financeiro-shell-" + CACHE_VERSION;

const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-144.png",
  "./icons/icon-192.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
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

const ARQUIVOS_NETWORK_FIRST = ["index.html", "manifest.json", "/"];

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Só intercepta pedidos da própria casca (mesma origem).
  // Pedidos feitos de dentro do iframe (script.google.com) não passam por aqui.
  if (url.origin !== self.location.origin) return;

  const ehNetworkFirst =
    event.request.mode === "navigate" ||
    ARQUIVOS_NETWORK_FIRST.some((nome) => url.pathname.endsWith(nome));

  if (ehNetworkFirst) {
    // HTML e manifest: tenta a rede primeiro, pra sempre pegar a versão mais
    // nova; só usa o cache se estiver offline.
    event.respondWith(
      fetch(event.request)
        .then((resposta) => {
          const clone = resposta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return resposta;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match("./index.html")))
    );
  } else {
    // Ícones e outros arquivos estáticos: cache primeiro (mudam pouco).
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
