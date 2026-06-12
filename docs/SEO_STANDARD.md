<!--
  ╔══════════════════════════════════════════════════════════════════╗
  ║  STANDARD KATMAN — MASTER'DAN SENKRON. ELLE DÜZENLEME.            ║
  ║  Kaynak: _project-standards/templates/SEO_STANDARD.md             ║
  ║  Güncelleme: master'ı düzenle → sürüm bump → sync-seo-standard.sh ║
  ║  Siteye özel kurallar SEO_INDIVIDUAL.md'ye yazılır, buraya DEĞİL. ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

# SEO Standardı — Çekirdek (STANDARD)

> **Sürüm:** 1.1.0 · **Kapsam:** Astro + `trailingSlash: 'always'` statik siteler
> Bu katman **tüm sitelerde birebir aynıdır** ve tek master'dan senkronlanır. Google Search Console'un herkese dayattığı rijit kurallardır. Dil/araç bağımsız — insan ve her AI kodlama ajanı için.
>
> Siteye özel değerler (domain, path helper adları, BANNED listesi, diller, OPSEC) → **`SEO_INDIVIDUAL.md`**.

## Neden Var

SEO hataları **iç içe geçmiş bir graf** oluşturur: tek bulguyu düzeltip "tamam" demek, bir hafta sonra yeni bir GSC bildirimi demektir. Bu standardın amacı kök nedenleri kapatıp **otomatik bir frenle** (build guard) tekrarı engellemektir.

## Temel İlke: 4 Katman Tek Strateji

Site `trailingSlash: 'always'` kullanır. Dört katman **aynı** stratejide olmalı; biri saparsa Google redirect/duplicate işaretler:

| Katman | Doğru çıktı (`always`) |
|---|---|
| 1. Build output (`dist/`) | `/sayfa/index.html` |
| 2. Server (nginx) | `/sayfa/` → 200, `/sayfa` → 301 |
| 3. HTML meta (canonical, hreflang, og:url) | `/sayfa/` |
| 4. Sitemap | `/sayfa/` |

## Kurallar

1. **Her iç bağlantı `/` ile biter.** `/hakkimizda/` doğru, `/hakkimizda` yanlış (slash'sız hâli 301'e düşer → "Yönlendirmeli sayfa").
   - Dosya uzantılı bağlantı slash **almaz**: `/rss.xml`, `/belge.pdf`.
   - `#` veya `?` varsa slash onlardan **önce** gelir: `/giris/?tab=x`, `/ar/#hizmetler`.

2. **Bağlantı string'ini elle yazma — path helper kullan.** Tek merkezi helper slash + locale prefix garantisi verir; elle yazılan her `href` zamanla sapar. (Helper adları → `SEO_INDIVIDUAL.md`.)

3. **hreflang/sitemap map'lerine RAW path ver**, helper çıktısını değil. Aksi halde çift prefix (`/en/en/...`) 404'leri doğar.

4. **Çevirisi olmayan sayfaya** hiçbir dilde bağlantı, hreflang `alternate` veya sitemap kaydı üretme. Sayfa açılmadan menüye/karta ekleme.

5. **Sayfa veya yazı silerken üç adım birden:**
   a. Ona giden tüm iç bağlantıları sök (markdown linkini düz metne çevir).
   b. nginx'e kural ekle: içerik taşındıysa **301**, tamamen kalktıysa **410** (410 Google'ı index'ten daha hızlı düşürür; 404 "doğrulama başarısız" döngüsü yaratır).
   c. `scripts/seo-check.mjs` BANNED listesine path'i ekle (gerekçe → `SEO_INDIVIDUAL.md`).

6. **robots.txt:**
   - `Disallow: /cdn-cgi/` bulunmalı (Cloudflare email-protection enjeksiyonu sahte 404 üretir).
   - `Disallow: /404` **asla** eklenmez (GSC "robots.txt tarafından engellendi" üretir).
   - Gerçek olmayan path'leri Disallow'lama; `Sitemap:` deklarasyonu bulunmalı.

