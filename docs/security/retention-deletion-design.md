# Retention and Deletion Job Design

This is the target production design. The current private-beta repository layer is in-memory/local-first and does not yet run retention jobs.

## Retention policy inputs

Use `docs/security/security-model.md` as the retention schedule source of truth:

- Draft onboarding preferences: until workspace deletion.
- Income, expense records and uploaded documents: 7 tax years after tax year end.
- Tax estimate audit events: 7 tax years after tax year end.
- Assistant messages: 24 months by default.
- Operational logs: 30 days.

## Data model requirements

- Records with expiry rules must include `retention_until`.
- Deletion requests must create a `deletion_request` record with status, scope and timestamps.
- Audit events remain append-only unless legal erasure applies; erasure should tombstone personal fields and preserve minimal compliance metadata where lawful.
- Document blobs must be deleted from private object storage and not only from relational tables.

## Scheduled jobs

### Daily retention sweep

1. Select records where `retention_until <= now`.
2. Verify no legal hold, support hold or open export/submission workflow applies.
3. Delete or tombstone records according to data category.
4. Delete related document blobs through the storage provider.
5. Write a minimal audit event with event type, entity type, entity ID and deletion reason.

### User deletion request

1. Authenticate the user and require explicit confirmation.
2. Mark workspace deletion as pending and stop new background processing.
3. Export a receipt of deletion scope if requested.
4. Delete draft records, preferences, assistant messages and documents.
5. Tombstone audit entries where full deletion would break tax/compliance evidence.
6. Mark the request complete with timestamp and processor version.

### User export request

1. Authenticate the user and require explicit confirmation.
2. Generate a scoped export from user-owned records only.
3. Redact secrets, tokens and internal IDs.
4. Provide a short-lived download URL.
5. Create an audit event for the export request and download.

## Safety checks

- Jobs must run idempotently.
- Jobs must be resumable after partial failure.
- Jobs must emit metrics without PII.
- Jobs must support dry-run mode before production rollout.
- Jobs must have integration tests for cross-user isolation.
