// Ziyaretçi trafiği: KV'deki `aktif_surum` bayrağına göre endüstri (sunucu kökü)
// ya da savunma (sunucuda /_surum/savunma/, gizli anahtarla açılan iç yol) sunulur.
// Güvenli taraf daima endüstridir: bayrak okunamazsa, anahtar yoksa ya da
// sunucu savunma isteğine 404 dönerse endüstri sayfası sunulur.
export const SURUM_KEY = "aktif_surum";
export const SAVUNMA = "savunma";
export const ENDUSTRI = "endustri";
export const SURUMLER = [ENDUSTRI, SAVUNMA];

const SAVUNMA_PREFIX = "/_surum/savunma";
const KEY_HEADER = "X-Surum-Anahtar";
const WORKER_HEADER = "x-mkt-worker";
const SITE_CACHE_TTL_SECONDS = 60;

// Bayrağın okunamadığını bildirmek için çağıranın verdiği geri çağırma (onFailure)
// kullanılır; okuma hatası ziyaretçiye asla yansımaz.
export async function readActiveVariant(env, onFailure = () => {}) {
  try {
    const value = await env.SURUM_KV.get(SURUM_KEY, { cacheTtl: SITE_CACHE_TTL_SECONDS });
    return value === SAVUNMA && env.SURUM_ANAHTAR ? SAVUNMA : ENDUSTRI;
  } catch (error) {
    onFailure(error);
    return ENDUSTRI;
  }
}

function fetchSavunma(request, env) {
  const url = new URL(request.url);
  url.pathname = SAVUNMA_PREFIX + url.pathname;
  const headers = new Headers(request.headers);
  headers.set(KEY_HEADER, env.SURUM_ANAHTAR);
  return fetch(new Request(url, { method: request.method, headers, redirect: "manual" }));
}

function finalize(originResponse, variant) {
  const response = new Response(originResponse.body, originResponse);
  response.headers.set(WORKER_HEADER, variant);
  // Sürüm değişince tarayıcıda eski sayfa kalmasın: HTML her seferinde doğrulanır.
  if ((response.headers.get("content-type") || "").includes("text/html")) {
    response.headers.set("Cache-Control", "no-cache");
  }
  return response;
}

export async function serveSite(request, env, onFlagFailure) {
  // Gövdeli istekler (POST vb.) sürüm ayrımı olmadan sunucuya olduğu gibi gider.
  const isReadOnly = request.method === "GET" || request.method === "HEAD";
  if (isReadOnly && (await readActiveVariant(env, onFlagFailure)) === SAVUNMA) {
    const savunmaResponse = await fetchSavunma(request, env);
    if (savunmaResponse.status !== 404) return finalize(savunmaResponse, SAVUNMA);
  }
  return finalize(await fetch(request), ENDUSTRI);
}
