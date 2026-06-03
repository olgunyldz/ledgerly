# System Architecture

## Architecture goal

Build a secure, auditable, multi-language UK tax assistant where AI improves user experience but deterministic services own calculations and compliance-sensitive decisions.

## High-level components

```text
Mobile App (Expo / React Native)
  ├─ UI, navigation, local state, i18n
  ├─ receipt/document capture
  └─ secure API client

API Backend (FastAPI)
  ├─ auth/session boundary
  ├─ user profiles and tax profiles
  ├─ transaction/document services
  ├─ AI orchestration service
  ├─ tax estimate service
  ├─ audit logging service
  └─ export/accountant pack service

Tax Rules Package
  ├─ versioned rules by UK tax year
  ├─ deterministic calculations
  ├─ source metadata
  └─ regression tests

AI / RAG Layer
  ├─ language detection
  ├─ retrieval from approved tax knowledge base
  ├─ response generation
  ├─ risk classification
  └─ source-backed answers

Data Stores
  ├─ PostgreSQL for structured data
  ├─ object storage for documents
  ├─ vector index for approved tax knowledge
  └─ append-only audit/event log

External Integrations
  ├─ HMRC APIs, later phase
  ├─ bank/open banking provider, later phase
  ├─ email/export provider
  └─ analytics/observability
```

## Boundary rules

- Mobile app never calculates final tax liability except lightweight previews returned by backend/rules engine.
- Backend never trusts client-submitted totals without validation.
- AI assistant never writes to tax records directly; it proposes structured actions that user confirms.
- HMRC submission flow must be separate from estimation and require explicit confirmation.

## Recommended deployment

- Mobile: Expo EAS builds for iOS and Android.
- API: containerised FastAPI service behind HTTPS.
- DB: managed PostgreSQL with encryption at rest.
- Storage: private object bucket with signed URLs.
- Workers: separate queue workers for OCR, document extraction, export generation and notification jobs.
- Observability: structured logs, metrics, traces and alerting.

## Architecture qualities

| Quality | Design response |
|---|---|
| Accuracy | deterministic tax rules, test fixtures, source metadata |
| Trust | citations, audit trail, explainable estimates |
| Safety | AI guardrails, escalation, no hidden submissions |
| Privacy | data minimisation, encryption, retention controls |
| Scale | async workers, stateless API, cache where safe |
| Maintainability | ADRs, module boundaries, typed schemas |
| Internationalisation | i18n-first UI, glossary, language QA |
