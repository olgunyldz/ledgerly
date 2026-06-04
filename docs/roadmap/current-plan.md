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

### Next

- Replace temporary screen state with React Navigation stack.
- Split onboarding into route-level screen files.
- Persist selected language and setup-complete state.
- Install mobile dependencies and restore `npm run typecheck`.

### Blocked

- Mobile typecheck is blocked until dependencies are installed in `apps/mobile`.

### Risks

- Temporary in-memory navigation should not grow much further before the real navigation shell is added.
- Tax-related screens must remain placeholder-only until deterministic rule coverage and audit logging are in place.

## Milestone Checklist

### Foundation

- [x] Product identity and brand foundation
- [x] MVP route and user-flow definition
- [x] Initial mobile onboarding/dashboard scaffold
- [x] Canonical backlog and bug tracking rules
- [ ] React Navigation shell
- [ ] Mobile dependency install and typecheck restoration

### Private Beta

- [ ] Persistent onboarding state
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
