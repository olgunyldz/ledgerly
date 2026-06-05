#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
api_python="${LEDGERLY_API_PYTHON:-python3}"

echo "== Mobile typecheck =="
(cd "$repo_root/apps/mobile" && npm run typecheck)

echo "== Tax rules tests =="
(cd "$repo_root/packages/tax-rules" && npm test)

echo "== API syntax compile =="
(cd "$repo_root" && "$api_python" -m compileall apps/api/app)

echo "== API contract tests =="
(cd "$repo_root" && "$api_python" - <<'PY'
import sys

if sys.version_info >= (3, 14):
    raise SystemExit(
        "API tests require Python 3.12 or 3.13. "
        "Set LEDGERLY_API_PYTHON=/path/to/python3.12."
    )
PY
PYTHONPATH=apps/api "$api_python" -m pytest apps/api/tests)

echo "== AI fixture JSON validation =="
(cd "$repo_root" && python3 -m json.tool docs/ai/evaluation-fixtures/assistant-baseline.json >/tmp/ledgerly-assistant-fixtures.json)

echo "== Whitespace check =="
(cd "$repo_root" && git diff --check)

echo "QA baseline checks passed"
