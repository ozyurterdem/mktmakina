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

if (issues.size) {
  console.error(`✗ seo-check: ${issues.size} ihlal — build durduruldu`);
  for (const i of [...issues].slice(0, 30)) console.error("  " + i);
  if (issues.size > 30) console.error(`  ... +${issues.size - 30} daha`);
  process.exit(1);
}
console.log("✓ seo-check: iç linkler temiz (slash + yasak + dead-link)");
