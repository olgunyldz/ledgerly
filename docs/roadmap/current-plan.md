# Current Plan

This file is the short-term delivery view. Use `docs/roadmap/epics.md` as the canonical backlog, and keep this file focused on what is happening now.

## Current Iteration

| Field | Value |
|---|---|
| Name | Private Beta Hardening Sprint 1 |
| Goal | Move Ledgerly from MVP skeleton to private-beta-ready persistence, contracts and QA gates |
| Milestone | Private Beta |
| Status | In Progress |

### Committed Scope

- `E8-F1`: Backend Persistence Baseline
- `E8-F2`: API Contract Tests
- `E8-F3`: Mobile Private Beta QA
- `E8-F4`: Security and Privacy Gates

### Done

- Foundation Sprint 1 completed.
- Backend persistence baseline added with in-memory repository boundaries, temporary user context and tax estimate audit event persistence.
- API contract tests cover assistant responses, tax estimates, audit payloads and error response shape.
- Ledgerly product identity established.
- MVP user flow defined.
- Temporary onboarding and dashboard flow scaffolded.
- Epic, feature, task and bug backlog created.
- Agent rules updated to keep backlog and bug tracking current.
- React Navigation stack added for first-run setup and dashboard.
- Onboarding routes split into route-level screen files.
- Mobile dependencies installed.
- `npm run typecheck` restored and passing.
- Selected language and setup-complete state persisted with AsyncStorage.
- Official English tax terms visibility preference added and persisted.
- Multilingual copy QA checklist added for onboarding and tax-sensitive copy.
- Tax profile selections are saved locally before backend persistence exists.
- Dashboard setup tasks reflect whether the minimum tax profile is ready.
- Dashboard record cards added for income, expenses and documents.
- Dashboard next-best-action logic added from local profile state.
- AddIncome form saves local income records with validation and review summary.
- Dashboard income card reflects local income record count and total.
- Transactions shows saved local income records, empty state and income total.
- AddExpense form saves local expense records with validation, allowable expense helper copy and review summary.
- Transactions shows saved local expense records, empty state and expense total.
- Documents empty state and receipt upload placeholder added.
- DocumentReview placeholder shows extracted fields and explicit confirmation requirement.
- Tax rules package now has draft `2025-26.0` self-employed reserve estimate with source metadata and boundary tests.
- Estimate API exposes `POST /v1/tax-estimates` with rule metadata, source references and an audit event payload.
- Mobile `TaxEstimate` screen shows taxable profit preview, assumptions/caveats and API payload preview from local records.
- Assistant UI shows starter questions, source chips and high-risk accountant review prompt.
- Assistant backend exposes deterministic starter guardrails with prompt version, source contracts and high-risk escalation.
- Accountant Pack readiness screen shows completeness checklist, risk flags and export confirmation requirement.
- Accountant Pack now shows export data model, CSV summary preview, PDF summary preview and export history placeholder.
- Privacy and audit baseline defines retention rules, privacy impact notes and audit input hashing for tax estimates.
- QA baseline script, CI jobs and private beta checklist added.

### Next

- Start `E8-F3`: Mobile Private Beta QA.
- Run private beta QA checklist on device/simulator.
- Re-check `BUG-001` when Expo dependency policy is pinned.

### Blocked

- No current Foundation blocker.

### Risks

- `BUG-001` remains deferred because the non-breaking audit fix is unavailable.
- Tax-related screens must show calculation warnings and source references before presenting live estimates.
- Production launch still needs DPIA, authenticated persistence and retention jobs.

## Milestone Checklist

### Foundation

- [x] Product identity and brand foundation
- [x] MVP route and user-flow definition
- [x] Initial mobile onboarding/dashboard scaffold
- [x] Canonical backlog and bug tracking rules
- [x] React Navigation shell
- [x] Mobile dependency install and typecheck restoration
- [x] QA baseline script and CI checks

### Private Beta

- [x] Persistent onboarding state
- [x] Basic tax profile questionnaire
- [x] Income and expense entry
- [x] Deterministic tax estimate endpoint
- [x] Audit event persistence
- [x] Assistant chat placeholder with safe prompt
- [x] Release checklist reviewed

### MVP Launch

- [ ] Receipt upload and review flow
- [ ] Accountant export pack
- [ ] Assistant source citations
- [ ] English and Turkish copy QA
- [ ] Accessibility pass
- [ ] CI lint and test checks

### Post-MVP

- [ ] Additional language pilots
- [ ] Landlord/property income flow
- [ ] Deadline reminders
- [ ] HMRC sandbox research
- [ ] Open banking proof of concept

## Progress Report Template

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
