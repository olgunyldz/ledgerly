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
- External integrations must be behind interfaces.
- Tax calculations must call the rules package/service and include rule version in output.

## Error strategy

- 400: malformed request
- 401: unauthenticated
- 403: authenticated but not allowed
- 404: resource not found
- 409: state conflict
- 422: validation error
- 500: unexpected server error

All API errors should return a stable machine-readable `code` and a localisable `message_key`.
