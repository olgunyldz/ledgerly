# Current Plan

This file is the short-term delivery view. Use `docs/roadmap/epics.md` as the canonical backlog, and keep this file focused on what is happening now.

## Current Iteration

| Field | Value |
|---|---|
| Name | Foundation Sprint 1 |
| Goal | Turn Ledgerly from a documented concept into a navigable mobile MVP skeleton with project tracking discipline |
| Milestone | Foundation |
| Status | In Progress |

### Committed Scope

- `E1-F3`: Navigation Shell
- `E2-F1`: Language Selection
- `E2-F3`: Starter Dashboard
- `E3-F1`: Income Records
- `E3-F2`: Expense Records
- `E3-F3`: Document Intake
- `E4-F1`: Tax Rules Package
- `E4-F2`: Estimate API
- `E7-F2`: QA and Release baseline

### Done

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

### Next

- Start `E4-F3`: Mobile Estimate View.
- Add CI lint and test commands.
- Re-check `BUG-001` when Expo dependency policy is pinned.

### Blocked

- No current Foundation blocker.

### Risks

- `BUG-001` remains deferred because the non-breaking audit fix is unavailable.
- Tax-related screens must show calculation warnings and source references before presenting live estimates.

## Milestone Checklist

### Foundation

- [x] Product identity and brand foundation
- [x] MVP route and user-flow definition
- [x] Initial mobile onboarding/dashboard scaffold
- [x] Canonical backlog and bug tracking rules
- [x] React Navigation shell
- [x] Mobile dependency install and typecheck restoration

### Private Beta

- [x] Persistent onboarding state
- [ ] Basic tax profile questionnaire
- [ ] Income and expense entry
- [ ] Deterministic tax estimate endpoint
- [ ] Audit event persistence
- [ ] Assistant chat placeholder with safe prompt
- [ ] Release checklist reviewed

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
