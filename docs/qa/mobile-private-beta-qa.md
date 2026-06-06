# Mobile Private Beta QA

## QA Run — 2026-06-06

**Branch:** `qa/mobile-private-beta`

### Automated checks

- Passed: `cd apps/mobile && npm run typecheck`
- Passed: `cd packages/tax-rules && npm test`
- Passed: `python3 -m compileall apps/api/app apps/api/tests`
- Passed: `python3 -m json.tool docs/ai/evaluation-fixtures/assistant-baseline.json`
- Passed: `git diff --check`

### Device and simulator status

- Android device QA is blocked because no device or emulator is attached.
- iOS simulator QA is blocked in the current shell because `CoreSimulatorService` is unavailable.
- `scripts/qa-baseline.sh` is blocked locally at API contract tests because local `python3` is Python 3.14; run with `LEDGERLY_API_PYTHON=/path/to/python3.12`.

### Flow coverage

- Code-reviewed first-run onboarding route order for English and Turkish language selection.
- Code-reviewed income, expense, transactions and tax estimate route links.
- Code-reviewed assistant, documents, document review and accountant pack private-beta gates.

### Findings

- Fixed: mixed-use expenses were counted at full amount in mobile tax estimate and export summaries instead of applying the business-use percentage.

### Remaining manual QA

- Run onboarding in English on a real device or simulator.
- Run onboarding in Turkish on a real device or simulator.
- Add one income record and confirm Dashboard and Transactions summaries.
- Add one mixed-use expense and confirm taxable profit uses only the business-use portion.
- Confirm long Turkish copy remains readable on a small device.
- Confirm Accountant Pack export generation stays disabled.
