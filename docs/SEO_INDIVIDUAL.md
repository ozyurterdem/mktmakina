# SEO — Siteye Özel (INDIVIDUAL)

> Bu dosya **yalnız bu siteye** aittir; serbestçe düzenlenir. Tüm sitelerde geçerli rijit çekirdek kurallar → [`SEO_STANDARD.md`](SEO_STANDARD.md) (master'dan senkronlanır, elle düzenlenmez).
>
> Esneklik buradadır: site değiştikçe burası güncellenir, standart bozulmaz.

## Kimlik

- **Domain:** `mktmakina.com`
- **Diller:** `TR (varsayılan), EN, DE, AR`

## Path Helper'lar (slash garantili — elle href yazma)

``src/i18n/translations.ts` çeviri sözlüğü. Path üretimi büyük ölçüde Astro'nun routing'iyle yapılıyor; merkezi `localePath` helper'ı bulunduğunda buraya eklenmeli. **DİKKAT:** statik href yazılırsa locale prefix ve trailing slash elle garanti edilmeli — yoksa GSC "Yönlendirmeli sayfa" raporları çıkar.`

## BANNED — Yasak (ölü) Path'ler

`scripts/seo-check.mjs` içindeki BANNED listesinin gerekçeleri. Her giriş **neden** yasak:

`Şu an yasak path yok. (Ölü/silinmiş çeviri sayfası eklenirse buraya gerekçeyle eklenir — ör. `erdemozyurt.com`'da `(en|de)/services/hosting` yasak edildi.)`

## Siteye Özel Notlar

`Canlı versiyon: `mktmakina-v3` (mktmakina.com). Eski versiyon `mktmakina/` (`mkt.siberkale.com`) standart kapsamı dışında. Memory: önceki SEO çalışması '✅ FIXED' olarak işaretli — standart eklenerek koruma kalıcılaştırılır.`

## Değişiklik Geçmişi (INDIVIDUAL)

- 2026-06-12 — İlk sürüm (GSC temizliği).
