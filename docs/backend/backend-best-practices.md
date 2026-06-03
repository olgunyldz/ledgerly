# Backend Best Practices

## Validation

- Validate all external input with Pydantic schemas.
- Validate money, dates, tax years and enum values explicitly.
- Reject unknown fields on critical endpoints.

## Persistence

- Use migrations for all schema changes.
- Keep tax-year data explicitly versioned.
- Avoid destructive updates for confirmed tax records.

## Logging

Log:

- request ID
- user ID hash or internal ID
- endpoint
- status code
- latency
- rule version for tax calculations

Do not log:

- full document text
- raw bank statements
- tokens
- passwords
- sensitive AI prompts containing PII

## Testing

- Unit test services and rules.
- Integration test endpoints.
- Contract test mobile/API payloads.
- Regression test tax calculations by tax year.

## Security

- Enforce auth on all user data endpoints.
- Authorise by resource ownership.
- Use signed URLs for private document access.
- Rate-limit assistant and upload endpoints.
