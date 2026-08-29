# -*- coding: utf-8 -*-
"""
publicar-lojas.py

Ativa os botoes de App Store / Google Play no site do AneStudy quando o
app for publicado. Ate la, os botoes ficam com o rotulo "Em breve" e sem
link (href="#", aria-disabled="true").

USO
---
1. Abra este arquivo e preencha APPSTORE_URL e/ou GOOGLE_PLAY_URL abaixo.
   Deixe como None a loja que ainda nao estiver publicada.
2. Rode, na raiz do repositorio (uma pasta acima de ferramentas/):

     python3 ferramentas/publicar-lojas.py

3. Confira o index.html no navegador e publique (git add / commit / push).

O script e seguro para rodar mais de uma vez: se os botoes ja estiverem
ativados, ele simplesmente nao encontra nada para trocar e avisa.
"""

import io

# ---------------------------------------------------------------------
# PREENCHA AQUI quando o app for publicado:
APPSTORE_URL = None      # ex.: "https://apps.apple.com/br/app/anestudy/id0000000000"
GOOGLE_PLAY_URL = None   # ex.: "https://play.google.com/store/apps/details?id=com.seuapp.anestudy"
# ---------------------------------------------------------------------

ARQUIVO = "index.html"

APPSTORE_OPEN_ANTIGO = (
    '<a href="#" class="store-btn is-soon" aria-disabled="true" '
    'onclick="return false;" aria-label="Em breve na App Store">\n'
    '              <span class="store-btn-soon-tag">Em breve</span>\n'
)
GOOGLEPLAY_OPEN_ANTIGO = (
    '<a href="#" class="store-btn is-soon" aria-disabled="true" '
    'onclick="return false;" aria-label="Em breve no Google Play">\n'
    '              <span class="store-btn-soon-tag">Em breve</span>\n'
)

APPSTORE_SMALL_ANTIGO = "<small>Baixe em breve na</small>"
GOOGLEPLAY_SMALL_ANTIGO = "<small>Baixe em breve no</small>"


def trocar(html, url, open_antigo, small_antigo, aria_label_novo, small_novo):
    if not url:
        return html, 0
    open_novo = f'<a href="{url}" class="store-btn" aria-label="{aria_label_novo}">\n'
    n = html.count(open_antigo)
    html = html.replace(open_antigo, open_novo)
    html = html.replace(small_antigo, small_novo)
    return html, n


def main():
    with io.open(ARQUIVO, encoding="utf-8") as f:
        html = f.read()

    total = 0

    html, n = trocar(
        html, APPSTORE_URL,
        APPSTORE_OPEN_ANTIGO, APPSTORE_SMALL_ANTIGO,
        "Baixar na App Store", "<small>Baixe na</small>",
    )
    total += n

    html, n = trocar(
        html, GOOGLE_PLAY_URL,
        GOOGLEPLAY_OPEN_ANTIGO, GOOGLEPLAY_SMALL_ANTIGO,
        "Baixar no Google Play", "<small>Baixe no</small>",
    )
    total += n

    if total == 0:
        print("Nada para ativar. Preencha APPSTORE_URL / GOOGLE_PLAY_URL no topo do script,")
        print("ou os botoes ja estao ativados.")
        return

    with io.open(ARQUIVO, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"{total} botao(oes) ativado(s) em {ARQUIVO}.")
    print("Confira no navegador antes de publicar.")


if __name__ == "__main__":
    main()
