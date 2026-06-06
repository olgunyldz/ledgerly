# Tasks Backlog

Use `docs/roadmap/epics.md` as the structured epic -> feature -> task backlog. Use `docs/roadmap/current-plan.md` for current iteration and milestone tracking. This file is the priority snapshot for private beta and MVP planning.

## P0 — Must have before private beta

- [x] Implement app navigation shell.
- [x] Add language selection onboarding.
- [x] Build tax profile questionnaire.
- [x] Add income entry form.
- [x] Add expense entry form.
- [x] Implement backend tax estimate endpoint.
- [x] Add deterministic tests for tax rules.
- [x] Add audit event persistence.
- [x] Define audit event input hash and rule version payload.
- [x] Add assistant chat screen.
- [x] Add safe assistant system prompt.
- [ ] Add privacy-first analytics events.
- [x] Add CI lint/test checks.
- [ ] Complete device/simulator private beta mobile QA.

## P1 — Should have for MVP launch

- [ ] Receipt upload flow.
- [ ] Document extraction review screen.
- [ ] Expense category suggestions.
- [ ] Accountant export pack.
- [ ] Export history screen.
- [ ] Multi-language glossary.
- [ ] English + Turkish UI copy review.
- [ ] Accessibility pass.
- [ ] Error and empty states.
- [ ] Security checklist completion.

## P2 — Growth features

- [ ] Arabic and Urdu localisation.
- [ ] Landlord/property income flow.
- [ ] Payments on account estimate.
- [ ] Push/email deadline reminders.
- [ ] Accountant portal proof of concept.
- [ ] HMRC sandbox integration research.
- [ ] Open banking proof of concept.

## Engineering chores

- [ ] Add pre-commit hooks.
- [x] Add API contract tests.
- [x] Fix mixed-use expense totals in mobile estimate/export previews.
- [ ] Add mobile component storybook or preview harness.
- [ ] Add visual regression snapshots for key screens.
- [ ] Add error monitoring.
- [ ] Add structured logging.
