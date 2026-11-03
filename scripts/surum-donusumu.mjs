#!/usr/bin/env node
// Sürüm dönüşümü + bekçisi. `astro build` sonrası koşar.
//
// Kaynak metin savunma sürümüdür ("havacılık, savunma ve otomotiv"). Endüstri
// sürümünde bu ifade dört dilde ~90 yerde geçtiği için her cümleyi ikiye yazmak
// yerine dist/ çıktısına tek bir kural tablosu uygulanır. Yapısal farklar (MKE ve
// Roketsan referansları, Hero satırı, liste maddeleri) kaynakta src/config/variant.ts
// ile ayrılır; bu betik yalnız ifade düzeyini düzeltir.
//
// Bekçi: endüstri çıktısında savunma sözlüğünden tek eşleşme kalırsa build KIRILIR.
// Yeni bir cümle kalıbı eklenince kural tablosuna satır eklenir, bekçi atlanmaz.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const VARIANT = process.env.SITE_VARIANT === "savunma" ? "savunma" : "endustri";

const ENDUSTRI_KURALLARI = [
  [/([Hh]avacılık), [Ss]avunma ve ([Oo]tomotiv)/g, "$1 ve $2"],
  [/([Hh]avacılık), savunma, (otomotiv)/g, "$1, $2"],
  [/([Aa]erospace), [Dd]efense and ([Aa]utomotive)/g, "$1 and $2"],
  [/Luftfahrt, Verteidigung und Automobil/g, "Luftfahrt- und Automobil"],
  [/Luftfahrt-, Verteidigungs- und Automobil/g, "Luftfahrt- und Automobil"],
  [/الطيران والدفاع والسيارات/g, "الطيران والسيارات"],
];

const SAVUNMA_SOZLUGU = [/savunma/i, /\bdefen[cs]e\b/i, /Verteidigung/, /الدفاع/, /\bRoketsan\b/i, /\bMKE\b/];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(html|xml)$/.test(path)) yield path;
  }
}

if (VARIANT === "savunma") {
  console.log("✓ sürüm: savunma (dönüşüm yok)");
  process.exit(0);
}

let changedFiles = 0;
const leaks = [];
for (const file of walk(DIST)) {
  const original = readFileSync(file, "utf8");
  const converted = ENDUSTRI_KURALLARI.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), original);
  if (converted !== original) {
    writeFileSync(file, converted);
    changedFiles++;
  }
  for (const word of SAVUNMA_SOZLUGU) {
    const match = converted.match(word);
    if (!match) continue;
    const at = match.index;
    leaks.push(`${file}: "${converted.slice(Math.max(0, at - 50), at + 50).replace(/\s+/g, " ")}"`);
  }
}

if (leaks.length) {
  console.error(`✗ sürüm bekçisi: endüstri çıktısında ${leaks.length} savunma izi kaldı`);
  for (const leak of leaks.slice(0, 30)) console.error("  " + leak);
  process.exit(1);
}
console.log(`✓ sürüm: endüstri (${changedFiles} dosya dönüştürüldü, savunma izi yok)`);
