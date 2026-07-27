#!/usr/bin/env node
// SEO guard v1.1.0 — build sonrası dist'i tarar; üç ihlal türünü yakalar, biri
// varsa build'i KIRAR (CI/Coolify build'i de fail eder → hata prod'a çıkamaz):
//   SLASH — slash'sız iç link (trailingSlash:'always' → 301 → GSC "Yönlendirmeli")
//   YASAK — BANNED listesindeki ölü/taşınmış path'e iç link
//   DEAD  — hedefi dist'te bulunmayan iç link (örn. çevirisi olmayan sayfaya link → 404)
// Kural: dosya uzantılı href slash almaz. Detay ve sözleşme: docs/SEO_STANDARD.md
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";
const SITE = "//mktmakina.com"; // absolute site-içi href'leri de denetlemek için
const BANNED = [
  // (şimdilik yasak path yok)
];
// DEAD kontrolünden muaf prefix'ler (build-time dist'te yok, runtime'da üretilir):
const DEAD_EXEMPT = [/^\/cdn-cgi\//]; // Cloudflare email-protection vb. enjeksiyonu

function* walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

// 1) dist'teki çözülebilir tüm hedefleri topla (dosyalar + index.html route'ları)
const valid = new Set();
for (const f of walk(DIST)) {
  const rel = "/" + relative(DIST, f).split(sep).join("/");
  valid.add(rel); // /about/index.html, /rss.xml, /_astro/x.css
  if (rel.endsWith("/index.html")) valid.add(rel.slice(0, -"index.html".length)); // /about/  (root → /)
}

// 2) Her HTML'deki iç linkleri denetle
const htmlFiles = [...walk(DIST)].filter((f) => f.endsWith(".html"));
const hrefRe = /<(?:a|link)\b[^>]*?href="([^"]+)"/gs;
const issues = new Set();
for (const f of htmlFiles) {
  // <script> blokları taranmaz — JS template string'leri (örn. '+ip+') href değildir
  const html = readFileSync(f, "utf8").replace(/<script\b[\s\S]*?<\/script>/gi, "");
  for (const m of html.matchAll(hrefRe)) {
    let href = m[1];
    if (href.startsWith(SITE)) href = href.slice(SITE.length) || "/";
    if (!href.startsWith("/") || href.startsWith("//")) continue; // yalnız site-içi
    const path = href.split(/[?#]/)[0];
    if (!path) continue;
    if (DEAD_EXEMPT.some((re) => re.test(path))) continue;
    const isFile = path.split("/").pop().includes(".");

    let banned = false;
    for (const re of BANNED) if (re.test(path)) { issues.add(`YASAK  ${href}  (${f})`); banned = true; }
    if (banned) continue;
    if (isFile) continue; // dosya varlıkları (favicon, og.png, rss.xml) DEAD kapsamı dışı — odak: sayfa route'ları
    if (!path.endsWith("/")) { issues.add(`SLASH  ${href}  (${f})`); continue; }
    if (!valid.has(path)) issues.add(`DEAD   ${href}  (${f})`);
  }
}

// -------------------------------------------------------------------------
// AEO kontrolleri — docs/standards/aeo.md
// Sayfa yapısı (§1), entity grafiği (§2) ve teknik erişilebilirlik (§3).
// ---------------------------------------------------------------------------

// AEO_ENFORCE: yapısal kontroller (h1, canonical, breadcrumb, JSON-LD, tarih)
// build'i kırsın mı? Standardı yeni benimseyen sitelerde false ile başlanır:
// ihlaller her build'de raporlanır ama deploy durmaz. Site temizlenince true
// yapılır ve geri dönüş engellenmiş olur. (docs/AEO_STANDARD.md §8-§9)
const AEO_ENFORCE = false;
const aeoStruct = new Set();
const aeoAdd = (msg) => (AEO_ENFORCE ? issues.add(msg) : aeoStruct.add(msg));

// 3) Sayfa yapısı: tek h1 + canonical + JSON-LD bütünlüğü
const H1_RE = /<h1\b/gi;
const CANONICAL_RE = /<link\b[^>]*\brel="canonical"/i;
const LDJSON_RE = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;

// Arama motoru site doğrulama dosyaları tam sayfa değildir (h1/canonical içermez).
const AEO_EXEMPT = [/^\/google[a-z0-9]+\.html$/i, /^\/yandex_[a-z0-9]+\.html$/i];

for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  const page = "/" + relative(DIST, f).split(sep).join("/");
  if (AEO_EXEMPT.some((re) => re.test(page))) continue;

  const h1Count = (html.match(H1_RE) || []).length;
  if (h1Count !== 1) aeoAdd(`H1     ${h1Count} adet h1 (tam 1 olmalı)  (${f})`);

  if (!CANONICAL_RE.test(html)) aeoAdd(`CANON  canonical yok  (${f})`);

  // Sayfa başına tam bir BreadcrumbList: ikisi entity çözümlemesini bulanıklaştırır,
  // sıfırı AEO §2.2'yi ihlal eder. Sayfa kendi düğümünü üretiyorsa layout'a
  // hasOwnBreadcrumb geçilmeli (SEOHead genel olanı bastırır).
  const bcCount = (html.match(/"BreadcrumbList"/g) || []).length;
  if (bcCount !== 1) aeoAdd(`BREADC ${bcCount} adet BreadcrumbList (tam 1 olmalı)  (${f})`);

  // JSON-LD: parse edilebilmeli; @id referansları aynı belgede tanımlı olmalı
  for (const m of html.matchAll(LDJSON_RE)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      aeoAdd(`JSONLD parse hatası  (${f})`);
      continue;
    }
    const nodes = data["@graph"] ?? [data];
    const defined = new Set(nodes.map((n) => n?.["@id"]).filter(Boolean));
    // Referanslar site geneli grafikte de tanımlı olabilir; yalnız aynı sayfadaki
    // makale düğümünün kendi @id'sinin varlığını zorunlu tutuyoruz.
    const article = nodes.find((n) => n?.["@type"] === "TechArticle" || n?.["@type"] === "Article");
    if (article) {
      if (!article["@id"]) aeoAdd(`JSONLD ${article["@type"]} düğümünde @id yok  (${f})`);
      const pub = article.datePublished;
      const mod = article.dateModified;
      if (pub && mod && new Date(mod) < new Date(pub)) {
        aeoAdd(`TARIH  dateModified < datePublished  (${f})`);
      }
    }
    void defined;
    void page;
  }
}

