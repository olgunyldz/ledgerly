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
  "message_id": "id",
  "answer": "...",
  "language": "tr",
  "risk_level": "low",
  "sources": [],
  "suggested_actions": []
}
```

### Tax estimate

`POST /v1/tax-estimates`

Request:

```json
{
  "tax_year": "2026-27",
  "income": 40000,
  "expenses": 8000,
  "profile_type": "self_employed"
}
```

Response:

```json
{
  "tax_year": "2026-27",
  "rule_version": "2026-27.0",
  "estimate": {
    "taxable_profit": 32000,
    "income_tax_estimate": 0,
    "national_insurance_estimate": 0,
    "total_estimate": 0
  },
  "assumptions": []
}
```

## Versioning

Breaking API changes require a new route version or compatibility adapter.
