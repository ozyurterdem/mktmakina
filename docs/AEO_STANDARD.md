# AEO Standardı (Answer Engine Optimization)

> **Sürüm:** 1.0.0 · **Kapsam:** Kamuya açık içerik yayınlayan tüm web projeleri
> Bu katman **tüm sitelerde birebir aynıdır** ve tek master'dan senkronlanır
> (`_project-standards/templates/AEO_STANDARD.md`). Elle düzenlenmez; siteye özel
> değerler `SEO_INDIVIDUAL.md`'ye yazılır.
>
> **Amaç:** İçeriğin AI arama motorları (Google AI Overviews / AI Mode, ChatGPT Search,
> Perplexity, Claude, Bing Copilot) tarafından doğru ayrıştırılması, güvenle atfedilmesi
> ve alıntılanması.
>
> **Kullanım:** `docs/AEO_STANDARD.md` olarak projeye kopyalanır ve `AGENTS.md` içinden
> referans verilir. Yeni sayfa/yazı üretirken ve mevcut sayfaları düzenlerken zorunlu
> referanstır.

## Katman haritası: SEO, GEO, AEO nasıl ayrışır?

Üçü de bağlayıcıdır ve çakışmazlar; farklı soruları cevaplarlar:

| Katman | Sorusu | Dosya |
|---|---|---|
| **SEO** | Sayfa taranabilir ve indekslenebilir mi? (slash, canonical, sitemap, redirect, build guard) | `docs/SEO_STANDARD.md` |
| **GEO** | İçerik AI yüzeylerinde görünmeye ve atıf almaya değer mi? (özgünlük, hub+derin küme, E-E-A-T, spam sınırları) | `docs/GEO_STANDARD.md` |
| **AEO** | İçerik makine tarafından **tek başına çıkarılabilir** mi? (answer-first blok, sorgu formunda başlık, entity grafiği, `@id` bütünlüğü) | `docs/AEO_STANDARD.md` (bu dosya) |
| **INDIVIDUAL** | Bu siteye özel değerler (domain, helper, BANNED, OPSEC, kelime haritası) | `docs/SEO_INDIVIDUAL.md` |

Çakışan iki noktada geçerli hüküm:

- **FAQPage:** GEO "gerçek sorular varsa FAQ şeması kullan" der; AEO §2.3 aynı koşulu getirir ve rich result desteğinin kalktığını ekler. Sonuç değişmez: **gerçek soru varsa markup kalır, yoksa eklenmez.**
- **llms.txt:** GEO §9 "düşük maliyetli ek sinyal, Google katkısı beklenmez" der; AEO §7 aynı sonuca varır. Yayınlanır, görünürlük beklentisi kurulmaz, öncelik listesinin sonundadır.

---

## 0. Temel ilke

**AEO'nun ağırlığı markup'ta değil, içeriğin tek başına çıkarılabilir (self-contained
extractable) olmasındadır.** Google, Mayıs 2026 tarihli üretken AI arama rehberinde
AI Overviews / AI Mode için yapılandırılmış verinin *gerekli olmadığını* ve bunlara özel
bir schema.org tipi bulunmadığını belirtti. Schema bir **varlık (entity) ve güven sinyali**dir,
bir tetikleyici değil.

Öncelik sırası her zaman: **içerik yapısı > entity grafiği > teknik erişilebilirlik > deneysel dosyalar.**

Anahtar kelimeler RFC 2119 anlamındadır: **ZORUNLU**, **ÖNERİLİR**, **ASLA**.

---

## 1. İçerik katmanı

### 1.1 Answer-first blok (ZORUNLU)

Her içerik sayfası, ana sorusunun cevabını ilk 400 karakter içinde vermek **ZORUNDADIR**.

Kurallar:

- 40–70 kelime, tek paragraf.
- **Tek başına ayakta durmalı.** Önceki cümleye, başlığa veya sayfa bağlamına atıf yapan
  zamir/gösterme sıfatı kullanılamaz.
- Öznesi açık olmalı: konunun tam adı paragrafın içinde geçmeli.
- Tanım cümlesiyle başlamalı: `<Terim>, <tanım>dır/işlemidir/yöntemidir.`

```
❌ Bu yöntem, operatörlerin abone tespitini kolaylaştırır ve aşağıda anlatılmıştır.
✅ CGNAT log forensics, tek bir public IP arkasındaki aboneyi zaman damgası ve
   kaynak port aralığı eşleştirerek tespit etme işlemidir. MikroTik RouterOS 7.x
   üzerinde `/ip firewall connection tracking` loglarının syslog'a aktarılması ve
   NAT tablosuyla korelasyonu gerekir. Doğru sonuç için NTP senkronizasyonu ve
   en az 12 aylık log saklama şarttır.
```

