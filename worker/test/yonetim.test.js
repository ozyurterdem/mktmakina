import { test } from "node:test";
import assert from "node:assert/strict";
import { handlePanel } from "../src/yonetim.js";
import { AccessError } from "../src/access.js";
import { fakeKv, panelDeps } from "./yardimci.js";

const BASE = "https://mktmakina.com";
const env = (kv = fakeKv({ aktif_surum: "endustri" }), extra = {}) => ({
  SURUM_KV: kv,
  SURUM_ANAHTAR: "a".repeat(64),
  YONETICILER: "yonetici@example.com, ikinci@example.com,ucuncu@example.com",
  ...extra,
});

const post = (surum, origin = BASE) =>
  new Request(`${BASE}/yonetim/surum`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ surum }),
  });

test("eğiksiz /yonetim kalıcı olarak /yonetim/ adresine yönlenir", async () => {
  const response = await handlePanel(new Request(`${BASE}/yonetim`), env(), panelDeps());
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), "/yonetim/");
});

test("panel aktif sürümü gösterir, önbelleğe alınmaz, girişi bir kez bildirir", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const deps = panelDeps();
  const first = await handlePanel(new Request(`${BASE}/yonetim/`), env(kv), deps);
  await Promise.all(deps.pending);
  const html = await first.text();
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("Cache-Control"), "no-store");
  assert.match(html, /Şu an yayında: <strong>Endüstri<\/strong>/);
  assert.match(html, /yonetici@example\.com/);

  await handlePanel(new Request(`${BASE}/yonetim/`), env(kv), deps);
  await Promise.all(deps.pending);
  assert.equal(deps.sent.filter((n) => /giriş yapıldı/.test(n.subject)).length, 1);
});

test("doğrulanamayan istek 403 alır ve uyarı gönderilir", async () => {
  const deps = panelDeps({ verify: async () => { throw new AccessError("token yok"); } });
  const response = await handlePanel(new Request(`${BASE}/yonetim/`), env(), deps);
  await Promise.all(deps.pending);
  assert.equal(response.status, 403);
  assert.equal(deps.sent[0].kind, "dogrulama");
});

test("geçerli token ama listede olmayan adres 403 alır", async () => {
  const deps = panelDeps({ verify: async () => ({ email: "yabanci@example.com", issuedAt: 1 }) });
  const response = await handlePanel(new Request(`${BASE}/yonetim/`), env(), deps);
  assert.equal(response.status, 403);
});

test("sürüm değişikliği bayrağı yazar, kaydeder ve bildirir", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const deps = panelDeps();
  const response = await handlePanel(post("savunma"), env(kv), deps);
  await Promise.all(deps.pending);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("Location"), "/yonetim/?sonuc=degisti");
  assert.equal(kv.store.get("aktif_surum"), "savunma");
  const [kayit] = JSON.parse(kv.store.get("kayit"));
  assert.deepEqual(kayit, { zaman: "2026-11-10T09:00:00.000Z", eposta: "yonetici@example.com", onceki: "endustri", yeni: "savunma" });
  assert.match(deps.sent.at(-1).subject, /endustri → savunma/);
});

test("aynı sürüm seçilirse hiçbir şey yazılmaz", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const response = await handlePanel(post("endustri"), env(kv), panelDeps());
  assert.equal(response.headers.get("Location"), "/yonetim/?sonuc=ayni");
  assert.equal(kv.store.has("kayit"), false);
});

test("başka kökenden gelen POST reddedilir, bayrak değişmez", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const response = await handlePanel(post("savunma", "https://kotu.example"), env(kv), panelDeps());
  assert.equal(response.status, 403);
  assert.equal(kv.store.get("aktif_surum"), "endustri");
});

test("geçersiz sürüm değeri reddedilir", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const response = await handlePanel(post("<script>"), env(kv), panelDeps());
  assert.equal(response.headers.get("Location"), "/yonetim/?sonuc=hata");
  assert.equal(kv.store.get("aktif_surum"), "endustri");
});

test("GET ile sürüm değiştirilemez", async () => {
  const kv = fakeKv({ aktif_surum: "endustri" });
  const response = await handlePanel(new Request(`${BASE}/yonetim/surum?surum=savunma`), env(kv), panelDeps());
  assert.equal(response.status, 404);
  assert.equal(kv.store.get("aktif_surum"), "endustri");
});

test("kayıt en fazla 20 satır tutar, yenisi başta", async () => {
  const eski = Array.from({ length: 20 }, (_, i) => ({ zaman: "2026-01-01T00:00:00Z", eposta: `e${i}@x.com`, onceki: "endustri", yeni: "savunma" }));
  const kv = fakeKv({ aktif_surum: "savunma", kayit: JSON.stringify(eski) });
  await handlePanel(post("endustri"), env(kv), panelDeps());
  const kayit = JSON.parse(kv.store.get("kayit"));
  assert.equal(kayit.length, 20);
  assert.equal(kayit[0].yeni, "endustri");
});

test("anahtar eksikse panel uyarı gösterir; e-posta HTML'e kaçışlı yazılır", async () => {
  const deps = panelDeps({ verify: async () => ({ email: "yonetici@example.com", issuedAt: 1 }) });
  const kayit = JSON.stringify([{ zaman: "2026-01-01T00:00:00Z", eposta: "<b>x</b>", onceki: "endustri", yeni: "savunma" }]);
  const response = await handlePanel(new Request(`${BASE}/yonetim/`), env(fakeKv({ kayit }), { SURUM_ANAHTAR: "" }), deps);
  const html = await response.text();
  assert.match(html, /savunma anahtarı tanımlı değil/);
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
});
