#!/usr/bin/env node
// SEO guard — build sonrası dist'i tarar; slash'sız iç link veya yasak (ölü) path
// bulursa build'i KIRAR. Coolify build'i de fail eder → hata prod'a çıkamaz.
// Neden: GSC "Yönlendirmeli sayfa"/404 temizliği. Kural: trailingSlash 'always'
// → her iç link slash'lı; dosya uzantılı href slash almaz.
// Detay ve sözleşme: docs/SEO_RULES.md
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const SITE = "https://mktmakina.com"; // absolute site-içi href'leri de denetlemek için
const BANNED = [
  // (şimdilik yasak path yok)
];

function* htmlFiles(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (e.endsWith(".html")) yield p;
  }
}

const hrefRe = /<(?:a|link)\b[^>]*?href="([^"]+)"/gs;
const issues = new Set();
for (const f of htmlFiles(DIST)) {
  // <script> blokları taranmaz — JS template string'leri (örn. '+ip+') href değildir
  const html = readFileSync(f, "utf8").replace(/<script\b[\s\S]*?<\/script>/gi, "");
  for (const m of html.matchAll(hrefRe)) {
    let href = m[1];
    if (href.startsWith(SITE)) href = href.slice(SITE.length) || "/";
    if (!href.startsWith("/") || href.startsWith("//")) continue; // yalnız site-içi
    const path = href.split(/[?#]/)[0];
    if (!path) continue;
    const isFile = path.split("/").pop().includes(".");
    for (const re of BANNED)
      if (re.test(path)) issues.add(`YASAK  ${href}  (${f})`);
    if (!isFile && !path.endsWith("/"))
      issues.add(`SLASH  ${href}  (${f})`);
  }
}

if (issues.size) {
  console.error(`✗ seo-check: ${issues.size} ihlal — build durduruldu`);
  for (const i of [...issues].slice(0, 30)) console.error("  " + i);
  if (issues.size > 30) console.error(`  ... +${issues.size - 30} daha`);
  process.exit(1);
}
console.log("✓ seo-check: iç linkler temiz (slash + yasak path)");
