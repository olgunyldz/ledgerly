# Test Strategy

## Test pyramid

- Unit tests: tax rules, pure helpers, validators.
- Service tests: backend workflows without HTTP.
- API tests: endpoint contracts and auth boundaries.
- Mobile tests: critical hooks, forms and navigation.
- E2E tests: onboarding, add expense, estimate, assistant question.

## Tax rules tests

Required:

- threshold boundary tests
- tax-year regression fixtures
- scenario snapshots
- invalid input tests

Current coverage:

- `packages/tax-rules/src/self-employed.test.js` covers 2025-26 personal allowance, basic-rate and Class 4 National Insurance boundaries.
- `packages/tax-rules/src/self-employed.test.js` checks rule metadata, source metadata and invalid inputs for the self-employed reserve estimate.

## AI tests

Required:

- source-grounded answer tests
- calculation tool-call tests
- multilingual response tests
- high-risk escalation tests
- hallucination trap tests

## Manual QA checklist

- Small screen device.
- Large screen device.
- Slow network.
- Offline state.
- Long translated strings.
- Dark mode when supported.
- Mixed-use expense totals in Dashboard, Transactions, Tax Estimate and Accountant Pack.

Current private beta mobile QA run notes live in `docs/qa/mobile-private-beta-qa.md`.

## Baseline commands

Run before merging private beta work:

- `bash scripts/qa-baseline.sh`
- `cd apps/mobile && npm run typecheck`
- `cd packages/tax-rules && npm test`
- `python3 -m compileall apps/api/app`
- `PYTHONPATH=apps/api python3 -m pytest apps/api/tests`

API contract tests require Python 3.12 or 3.13 because the current FastAPI/Pydantic pin does not support Python 3.14. If local `python3` is newer, run `LEDGERLY_API_PYTHON=/path/to/python3.12 bash scripts/qa-baseline.sh`.

## Multilingual QA

Use `docs/qa/multilingual-copy-checklist.md` for onboarding, assistant and tax-sensitive copy changes.
