// Yönetim paneli HTML'i. Dış kaynak yok (yalnız site logosu); tek sayfa, tek form.
const ETIKET = { endustri: "Endüstri", savunma: "Savunma" };
const ACIKLAMA = {
  endustri: "Havacılık ve otomotiv. Savunma ibaresi, MKE ve Roketsan görünmez.",
  savunma: "Savunma sanayii ibaresi, MKE ve Roketsan referanslarıyla tam sürüm.",
};
const SONUC_MESAJI = {
  degisti: "Sürüm değiştirildi. Site yaklaşık 1 dakika içinde güncellenir.",
  ayni: "Seçilen sürüm zaten yayında, değişiklik yapılmadı.",
  hata: "İşlem tamamlanamadı. Lütfen tekrar deneyin.",
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const formatTime = (iso) =>
  new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(iso));

const etiket = (surum) => ETIKET[surum] || surum;

function surumKarti(surum, aktif) {
  const secili = surum === aktif;
  return `<form method="post" action="/yonetim/surum" class="kart${secili ? " secili" : ""}">
  <input type="hidden" name="surum" value="${surum}">
  <h2>${etiket(surum)}</h2>
  <p>${ACIKLAMA[surum]}</p>
  ${secili
    ? `<span class="durum">Şu an yayında</span>`
    : `<button type="submit" onclick="return confirm('${etiket(surum)} sürümü yayına alınsın mı?')">${etiket(surum)} sürümünü yayına al</button>`}
</form>`;
}

function kayitSatirlari(kayitlar) {
  if (kayitlar.length === 0) return `<p class="bos">Henüz değişiklik kaydı yok.</p>`;
  const satirlar = kayitlar
    .map((k) => `<tr><td>${formatTime(k.zaman)}</td><td>${escapeHtml(k.eposta)}</td><td>${etiket(k.onceki)} → ${etiket(k.yeni)}</td></tr>`)
    .join("");
  return `<table><thead><tr><th>Zaman</th><th>Yönetici</th><th>Değişiklik</th></tr></thead><tbody>${satirlar}</tbody></table>`;
}

export function renderPanel({ eposta, aktif, kayitlar, sonuc, anahtarEksik }) {
  const mesaj = SONUC_MESAJI[sonuc] ? `<p class="mesaj">${SONUC_MESAJI[sonuc]}</p>` : "";
  const uyari = anahtarEksik
    ? `<p class="mesaj uyari">Uyarı: savunma anahtarı tanımlı değil; bayrak savunmada olsa bile site endüstri sürümünü sunar.</p>`
    : "";
  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Sürüm Paneli | MKT Makina</title>
<style>
:root{--zemin:#0c1524;--yuzey:#162236;--metin:#f3f5f8;--soluk:#a9b3c3;--vurgu:#c8a23c}
*{box-sizing:border-box}body{margin:0;background:var(--zemin);color:var(--metin);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:720px;margin:0 auto;padding:24px 16px 48px}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px}
header img{height:40px}header small{color:var(--soluk);text-align:right}
header a{color:var(--vurgu)}
h1{font-size:1.4rem;margin:0 0 4px}.alt{color:var(--soluk);margin:0 0 20px}
.kartlar{display:grid;gap:12px;grid-template-columns:1fr}
@media(min-width:600px){.kartlar{grid-template-columns:1fr 1fr}}
.kart{background:var(--yuzey);border:2px solid transparent;border-radius:12px;padding:16px}
.kart.secili{border-color:var(--vurgu)}.kart h2{margin:0 0 6px;font-size:1.15rem}.kart p{color:var(--soluk);margin:0 0 14px;font-size:.95rem}
button{width:100%;padding:12px;border:0;border-radius:8px;background:var(--vurgu);color:#111;font-weight:600;font-size:1rem;cursor:pointer}
.durum{display:block;text-align:center;padding:12px;border-radius:8px;background:rgba(200,162,60,.15);color:var(--vurgu);font-weight:600}
.mesaj{background:var(--yuzey);border-left:4px solid var(--vurgu);padding:10px 12px;border-radius:6px}.uyari{border-color:#e06c5a}
h3{margin:32px 0 8px;font-size:1rem}table{width:100%;border-collapse:collapse;font-size:.9rem}
th,td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--yuzey)}th{color:var(--soluk);font-weight:500}.bos{color:var(--soluk)}
</style></head>
<body><main>
<header><img src="https://mktmakina.com/images/logo-white.png" alt="MKT Makina">
<small>${escapeHtml(eposta)}<br><a href="/cdn-cgi/access/logout">Çıkış</a></small></header>
<h1>Site sürümü</h1>
<p class="alt">Şu an yayında: <strong>${etiket(aktif)}</strong></p>
${mesaj}${uyari}
<div class="kartlar">${surumKarti("endustri", aktif)}${surumKarti("savunma", aktif)}</div>
<h3>Son değişiklikler</h3>
${kayitSatirlari(kayitlar)}
</main></body></html>`;
}