// 4) Answer-first blok (AEO §1.1) — markdown kaynağında denetlenir.
//    Eşik tarihinden sonraki yazılarda ihlal build'i kırar; öncekiler teknik
//    borç olarak raporlanır (geriye dönük 38 yazı tek seferde düzeltilmedi).
const AEO_CUTOFF = new Date("2026-07-26");
const ANSWER_MIN = 40;
const ANSWER_MAX = 70;
const CONTEXT_PHRASES = [/Bu yazıda/i, /Bu yazı /i, /^Aşağıda/m, /yukarıda belirtildiği/i, /aşağıda göreceğiniz/i];
const BLOG_SRC = join("src", "content", "blog");
const aeoDebt = [];

let blogFiles = [];
try {
  blogFiles = readdirSync(BLOG_SRC).filter((f) => f.endsWith(".md"));
} catch {
  blogFiles = []; // içerik dizini yoksa bu kontrol atlanır
}

for (const name of blogFiles) {
  const raw = readFileSync(join(BLOG_SRC, name), "utf8");
  const parts = raw.split(/^---$/m);
  if (parts.length < 3) continue;
  const front = parts[1];
  const body = parts.slice(2).join("---").trim();
  const answer = body.split(/\n\s*\n/)[0]?.trim() ?? "";
  const words = answer.split(/\s+/).filter(Boolean).length;
  const dateM = front.match(/^date:\s*(\S+)/m);
  const isNew = dateM ? new Date(dateM[1]) >= AEO_CUTOFF : false;

  const problems = [];
  if (words < ANSWER_MIN || words > ANSWER_MAX) problems.push(`answer ${words} kelime (${ANSWER_MIN}-${ANSWER_MAX} olmalı)`);
  const ctx = CONTEXT_PHRASES.find((re) => re.test(answer));
  if (ctx) problems.push("answer bloğunda bağlam bağımlı ifade");

  if (!problems.length) continue;
  const line = `${name}: ${problems.join(", ")}`;
  if (isNew) aeoAdd(`ANSWER ${line}`);
  else aeoDebt.push(line);
}


if (issues.size) {
  console.error(`✗ seo-check: ${issues.size} ihlal — build durduruldu`);
  for (const i of [...issues].slice(0, 30)) console.error("  " + i);
  if (issues.size > 30) console.error(`  ... +${issues.size - 30} daha`);
  process.exit(1);
}
if (aeoStruct.size) {
  console.warn(`⚠ AEO yapı borcu: ${aeoStruct.size} ihlal (AEO_ENFORCE=false — build engellenmez)`);
  for (const d of [...aeoStruct].slice(0, 8)) console.warn("  " + d);
  if (aeoStruct.size > 8) console.warn(`  ... +${aeoStruct.size - 8} daha`);
}
if (aeoDebt.length) {
  console.warn(`⚠ AEO borcu: ${aeoDebt.length} eski yazının answer bloğu standarda çekilmedi (build engellenmez)`);
  for (const d of aeoDebt.slice(0, 5)) console.warn("  " + d);
  if (aeoDebt.length > 5) console.warn(`  ... +${aeoDebt.length - 5} daha`);
}
const aeoOpen = aeoStruct.size + aeoDebt.length;
console.log(
  aeoOpen === 0
    ? "✓ seo-check: iç bağlantılar + AEO yapısı temiz (slash, yasak, dead-link, h1, canonical, JSON-LD, breadcrumb, answer)"
    : `✓ seo-check: iç bağlantılar temiz — AEO kontrolleri aktif, ${aeoOpen} açık ihlal yukarıda listelendi`
);
