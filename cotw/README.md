# Livro de Capturas - COTW

PWA para abrir o Livro de Capturas do theHunter: Call of the Wild em tela cheia.

## Arquivos

- `index.html` — aplicativo e iframe do Google Apps Script.
- `manifest.json` — configuração PWA.
- `sw.js` — Service Worker do shell.
- `icons/` — ícones PWA.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos estes arquivos mantendo a estrutura das pastas.
3. Entre em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o GitHub Pages publicar.

Depois abra o endereço HTTPS do GitHub Pages.

## Importante sobre o iframe

O aplicativo depende do Google Apps Script permitir a incorporação em iframe. Se o navegador mostrar bloqueio de conteúdo, verifique as configurações de implantação do Web App no Google Apps Script.

O Service Worker não intercepta o domínio do Google Apps Script.
