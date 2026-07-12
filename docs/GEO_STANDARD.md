# GEO Standardı — AI Görünürlük + İçerik (STANDARD)

> **Sürüm:** 1.0.0 · **Kapsam:** Tüm statik siteler (Google organik + AI Overviews/AI Mode + diğer AI arama yüzeyleri)
> Bu katman **tüm sitelerde birebir aynıdır** ve tek master'dan senkronlanır (`_project-standards/templates/GEO_STANDARD.md`). Elle düzenlenmez.
> Teknik/GSC çekirdeği → `SEO_STANDARD.md`. Siteye özel değerler (kelime haritası, diller, helper'lar) → `SEO_INDIVIDUAL.md` + `docs/SEO_KEYWORDS.md`.
>
> Dayanak: Google'ın resmi Search Central dokümanları (sondaki kaynak listesi), 2026-07-12'de canlı hâlinden doğrulandı.

## 0. Doğrulanmış temel gerçekler

Bu standardın zemini; hepsi Google'ın resmi dokümanlarından teyitlidir:

1. **AI Overviews / AI Mode için ayrı bir gereklilik yoktur.** Standart Search Essentials + genel SEO yeterlidir; "AI SEO" diye ayrı bir teknik yoktur.
2. **Özel dosya veya şema gerekmez.** Google, "AI metin dosyaları" (llms.txt benzeri) veya özel schema türü istemediğini açıkça söyler. (llms.txt'yi yine de tutuyoruz: Google-dışı AI botları için düşük maliyetli ek sinyal — bkz. §9. Google görünürlüğüne katkı beklenmez.)
3. **Gösterim garanti edilmez ve dinamiktir.** AI Overview yalnızca sistemler klasik aramaya değer katacağına karar verdiğinde çıkar. Hedef "her sorguda çıkmak" değil, **atıf havuzunda kalıcı olmak**tır.
4. **Query fan-out:** AI Mode karmaşık soruyu alt sorulara böler ve çoklu arama yapar. İçerik mimarisi bu yüzden **alt-soru bazlı** kurulur (§2).
5. **Snippet kontrolleri AI girdisini doğrudan yönetir:** `nosnippet` sayfanın AI Overviews/AI Mode'a **girdi olmasını tamamen engeller**; `max-snippet` kullanılabilecek metni sınırlar; `max-snippet:0` = nosnippet. Değerli sayfada bu direktifler bulunmamalıdır.
6. **Search Console'da AI'a özel ayar veya ayrı rapor YOKTUR.** AI Overviews/AI Mode trafiği Performans raporunda **"Web" arama türüne birleşik** raporlanır. ("Generative AI kontrolü/raporu var" bilgisi yanlıştır; üçüncü taraf kaynaklarda dolaşan bu iddiaya itibar etme.)

## 1. Teknik eşik (SEO_STANDARD'a ek)

- [ ] Googlebot hiçbir katmanda engellenmiyor: robots.txt + CDN + WAF + bot koruması (Cloudflare Bot Fight Mode kapalı).
- [ ] Değerli sayfalarda `noindex`, `nosnippet`, `max-snippet` kısıtı yok; `data-nosnippet` yalnız bilinçli gizleme için. Şüphede: `curl -A Googlebot` ile canlı HTML'de robots meta kontrol et.
- [ ] Sayfa 200 dönüyor, indekslenebilir metin içeriyor (Search Essentials/technical üç koşulu: Googlebot engellenmemiş + 200 + indexable content).
- [ ] Önemli bilgi **HTML metni** olarak var; yalnız görsele, PDF'e veya etkileşim-sonrası JS'e gömülü değil. (Google/AI features: "önemli içeriği metin formatında sun".)
- [ ] Her değerli URL'ye en az bir gerçek `<a href>` iç bağlantı var (routerLink/onclick/span-href Google'a görünmez). Anchor metni tanımlayıcı: "buraya tıkla" / "devamını oku" YASAK.
- [ ] Dış kaynak linki vermekten çekinilmez: birincil kaynaklara (resmi doküman, üretici, mevzuat) atıf güvenilirlik sinyalidir (Google links dokümanı bunu açıkça söyler).
- [ ] Sayfa deneyimi öğeleri: HTTPS, mobil uyum, ana içeriği kapatan interstitial yok, dikkat dağıtan aşırı reklam yok, ana içerik yardımcı içerikten ayırt edilebilir. Not: tek bir "deneyim sinyali" yoktur; **alaka her zaman önce gelir** — CWV skoru sıralama garantisi değildir.

## 2. İçerik mimarisi: alıntılanabilir cevap (fan-out uyumu)

- **Her H2 bölümü tek başına bir alt-soruyu cevaplar.** Yapı: başlığın hemen altında 2-4 cümlelik net cevap/sonuç → hangi koşulda geçerli → nasıl yapılır/karşılaştırma → sınırlar/riskler → ilgili sayfalara iç link.
- **Hub + derin sayfa modeli:** Önemli konu başına bir karar/genel bakış sayfası (hub) + uygulama rehberi + sorun giderme + karşılaştırma + maliyet/risk sayfaları. Hepsi çapraz iç linkli. Rastgele 30 yazı değil, örülü küme.
- **Her önemli sayfada:** özet kutusu (sayfanın cevabı tek paragrafta), gerçek sorulardan SSS, gerçek güncelleme tarihi, kaynaklar bölümü.
- **Özgünlük katmanı zorunlu:** İlk elden deneyim, ölçüm, ekran görüntüsü, vaka, karar gerekçesi — sayfada **başka sitede olmayan en az bir bilgi varlığı** bulunmalı. Mevcut içeriklerin yeniden yazılmış özeti üretme; Google tam olarak bunu değersiz sayar.
- **Kanibalizasyon yasak:** Hedef kelimeler `docs/SEO_KEYWORDS.md`'den seçilir; aynı arama niyetine ikinci sayfa açılmaz. Çok siteli ailede aynı niyete farklı **içerik tipi** (kurumsal sayfa vs how-to rehber) meşrudur.
- **Yayın öncesi öz-değerlendirme** (Google'ın people-first sorularından damıtıldı; beşine de "evet" diyemiyorsan yayınlama):
  1. Özgün bilgi/araştırma/analiz veya ilk elden deneyim var mı; yoksa mevcut kaynakların yeniden anlatımı mı?
  2. Konu kayda değer biçimde eksiksiz mi; okuyan "daha iyisi için tekrar aramam gerek" hisseder mi?
  3. Başlık, içeriğin abartısız ve doğru bir özeti mi?
  4. Bu sayfayı yer imine ekler, bir meslektaşına tavsiye eder miydin?
  5. Aşikâr olanın ötesinde analiz/öngörü sunuyor mu?
- **Kelime sayısı hedefi YOK:** Google'ın tercih ettiği bir kelime sayısı yoktur (resmi ifade). Uzunluk soruyu tam cevaplamaktan gelir, dolgu metinden değil.

## 3. E-E-A-T'i görünür kıl

- **Yazar:** Her makalede gerçek isim + uzmanlık unvanı + yazar profili linki; şemada `author`/`Person`.
- **Site kimliği:** Hakkında + İletişim + hizmet bölgesi + sertifika/lisans bilgileri görünür ve şemayla tutarlı (Organization/LocalBusiness).
- **Tarih dürüstlüğü:** Yayın tarihi + gerçek güncelleme tarihi. `dateModified` yalnız gerçek içerik değişiminde güncellenir; "tazelik makyajı" yapılmaz.
- **Kaynaklandırma:** Teknik/sayısal iddialar birincil kaynağa linklenir.
- **Who / How / Why:** Kim yazdı (byline), nasıl üretildi (test/ölçüm yöntemi; otomasyon kullanıldıysa açıklanabilir olmalı), neden var (önce kullanıcıya değer, sıralama sonuç). Bu üçü sayfadan okunabiliyorsa doğru yoldasın.
- **E-E-A-T içinde en ağır unsur GÜVENDİR** (Google'ın resmi vurgusu); sağlık/finans/güvenlik gibi YMYL konularında çıta daha da yüksektir. Teknik altyapı ve güvenlik içeriklerimizin çoğu bu sınıfa yakındır — kaynak ve sınırları açık yaz.
- **AI destekli üretim:** Google **yöntemi değil amacı** cezalandırır (resmi ifade: otomasyon/AI, "sıralamaları manipüle etme birincil amacıyla" kullanılırsa spam). İnsan doğrulaması, özgünlük katmanı ve gerçek uzmanlıkla üretilen AI-destekli içerik meşrudur; değer katmayan ölçekli üretim = **scaled content abuse**. Otomasyonun nasıl ve neden kullanıldığı sorulduğunda açıklanabilir olmalı.

## 4. Structured data politikaları

- **Yalnız görünür içerikle birebir eşleşen** JSON-LD. Görünmeyen/uydurma puan, yorum, fiyat, FAQ verisi = politika ihlali, manuel işlem riski.
- Standart tip seti: her sayfa `Organization` + `WebSite` + `BreadcrumbList`; makale `Article`/`TechArticle` (+gerçek `author`, `datePublished`, `dateModified`, görsel); hizmet `Service` + `FAQPage`; kurumsal/yerel `LocalBusiness` + şehir seviyesinde `areaServed`.
- FAQPage yalnız **gerçekten sorulan** soruları içerir; SERP kaplamak için FAQ şişirme yasak.
- **Tamlık + spesifiklik:** Zorunlu property'lerin tamamı + uygun önerilen property'ler; schema.org'daki en spesifik uygulanabilir tür seçilir. Şemadaki görsel URL'leri taranabilir olmalı; ilişkili öğeler `@id` ile bağlanır (Organization/Person entity köprüsü dahil).
- **İhlalin bedeli:** Structured data ihlali **manuel işlem** getirir → sayfa rich result uygunluğunu kaybeder (web sıralaması etkilenmez). Kontrol: Search Console Manual Actions raporu.
- Doğrulama: Rich Results Test + Search Console URL Inspection. Şema anlamayı kolaylaştırır; **görünürlük garantisi değildir**.

## 5. Spam kırmızı çizgileri (özet)

Şunların hiçbiri, hiçbir sitede, "denemek için" bile yapılmaz: ölçekli değersiz içerik üretimi (AI dahil), keyword stuffing, gizli metin/link, cloaking (Googlebot'a kullanıcıdan farklı içerik), doorway sayfalar, süresi dolmuş domain istismarı, site itibarı istismarı (üçüncü taraf parazit içerik), link alım-satımı/aşırı link takası. Tam liste: spam-policies dokümanı.

## 6. Görsel, video ve veri varlıkları

- Google, metni **kaliteli görsel ve videoyla desteklemeyi** AI özellikleri bağlamında açıkça önerir.
- Uygun sayfalarda: özgün diyagram, kendi ekran görüntüsü, test/karşılaştırma tablosu, matris, checklist, hesaplayıcı, indirilebilir şablon. Amaç süs değil, **kopyalanamaz bilgi varlığı**.
- Her görselde anlamlı alt metin; görseller sayfanın konusuyla ilgili ve orijinal olmalı.

## 7. Marka ve dış referanslar

- Kazanılmış referanslar > satın alınmış linkler (ikincisi zaten yasak, §5): sektörel yayın, üretici/iş ortağı dizinleri (ör. üretici consultant listeleri), gerçek müşteri değerlendirmeleri, konferans/webinar/açık kaynak katkısı.
- Yerel işletme: Google Business Profile + tutarlı ad-adres-telefon (NAP) + gerçek yorumlar.
- Kendi içeriğinde birincil kaynaklara atıf ver (bkz. §1 dış link maddesi).

## 8. Ölçüm ve ritim

- **GSC Performans raporu, "Web" arama türü** (AI trafiği burada birleşiktir — ayrı rapor bekleme). Sorgu aileleri filtrelenerek izlenir; 28/90/180 gün karşılaştırması.
- Incognito'da AI özeti görmemek "görünmüyorsun" demek değildir; sonuç ülke/dil/sorgu biçimi/oturuma göre değişir. Tekil gözlem yerine trend izlenir.
- İçerik ritmi: her sitede ayda ≥2 içerik, `docs/SEO_KEYWORDS.md` roadmap sırasından. Yayın sonrası: iç link kontrolü + (kuruluysa) IndexNow + llms.txt güncelleme.
- Üç aylık döngü: (1) teknik audit (SEO_STANDARD + §1), (2) yüksek gösterimli/düşük tıklamalı 10 URL'yi §2-§4 ile güçlendir, (3) en değerli 1-2 konuda hub tamamla, (4) özgün varlık üret + dağıt (§6-§7).

## 9. llms.txt ve Google-dışı AI yüzeyleri (bilinçli ek)

Google llms.txt kullanmaz ve istemez (§0.2). Yine de tutuyoruz çünkü maliyeti sıfıra yakın ve Google-dışı yüzeyler (Bing/Copilot, ChatGPT Search, Perplexity, Claude) için ek keşif sinyali olabilir. Kurallar: canlı URL'lerle birebir tutarlı, slash'lı, her yeni içerikte güncellenir; robots.txt AI botlarına (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) açık tutulur — bu bir sitede bilinçli olarak değiştirilecekse gerekçesi `SEO_INDIVIDUAL.md`'ye yazılır.

## 10. Kaçınılacaklar (hızlı liste)

ai.txt/özel "AI schema" kovalamak · yüzeysel AI makale yığını · FAQ şişirme · görünmeyen metin/şema verisi · cloaking · snippet kısıtlı sayfadan AI görünürlüğü beklemek · satın alınmış link · aynı niyete kopya sayfa · sahte tazelik (dateModified makyajı) · tekil incognito gözlemiyle karar vermek.

## Kaynaklar (dayanak dokümanlar)

1. AI features in Google Search — developers.google.com/search/docs/appearance/ai-features
2. Search Essentials: Technical requirements — developers.google.com/search/docs/essentials/technical
3. Robots meta tag, data-nosnippet — developers.google.com/search/docs/crawling-indexing/robots-meta-tag
4. Make your links crawlable — developers.google.com/search/docs/crawling-indexing/links-crawlable
5. Page experience — developers.google.com/search/docs/appearance/page-experience
6. Creating helpful, people-first content — developers.google.com/search/docs/fundamentals/creating-helpful-content
7. Spam policies — developers.google.com/search/docs/essentials/spam-policies
8. Structured data general policies — developers.google.com/search/docs/appearance/structured-data/sd-policies

## Changelog (GEO katmanı)

### 1.0.0 — 2026-07-12
- İlk sürüm. Google'ın 8 resmi dokümanının damıtılması; canlı doğrulama ile iki yaygın yanlışın düzeltilmesi (Search Console'da AI'a özel ayar/rapor yoktur — AI trafiği "Web" türüne birleşik raporlanır). MikroTik SEO+GEO dalgasında (siberkale.com + erdemozyurt.com) edinilen pratiklerin standartlaştırılması.
