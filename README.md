# Ledgerly

Calm, multi-language UK tax record and preparation assistant for self-employed taxpayers, landlords, contractors and small businesses.

> Product name: **Ledgerly**  
> Goal: Help users keep clean records, understand UK tax in their own language and prepare accountant-ready summaries.

## Product positioning

Ledgerly is designed for users who find the UK tax system difficult, especially multilingual users, sole traders, gig workers, freelancers, contractors and landlords. The app helps them organise records, understand tax concepts, estimate tax and prepare accountant-ready summaries.

## Core product principle

**AI explains, classifies and guides. Deterministic rules calculate. High-risk cases escalate to accountant review.**

## MVP scope

- Multi-language onboarding
- UK tax profile questionnaire
- Income and expense tracker
- Receipt/document upload placeholder
- AI tax assistant interface
- Tax estimate powered by deterministic rules
- Accountant-ready export placeholder
- Audit trail strategy
- Source-grounded tax explanations

## Monorepo structure

```text
apps/mobile          React Native / Expo mobile app
apps/api             FastAPI backend
packages/tax-rules   Shared UK tax calculation/rules package
docs                 Product, architecture, UX, backend, AI and compliance docs
AGENTS.md            Operating manual for AI agents and contributors
```

## Documentation map

Start here:

- `AGENTS.md` — agent roles, update rules and definition of done
- `docs/product/product-requirements.md` — product requirements
- `docs/architecture/system-architecture.md` — system architecture
- `docs/ux/screen-map.md` — app screens and navigation
- `docs/ux/design-system.md` — UX/UI design principles
- `docs/frontend/mobile-architecture.md` — mobile architecture
- `docs/backend/backend-architecture.md` — backend architecture
- `docs/ai/assistant-behaviour.md` — AI assistant safety and behaviour
- `docs/tax/tax-rules-strategy.md` — deterministic tax rules strategy
- `docs/roadmap/roadmap.md` — phased roadmap
- `docs/roadmap/tasks.md` — task backlog
- `docs/security/security-model.md` — security and privacy model
- `docs/operations/release-checklist.md` — release checklist
- `docs/operations/private-beta-checklist.md` — private beta checklist

## Quick start

### Mobile app

```bash
cd apps/mobile
npm install
npm run start
```

### API

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Tax rules package

```bash
cd packages/tax-rules
npm install
npm test
```

### QA baseline

```bash
bash scripts/qa-baseline.sh
```

## Development rules

- Do not hardcode user-facing strings in mobile screens.
- Do not put tax logic inside UI components.
- Do not rely on AI for final tax calculations.
- Do not submit anything to HMRC without explicit user confirmation.
- Add tests for every tax-rule change.
- Update relevant docs using the matrix in `AGENTS.md`.

## Compliance notes

- Apply UK GDPR data minimisation.
- Encrypt sensitive documents and financial data.
- Maintain audit logs for tax-impacting actions.
- Use official HMRC/GOV.UK sources for tax rules.
- Show clear disclaimers and accountant escalation for high-risk scenarios.
