# AneStudy — site institucional

Site de divulgação do app **AneStudy**, feito na mesma estrutura do site do
AnestICU, com paleta própria (sépia/âmbar, igual ao tema de leitura do app).

Serve para:
- Divulgar o app antes do lançamento (com botões "Em breve" para App Store
  e Google Play, fáceis de ativar quando publicar — veja abaixo).
- Hospedar a **Política de Privacidade** e os **Termos de Uso**, exigidos
  pela App Store e pela Google Play no momento do envio do app.

## Estrutura de pastas

```
anestudy/
├── index.html          → página principal
├── privacy.html         → Política de Privacidade
├── terms.html           → Termos de Uso
├── contact.html          → página de Contato
├── style.css
├── script.js
├── manifest.json
├── sitemap.xml
├── assets/
│   ├── logo.png              (ícone do app, 512×512)
│   ├── apple-touch-icon.png  (180×180, para iOS)
│   ├── favicon.ico
│   ├── logo.png.svg          (usado no manifest.json)
│   ├── social-preview.png    (imagem de compartilhamento — Open Graph)
│   └── screenshots/
│       ├── estudar.jpg
│       ├── flashcards.jpg
│       ├── leitura.jpg
│       ├── marcacoes.jpg
│       ├── progresso.jpg
│       └── ajustes.jpg
└── ferramentas/
    └── publicar-lojas.py  → script para ativar os links das lojas depois
```

## Sobre os ícones e a imagem de compartilhamento

Os arquivos em `assets/` (logo, favicon, apple-touch-icon, social-preview)
são **placeholders** que eu desenhei em tons de marrom/creme para bater
com o app, já que não temos o ícone oficial do AneStudy neste momento.
Quando o Luís tiver a arte final do app (o ícone exportado do Xcode/Figma,
por exemplo), é só substituir esses arquivos pelos definitivos — mantendo
o mesmo nome e, de preferência, o mesmo tamanho:

- `assets/logo.png` — 512×512px (ou maior), fundo pode ser transparente
- `assets/apple-touch-icon.png` — 180×180px, **sem** transparência
- `assets/favicon.ico` — pode gerar a partir do logo.png em qualquer
  conversor de favicon
- `assets/social-preview.png` — 1200×630px, é a imagem que aparece quando
  o link do site é compartilhado no WhatsApp, Twitter/X etc.

## Como os botões "Em breve" funcionam

Os botões de App Store e Google Play (no topo e no fim da página) foram
feitos em HTML/CSS puro — sem depender de nenhum selo oficial de loja —
porque o app ainda não está publicado. Hoje eles aparecem com um selo
"Em breve" e não são clicáveis.

Quando o app for publicado, existem duas formas de ativá-los:

**Opção 1 — rodar o script (recomendado):**
1. Abra `ferramentas/publicar-lojas.py`.
2. Preencha `APPSTORE_URL` e/ou `GOOGLE_PLAY_URL` com os links reais.
3. Na raiz do repositório, rode:
   ```
   python3 ferramentas/publicar-lojas.py
   ```
4. Confira o `index.html` no navegador e publique.

**Opção 2 — manual:** o próprio `index.html` tem um comentário logo no
`<head>` explicando exatamente o que trocar em cada um dos dois blocos de
botões (procure por `BOTOES-LOJA`).

## Passo a passo para publicar no GitHub Pages

Isso assume que o Luís já tem uma conta no GitHub (a mesma do AnestICU:
`drluishmg-code`) e o Git configurado no computador. Se ele já usa o
GitHub Desktop ou o VS Code, pode fazer os mesmos passos por lá — a
lógica é a mesma.

1. **Criar o repositório novo**
   - Entre em github.com, logado como `drluishmg-code`.
   - Clique em "New repository".
   - Nome do repositório: `anestudy` (tudo minúsculo, igual ao padrão do
     `anesticu`).
   - Deixe público, sem README/gitignore automático (vamos subir os
     arquivos já prontos).
   - Clique em "Create repository".

2. **Subir os arquivos**
   - Baixe a pasta `anestudy` que preparei (é o zip anexado nesta
     conversa) e descompacte no computador.
   - Pelo terminal, dentro da pasta descompactada:
     ```
     git init
     git add .
     git commit -m "Site inicial do AneStudy"
     git branch -M main
     git remote add origin https://github.com/drluishmg-code/.git
     git push -u origin main
     ```
   - Ou, se preferir sem terminal: abra o GitHub Desktop → "Add local
     repository" → selecione a pasta → "Publish repository".

3. **Ativar o GitHub Pages**
   - No repositório `anestudy`, vá em **Settings → Pages**.
   - Em "Source", selecione a branch `main` e a pasta `/ (root)`.
   - Salve. Em alguns minutos o site fica no ar em:
     `https://drluishmg-code.github.io/anestudy/`

4. **Conferir os links que vão para a App Store Connect / Play Console**
   - Política de Privacidade: `https://drluishmg-code.github.io/anestudy/privacy.html`
   - Termos de Uso: `https://drluishmg-code.github.io/anestudy/terms.html`

   Esses dois links são os que normalmente pedem no formulário de
   publicação do app, tanto na Apple quanto no Google.

## O que eu inventei/assumi (revise antes de publicar)

Para essa ser uma surpresa completa, tomei algumas decisões sozinha —
vale ele dar uma conferida:

- **contact.html** não estava entre os arquivos que você me passou (só
  é referenciado pelo menu). Criei um do zero, simples, só com e-mail de
  contato — se o site do AnestICU já tem uma versão diferente, você pode
  substituir por ela.
- **Ícone e imagem de compartilhamento** são placeholders desenhados por
  mim (ver seção acima) — troque pela arte oficial do app assim que
  tiver.
- **Textos de "Recursos" e "Sobre"** foram escritos a partir do que vi
  nos prints do app (flashcards, repetição espaçada, grifos/anotações,
  progresso, temas de leitura, backup manual). Se algo não bater 100%
  com o que o Luís quer comunicar, é só ajustar o texto direto no
  `index.html`.
- Segui a orientação de chamar o menu do app de **"Flashcards"** em vez
  de "Revisar" em todo o site, já que ele disse que vai renomear esse
  item no app.
