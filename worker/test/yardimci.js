// Testler için sahte KV, imzalı Access token'ı ve panel bağımlılıkları.
export function fakeKv(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    store,
    async get(key, options = {}) {
      const value = store.has(key) ? store.get(key) : null;
      return options.type === "json" && value !== null ? JSON.parse(value) : value;
    },
    async put(key, value) {
      store.set(key, value);
    },
    async delete(key) {
      store.delete(key);
    },
  };
}

const ALGORITHM = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) };
const toBase64Url = (bytes) => Buffer.from(bytes).toString("base64url");

export async function makeSigner(kid = "test-kid") {
  const { privateKey, publicKey } = await crypto.subtle.generateKey(ALGORITHM, true, ["sign", "verify"]);
  const jwk = { ...(await crypto.subtle.exportKey("jwk", publicKey)), kid };
  async function sign(payload, header = { alg: "RS256", kid }) {
    const head = toBase64Url(JSON.stringify(header));
    const body = toBase64Url(JSON.stringify(payload));
    const signature = await crypto.subtle.sign(ALGORITHM, privateKey, new TextEncoder().encode(`${head}.${body}`));
    return `${head}.${body}.${toBase64Url(new Uint8Array(signature))}`;
  }
  return { jwk, sign };
}

export function panelDeps(overrides = {}) {
  const sent = [];
  const pending = [];
  return {
    sent,
    pending,
    verify: async () => ({ email: "yonetici@example.com", issuedAt: 1000 }),
    notify: async (_env, notice) => {
      sent.push(notice);
      return true;
    },
    notifyThrottled: async (_env, kind, notice) => {
      sent.push({ kind, ...notice });
      return true;
    },
    now: () => new Date("2026-11-10T09:00:00Z"),
    background: (promise) => pending.push(promise),
    ...overrides,
  };
}
