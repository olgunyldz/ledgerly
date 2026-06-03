# TaxBridge AI

Multi-language AI assistant for UK self-employed taxpayers, landlords, contractors and small businesses.

> Working name: **TaxBridge AI**  
> Goal: Help users understand UK tax in their own language while preserving official English tax terms.

## MVP Scope

- Multi-language onboarding
- UK tax profile questionnaire
- Income and expense tracker
- Receipt/document upload placeholder
- AI tax assistant interface
- Tax estimate placeholder powered by a deterministic rules engine
- Accountant-ready export placeholder

## Monorepo Structure

```text
apps/mobile      React Native / Expo mobile app
apps/api         FastAPI backend
packages/tax-rules  Shared UK tax calculation/rules package
docs             Product and compliance notes
```

## Quick Start

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

## Important Product Principle

AI should explain, classify and guide. A rules engine should calculate. High-risk cases should be escalated to an accountant.

## Compliance Notes

- Do not submit anything to HMRC without explicit user confirmation.
- Keep an audit trail for tax calculations and AI answers.
- Use official UK/HMRC/GOV.UK sources for tax rules.
- Apply GDPR / UK GDPR data minimisation.
- Encrypt sensitive documents and financial data.
