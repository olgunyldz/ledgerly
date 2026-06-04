# Ledgerly Epics, Features and Tasks

This file is the working delivery backlog. Keep items grouped as:

- **Epic:** A major product outcome.
- **Feature:** A shippable capability inside an epic.
- **Task:** A concrete implementation or documentation step.
- **Bug:** A known defect, regression or broken expectation.

Use status labels: `Todo`, `In Progress`, `Blocked`, `Done`.

Bug status labels are `Open`, `In Progress`, `Blocked`, `Fixed`, `Verified`, `Deferred`.

## Backlog Standards

Every new epic, feature, task and bug should be easy to discuss, commit against and verify.

### ID Format

- Epics use `E<number>`, for example `E2`.
- Features use `E<number>-F<number>`, for example `E2-F1`.
- Tasks use `E<number>-F<number>-T<number>`, for example `E2-F1-T3`.
- Bugs use `BUG-<number>`, for example `BUG-001`.
- Commit messages may reference IDs in the body when useful, but should still follow conventional commits.

### Priority

- `P0`: Required before private beta.
- `P1`: Required for MVP launch.
- `P2`: Valuable after MVP or for growth.
- `P3`: Nice-to-have or research.

### Milestones

- `Foundation`: Product identity, architecture, project management and skeleton app.
- `Private Beta`: Safe internal/private test with core setup, records and estimate loop.
- `MVP Launch`: Public-ready core product with assistant, export and QA coverage.
- `Post-MVP`: Integrations, additional languages and growth features.

### Definition of Ready

Do not start a task unless:

- The user outcome is clear.
- Scope and affected area are identified.
- Acceptance criteria are written.
- Required docs and tests are known.
- Privacy, security and tax impact have been considered.
- Any blocker is documented with `Blocked` status.

### Acceptance Criteria

Each feature or implementation task should include concise acceptance criteria. Use this format when adding new work:

```text
**ID:** E2-F1-T3
**Status:** Todo
**Priority:** P0
**Milestone:** Private Beta
**Owner:** Agent
**Acceptance criteria:**
- User can complete the expected action.
- Required docs and i18n keys are updated.
- Relevant checks pass or a blocker is logged.
```

### Progress Report Format

Use this format for weekly or milestone summaries:

```text
## Progress Report — YYYY-MM-DD

**Done**
- Completed work with IDs.

**Next**
- Planned work with IDs.

**Blocked**
- Blocker, owner and next step.

**Risks**
- Delivery, tax, privacy, security or quality risks.
```

### Bug Severity

- `Critical`: Data loss, hidden HMRC submission risk, security/privacy breach or materially wrong tax output.
- `High`: Broken core flow, incorrect calculation display or inaccessible key action.
- `Medium`: Important workflow issue with a workaround.
- `Low`: Cosmetic, copy or minor polish issue.

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

#### BUG-001 — Expo transitive `uuid` moderate advisory

| Field | Value |
|---|---|
| Status | Deferred |
| Severity | Medium |
| Source | Agent discovery via `npm audit --audit-level=moderate` |
| Affected area | Mobile |
| Summary | `expo` pulls a transitive `uuid <11.1.1` advisory through `@expo/config-plugins` -> `xcode`; npm reports 10 moderate vulnerabilities. |
| Next step | Re-check after Expo dependency policy is pinned; do not run `npm audit fix --force` because npm proposes a breaking Expo change. |

## E1 — Product Identity and UX Foundation

**Outcome:** Ledgerly has a clear product identity, route map and reusable mobile UX foundation.

### E1-F1 — Ledgerly Brand Foundation

**Status:** Done

- [x] Rename product references from TaxBridge AI to Ledgerly.
- [x] Define Ledgerly positioning, brand promise and tone.
- [x] Add Ledgerly colour palette and shape rules to the design system.
- [x] Apply Ledgerly theme tokens to the mobile shell.

### E1-F2 — MVP User Flow Definition

**Status:** Done

- [x] Define first-run route order.
- [x] Define primary post-onboarding app loop.
- [x] Align `RootStackParamList` with MVP screens.
- [x] Document setup, record, estimate and export flows.

### E1-F3 — Navigation Shell

**Status:** Done

- [x] Replace temporary screen state with React Navigation stack.
- [x] Add screen files for each first-run route.
- [x] Add persistent setup-complete state.
- [x] Add route-level accessibility titles.

## E2 — Onboarding and Tax Profile

**Outcome:** Users can select language, create a basic tax profile and land on a useful dashboard.

### E2-F1 — Language Selection

**Status:** Done

- [x] Add English and Turkish onboarding copy.
- [x] Add temporary language selection step.
- [x] Persist selected language.
- [x] Add official English tax terms visibility preference.
- [x] Add multilingual copy QA checklist.

### E2-F2 — Tax Profile Questionnaire

**Status:** In Progress

