# OPS_LOG — mktmakina (v3-aerospace-precision)

> **Append-only.** Yeni entry'yi en üste ekle (ters kronolojik). Eski entry'yi DÜZENLEME, yanlış ise üstüne yeni entry ile düzelt.
>
> Format zorunlu — AI agent bu dosyayı parse ediyor.

---

## 2026-08-20 17:00 | Cloudflare hedefli cache purge — logo/favicon değişimi sonrası

- **Aksiyon:** `POST /zones/f1c185b06814b5f6b90ee1a8f668b53f/purge_cache`, 18 URL (9 dosya × apex + www). Tüm zone purge YAPILMADI.
- **Sebep:** Deploy sonrası edge hâlâ eski kopyayı sunuyordu: `favicon.ico` ve silinmiş `images/logo.png` `cf-cache-status: HIT`, `age: ~73180` (20 saat).
- **Kim:** Erdem (agent oturumu, açık talep üzerine)
- **Sonuç:** ✅ `success: true`. Purge sonrası hedeflerin tamamı `MISS`; silinen `images/logo.png` ve `favicon.svg` artık **404** (önce 200 dönüyorlardı).
- **Backup:** N/A (cache invalidation, veri kaybı riski yok)
- **Rollback:** Gereksiz — purge geri alınmaz, edge kaynaktan yeniden doldurur.
- **Doğrulama:** Cache bypass **olmadan** indirilen `favicon.ico` (1510B), `apple-touch-icon.png` (8578B) ve `logo-white.png` (3463B) yerel dosyalarla `cmp` ile bayt bayt aynı.
- **Not:** 🔴 `cloudflare_dns_token` purge yetkisine sahip DEĞİL (`Authentication error 10000`); global key ile yapıldı. Bu iş için ayrı bir "Cache Purge" yetkili token açmak global key kullanmaktan güvenlidir.

---

## 2026-08-20 16:35 | GEREKSİZ manuel Coolify deploy — CI hattı zaten tetiklemişti

- **Aksiyon:** `POST /api/v1/deploy?uuid=c10qwyws5mb7l2gjvaltpwpk` (deployment `n5ag8sevffg8eae5rp6640wt`)
- **Sebep:** Push'tan ~30 sn sonra Coolify deployment kuyruğu boş, canlıda yeni varlıklar 404 → "webhook yok, deploy tetiklenmemiş" hükmü verildi.
- **Kim:** Erdem (agent oturumu)
- **Sonuç:** ⚠️ Deploy başarılı ama **gereksizdi**. Sonradan ölçüldü: aynı push'un Actions koşusu (`25849e9`) zaten çalışıyordu — build-push 16:27:56→16:28:33, deploy 16:28:36→16:28:40, verify success. İki deploy üst üste koştu.
- **Backup:** N/A
- **Rollback:** Gereksiz (statik site, aynı commit deploy edildi)
- **Doğrulama:** `gh run view 32392129897 --json jobs` → üç job da success; `gh variable list` → `COOLIFY_IST_UUID` dolu, yani `deploy` job'ı skip edilmemiş.
- **Not:** 🔴 **Ders:** İlk 30 saniyede Coolify kuyruğunun boş olması ve canlının 404 dönmesi "hat yok" demek değil, image build sürüyor demektir. "Deploy olmadı" hükmünden önce `gh run list` ile CI hattı sorulur. Push sonrası en az 2 dk beklenir.

---

## 2026-08-20 16:27 | Marka kimliği yenileme — yeni MKT logosu ve favicon seti (prod)

- **Aksiyon:** `v3-aerospace-precision`'a iki commit push (`390c87b` marka, `25849e9` temizlik). Header v2 yatay logo, Footer v1 istifli logo, favicon `.ico`/`.png`/`apple-touch-icon`, JSON-LD `Organization.logo` güncellendi. Eski `images/logo.png` ve Astro varsayılan `favicon.svg` silindi.
- **Sebep:** Ajanstan yeni marka kimliği geldi ("MKT — PRECISION TO FLIGHT"); sitedeki logo eski turuncu/mavi baklava kimliğiydi.
- **Kim:** Erdem (agent oturumu)
- **Sonuç:** ✅ Canlıda. Header `/images/logo-white.png` 261×40, Footer `/images/logo-stacked-white.png` 198×56, ikon meta üçlüsü HTML'de.
- **Backup:** N/A (git; öncesi `10c0ca0`)
- **Rollback:** `git revert 25849e9 390c87b` → push → CI deploy eder.
- **Doğrulama:** `npm run build` + `scripts/seo-check.mjs` yeşil; canlı DOM'da eski logo referansı 0, eski metin bloğu yok, yatay taşma yok; 375/1024/1280/1512 dört kırılma noktasında ölçüldü.
- **Not:** İki hata ölçümle yakalandı, gözle görünmüyordu: (1) `width="404"` attribute'ü Tailwind `h-8` ile birleşince en-boy oranını eziyordu → `w-auto`; (2) yeni logo eski marka bloğundan 20px geniş olduğu için 1024px'te "Teklif Al" butonu 12px taşıyordu, `overflow-x:hidden` yüzünden yatay scroll çıkmadan sessizce kırpılıyordu → `lg` aralığında logo daraltıldı.

---

<!-- Yeni entry'yi BURAYA, en üste ekle. Format şablonu:

## YYYY-MM-DD HH:MM | <kısa başlık>

- **Aksiyon:** <ne yapıldı, komut/UI adım>
- **Sebep:** <niye gerekti>
- **Kim:** <Erdem / agent / otomasyon>
- **Sonuç:** ✅ veya ❌ + kanıt (output, log, smoke)
- **Backup:** <varsa nereye, yoksa N/A>
- **Rollback:** <nasıl geri alınır, test edildi mi>
- **Doğrulama:** <smoke test sonucu>
- **PR:** <varsa link>
- **Not:** <gelecek için ders>

-->
