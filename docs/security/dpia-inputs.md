# DPIA Inputs

Ledgerly needs a formal Data Protection Impact Assessment before production launch. These inputs summarise the current product design and known open decisions.

## Processing summary

- Product: multi-language UK tax recordkeeping and explanation assistant.
- Users: self-employed workers, landlords, contractors and small businesses.
- Processing purpose: help users organise records, understand UK tax context and prepare accountant review material.
- Processing locations: mobile app local storage during private beta; future authenticated API/database/object storage.

## Personal data categories

- Identity and contact details.
- Language and setup preferences.
- Tax profile selections.
- Income and expense records.
- Receipt/document metadata and future uploaded files.
- Assistant messages and risk classifications.
- Tax estimate inputs, outputs and audit event metadata.

## Special risk areas

- Financial and tax records can reveal sensitive personal circumstances.
- Uploaded documents may contain third-party details or excessive data.
- Assistant messages may include unintended personal data.
- Multilingual explanations may be misunderstood if official English tax terms are hidden.
- Incorrect tax calculation display could cause financial harm.
- Hidden or accidental export/submission could create compliance risk.

## Existing controls

- Deterministic tax rules own tax calculations.
- AI is not allowed to calculate tax amounts by itself.
- Official English tax terms remain visible for review.
- High-risk assistant topics recommend accountant review.
- Export generation is disabled until explicit confirmation and backend services exist.
- Audit events store input hashes, rule versions and minimal metadata.
- API error responses use stable public envelopes.

## Required production controls

- Authenticated persistence with ownership checks.
- Encryption at rest for database and documents.
- Signed URLs for private document access.
- Redacted structured logging and log retention enforcement.
- User export and deletion flows.
- Retention/deletion jobs with dry-run and audit events.
- DPIA sign-off and privacy notice review before public launch.
- Incident response owner and support contact path.

## Open DPIA questions

- Which legal basis applies to each processing purpose?
- Which vendors/processors will handle AI, storage, email and observability?
- Where will production data be hosted?
- What is the exact user deletion SLA?
- What assistant message retention period is acceptable for private beta?
- What data will be shared with accountants during export flows?
