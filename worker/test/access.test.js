import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyAccessJwt, AccessError } from "../src/access.js";
import { makeSigner } from "./yardimci.js";

const TEAM = "https://siberkale.cloudflareaccess.com";
const AUD = "aud-yonetim";
const NOW = 2_000_000_000;

async function setup() {
  const signer = await makeSigner();
  const options = { teamDomain: TEAM, audience: AUD, getKeys: async () => [signer.jwk], nowSeconds: NOW };
  const payload = { aud: [AUD], iss: TEAM, exp: NOW + 3600, iat: NOW - 10, email: "Yonetici@Example.com" };
  return { signer, options, payload };
}

test("geçerli token e-postayı küçük harfle döndürür", async () => {
  const { signer, options, payload } = await setup();
  const identity = await verifyAccessJwt(await signer.sign(payload), options);
  assert.deepEqual(identity, { email: "yonetici@example.com", issuedAt: NOW - 10 });
});

const rejects = (promise, pattern) => assert.rejects(promise, (e) => e instanceof AccessError && pattern.test(e.message));

test("token yoksa reddedilir", async () => {
  const { options } = await setup();
  await rejects(verifyAccessJwt(null, options), /token yok/);
});

test("başka uygulamanın token'ı reddedilir", async () => {
  const { signer, options, payload } = await setup();
  await rejects(verifyAccessJwt(await signer.sign({ ...payload, aud: ["baska"] }), options), /yanlış uygulama/);
});

test("başka yayıncı reddedilir", async () => {
  const { signer, options, payload } = await setup();
  await rejects(verifyAccessJwt(await signer.sign({ ...payload, iss: "https://kotu.example" }), options), /yanlış yayıncı/);
});

test("süresi dolmuş token reddedilir", async () => {
  const { signer, options, payload } = await setup();
  await rejects(verifyAccessJwt(await signer.sign({ ...payload, exp: NOW - 120 }), options), /süresi dolmuş/);
});

test("başka anahtarla imzalanmış token reddedilir", async () => {
  const { options, payload } = await setup();
  const imposter = await makeSigner("test-kid");
  await rejects(verifyAccessJwt(await imposter.sign(payload), options), /imza geçersiz/);
});

test("gövdesi değiştirilmiş token reddedilir", async () => {
  const { signer, options, payload } = await setup();
  const [head, , sig] = (await signer.sign(payload)).split(".");
  const forged = Buffer.from(JSON.stringify({ ...payload, email: "saldirgan@example.com" })).toString("base64url");
  await rejects(verifyAccessJwt(`${head}.${forged}.${sig}`, options), /imza geçersiz/);
});

test("bilinmeyen anahtar kimliği ve 'none' algoritması reddedilir", async () => {
  const { signer, options, payload } = await setup();
  await rejects(verifyAccessJwt(await signer.sign(payload, { alg: "RS256", kid: "yok" }), options), /bilinmeyen anahtar/);
  await rejects(verifyAccessJwt(await signer.sign(payload, { alg: "none", kid: "test-kid" }), options), /beklenmeyen algoritma/);
});

test("AUD yapılandırılmamışsa her token reddedilir", async () => {
  const { signer, options, payload } = await setup();
  await rejects(verifyAccessJwt(await signer.sign(payload), { ...options, audience: "" }), /yapılandırması eksik/);
});
