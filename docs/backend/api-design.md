# API Design

## API principles

- Version API routes: `/v1/...`.
- Use nouns and resource-oriented paths.
- Return typed JSON.
- Include request IDs in responses/logs.
- Use idempotency keys for payments, submissions and exports.

## Initial endpoints

### Health

`GET /health`

### Assistant

`POST /v1/assistant/messages`

Request:

```json
{
  "conversation_id": "optional-id",
  "message": "Can I claim fuel?",
  "language": "tr"
}
```

Response:

```json
{
  "message_id": "generated-id",
  "conversation_id": "optional-id",
  "answer": "Ledgerly is in safe starter mode...",
  "language": "tr",
  "risk_level": "low",
  "prompt_version": "assistant-safe-v0.1",
  "sources": [
    {
      "title": "GOV.UK Self Assessment",
      "source_type": "govuk",
      "url": "https://www.gov.uk/self-assessment-tax-returns",
      "tax_year": null,
      "retrieved_at": null
    }
  ],
  "suggested_actions": [],
  "escalation_required": false,
  "refused": false
}
```

The starter assistant backend is deterministic guardrail logic only. It classifies high-risk topics, returns approved starter sources, includes the safe prompt version and recommends accountant review when escalation is required.

### Tax estimate

`POST /v1/tax-estimates`

Headers:

```text
X-Ledgerly-User-Id: private-beta-user-id
```

Request:

```json
{
  "tax_year": "2025-26",
  "income": 40000,
  "expenses": 8000,
  "profile_type": "self_employed"
}
```

Response:

```json
{
  "tax_year": "2025-26",
  "rule_version": "2025-26.0",
  "inputs_snapshot": {
    "annualProfit": 32000,
    "taxYear": "2025-26"
  },
  "taxable_profit": 32000,
  "reserve_percent": 0.16,
  "estimate": {
    "estimated_income_tax": 3886,
    "estimated_class4_national_insurance": 1165.8
  },
  "total_estimate": 5051.8,
  "assumptions": [],
  "warnings": [],
  "sources": [],
  "audit_event": {
    "event_type": "tax_estimate.calculated",
    "entity_type": "tax_estimate",
    "entity_id": null,
    "input_hash": "sha256-hash",
    "rule_version": "2025-26.0",
    "metadata": {}
  }
}
```

The endpoint only supports `profile_type: "self_employed"` until additional deterministic rule coverage exists. It calls the shared tax rules package through `apps/api/app/services/tax_rules_service.py`, persists an in-memory private-beta audit event through `apps/api/app/repositories/audit_events.py`, and returns an audit event payload for client visibility.

## Error responses

All API errors return a stable machine-readable code and localisable message key:

```json
{
  "code": "validation_error",
  "message_key": "error.validation",
  "detail": []
}
```

Current private-beta contracts:

- `401 unauthenticated` with `error.unauthenticated` when `X-Ledgerly-User-Id` is missing from authenticated private-beta endpoints.
- `422 validation_error` with `error.validation` for request schema and business validation failures.
- `http_error` with `error.http` for other handled HTTP exceptions until endpoint-specific codes are introduced.

## Versioning

Breaking API changes require a new route version or compatibility adapter.
