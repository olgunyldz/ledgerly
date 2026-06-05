# Private Beta Checklist

Use this before inviting private beta users.

## Build and Test

- [ ] Mobile `npm run typecheck` passes.
- [ ] Tax rules `npm test` passes.
- [ ] API `python3 -m compileall apps/api/app` passes.
- [ ] Assistant evaluation fixture JSON validates.
- [ ] `scripts/qa-baseline.sh` passes locally.
- [ ] GitHub Actions CI is green on the branch or PR.

## Product Flow

- [ ] First-run onboarding completes in English.
- [ ] First-run onboarding completes in Turkish.
- [ ] Income, expense and transactions flows work with empty and populated states.
- [ ] Tax estimate preview shows warnings and source/API payload context.
- [ ] Assistant UI and backend guardrails show high-risk escalation.
- [ ] Accountant pack export remains disabled until explicit confirmation/export services exist.

## Privacy and Compliance

- [ ] No secrets or personal data are committed.
- [ ] Logs do not include tax records, prompts, documents or tokens.
- [ ] Audit event payloads include input hash and rule version.
- [ ] Privacy impact notes and retention rules are reviewed.
- [ ] Known security bugs are listed in `docs/roadmap/epics.md`.

## Release Decision

- [ ] Private beta limitations are documented for testers.
- [ ] Rollback owner is named.
- [ ] Support/contact path is ready.
- [ ] Go/no-go decision is recorded.
