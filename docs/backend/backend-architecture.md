# Backend Architecture

## Stack

- FastAPI
- Pydantic schemas
- PostgreSQL
- SQLAlchemy or SQLModel
- Alembic migrations
- Background workers for OCR/export/notifications
- Object storage for documents

## Layers

```text
routers/       HTTP endpoints only
schemas/       request/response validation
services/      business workflows
repositories/  data access
models/        persistence models
core/          config, security, logging
workers/       async/background jobs
```

## Rules

- Routers should not contain business logic.
- Services should be testable without HTTP.
- Repositories should hide persistence details.
- Repositories must enforce user ownership before returning stored records.
- External integrations must be behind interfaces.
- Tax calculations must call the rules package/service and include rule version in output.
- `apps/api/app/services/tax_rules_service.py` is the temporary bridge to `packages/tax-rules` until a first-class package boundary is introduced.
- `apps/api/app/services/assistant_guardrails.py` owns starter assistant risk classification, prompt version metadata and approved source contracts until RAG/LLM services exist.
- `apps/api/app/core/errors.py` owns stable API error envelopes with machine-readable `code`, localisable `message_key` and JSON-safe `detail`.

## Private beta persistence baseline

- `apps/api/app/repositories/base.py` provides in-memory user-owned repository behaviour for private beta scaffolding.
- `apps/api/app/repositories/tax_profiles.py` defines the tax profile repository boundary.
- `apps/api/app/repositories/records.py` defines income and expense repository boundaries.
- `apps/api/app/repositories/audit_events.py` stores tax-impacting audit events in memory until database persistence lands.
- `apps/api/app/core/auth.py` reads `X-Ledgerly-User-Id` as temporary private-beta user context; production auth must replace it.

## Error strategy

- 400: malformed request
- 401: unauthenticated
- 403: authenticated but not allowed
- 404: resource not found
- 409: state conflict
- 422: validation error
- 500: unexpected server error

All API errors should return a stable machine-readable `code`, a localisable `message_key` and JSON-safe `detail`.