### 1.2 Başlık yapısı (ZORUNLU)

- Sayfada tek `<h1>`, atlanmış seviye yok (`h2` → `h4` geçişi yasak).
- `<h2>`/`<h3>` başlıkları **kullanıcının yazacağı sorgu formunda** olmalı, pazarlama
  başlığı değil.
  - ❌ `Güçlü Bir Yaklaşım`
  - ✅ `MikroTik'te CGNAT loglarından abone nasıl tespit edilir?`
- **Her başlığın altındaki ilk paragraf, o başlığın tam cevabı olmalıdır.** Detay, istisna
  ve arka plan sonraki paragraflara. Bu kural pazarlıksızdır — modeller alıntıyı bu
  paragraftan alır.

### 1.3 Spesifiklik (ZORUNLU)

Doğrulanabilir spesifiklik, jenerik ifadeye tercih edilir:

- Versiyon numarası yaz: `RouterOS 7.14` ✅ / `yeni sürümler` ❌
- Tarih yaz: `Mayıs 2026 itibarıyla` ✅ / `son zamanlarda` ❌
- Sayı ve birim yaz: `~40 ms` ✅ / `çok hızlı` ❌
- Komut, dosya yolu, port, RFC numarası — hepsi tam yazılır.

### 1.4 Format (ÖNERİLİR)

- Karşılaştırma varsa **tablo**. Prose içine gömülü karşılaştırma yapma.
- Sıralı işlem varsa **numaralı liste**, her adım tek eylem.
- Terim tanımları için ayrı, kısa, tek konulu sayfalar aç (`/sozluk/<terim>` veya
  `/nedir/<terim>`). Bunlar AEO'nun en yüksek getirili formatıdır.

### 1.5 Yasaklar (ASLA)

- Sırf sayfa uzatmak için FAQ bölümü uydurma. Soru gerçek bir kullanıcı sorusu değilse
  yazma.
- İçeriği "yukarıda belirtildiği gibi", "aşağıda göreceğiniz üzere" gibi bağlam bağımlı
  ifadelerle örme.
- LLM ile üretilmiş, kaynağı doğrulanmamış teknik iddia yayınlama. Her sayısal iddia ya
  kendi ölçümümüz ya da atıf verilmiş bir kaynak olmalı.

---

## 2. Entity grafiği ve JSON-LD

### 2.1 Kanonik `@id` şeması (ZORUNLU)

Her proje için sabit, değişmeyen `@id` değerleri tanımlanır ve **tüm sayfalarda aynı**
kullanılır. Bu, "aynı kişi/kurum mu?" belirsizliğini kapatan ana sinyaldir.

```
https://<domain>/#person        → Person
https://<domain>/#organization  → Organization
https://<domain>/#website       → WebSite
```

