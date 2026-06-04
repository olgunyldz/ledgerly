# AGENTS.md — Ledgerly Operating Manual

This file tells AI coding agents and human contributors how to work in this repository.

## Product context

Ledgerly is a multi-language UK tax assistant for self-employed workers, landlords, contractors and small businesses. The product explains UK tax in the user's preferred language while keeping official UK tax terms visible in English.

## Non-negotiable principles

1. **AI explains; deterministic rules calculate.** Never use LLM-only output for tax amounts.
2. **Official sources first.** Tax rules must be traceable to HMRC/GOV.UK or reviewed internal tax policy notes.
3. **No hidden submissions.** Never submit anything to HMRC without explicit user confirmation.
4. **Auditability by default.** Any calculation, classification or AI answer that affects tax must be logged with inputs, rule version and source references.
5. **Privacy by design.** Store the minimum data needed, encrypt sensitive data, and avoid sending unnecessary personal data to AI services.
6. **Multi-language clarity.** Answer in the user's language, but preserve official English tax terms in parentheses on first mention.
7. **Escalate high-risk cases.** Ambiguous, high-value, unusual or regulated scenarios should recommend accountant review.

## Agent roles

### Senior Software Architect Agent

Owns system boundaries, monorepo structure, ADRs, integration patterns, API contracts, security posture, scalability and maintainability.

Must update:
- `docs/architecture/system-architecture.md`
- `docs/architecture/data-flow.md`
- `docs/adr/`
- `docs/security/security-model.md`
- relevant API contracts and schema docs

### Senior Mobile Developer Agent

Owns React Native/Expo architecture, navigation, state management, accessibility, i18n, offline behaviour, performance and release readiness.

Must update:
- `docs/frontend/mobile-architecture.md`
- `docs/frontend/mobile-best-practices.md`
- `docs/ux/screen-map.md`
- translation keys in `apps/mobile/src/i18n/`
- screen/component documentation when user flows change

### Senior UX/UI Designer Agent

Owns information architecture, design system, screen hierarchy, user flows, copy tone, accessibility, empty states and trust patterns.

Must update:
- `docs/ux/design-system.md`
- `docs/ux/screen-map.md`
- `docs/ux/user-flows.md`
- `docs/product/product-requirements.md`

### Senior Backend Developer Agent

Owns FastAPI backend, service boundaries, database models, migrations, job processing, observability, API validation and integrations.

Must update:
- `docs/backend/backend-architecture.md`
- `docs/backend/api-design.md`
- `docs/backend/backend-best-practices.md`
- `docs/architecture/data-model.md`
- OpenAPI schema or endpoint docs when APIs change

### UK Tax Rules Agent

Owns deterministic rules, tax-year versioning, thresholds, source citations, calculation tests and change impact notes.

Must update:
- `docs/tax/tax-rules-strategy.md`
- `docs/tax/tax-rule-update-playbook.md`
- `packages/tax-rules/CHANGELOG.md`
- unit tests for changed calculations

### AI Safety / RAG Agent

Owns assistant prompts, retrieval strategy, hallucination controls, source display, multilingual behaviour and refusal/escalation rules.

Must update:
- `docs/ai/assistant-behaviour.md`
- `docs/ai/rag-strategy.md`
- `docs/ai/evaluation-plan.md`
- prompt/version changelog when prompt behaviour changes

### QA / Release Agent

Owns test strategy, regression coverage, release checklist, smoke tests, app store readiness and production monitoring checks.

Must update:
- `docs/qa/test-strategy.md`
- `docs/operations/release-checklist.md`
- `docs/roadmap/tasks.md`
- `docs/roadmap/epics.md`

## Backlog management

`docs/roadmap/epics.md` is the canonical delivery backlog. All agents must keep it current.

When planning, implementing or reviewing work:

- Add every accepted recommendation, follow-up idea or newly discovered work item to `docs/roadmap/epics.md` as an epic, feature or task.
- Add every discovered bug, regression or known defect to the bug register in `docs/roadmap/epics.md`.
- Bug entries must include status, severity, source, affected area and the expected fix or next diagnostic step.
- Update bug status when fixed, verified, blocked or intentionally deferred.
- Update completed tasks from `[ ]` to `[x]` before finishing the turn.
- Update feature and epic status labels when their task state changes.
- Add blockers with `Blocked` status and a short note describing what is needed to unblock them.
- Keep `docs/roadmap/tasks.md` as the priority snapshot; do not use it as the canonical structured backlog.
- Mention backlog updates in the final response whenever they were changed.

## Required update matrix

| Change type | Required docs/files to update |
|---|---|
| Any accepted recommendation or follow-up task | `docs/roadmap/epics.md` |
| Completed epic, feature or task | `docs/roadmap/epics.md` status/checklist update |
| New bug, regression or known defect | `docs/roadmap/epics.md` bug register |
| Fixed or verified bug | `docs/roadmap/epics.md` bug status update |
| New screen | `docs/ux/screen-map.md`, `docs/ux/user-flows.md`, mobile route types, i18n keys |
| New API endpoint | `docs/backend/api-design.md`, schemas, tests, OpenAPI notes |
| New tax rule | `docs/tax/tax-rules-strategy.md`, source reference, tests, package changelog |
| Tax threshold update | tax rule source file, tests, `docs/tax/tax-rule-update-playbook.md` evidence log |
| AI prompt change | `docs/ai/assistant-behaviour.md`, evaluation fixtures, prompt changelog |
| Data model change | migration, `docs/architecture/data-model.md`, privacy impact check |
| Auth/security change | `docs/security/security-model.md`, threat model, release checklist |
| New language | i18n files, glossary, UX copy review, multilingual QA fixtures |
| HMRC integration change | ADR, API docs, security review, audit logging plan |

## Definition of done

A change is not done until:

- Code builds and tests pass.
- Relevant docs are updated.
- `docs/roadmap/epics.md` reflects any new, changed, blocked or completed epic/feature/task/bug.
- New or changed user-facing copy has i18n keys.
- Tax-impacting logic has deterministic tests.
- Security/privacy impact has been considered.
- High-risk behaviours have clear escalation paths.

## Commit style

Use conventional commits:

- `feat(mobile): add onboarding language selector`
- `feat(api): add tax estimate endpoint`
- `fix(tax-rules): correct class 4 nic threshold`
- `docs(ux): update screen map`
- `chore(ci): add lint job`
