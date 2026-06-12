# AGENTS.md

> Bu dosya projenin **tek kaynak** çalışma rehberidir — insan geliştiriciler ve AI kodlama ajanları için ortaktır. Araç-spesifik yapılandırma dosyaları yalnızca bu dosyaya köprü kurar, içerik tekrar etmez.
>
> Konvansiyon: <https://agents.md>

## Proje

- **Ad / amaç:** `MKT Makina — havacılık/savunma/otomotiv hassas işleme kurumsal sitesi`
- **Stack:** `Astro 5 + Tailwind + Preact, `trailingSlash: 'always'`, 4 dil (TR/EN/DE/AR)`
- **Canlı:** `https://mktmakina.com (Coolify-IST nginx, app uuid c10qwyws5mb7…)`
- **Deploy:** `main'e push → Coolify deploy`

## Kurallar (Genel)

- Tüm çıktı/yorum/commit mesajı **Türkçe**; teknik terim ve kod tanımlayıcıları orijinal.
- Commit mesajına AI imzası (`Co-Authored-By`, araç adı vb.) **eklenmez**.
- `credentials/` ve `.env` dosyalarına dokunma, commit etme.
- Değişiklikten önce mevcut durumu doğrula; "düzelttim" demeden önce **kanıtla** (build/test/crawl çıktısı).

## SEO (Statik Site)

Bu proje `trailingSlash: 'always'` bir statik sitedir. SEO kuralları **iki katman**, ikisi de bağlayıcı:
- [`docs/SEO_STANDARD.md`](docs/SEO_STANDARD.md) — tüm sitelerde ortak çekirdek (master'dan senkron, elle düzenlenmez).
- [`docs/SEO_INDIVIDUAL.md`](docs/SEO_INDIVIDUAL.md) — bu siteye özel (helper'lar, BANNED listesi, diller, OPSEC).

Özet:
- Her iç bağlantı `/` ile biter; bağlantıyı elle yazma, path helper kullan (helper'lar → INDIVIDUAL).
- `npm run build` içindeki `scripts/seo-check.mjs` guard'ı slash'sız/ölü iç bağlantıda build'i kırar — bypass etme, bağlantıyı düzelt.
- Sayfa silerken: iç bağlantıları sök → nginx 301/410 → guard BANNED listesine ekle (gerekçe INDIVIDUAL'a).

## Komutlar

```bash
npm run dev      # gelistirme
npm run build    # astro build + scripts/seo-check.mjs guard
```

## Doğrulama

`Buyuk degisiklik sonrasi seo-audit + full crawl. Memory: ozellikle 4 dilli hreflang'larda cifte-prefix kontrolu (siberkale'de yasanan bug).`