- [x] Add `TaxProfileIntro` screen.
- [x] Add `ResidencyTaxYear` screen.
- [x] Add `WorkType` screen.
- [x] Add `IncomeSources` screen.
- [x] Add `ExpenseHabits` screen.
- [x] Add `ReviewProfile` confirmation screen.
- [x] Save tax profile locally before backend persistence exists.

### E2-F3 — Starter Dashboard

**Status:** Done

- [x] Add temporary dashboard after setup.
- [x] Show empty tax estimate state.
- [x] Show setup task list.
- [x] Reflect tax profile readiness in setup tasks.
- [x] Add dashboard cards for income, expenses and documents.
- [x] Add next-best-action logic from profile state.

## E3 — Records and Documents

**Outcome:** Users can capture income, expenses and documents with enough structure for cautious tax estimates.

### E3-F1 — Income Records

**Status:** Done

- [x] Add income list section to `Transactions`.
- [x] Build `AddIncome` form.
- [x] Validate amount, date, source and tax year.
- [x] Show confirmation summary before save.
- [x] Add local test fixtures for income records.

### E3-F2 — Expense Records

**Status:** Done

- [x] Add expense list section to `Transactions`.
- [x] Build `AddExpense` form.
- [x] Validate amount, date, merchant, category and business-use percentage.
- [x] Show official term helper for allowable expenses.
- [x] Show confirmation summary before save.
- [x] Add local test fixtures for expense records.

### E3-F3 — Document Intake

**Status:** Done

- [x] Build `Documents` empty state.
- [x] Add receipt upload placeholder.
- [x] Build `DocumentReview` placeholder for extracted fields.
- [x] Require user confirmation before creating records from documents.

## E4 — Deterministic Tax Estimate

**Outcome:** Ledgerly estimates tax using deterministic, versioned rules with source references.

### E4-F1 — Tax Rules Package

**Status:** Done

- [x] Review current self-employed tax rule coverage.
- [x] Add missing calculation tests.
- [x] Add source references for thresholds.
- [x] Add rule version metadata to calculation output.

### E4-F2 — Estimate API

**Status:** Done

- [x] Define request and response schema.
- [x] Implement `tax-estimate` endpoint using tax rules package.
- [x] Add audit event payload for tax-impacting calculations.
- [x] Document API contract.

### E4-F3 — Mobile Estimate View

**Status:** Done

- [x] Build `TaxEstimate` breakdown screen.
- [x] Show assumptions and caveats.
- [x] Show source/API payload preview.
- [x] Add accountant review prompt for high-risk cases.

## E5 — AI Assistant and Safety

**Outcome:** Users can ask tax questions in their chosen language with grounded, cautious answers.

### E5-F1 — Assistant UI

**Status:** Done

- [x] Build `Assistant` chat screen.
- [x] Add suggested starter questions.
- [x] Show source chips in responses.
- [x] Show high-risk escalation prompt.

### E5-F2 — Assistant Backend

**Status:** Done

- [x] Add safe system prompt version.
- [x] Add retrieval source contract.
- [x] Add refusal and escalation rules.
- [x] Add evaluation fixtures for English and Turkish.

## E6 — Accountant Pack

**Outcome:** Users can export a clear, reviewable pack for an accountant.

### E6-F1 — Export Readiness

**Status:** Done

- [x] Build completeness checklist.
- [x] Flag missing records and unreviewed documents.
- [x] Flag high-risk assumptions.
- [x] Require user confirmation before export.

### E6-F2 — PDF and CSV Export

**Status:** Todo

- [ ] Define export data model.
- [ ] Generate CSV summary.
- [ ] Generate PDF summary.
- [ ] Add export history placeholder.

## E7 — Security, Privacy and Release Readiness

**Outcome:** Ledgerly can safely move toward private beta.

### E7-F1 — Privacy and Auditability

**Status:** Todo

- [ ] Define minimum data retention rules.
- [ ] Add audit event model.
- [ ] Log tax-impacting calculation inputs and rule versions.
- [ ] Document privacy impact notes.

### E7-F2 — QA and Release

**Status:** In Progress

- [x] Install mobile dependencies.
- [x] Restore `npm run typecheck`.
- [ ] Add CI lint and test commands.
- [ ] Add private beta release checklist.

### E7-F3 — Backlog Hygiene

**Status:** Done

- [x] Create canonical epic -> feature -> task backlog.
- [x] Link backlog from documentation index.
- [x] Add agent rule requiring accepted recommendations to be added to the backlog.
- [x] Add agent rule requiring completed epics, features and tasks to be updated in the backlog.
- [x] Add bug register and agent rules for tracking discovered, fixed and verified bugs.
- [x] Add ID, priority, milestone, Definition of Ready, acceptance criteria and progress report standards.
- [x] Add current iteration and milestone planning view.
- [x] Add agent rules for creating short-lived branches when work needs isolation.
