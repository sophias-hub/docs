#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ensure_command() {
  local name="$1"
  shift
  if command -v "$name" >/dev/null 2>&1; then
    return 0
  fi
  for candidate in "$@"; do
    if [[ -x "$candidate" ]]; then
      export PATH="$(dirname "$candidate"):$PATH"
      return 0
    fi
  done
  return 1
}

if ! ensure_command vale \
  "$HOME/.local/bin/vale" \
  "/usr/local/bin/vale" \
  "/opt/homebrew/bin/vale"; then
  echo "❌ Missing required command: vale"
  echo "💡 Install Vale: brew install vale"
  exit 1
fi

if ! ensure_command asciidoctor \
  "/usr/local/bin/asciidoctor" \
  "/opt/homebrew/bin/asciidoctor"; then
  echo "❌ Missing required command: asciidoctor (required for Vale AsciiDoc linting)"
  echo "💡 Install Asciidoctor: brew install asciidoctor"
  exit 1
fi

echo "📝 Linting AsciiDoc prose (Vale)"
vale sync
if ! find docs -type f -name '*.adoc' -print -quit | grep -q .; then
  echo "❌ No AsciiDoc files found to lint."
  exit 1
fi
find docs -type f -name '*.adoc' -print0 | xargs -0 vale

if ! ensure_command lychee \
  "$HOME/.local/bin/lychee" \
  "/usr/local/bin/lychee" \
  "/opt/homebrew/bin/lychee"; then
  echo "❌ Missing required command: lychee"
  echo "💡 Install Lychee: brew install lychee"
  exit 1
fi

echo "🔗 Checking AsciiDoc links (Lychee)"
lychee --config .lychee.toml 'docs/**/*.adoc'

echo "✅ Validation passed."
