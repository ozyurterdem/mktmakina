// Bildirimler forms-relay üzerinden e-postaya gider (site anahtarı mktmakina-panel,
// alıcı relay tarafında tanımlı). Relay IP başına dakikada 1 istek kabul ettiği ve
// Worker'ın çıkış adresi paylaşımlı olduğu için hemen gönderilemeyen bildirim KV
// kuyruğuna yazılır; zamanlanmış görev kuyruğu her turda bir kayıt boşaltır.
const QUEUE_KEY = "bildirim_kuyrugu";
const QUEUE_LIMIT = 50;
const SENDER_NAME = "MKT Sürüm Paneli";
const FALLBACK_EMAIL = "panel@mktmakina.com";
const THROTTLE_PREFIX = "uyari:";
const THROTTLE_SECONDS = 60 * 60;

export async function sendToRelay(env, notice) {
  try {
    const response = await fetch(env.RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site: env.RELAY_SITE,
        name: SENDER_NAME,
        email: notice.email || FALLBACK_EMAIL,
        subject: notice.subject,
        message: notice.message,
      }),
    });
    if (!response.ok) return false;
    const body = await response.json().catch(() => ({}));
    return body.success === true;
  } catch {
    return false;
  }
}

async function readQueue(env) {
  const queue = await env.SURUM_KV.get(QUEUE_KEY, { type: "json" });
  return Array.isArray(queue) ? queue : [];
}

async function enqueue(env, notice) {
  const queue = await readQueue(env);
  queue.push(notice);
  await env.SURUM_KV.put(QUEUE_KEY, JSON.stringify(queue.slice(-QUEUE_LIMIT)));
}

export async function notify(env, notice) {
  if (await sendToRelay(env, notice)) return true;
  await enqueue(env, notice);
  return false;
}

// Zamanlanmış görev: kuyruktaki en eski bildirimi göndermeyi dener.
export async function drainQueue(env) {
  const queue = await readQueue(env);
  if (queue.length === 0) return 0;
  if (!(await sendToRelay(env, queue[0]))) return queue.length;
  const rest = queue.slice(1);
  if (rest.length === 0) await env.SURUM_KV.delete(QUEUE_KEY);
  else await env.SURUM_KV.put(QUEUE_KEY, JSON.stringify(rest));
  return rest.length;
}

// Aynı türden uyarı saatte en fazla bir kez gönderilir.
export async function notifyThrottled(env, kind, notice) {
  const key = THROTTLE_PREFIX + kind;
  if (await env.SURUM_KV.get(key)) return false;
  await env.SURUM_KV.put(key, "1", { expirationTtl: THROTTLE_SECONDS });
  return notify(env, notice);
}
