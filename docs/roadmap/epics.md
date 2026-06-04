# Ledgerly Epics, Features and Tasks

This file is the working delivery backlog. Keep items grouped as:

- **Epic:** A major product outcome.
- **Feature:** A shippable capability inside an epic.
- **Task:** A concrete implementation or documentation step.
- **Bug:** A known defect, regression or broken expectation.

Use status labels: `Todo`, `In Progress`, `Blocked`, `Done`.

Bug status labels are `Open`, `In Progress`, `Blocked`, `Fixed`, `Verified`, `Deferred`.

## Bug Register

Add bugs here when they are discovered. Keep entries concise and actionable.

### Bug Template

| Field | Value |
|---|---|
| Status | Open |
| Severity | Low, Medium, High or Critical |
| Source | User report, Agent discovery, Test failure or Production signal |
| Affected area | Mobile, API, Tax rules, AI, Docs or Infrastructure |
| Summary | Short description of the broken behaviour |
| Next step | Expected fix, diagnostic step or reason for deferral |

### Known Bugs

No known bugs currently tracked.

## Epic 1 — Product Identity and UX Foundation

**Outcome:** Ledgerly has a clear product identity, route map and reusable mobile UX foundation.

### Feature 1.1 — Ledgerly Brand Foundation

**Status:** Done

- [x] Rename product references from TaxBridge AI to Ledgerly.
- [x] Define Ledgerly positioning, brand promise and tone.
- [x] Add Ledgerly colour palette and shape rules to the design system.
- [x] Apply Ledgerly theme tokens to the mobile shell.

### Feature 1.2 — MVP User Flow Definition

**Status:** Done

- [x] Define first-run route order.
- [x] Define primary post-onboarding app loop.
- [x] Align `RootStackParamList` with MVP screens.
- [x] Document setup, record, estimate and export flows.

### Feature 1.3 — Navigation Shell

**Status:** Todo

- [ ] Replace temporary screen state with React Navigation stack.
- [ ] Add screen files for each first-run route.
- [ ] Add persistent setup-complete state.
- [ ] Add route-level accessibility titles.

## Epic 2 — Onboarding and Tax Profile

**Outcome:** Users can select language, create a basic tax profile and land on a useful dashboard.

### Feature 2.1 — Language Selection

**Status:** In Progress

- [x] Add English and Turkish onboarding copy.
- [x] Add temporary language selection step.
- [ ] Persist selected language.
- [ ] Add official English tax terms visibility preference.
- [ ] Add multilingual copy QA checklist.

### Feature 2.2 — Tax Profile Questionnaire

**Status:** Todo

- [ ] Add `TaxProfileIntro` screen.
- [ ] Add `ResidencyTaxYear` screen.
- [ ] Add `WorkType` screen.
- [ ] Add `IncomeSources` screen.
- [ ] Add `ExpenseHabits` screen.
- [ ] Add `ReviewProfile` confirmation screen.
- [ ] Save tax profile locally before backend persistence exists.

### Feature 2.3 — Starter Dashboard

**Status:** In Progress

- [x] Add temporary dashboard after setup.
- [x] Show empty tax estimate state.
- [x] Show setup task list.
- [ ] Add dashboard cards for income, expenses and documents.
- [ ] Add next-best-action logic from profile state.

## Epic 3 — Records and Documents

**Outcome:** Users can capture income, expenses and documents with enough structure for cautious tax estimates.

### Feature 3.1 — Income Records

**Status:** Todo

- [ ] Add income list section to `Transactions`.
- [ ] Build `AddIncome` form.
- [ ] Validate amount, date, source and tax year.
- [ ] Show confirmation summary before save.
- [ ] Add local test fixtures for income records.

### Feature 3.2 — Expense Records

**Status:** Todo

- [ ] Add expense list section to `Transactions`.
- [ ] Build `AddExpense` form.
- [ ] Validate amount, date, merchant, category and business-use percentage.
- [ ] Show official term helper for allowable expenses.
- [ ] Show confirmation summary before save.

### Feature 3.3 — Document Intake

**Status:** Todo

- [ ] Build `Documents` empty state.
- [ ] Add receipt upload placeholder.
- [ ] Build `DocumentReview` placeholder for extracted fields.
- [ ] Require user confirmation before creating records from documents.

## Epic 4 — Deterministic Tax Estimate

**Outcome:** Ledgerly estimates tax using deterministic, versioned rules with source references.

### Feature 4.1 — Tax Rules Package

**Status:** Todo

- [ ] Review current self-employed tax rule coverage.
- [ ] Add missing calculation tests.
- [ ] Add source references for thresholds.
- [ ] Add rule version metadata to calculation output.

### Feature 4.2 — Estimate API

**Status:** Todo

- [ ] Define request and response schema.
- [ ] Implement `tax-estimate` endpoint using tax rules package.
- [ ] Add audit event payload for tax-impacting calculations.
- [ ] Document API contract.

### Feature 4.3 — Mobile Estimate View

**Status:** Todo

- [ ] Build `TaxEstimate` breakdown screen.
- [ ] Show assumptions and caveats.
- [ ] Show source chips.
- [ ] Add accountant review prompt for high-risk cases.

## Epic 5 — AI Assistant and Safety

**Outcome:** Users can ask tax questions in their chosen language with grounded, cautious answers.

### Feature 5.1 — Assistant UI

**Status:** Todo

- [ ] Build `Assistant` chat screen.
- [ ] Add suggested starter questions.
- [ ] Show source chips in responses.
- [ ] Show high-risk escalation prompt.

### Feature 5.2 — Assistant Backend

**Status:** Todo

- [ ] Add safe system prompt version.
- [ ] Add retrieval source contract.
- [ ] Add refusal and escalation rules.
- [ ] Add evaluation fixtures for English and Turkish.

## Epic 6 — Accountant Pack

**Outcome:** Users can export a clear, reviewable pack for an accountant.

### Feature 6.1 — Export Readiness

**Status:** Todo

- [ ] Build completeness checklist.
- [ ] Flag missing records and unreviewed documents.
- [ ] Flag high-risk assumptions.
- [ ] Require user confirmation before export.

### Feature 6.2 — PDF and CSV Export

**Status:** Todo

- [ ] Define export data model.
- [ ] Generate CSV summary.
- [ ] Generate PDF summary.
- [ ] Add export history placeholder.

## Epic 7 — Security, Privacy and Release Readiness

**Outcome:** Ledgerly can safely move toward private beta.

### Feature 7.1 — Privacy and Auditability

**Status:** Todo

- [ ] Define minimum data retention rules.
- [ ] Add audit event model.
- [ ] Log tax-impacting calculation inputs and rule versions.
- [ ] Document privacy impact notes.

### Feature 7.2 — QA and Release

**Status:** Todo

- [ ] Install mobile dependencies.
- [ ] Restore `npm run typecheck`.
- [ ] Add CI lint and test commands.
- [ ] Add private beta release checklist.

### Feature 7.3 — Backlog Hygiene

**Status:** Done

- [x] Create canonical epic -> feature -> task backlog.
- [x] Link backlog from documentation index.
- [x] Add agent rule requiring accepted recommendations to be added to the backlog.
- [x] Add agent rule requiring completed epics, features and tasks to be updated in the backlog.
- [x] Add bug register and agent rules for tracking discovered, fixed and verified bugs.
