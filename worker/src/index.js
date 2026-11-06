// mktmakina.com önündeki sürüm Worker'ı.
// 1. aşama (geçiş): istek sunucuya olduğu gibi iletilir; yanıta yalnız Worker'dan
// geçtiğini kanıtlayan bir başlık eklenir. Sürüm seçimi, panel ve Access sonraki
// aşamalarda eklenecek (plan: docs/PROJECT_STATE.md).
const WORKER_HEADER = "x-mkt-worker";
const WORKER_STAGE = "gecis";

export default {
  async fetch(request) {
    const originResponse = await fetch(request);
    const response = new Response(originResponse.body, originResponse);
    response.headers.set(WORKER_HEADER, WORKER_STAGE);
    return response;
  },
};
