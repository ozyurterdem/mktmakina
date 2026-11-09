import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { notify, drainQueue, notifyThrottled } from "../src/bildirim.js";
import { fakeKv } from "./yardimci.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const env = (kv = fakeKv()) => ({ SURUM_KV: kv, RELAY_URL: "https://relay.test/relay", RELAY_SITE: "mktmakina-panel" });
const relayAnswers = (...statuses) => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push(JSON.parse(init.body));
    const status = statuses.shift() ?? 200;
    return new Response(JSON.stringify({ success: status === 200 }), { status });
  };
  return calls;
};
const notice = { subject: "Konu", message: "Bildirim mesajı gövdesi" };

test("relay kabul ederse kuyruğa yazılmaz", async () => {
  const kv = fakeKv();
  const calls = relayAnswers(200);
  assert.equal(await notify(env(kv), notice), true);
  assert.equal(calls[0].site, "mktmakina-panel");
  assert.equal(kv.store.has("bildirim_kuyrugu"), false);
});

test("relay 429 verirse bildirim kuyruğa girer, zamanlanmış görev sırayla gönderir", async () => {
  const kv = fakeKv();
  relayAnswers(429, 429);
  await notify(env(kv), { ...notice, subject: "birinci" });
  await notify(env(kv), { ...notice, subject: "ikinci" });
  assert.equal(JSON.parse(kv.store.get("bildirim_kuyrugu")).length, 2);

  const calls = relayAnswers(200, 200);
  assert.equal(await drainQueue(env(kv)), 1);
  assert.equal(calls[0].subject, "birinci");
  assert.equal(await drainQueue(env(kv)), 0);
  assert.equal(kv.store.has("bildirim_kuyrugu"), false);
});

test("relay erişilemezse kuyruk korunur", async () => {
  const kv = fakeKv({ bildirim_kuyrugu: JSON.stringify([notice]) });
  globalThis.fetch = async () => {
    throw new Error("ağ yok");
  };
  assert.equal(await drainQueue(env(kv)), 1);
});

test("aynı türden uyarı saatte bir kez gönderilir", async () => {
  const kv = fakeKv();
  const calls = relayAnswers(200, 200);
  await notifyThrottled(env(kv), "dogrulama", notice);
  await notifyThrottled(env(kv), "dogrulama", notice);
  assert.equal(calls.length, 1);
});
