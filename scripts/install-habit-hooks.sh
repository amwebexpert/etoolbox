#!/usr/bin/env sh
set -e

if [ -n "$CI" ]; then
  echo "⏭️  CI detected — skipping habit-hooks install (not required for CI lint:ci)"
  exit 0
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "⚠️  uv not found — skipping habit-hooks install."
  echo "   Install uv: https://docs.astral.sh/uv/getting-started/installation/"
  echo "   Then run: uv tool install \"habit-hooks[typescript]\""
  exit 0
fi

echo "Installing habit-hooks[typescript] via uv..."
uv tool install "habit-hooks[typescript]"
echo "✅ habit-hooks installed"
