#!/bin/sh
# Savunma sürümü sunucuda /usr/share/nginx/savunma'da durur ve dışarıya yalnız
# Worker'ın gizli anahtarıyla (X-Surum-Anahtar başlığı) /_surum/savunma/ iç
# yolundan açılır. SURUM_ANAHTAR yoksa ya da biçimi bozuksa iç yol hiç açılmaz:
# kapı kapalı kalır, site endüstri sürümünü sunmaya devam eder.
set -eu
OUT=/etc/nginx/surum/savunma.conf
mkdir -p /etc/nginx/surum

if printf '%s' "${SURUM_ANAHTAR:-}" | grep -Eq '^[0-9a-f]{64}$'; then
  cat > "$OUT" <<CONF
location ^~ /_surum/savunma/ {
    if (\$http_x_surum_anahtar != "${SURUM_ANAHTAR}") { return 404; }
    # Eğik çizgisiz sayfa adresi ana siteyle aynı biçimde 301 alır (göreli Location).
    rewrite ^/_surum/savunma(/[^.]*[^/])\$ \$1/ permanent;
    rewrite ^/_surum/savunma(/.*)\$ \$1 break;
    root /usr/share/nginx/savunma;
    # \$uri/ BİLEREK yok: index yönergesi iç yönlendirme yapar ve istek kök
    # konuma (endüstri) düşerdi. Dosya burada doğrudan sunulur.
    try_files \$uri \$uri/index.html =404;
}
CONF
  echo "surum: savunma ic yolu anahtarla acik"
else
  : > "$OUT"
  echo "surum: SURUM_ANAHTAR yok ya da gecersiz, savunma ic yolu kapali"
fi
