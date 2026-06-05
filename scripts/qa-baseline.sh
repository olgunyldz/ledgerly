#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== Mobile typecheck =="
(cd "$repo_root/apps/mobile" && npm run typecheck)

echo "== Tax rules tests =="
(cd "$repo_root/packages/tax-rules" && npm test)

echo "== API syntax compile =="
(cd "$repo_root" && python3 -m compileall apps/api/app)

echo "== AI fixture JSON validation =="
(cd "$repo_root" && python3 -m json.tool docs/ai/evaluation-fixtures/assistant-baseline.json >/tmp/ledgerly-assistant-fixtures.json)

echo "== Whitespace check =="
(cd "$repo_root" && git diff --check)

echo "QA baseline checks passed"
