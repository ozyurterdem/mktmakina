#!/bin/bash
# mktmakina sürüm Worker'ı için DAR kapsamlı Cloudflare API çağrısı.
# Yalnız bu işin uç noktalarına izin verir: mktmakina.com zone'unun Worker
# route'ları, mktmakina-surum script'i, hesabın KV ve Access uçları.
# Başka zone/uç → reddedilir. Kimlik kasadan okunur, ekrana basılmaz.
# Kullanım: cf.sh <GET|POST|PUT|PATCH|DELETE> <api-yolu> [json-gövde]
set -euo pipefail
ACCOUNT=0d8c4071af0da7a2b44b66192f7d4879
ZONE=$(cat "$(dirname "$0")/.zone-id" 2>/dev/null || true)
METHOD=${1:?yöntem gerekli}; API_PATH=${2:?api yolu gerekli}; BODY=${3:-}

case "$METHOD" in GET|POST|PUT|PATCH|DELETE) ;; *) echo "izinsiz yöntem: $METHOD" >&2; exit 2;; esac
ALLOWED="^/(accounts/$ACCOUNT/(storage/kv/namespaces|access/(apps|identity_providers|organizations|groups|policies)|workers/scripts/mktmakina-surum)|zones/$ZONE/workers/routes)(/|\\?|$)"
if [ -z "$ZONE" ] || ! [[ "$API_PATH" =~ $ALLOWED ]]; then echo "izinsiz yol: $API_PATH" >&2; exit 2; fi

E=$(~/.siberkale/scripts/read-secret.sh cloudflare_email); K=$(~/.siberkale/scripts/read-secret.sh cloudflare_global_key)
ARGS=(-s -m 60 -X "$METHOD" -H "X-Auth-Email: $E" -H "X-Auth-Key: $K")
[ -n "$BODY" ] && ARGS+=(-H "Content-Type: application/json" -d "$BODY")
curl "${ARGS[@]}" "https://api.cloudflare.com/client/v4$API_PATH"
