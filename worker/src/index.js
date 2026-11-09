// mktmakina.com önündeki sürüm Worker'ı: ziyaretçi trafiğini KV bayrağına göre
// endüstri ya da savunma sürümüne yönlendirir, /yonetim/ altında sürüm panelini sunar.
import { serveSite } from "./surum.js";
import { handlePanel, PANEL_PREFIX } from "./yonetim.js";
import { verifyAccessJwt, fetchAccessKeys } from "./access.js";
import { notify, notifyThrottled, drainQueue, sendToRelay } from "./bildirim.js";

const INTERNAL_PREFIX = "/_surum/";
// Bayrak okunamıyorsa KV de sorunludur; bu uyarının sınırı bu yüzden bellektedir
// (her Worker örneği için saatte bir) ve kuyruk yerine doğrudan relay'e gider.
const FLAG_ALERT_INTERVAL_MS = 60 * 60 * 1000;
let lastFlagAlertAt = 0;

function alertFlagFailure(env, ctx) {
  const now = Date.now();
  if (now - lastFlagAlertAt < FLAG_ALERT_INTERVAL_MS) return;
  lastFlagAlertAt = now;
  ctx.waitUntil(
    sendToRelay(env, {
      subject: "Sürüm bayrağı okunamadı",
      message: "mktmakina.com Worker'ı KV'deki sürüm bayrağını okuyamadı; site güvenli tarafta (endüstri) sunuluyor.",
    }),
  );
}

// Bildirim kuyruğu ziyaretçi trafiğiyle boşaltılır: her Worker örneği en fazla
// 5 dakikada bir, yanıtı geciktirmeden arka planda tek kayıt göndermeyi dener.
const QUEUE_DRAIN_INTERVAL_MS = 5 * 60 * 1000;
let lastQueueDrainAt = 0;

function drainQueueOccasionally(env, ctx) {
  const now = Date.now();
  if (now - lastQueueDrainAt < QUEUE_DRAIN_INTERVAL_MS) return;
  lastQueueDrainAt = now;
  ctx.waitUntil(drainQueue(env).catch(() => {}));
}

function panelDeps(env, ctx) {
  return {
    verify: (token) =>
      verifyAccessJwt(token, {
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
        getKeys: () => fetchAccessKeys(env.ACCESS_TEAM_DOMAIN),
        nowSeconds: Math.floor(Date.now() / 1000),
      }),
    notify,
    notifyThrottled,
    now: () => new Date(),
    background: (promise) => ctx.waitUntil(promise.catch(() => {})),
  };
}

const isPanelPath = (pathname) => pathname === PANEL_PREFIX || pathname.startsWith(`${PANEL_PREFIX}/`);

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    // İç yol dışarıdan açılamaz; Worker'ın kendi alt istekleri buraya uğramaz.
    if (pathname.startsWith(INTERNAL_PREFIX)) return new Response("Not Found", { status: 404 });
    if (isPanelPath(pathname)) return handlePanel(request, env, panelDeps(env, ctx));

    drainQueueOccasionally(env, ctx);
    return serveSite(request, env, () => alertFlagFailure(env, ctx));
  },

  async scheduled(_event, env) {
    await drainQueue(env);
  },
};
