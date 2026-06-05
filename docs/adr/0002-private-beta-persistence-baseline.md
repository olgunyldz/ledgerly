# ADR 0002 — Private Beta Persistence Baseline

## Status

Accepted

## Context

Ledgerly needs repository boundaries before real database persistence is introduced. Current API endpoints already produce tax-impacting audit payloads, but the private beta skeleton should also prove where ownership checks and audit event persistence belong.

## Decision

- Add in-memory repositories for tax profiles, records and audit events.
- Require temporary `X-Ledgerly-User-Id` user context for tax estimate persistence.
- Store tax estimate audit events with `input_hash`, `rule_version` and minimal metadata.
- Keep the API contract explicit that this is private-beta scaffolding, not production authentication.

## Consequences

- API code now has clear repository seams for database-backed implementation.
- Tax estimate calls without user context return `401`.
- In-memory records are process-local and must not be treated as durable storage.
- Production work still needs migrations, authenticated ownership checks and rollback procedures.

## Migration and rollback plan

1. Introduce database tables matching `docs/architecture/data-model.md`.
2. Replace in-memory repositories with database-backed implementations behind the same method names.
3. Add migration rollback scripts before enabling durable writes.
4. Keep audit events append-only; rollback should disable new writes rather than deleting historical audit events.
