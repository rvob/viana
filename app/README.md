# Dashboard IPTV — PWA

App instalável que reúne os 4 painéis (Blade, Club, FastPlay, Unitv) em um só lugar, com barra de navegação inferior estilo app.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público ou privado, mas privado exige GitHub Pro/Team para usar Pages).
2. Envie **todos os arquivos desta pasta** para a raiz do repositório, mantendo a estrutura:
   ```
   index.html
   manifest.json
   sw.js
   favicon.ico
   icons/
     icon-48.png
     icon-72.png
     icon-96.png
     icon-128.png
     icon-144.png
     icon-152.png
     icon-192.png
     icon-384.png
     icon-512.png
     icon-192-maskable.png
     icon-512-maskable.png
     icon-192-rounded.png
     icon-512-rounded.png
     apple-touch-icon.png
     favicon-16x16.png
     favicon-32x32.png
   ```
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", selecione a branch (geralmente `main`) e a pasta `/ (root)`. Salve.
5. Aguarde 1–2 minutos. O GitHub vai te dar um link do tipo:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
6. Abra esse link no celular (Chrome no Android ou Safari no iOS):
   - **Android/Chrome**: aparece um aviso ou o menu (⋮) mostra "Adicionar à tela inicial" / "Instalar app".
   - **iOS/Safari**: toque em Compartilhar (□↑) → "Adicionar à Tela de Início".
   - **Desktop/Chrome**: ícone de instalação aparece na barra de endereço.

O app vai instalar com o ícone da TV, nome "Dashboard IPTV" e abrir em tela cheia, sem a barra do navegador.

## Sobre os ícones

Todos foram gerados a partir da imagem que você enviou (TV em azul-marinho `#1E3050`):
- `icon-*.png`: ícones padrão (quadrados com leve respiro) — Android e Chrome arredondam automaticamente ao instalar.
- `icon-*-maskable.png`: versão com mais espaço ao redor, para o Android aplicar máscaras (círculo, "squircle" etc.) sem cortar o desenho.
- `icon-*-rounded.png`: versão com cantos já arredondados "assados" na imagem (bônus, caso precise usar em algum lugar que não arredonde sozinho).
- `apple-touch-icon.png`: ícone quadrado sem transparência — o iOS arredonda automaticamente ao adicionar à tela de início.
- `favicon.ico` / `favicon-16x16.png` / `favicon-32x32.png`: ícone da aba do navegador.

## Editar os painéis depois

Dentro do app, toque no ícone de engrenagem (⚙) no topo para trocar nomes/URLs dos 4 painéis. Isso fica salvo no navegador de quem estiver usando (não precisa mexer no código).

## Observação sobre alguns painéis

Se algum dos 4 sites não carregar dentro do app (tela em branco), é porque aquele painel bloqueia ser exibido dentro de outra página por segurança. Use o botão "abrir em nova aba" só para esse — os outros continuam funcionando normalmente.
