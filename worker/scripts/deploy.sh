#!/bin/bash
# mktmakina-surum Worker script'ini yükler (wrangler.toml route içermez:
# trafik yönlendirmesi cf.sh ile ayrı ve onaylı adımdır).
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH=/Users/erdem/.nvm/versions/node/v22.22.0/bin:$PATH
export CLOUDFLARE_ACCOUNT_ID=0d8c4071af0da7a2b44b66192f7d4879
CLOUDFLARE_EMAIL=$(~/.siberkale/scripts/read-secret.sh cloudflare_email)
CLOUDFLARE_API_KEY=$(~/.siberkale/scripts/read-secret.sh cloudflare_global_key)
export CLOUDFLARE_EMAIL CLOUDFLARE_API_KEY
npx wrangler deploy "$@"
