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

- [ ] Map personal data processed.
- [ ] Define lawful basis.
- [ ] Minimise stored fields.
- [ ] Define retention periods.
- [ ] Support export and deletion requests.
- [ ] Complete DPIA before production launch.
