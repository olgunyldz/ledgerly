# Security and Privacy Gates

Use this checklist before private beta and again before production launch. Any failed gate must become a bug or roadmap task in `docs/roadmap/epics.md`.

## No-PII logging review

### Allowed log fields

- Request ID or trace ID.
- Internal user ID or irreversible user ID hash.
- Endpoint, method, status code and latency.
- Tax rule version and audit event type.
- Error code and localisable `message_key`.

### Prohibited log fields

- Raw income, expense, merchant, note or document text.
- Full AI prompts, assistant messages or retrieved private context.
- Tokens, passwords, secrets, session cookies or signed URLs.
- UTR, National Insurance number, bank account details or payment identifiers.
- Export preview rows, CSV contents or PDF text.

### Review steps

- Search backend and mobile code for logging calls before release.
- Confirm error handlers return stable public error envelopes without leaking stack traces.
- Confirm audit metadata stores hashes and rule/source metadata, not raw tax records.
- Confirm future observability tools receive redacted attributes only.

## Export preview PII review

Current private-beta export generation is disabled. The mobile Accountant Pack shows a local preview only.

- Preview rows may include user-entered income notes, expense merchants and tax years.
- Preview rows must remain local until explicit export confirmation and backend export services exist.
- Generated files must not be created silently.
- Future PDF/CSV generation must create an explicit confirmation audit event before file creation.
- Future share/download links must be short-lived and scoped to the authenticated user.

## Private beta gate status

| Gate | Status | Notes |
|---|---|---|
| No secrets committed | Passed | Repository scan found no obvious token/password/private-key assignments. |
| No active app logging of tax records | Passed | No mobile `console.*` calls or backend logger calls for user records are currently present. |
| Stable public API errors | Passed | API errors use `code`, `message_key` and JSON-safe `detail`. |
| Export generation disabled | Passed | Accountant Pack export button remains disabled. |
| Retention/deletion implementation | Blocked | Design exists; production jobs and user flows are not implemented. |
| DPIA | Blocked | Inputs are drafted; formal DPIA is required before production launch. |
