// /yonetim/ paneli: sürüm görüntüleme ve değiştirme. Access önde durur; burada
// token ikinci kez doğrulanır, yönetici listesiyle karşılaştırılır ve değişiklik
// yalnız aynı kökenden gelen POST ile yapılır.
import { AccessError } from "./access.js";
import { SURUM_KEY, SURUMLER, ENDUSTRI } from "./surum.js";
import { renderPanel } from "./sayfa.js";

export const PANEL_PREFIX = "/yonetim";
const LOG_KEY = "kayit";
const LOG_LIMIT = 20;
const LOGIN_PREFIX = "giris:";
const LOGIN_TTL_SECONDS = 4 * 24 * 60 * 60;
const SITE_ORIGIN = "https://mktmakina.com";

const SECURITY_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "same-origin",
  "Content-Security-Policy":
    "default-src 'none'; img-src https://mktmakina.com; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
};

const respond = (body, status, extra = {}) =>
  new Response(body, { status, headers: { ...SECURITY_HEADERS, "Content-Type": "text/html; charset=utf-8", ...extra } });
const redirect = (location, status = 303) => new Response(null, { status, headers: { ...SECURITY_HEADERS, Location: location } });

const adminList = (env) =>
  String(env.YONETICILER || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

async function readFlag(env) {
  const value = await env.SURUM_KV.get(SURUM_KEY);
  return SURUMLER.includes(value) ? value : ENDUSTRI;
}

async function readLog(env) {
  const log = await env.SURUM_KV.get(LOG_KEY, { type: "json" });
  return Array.isArray(log) ? log : [];
}

async function appendLog(env, entry) {
  const log = [entry, ...(await readLog(env))].slice(0, LOG_LIMIT);
  await env.SURUM_KV.put(LOG_KEY, JSON.stringify(log));
}

// Kimlik doğrulanamazsa null döner ve (saatte bir) uyarı gönderilir.
async function authenticate(request, env, deps) {
  try {
    const identity = await deps.verify(request.headers.get("Cf-Access-Jwt-Assertion"));
    if (adminList(env).includes(identity.email)) return identity;
    throw new AccessError(`listede olmayan adres: ${identity.email}`);
  } catch (error) {
    if (!(error instanceof AccessError)) throw error;
    deps.background(
      deps.notifyThrottled(env, "dogrulama", {
        subject: "Panel kimlik doğrulaması başarısız",
        message: `mktmakina.com/yonetim/ isteği reddedildi: ${error.message}. IP: ${request.headers.get("CF-Connecting-IP") || "?"}`,
      }),
    );
    return null;
  }
}

async function notifyLoginOnce(env, identity, deps) {
  const key = `${LOGIN_PREFIX}${identity.email}:${identity.issuedAt}`;
  if (await env.SURUM_KV.get(key)) return;
  await env.SURUM_KV.put(key, "1", { expirationTtl: LOGIN_TTL_SECONDS });
  await deps.notify(env, {
    email: identity.email,
    subject: "Sürüm paneline giriş yapıldı",
    message: `${identity.email} mktmakina.com sürüm paneline giriş yaptı (${new Date(identity.issuedAt * 1000).toISOString()}).`,
  });
}

async function showPanel(request, env, identity, deps) {
  deps.background(notifyLoginOnce(env, identity, deps));
  const html = renderPanel({
    eposta: identity.email,
    aktif: await readFlag(env),
    kayitlar: await readLog(env),
    sonuc: new URL(request.url).searchParams.get("sonuc"),
    anahtarEksik: !env.SURUM_ANAHTAR,
  });
  return respond(html, 200);
}

async function changeVariant(request, env, identity, deps) {
  if (request.headers.get("Origin") !== SITE_ORIGIN) return respond("Geçersiz istek kaynağı.", 403);
  const form = await request.formData().catch(() => null);
  const yeni = form?.get("surum");
  if (!SURUMLER.includes(yeni)) return redirect(`${PANEL_PREFIX}/?sonuc=hata`);

  const onceki = await readFlag(env);
  if (onceki === yeni) return redirect(`${PANEL_PREFIX}/?sonuc=ayni`);

  await env.SURUM_KV.put(SURUM_KEY, yeni);
  const zaman = deps.now().toISOString();
  await appendLog(env, { zaman, eposta: identity.email, onceki, yeni });
  deps.background(
    deps.notify(env, {
      email: identity.email,
      subject: `Site sürümü değişti: ${onceki} → ${yeni}`,
      message: `${identity.email}, mktmakina.com sürümünü ${onceki} sürümünden ${yeni} sürümüne aldı (${zaman}). Değişiklik yaklaşık 1 dakika içinde yayılır.`,
    }),
  );
  return redirect(`${PANEL_PREFIX}/?sonuc=degisti`);
}

export async function handlePanel(request, env, deps) {
  const { pathname } = new URL(request.url);
  if (pathname === PANEL_PREFIX) return redirect(`${PANEL_PREFIX}/`, 301);

  const identity = await authenticate(request, env, deps);
  if (!identity) return respond("Bu sayfaya erişim yetkiniz yok.", 403);

  if (pathname === `${PANEL_PREFIX}/` && request.method === "GET") return showPanel(request, env, identity, deps);
  if (pathname === `${PANEL_PREFIX}/surum` && request.method === "POST") return changeVariant(request, env, identity, deps);
  return respond("Sayfa bulunamadı.", 404);
}