Site genelinde (layout içinde), tek bir `@graph` bloğu:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://example.com/#person",
      "name": "...",
      "url": "https://example.com/",
      "jobTitle": "...",
      "worksFor": { "@id": "https://example.com/#organization" },
      "knowsAbout": ["...", "..."],
      "sameAs": [
        "https://github.com/...",
        "https://www.linkedin.com/in/...",
        "https://x.com/..."
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "...",
      "url": "https://...",
      "founder": { "@id": "https://example.com/#person" },
      "sameAs": ["..."]
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "publisher": { "@id": "https://example.com/#organization" },
      "inLanguage": "tr-TR"
    }
  ]
}
```

**Kural:** `sameAs` dizisi mümkün olan her doğrulanabilir profili içermeli. Eksik `sameAs`,
entity çözümlemesinin en sık kırıldığı yerdir.

### 2.2 Sayfa seviyesi (ZORUNLU)

Her içerik sayfası, site geneli grafiğe **referansla bağlanan** kendi düğümünü ekler:

```json
{
  "@type": "TechArticle",
  "@id": "https://example.com/yazi/slug#article",
  "headline": "...",
  "description": "<answer-first bloğun aynısı>",
  "author":    { "@id": "https://example.com/#person" },
  "publisher": { "@id": "https://example.com/#organization" },
  "isPartOf":  { "@id": "https://example.com/#website" },
  "datePublished": "2026-07-01",
  "dateModified":  "2026-07-28",
  "inLanguage": "tr-TR",
  "image": "https://example.com/og/slug.png"
}
```

- Teknik içerikte `Article` yerine **`TechArticle`** kullanılır (daha dar, daha net tip).
- `BreadcrumbList` her alt sayfada **ZORUNLU**.
- Opsiyonel alanlar (`author`, `image`, `dateModified`, `sameAs`, `description`) boş
  bırakılmaz — entity güvenini asıl bunlar taşır.
- `dateModified` elle yazılmaz; git commit tarihinden türetilir.

### 2.3 FAQPage (KOŞULLU)

- Google 7 Mayıs 2026'da FAQ rich result'ları Search'ten kaldırdı; Search Console FAQ
  raporu ve Rich Results Test desteği Haziran 2026, API desteği Ağustos 2026'da bitti.
- FAQPage tipi **deprecate değil** ve kullanılmayan yapılandırılmış veri Search için sorun
  yaratmıyor.
- **Kural:** Sayfada gerçek, yayıncı tarafından yazılmış soru-cevap içeriği varsa markup
  kalır. Yoksa **eklenmez**. Kullanıcıların cevap gönderdiği forum tipi içerik için
  `FAQPage` değil `QAPage` kullanılır.

---

## 3. Teknik erişilebilirlik

### 3.1 Sunucu tarafı render (ZORUNLU)

Ana içeriğin **tamamı** ham HTML'de bulunmalı. Doğrulama:

```bash
curl -sL https://<url> | grep -o 'answer-first cümlesinden bir parça'
```

Çıktı boşsa içerik client-side render ediliyordur ve AI crawler'ların çoğu onu göremez.
Bu bir bug'dır, düzeltilmeden merge edilmez.

### 3.2 Crawler politikası (ZORUNLU)

`robots.txt` ve varsa CDN/WAF (Cloudflare) bot kuralları **bilinçli** olarak
yapılandırılmalı. Eğitim botları ile arama/atıf botları farklıdır:

| User-agent | Amaç | Varsayılan politika |
|---|---|---|
| `OAI-SearchBot` | ChatGPT Search atıf | **Allow** |
| `Claude-SearchBot` | Claude arama atıf | **Allow** |
| `PerplexityBot` | Perplexity atıf | **Allow** |
| `Googlebot` | Search + AI Overviews | **Allow** |
| `Bingbot` | Bing + Copilot | **Allow** |
| `GPTBot` | OpenAI eğitim/tarama | Proje bazında karar |
| `ClaudeBot` | Anthropic tarama | Proje bazında karar |
| `Google-Extended` | Gemini eğitimi | Proje bazında karar |
| `Applebot-Extended` | Apple eğitimi | Proje bazında karar |

**Uyarı:** Cloudflare'in bazı planlarında varsayılan AI bot engellemesi açıktır ve
`robots.txt` doğru olsa bile istekleri keser. Yeni proje kurulumunda bu kontrol
**ZORUNLU** bir adımdır.

### 3.3 Diğer (ZORUNLU)

- `sitemap.xml` + `robots.txt` içinde sitemap referansı
- Kanonik URL, sayfa başına tek `<link rel="canonical">`
- Çok dilli içerikte `hreflang` + `x-default` (eksikse iki dil birbirini yer)
- RSS/Atom feed
- URL'ler kalıcı; değişirse 301

---

## 4. Astro projelerinde uygulama

### 4.1 Content collection şeması (ZORUNLU)

Her content collection şemasına zorunlu `answer` alanı eklenir:

```ts
// src/content/config.ts
const yazilar = defineCollection({
  schema: z.object({
    title: z.string(),
    answer: z.string().min(120).max(400), // answer-first blok — ZORUNLU
    question: z.string().optional(),      // sayfanın hedef sorgusu
    publishedAt: z.coerce.date(),
    lang: z.enum(["tr", "en"]).default("tr"),
    // ...
  }),
});
```

Bu tek alan **üç yerde** kullanılır ve üçü de birebir aynı metin olur:

1. Sayfanın en üstündeki görünür answer-first bloğu
2. `<meta name="description">`
3. JSON-LD `description`

Tutarsızlık entity güvenini düşürür; bu yüzden alan tek kaynaktan beslenir.

### 4.2 Ortak bileşenler

- `<SchemaGraph />` — site geneli `@graph`, layout içinde bir kez
- `<ArticleSchema />` — sayfa düğümü, referanslarla bağlı
- `<Breadcrumbs />` — görsel + JSON-LD birlikte
- `<AnswerBlock />` — `answer` alanını render eder, stil tutarlılığı sağlar

### 4.3 CI kontrolü (ÖNERİLİR)

Build sırasında başarısız olması gereken kontroller:

- `answer` alanı eksik veya 120 karakterden kısa
- Sayfada birden fazla `<h1>`
- JSON-LD parse hatası veya kırık `@id` referansı
- `dateModified` < `datePublished`
- Kanonik URL eksik

---

## 5. Ölçüm

Klasik sıralama takibi bu iş için geçersizdir. Ölçülecekler:

1. **AI crawler log'u** — sunucu/CDN loglarında yukarıdaki user-agent'ları ayrı bir
   dashboard'a düşür. Zabbix/Graylog/Grafana zaten kuruluysa maliyeti düşüktür.
2. **AI referral trafiği** — referrer bazlı: `chatgpt.com`, `perplexity.ai`, `claude.ai`,
   `gemini.google.com`, `copilot.microsoft.com`.
3. **Manuel spot-check** — ayda bir, hedef sorguları ChatGPT / Perplexity / Claude /
   Google AI Mode üzerinde sorup atıf alınıp alınmadığını kaydet.
4. Google Search Console — schema hataları ve klasik arama tarafı.

---

## 6. Kanıtlanmamış iddialar (uygulanmaz)

Piyasada dolaşan ama **doğrulanmamış** iddialar. Bunları standart olarak uygulamıyoruz,
karar alırken gerekçe olarak kullanmıyoruz:

- "FAQ schema AI alıntısını 3.2× artırıyor" — hiçbir AI sağlayıcısı veya Google
  tarafından doğrulanmadı, satıcı kaynaklı.
- "Schema eklemek AI Overviews'a girmeyi sağlar" — Google'ın kendi rehberi bunun aksini
  söylüyor.
- "llms.txt AI arama görünürlüğünü artırır" — bkz. §7.
- "Belirli kelime yoğunluğu / uzunluk AI alıntısını artırır" — dayanaksız.

**Kural:** Bir AEO taktiği standarda ancak (a) platform sağlayıcısının resmi
dokümantasyonuna veya (b) kendi ölçümümüze dayanıyorsa girer. Ajans blogu kaynak
sayılmaz.

---

## 7. llms.txt (opsiyonel, deneysel)

Durum, Mayıs–Temmuz 2026 itibarıyla:

- Hiçbir büyük AI sağlayıcısı (OpenAI, Google, Anthropic, Meta, Mistral) üretim
  sistemlerinde llms.txt okuduğunu taahhüt etmedi.
- Geniş ölçekli bot trafiği analizlerinde arama botları dosyayı büyük ölçüde atlayıp
  doğrudan HTML tarıyor.
- Google (Gary Illyes, Temmuz 2025) desteklemediğini ve planlamadığını açıkladı.

**Karar:** Maliyeti düşük olduğu için yayınlanabilir, ancak **görünürlük beklentisiyle
değil**, makine okunur bir yüzey olarak. Öncelik listesinin en sonunda.

**Tuzak:** Her sayfanın ayrı Markdown kopyasını üretip indexlenebilir bırakmak ölçekli
duplicate content yaratır. Üretiliyorsa `noindex` + `robots.txt` ile Googlebot'a kapalı
olmalı.

---

## 8. Definition of Done — sayfa bazında

Bir sayfa aşağıdakilerin tamamı sağlanmadan yayına alınmaz:

- [ ] Answer-first blok var, 40–70 kelime, tek başına anlaşılıyor, zamirle başlamıyor
- [ ] `answer` alanı = meta description = JSON-LD `description`
- [ ] Tek `<h1>`, atlanmış heading seviyesi yok
- [ ] `<h2>`/`<h3>` başlıkları soru formunda ve altlarındaki ilk paragraf tam cevap
- [ ] Sayısal/teknik iddialarda versiyon ve tarih belirtilmiş
- [ ] JSON-LD: sayfa düğümü + `@id` referanslarıyla site grafiğine bağlı
- [ ] `BreadcrumbList` var
- [ ] `datePublished` / `dateModified` doğru, `dateModified` otomatik
- [ ] Kanonik URL, `hreflang` (çok dilliyse)
- [ ] `curl` ile ham HTML'de ana içerik görünüyor
- [ ] Rich Results Test / Schema.org validator temiz

## 9. Definition of Done — proje bazında

- [ ] Site geneli `@graph` (Person + Organization + WebSite) tek kaynakta tanımlı
- [ ] `sameAs` dizileri eksiksiz
- [ ] `robots.txt` §3.2 tablosuna göre yapılandırılmış
- [ ] Cloudflare/CDN AI bot engellemesi kontrol edilmiş
- [ ] `sitemap.xml` + RSS
- [ ] AI crawler log dashboard'u kurulu
- [ ] CI kontrolleri aktif
