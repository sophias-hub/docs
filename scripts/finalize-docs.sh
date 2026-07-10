#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SITE_DIR="${1:-build/site}"

if [[ ! -d "$SITE_DIR" ]]; then
  echo "Site directory not found: ${SITE_DIR}"
  echo "Run npm run docs:build first."
  exit 1
fi

bash scripts/generate-docs-meta.sh "${SITE_DIR}/meta.json"
node scripts/inject-provenance-banner.mjs "${SITE_DIR}" "Docs hub"

echo "Docs hub finalized with provenance metadata and banner."
