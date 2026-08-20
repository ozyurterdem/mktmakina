# PROJECT_STATE — mktmakina (v3-aerospace-precision)

> Anlık durum dosyası. **Her sprint başı/sonu** ve **her prod deploy** sonrası güncelle.
> Geçmiş kayıt için [OPS_LOG.md](./OPS_LOG.md) ve `CHANGELOG.md`'ye bak.

📝 **Last updated:** 2026-08-20 19:52 — Erdem

---

## ⚠️ Bu repoda iki versiyon var — branch'i doğrula

| Branch | İçerik | Deploy | Google |
|---|---|---|---|
| `v3-aerospace-precision` (default) | **Canlı public site** | mktmakina.com | indekslenir |
| `main` | Savunma sanayili sürüm, KIWA sertifikalı | mkt.siberkale.com + mkt2.siberkale.com (preview) | `noindex` + `Disallow: /` |

**İş yapmadan önce:** `git branch --show-current`. Ayraç `grep -r KIWA src/` — yalnız `main`'de bulunur.
(Not: "savunma" kelimesi **her iki branch'te de** geçer, ayraç olarak kullanılamaz.)

---

## 🟢 Active sprint

- **Ad:** Belirlenmedi — standart yeni kuruldu, ilk sprint'i tanımlayın
- **Açık PR'lar:** Yok (2026-08-20 ölçümü, `gh pr list --state open` → 0)
- **Son iş:** Marka kimliği yenileme (yeni MKT logosu + favicon seti), 2026-08-20 canlıda

---

## 🟡 Blocker

| Konu | Bekleniyor | Süre | Eylem |
|---|---|---|---|
| Yüksek çözünürlüklü favicon kaynağı (SVG veya 512×512) | Ajans | 2026-08-20'den beri | Mevcut kaynak 33×33; apple-touch-icon 180px'e büyütüldüğü için bulanık |

---

## 🔴 Known issues

| # | Severity | Tanım | Lokasyon | Workaround |
|---|---|---|---|---|
| 1 | P3 | AEO borcu: 4 dil ana sayfasında `BreadcrumbList` yok (5 ihlal) | `dist/{,en/,de/,ar/}index.html` | `AEO_ENFORCE=false` — build kırılmıyor, ihlal listeleniyor |
| 2 | P3 | AEO borcu: `_p/sig-*` sayfasında 4 adet `h1` + canonical yok | `dist/_p/sig-7f9fbd04/` | Aynı guard, aynı muafiyet |
| 3 | P3 | `data-theme="light"` hiçbir yerde set edilmiyor — light tema CSS'i ölü kod | `src/styles/global.css` | Tema switcher yok; siyah logo `loading="lazy"`, indirilmiyor |

> Severity: P0 (prod down) / P1 (kritik feature broken) / P2 (önemli bug) / P3 (kozmetik)

---

## 📦 Production state

- **Versiyon:** `package.json` → 0.0.1 (SemVer kullanılmıyor; CHANGELOG.md henüz yok)
- **Canlı commit:** depodan sorulur — `gh run list --limit 1` (son başarılı koşunun `headSha`'sı).
  Bu satıra sabit hash yazma; her docs push'u da image'ı yeniden kurar ve yazılan hash bayatlar.
- **Son içerik/kod deploy'u:** `25849e9` — 2026-08-20 16:28 UTC (marka kimliği yenileme)
- **Deploy URL'leri:**
  - Public: https://mktmakina.com (+ www)
  - Preview: https://mkt3.siberkale.com
- **Build pack:** Dockerfile (Coolify app `mkt3`, uuid `c10qwyws5mb7l2gjvaltpwpk`, IST)
- **Son manuel ops:** OPS_LOG.md → 2026-08-20 17:00 (Cloudflare cache purge)
- **Backup:** N/A — statik site, kaynak git'te. Kalıcı veri yok.

### Deploy nasıl çalışır (ölçüldü 2026-08-20)

`v3-aerospace-precision`'a **push otomatik deploy eder**. Coolify webhook'u yoktur;
zincir `.github/workflows/build-deploy.yml` üzerindedir:

```
push → build-push (ghcr image, ~40 sn) → deploy (Coolify API) → verify (health check)
```

🔴 **Push'tan sonra en az 2 dk bekle.** İlk 30 saniyede Coolify kuyruğu boş ve canlıda
yeni varlıklar 404 görünür — bu "deploy tetiklenmedi" demek DEĞİL, image build sürüyor
demektir. Durum sorulacaksa `gh run list` ile CI hattından sorulur, Coolify kuyruğundan değil.

---

## 🔗 Links

- **Repo:** https://github.com/ozyurterdem/mktmakina
- **Issues:** https://github.com/ozyurterdem/mktmakina/issues
- **Actions:** https://github.com/ozyurterdem/mktmakina/actions
- **Coolify:** http://coolify2.siberkale.com:8000 (app `mkt3`, uuid `c10qwyws5mb7l2gjvaltpwpk`)
  - 🔴 LAN yolu (`192.168.34.251:8000`) Mac'ten kopuk olabilir — her session ölç, kopuksa Cloudflare yolunu kullan
- **Cloudflare:** zone `mktmakina.com` (`f1c185b06814b5f6b90ee1a8f668b53f`)
  - 🔴 Cache purge yetkisi DNS token'da YOK, global key gerekiyor
- **Docs:** [AGENTS.md](../AGENTS.md) · [SEO_STANDARD](./SEO_STANDARD.md) · [GEO_STANDARD](./GEO_STANDARD.md) · [AEO_STANDARD](./AEO_STANDARD.md) · [SEO_INDIVIDUAL](./SEO_INDIVIDUAL.md) · [OPS_LOG](./OPS_LOG.md)

---

## 🧱 Stack

- Astro `^7.0.7` + Tailwind `^4.2.1` + `@astrojs/sitemap` `^3.7.3`
- `trailingSlash: 'always'`, 4 dil (TR varsayılan / EN / DE / AR)
- Build guard: `scripts/seo-check.mjs` — slash'sız, yasak ve ölü iç bağlantıda build'i kırar

---

## 🎯 Sprint hedefleri (rough)

- [ ] İlk sprint tanımlanacak
- [ ] Ajanstan favicon kaynağı gelince apple-touch-icon + PWA ikonu yenile
- [ ] AEO borcu: 4 dil ana sayfasına `BreadcrumbList` ekle (Known issue #1)
- [ ] `CHANGELOG.md` kur ve SemVer'e geç (şu an `0.0.1` sabit)

---

## 📝 Son sprint (Closed)

Kayıt yok — standart bu tarihte kuruldu.

---

<!-- Şablon notu: bu dosya max 150 satır olmalı. Geçmiş detayları OPS_LOG/CHANGELOG'a taşı. -->
