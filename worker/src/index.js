// mktmakina.com önündeki sürüm Worker'ı.
// 3. aşama: KV'deki `aktif_surum` bayrağına göre endüstri (sunucu kökü) ya da
// savunma (sunucuda /_surum/savunma/, gizli anahtarla açılan iç yol) sunulur.
// Güvenli taraf daima endüstridir: bayrak okunamazsa, anahtar yoksa ya da
// sunucu savunma isteğine 404 dönerse endüstri sayfası sunulur.
const SURUM_KEY = "aktif_surum";
const SAVUNMA = "savunma";
const ENDUSTRI = "endustri";
const INTERNAL_PREFIX = "/_surum/";
const SAVUNMA_PREFIX = "/_surum/savunma";
const KEY_HEADER = "X-Surum-Anahtar";
const WORKER_HEADER = "x-mkt-worker";

async function readActiveVariant(env) {
  try {
    const value = await env.SURUM_KV.get(SURUM_KEY, { cacheTtl: 60 });
    return value === SAVUNMA && env.SURUM_ANAHTAR ? SAVUNMA : ENDUSTRI;
  } catch {
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // İç yol dışarıdan açılamaz; Worker'ın kendi alt istekleri buraya uğramaz.
    if (url.pathname.startsWith(INTERNAL_PREFIX)) {
      return new Response("Not Found", { status: 404 });
    }

    // Gövdeli istekler (POST vb.) sürüm ayrımı olmadan sunucuya olduğu gibi gider.
    const isReadOnly = request.method === "GET" || request.method === "HEAD";
    if (isReadOnly && (await readActiveVariant(env)) === SAVUNMA) {
      const savunmaResponse = await fetchSavunma(request, env);
      if (savunmaResponse.status !== 404) return finalize(savunmaResponse, SAVUNMA);
    }
    return finalize(await fetch(request), ENDUSTRI);
  },
};