7. **Build Guard zorunlu.** `npm run build` zincirinin sonunda `scripts/seo-check.mjs` koşar; `dist/` içinde slash'sız veya yasak (ölü) iç bağlantı bulursa **build'i kırar** — CI/Coolify build'i de fail eder, hata prod'a çıkamaz. Guard'ı bypass etme (`--no-verify`, yorumlama vb.); ihlal varsa **bağlantıyı düzelt**.

8. **Büyük değişiklik sonrası doğrulama (full crawl):**
   - Sitemap'taki **tüm** URL'ler 200 dönmeli (redirect/404 yok).
   - Her sayfanın HTML'inden çıkarılan iç bağlantılar **redirect takip edilmeden** test edilince: **0 kırık** (404/410/5xx) + **0 redirect hedefi** (301/302/308).
   - Canonical her sayfada self-referencing; hreflang slash'lı + `x-default` mevcut.
   - Sitemap testinin yeşil olması yetmez — Google 404/301'leri çoğunlukla **iç bağlantılardan** keşfeder.

## Build Guard Sözleşmesi (`scripts/seo-check.mjs`)

- `dist/` altındaki tüm `.html` taranır; `<script>` blokları hariç (JS template string'leri `href` değildir).
- **Üç ihlal türü:**
  - **SLASH** — uzantısız + `/` ile bitmeyen iç href (301'e düşer → "Yönlendirmeli sayfa").
  - **YASAK** — BANNED regex listesindeki ölü/taşınmış path'e iç link.
  - **DEAD** — hedefi `dist/`'te bulunmayan iç sayfa route'u (örn. çevirisi olmayan sayfaya link → 404). Guard build'de `dist/` route haritasını çıkarır; bir `<a>/<link>` hedefi haritada yoksa DEAD'dir. Yalnız **route**'lar denetlenir; dosya varlıkları (favicon, og.png, rss.xml) ve `/cdn-cgi/` (Cloudflare runtime) muaftır.
- Çıkış kodu 0 = temiz, 1 = ihlal (build durur). İlk 30 ihlal raporlanır.
- BANNED listesi repo-spesifiktir; her giriş `SEO_INDIVIDUAL.md`'de gerekçesiyle belgelenir.
- **Neden DEAD kritik:** SLASH+YASAK kontrolü "olmayan sayfaya link" 404'lerini yakalayamaz; bunlar build'i geçip canlıda GSC "Bulunamadı (404)" üretir (mktmakina slug tutarsızlığı, yusufkaplan çevirisiz yazı listesi örnekleri). DEAD bunu build-time keser.

## Yeni Sayfa / Dil Eklerken Kontrol Listesi

- [ ] Bağlantılar path helper'dan üretiliyor (slash garantili).
- [ ] Tüm desteklenen dillerde sayfa **gerçekten** var (yoksa o dile link/hreflang yok).
- [ ] Sitemap'a doğru (slash'lı) URL giriyor.
- [ ] `npm run build` yeşil (guard geçti).
- [ ] Gerekiyorsa full crawl doğrulaması.

## Changelog (STANDARD katman)

### 1.1.0 — 2026-06-12
- Build guard'a **DEAD** (dead-internal-link) kontrolü eklendi: hedefi `dist/`'te bulunmayan iç route'lar build-time yakalanır. Faz-2 yayılımında (anginyapi, mktmakina, ozkankalip, yusufkaplan, efendilergrup) "olmayan sayfaya link" 404'leri ortaya çıkınca eklendi (mktmakina slug tutarsızlığı, yusufkaplan çevirisiz yazı listesi). Yalnız route'lar; dosya varlıkları + `/cdn-cgi/` muaf.

### 1.0.0 — 2026-06-12
- İlk sürüm. GSC temizliği (ekonet, erdemozyurt, siberkale, tellal, mtokurumsal) derslerinden.
- 4-katman slash stratejisi, path-helper zorunluluğu, RAW-path hreflang, sayfa silme 3-adım, robots kuralları, build guard sözleşmesi, full-crawl doğrulaması.
