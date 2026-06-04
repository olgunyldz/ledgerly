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

### Next

- Add CI lint and test commands.
- Add official English tax terms visibility preference.
- Save tax profile locally before backend persistence exists.
- Re-check `BUG-001` when Expo dependency policy is pinned.

### Blocked

- No current Foundation blocker.

### Risks

- `BUG-001` remains deferred because the non-breaking audit fix is unavailable.
- Tax-related screens must remain placeholder-only until deterministic rule coverage and audit logging are in place.

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
