# Controle Financeiro — PWA (com iframe)

Este é um "app" instalável (PWA) que exibe seu Controle Financeiro (Google
Apps Script) dentro de um `<iframe>` em tela cheia, com ícone e splash
próprios.

> **Passo obrigatório:** por padrão, o Google bloqueia qualquer página do
> Apps Script de ser embutida em iframe de outro domínio. Para liberar,
> troque o arquivo `Codigo.gs` do seu projeto pelo `Codigo.gs` incluído
> aqui (a única mudança real é uma linha a mais no `doGet()`:
> `.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)`), e crie
> uma nova implantação depois de colar o código.
>
> **Limite dessa abordagem:** isso libera a página do *seu* app para ser
> enquadrada. Mas se a implantação exigir login (acesso restrito) e o
> navegador não tiver uma sessão do Google já ativa, o redirecionamento
> para a tela de login ainda vai ser bloqueado (essa parte não depende do
> seu código — é uma proteção do Google contra clickjacking). Na prática,
> costuma funcionar bem no seu próprio celular, já logado na sua conta;
> pode falhar em navegadores deslogados. O `index.html` mostra um botão
> "Abrir direto" como alternativa nesses casos.

## 1. Atualize o Codigo.gs

No editor do Apps Script, substitua o conteúdo do seu `Codigo.gs` pelo
arquivo `Codigo.gs` incluído neste pacote (só o `doGet()` mudou, o resto do
backend é idêntico ao seu).

## 2. Pegue a URL do seu Web App

No editor do Apps Script (dentro da sua planilha → Extensões → Apps Script):

1. Clique em **Implantar → Gerenciar implantações**.
2. Clique no ícone de lápis (editar) na implantação existente.
3. Em **Versão**, escolha **Nova versão** (para o `ALLOWALL` entrar em
   vigor) e clique em **Implantar**.
4. A URL (termina em `/exec`) continua a mesma de antes.

## 3. Configure o index.html

Abra `index.html` e troque a linha:

```js
const APP_URL = "https://script.google.com/macros/s/SEU_ID_AQUI/exec";
```

pela URL que você copiou.

## 4. Publique no GitHub Pages

1. Crie um repositório novo (ex: `controle-financeiro`) e suba estes arquivos
   na raiz: `index.html`, `manifest.json`, `service-worker.js`, `icons/`
   (o `Codigo.gs` **não** vai no GitHub — ele fica só no Apps Script).
2. No repositório: **Settings → Pages → Source → Deploy from a branch**,
   escolha a branch `main` e a pasta `/ (root)`.
3. Aguarde alguns minutos — o GitHub te dará uma URL tipo
   `https://SEU-USUARIO.github.io/controle-financeiro/`.
4. Abra essa URL no celular e use **"Adicionar à tela inicial"**
   (Android/Chrome) ou **"Adicionar à Tela de Início"** (iOS/Safari) para
   instalar como app.

## Sobre o ícone

Os ícones (`icons/`) foram desenhados do zero — uma moeda com cifrão sobre um
fundo em gradiente roxo/violeta, com um selo verde de "crescimento" — e não
são ícones oficiais do Font Awesome (que são proprietários), mas seguem uma
linguagem visual parecida. Tamanhos incluídos, cobrindo Android, iOS e o
instalador do Chrome/desktop:

| Arquivo | Tamanho | Uso |
|---|---|---|
| `icon-512.png` | 512×512 | Android (splash/loja), manifest `any`/`maskable` |
| `icon-192.png` | 192×192 | Android (launcher), manifest `any`/`maskable` |
| `icon-144.png` | 144×144 | Chrome/Windows (tile) |
| `apple-touch-icon.png` | 180×180 | iPhone (tela de início) |
| `apple-touch-icon-167.png` | 167×167 | iPad Pro |
| `apple-touch-icon-152.png` | 152×152 | iPad |
| `favicon.svg` | vetorial | aba do navegador (nítido em qualquer tamanho) |
| `favicon-32.png` / `favicon-16.png` / `favicon.ico` | 32/16/multi | fallback para navegadores sem suporte a SVG |

Se você tiver uma licença/kit do Font Awesome e preferir os ícones oficiais
deles (ex: `sack-dollar`, `chart-line`), é só substituir os arquivos dentro
de `icons/` pelos exportados por você, mantendo os mesmos nomes e tamanhos.

## Limitações importantes

- O app **precisa de internet** para funcionar — os dados moram na sua
  planilha do Google, o iframe só carrega o Apps Script normalmente.
- O service worker só cacheia a "casca" (HTML, manifest, ícones), não os
  dados financeiros — isso é intencional, para você nunca ver dados
  desatualizados.
- Se depois de ~9 segundos o iframe não avisar que carregou, o `index.html`
  mostra automaticamente um aviso com botão "Abrir direto" — normalmente
  sinal de que falta a nova implantação com `ALLOWALL`, ou que o login
  ainda não foi feito nesse navegador.
