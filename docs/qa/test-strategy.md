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

## Multilingual QA

Use `docs/qa/multilingual-copy-checklist.md` for onboarding, assistant and tax-sensitive copy changes.
