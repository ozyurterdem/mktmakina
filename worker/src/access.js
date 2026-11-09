// Cloudflare Access JWT doğrulaması. Access zaten /yonetim önünde duruyor; bu
// ikinci kilit, Access yanlış yapılandırılırsa ya da atlatılırsa paneli kapalı tutar.
// Belge: Cf-Access-Jwt-Assertion başlığındaki RS256 imzalı token, takımın
// /cdn-cgi/access/certs uç noktasındaki anahtarlarla doğrulanır.
const CERTS_TTL_MS = 60 * 60 * 1000;
const CLOCK_SKEW_SECONDS = 60;
const ALGORITHM = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" };

export class AccessError extends Error {}

function base64UrlToBytes(part) {
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function decodeJson(part) {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlToBytes(part)));
  } catch {
    throw new AccessError("token çözülemedi");
  }
}

let certsCache = { keys: null, fetchedAt: 0 };

export async function fetchAccessKeys(teamDomain, now = Date.now()) {
  if (certsCache.keys && now - certsCache.fetchedAt < CERTS_TTL_MS) return certsCache.keys;
  const response = await fetch(`${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) throw new AccessError(`anahtarlar alınamadı (${response.status})`);
  const { keys } = await response.json();
  certsCache = { keys, fetchedAt: now };
  return keys;
}

// Başarılıysa { email, issuedAt } döner, aksi halde AccessError fırlatır.
export async function verifyAccessJwt(token, { teamDomain, audience, getKeys, nowSeconds }) {
  if (!token) throw new AccessError("token yok");
  if (!audience || !teamDomain) throw new AccessError("Access yapılandırması eksik");
  const parts = token.split(".");
  if (parts.length !== 3) throw new AccessError("token biçimi bozuk");

  const header = decodeJson(parts[0]);
  if (header.alg !== "RS256") throw new AccessError("beklenmeyen algoritma");
  const jwk = (await getKeys()).find((key) => key.kid === header.kid);
  if (!jwk) throw new AccessError("bilinmeyen anahtar");

  const key = await crypto.subtle.importKey("jwk", jwk, ALGORITHM, false, ["verify"]);
  const signed = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
  const valid = await crypto.subtle.verify(ALGORITHM, key, base64UrlToBytes(parts[2]), signed);
  if (!valid) throw new AccessError("imza geçersiz");

  const payload = decodeJson(parts[1]);
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!audiences.includes(audience)) throw new AccessError("yanlış uygulama");
  if (payload.iss !== teamDomain) throw new AccessError("yanlış yayıncı");
  if (typeof payload.exp !== "number" || payload.exp + CLOCK_SKEW_SECONDS < nowSeconds) {
    throw new AccessError("oturum süresi dolmuş");
  }
  if (!payload.email) throw new AccessError("e-posta yok");
  return { email: String(payload.email).toLowerCase(), issuedAt: payload.iat };
}
