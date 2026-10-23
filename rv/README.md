# Gerador de Wallpapers RV

Ferramenta web para montar wallpapers e fotos de perfil com a logo RV e baixar em PNG no tamanho exato. Roda inteira no navegador: a logo vai embutida no `index.html` e nada é enviado para servidor nenhum.

## O que faz

- **Wallpaper PC 4K** (3840 × 2160) e **foto de perfil** (1024 × 1024).
- 24 paletas prontas (cores sólidas e degradês) ou cores livres com código hex, com botão de copiar.
- Fundo sólido, degradê linear (com ângulo) ou radial.
- Texturas: grão, linhas e pontos, com intensidade ajustável.
- Logo com cor, opacidade, tamanho, sombra (suave, profunda, brilho) e 9 posições no wallpaper.
- Na foto de perfil a logo fica sempre centralizada, com guia opcional do corte circular (o guia não vai para o arquivo).
- Lembra suas últimas escolhas no próprio navegador.

## Como usar

Abra o `index.html` no navegador. Não precisa instalar nada. As fontes (Sora, Manrope e JetBrains Mono) vêm do Google Fonts; sem internet a página usa fontes do sistema e continua funcionando.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (por exemplo `gerador-wallpapers-rv`).
2. Envie os arquivos desta pasta para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "Gerador de wallpapers RV"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/gerador-wallpapers-rv.git
   git push -u origin main
   ```
3. No repositório, abra **Settings → Pages**, em *Build and deployment* escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve.
4. Em um ou dois minutos o site fica em `https://SEU-USUARIO.github.io/gerador-wallpapers-rv/`.

## Estrutura

```
index.html   página completa (HTML, CSS, JS e logo embutida)
.nojekyll    faz o GitHub Pages servir o arquivo como está
README.md    este arquivo
```

## Trocar a logo

A logo está em base64 na constante `LOGO_B64` dentro do `index.html`. Use um PNG com fundo transparente (a ferramenta pinta a silhueta com a cor escolhida) e substitua o valor dessa constante.
