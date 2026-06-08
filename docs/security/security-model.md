# Security Model

## Sensitive data categories

- Identity and contact details
- Income and expense records
- Tax identifiers such as UTR where added
- Uploaded documents
- Bank transaction data where added
- AI conversations that may contain tax or personal information

## Security principles

- Least privilege access.
- Encryption in transit and at rest.
- Strong resource ownership checks.
- Short-lived signed URLs for documents.
- No sensitive data in logs.
- Explicit user consent for integrations.
- Data retention and deletion controls.

## Threat model summary

| Threat | Control |
|---|---|
| Unauthorised account access | secure auth, MFA option, token rotation |
| Cross-user data exposure | resource ownership checks, integration tests |
| Document leakage | private buckets, signed URLs, access logging |
| AI prompt leakage | redaction, no secrets in prompts, vendor controls |
| Tax calculation tampering | deterministic versioned rules, audit logs |
| Hidden HMRC submission | explicit confirmation, separate flow, audit event |

## Privacy checklist

- [x] Map personal data processed.
- [x] Define lawful basis.
- [x] Minimise stored fields.
- [x] Define retention periods.
- [x] Draft export and deletion request design.
- [x] Draft DPIA inputs before production launch.
- [ ] Implement export and deletion request flows.
- [ ] Complete formal DPIA sign-off before production launch.

Detailed private-beta gates are tracked in `docs/security/security-privacy-gates.md`. Retention and deletion jobs are designed in `docs/security/retention-deletion-design.md`. DPIA preparation inputs are in `docs/security/dpia-inputs.md`.

## Minimum data retention rules

| Data category | Default retention | Notes |
|---|---:|---|
| Draft onboarding preferences | Until user deletes workspace | Keep minimal language/setup flags only. |
| Income and expense records | 7 tax years after tax year end | User can delete draft records before export/submission. |
| Uploaded documents | 7 tax years after tax year end | Store privately; use signed URLs and access logs. |
| Tax estimate audit events | 7 tax years after tax year end | Store input hash, rule version and minimal metadata. |
| Assistant messages | 24 months by default | Shorten or delete on user request where legally allowed. |
| Operational logs | 30 days | No personal tax data, prompts, documents or record contents. |

## Audit logging rules

- Tax-impacting calculations must store `input_hash`, `rule_version`, event type and source metadata.
- Audit metadata must avoid raw document text, full prompts, tokens, secrets and unnecessary personal data.
- User-confirmed export/submission flows must create explicit confirmation audit events before any external action.
- Audit records are append-only; corrections create a new event rather than overwriting prior events.
