# Mobile Best Practices

## TypeScript

- Prefer explicit domain types for tax data.
- Avoid `any` except at validated external boundaries.
- Use discriminated unions for statuses and source types.

## Components

- Keep screens thin.
- Put reusable UI in `components/`.
- Keep business logic in hooks or feature services.
- Prefer composition over large configurable components.

## Forms

- Validate amounts, dates and required fields immediately.
- Show friendly errors.
- Preserve unsaved form data where possible.
- Use decimal-safe money handling.

## Performance

- Use virtualised lists for transactions/documents.
- Avoid re-rendering chat message lists unnecessarily.
- Compress images before upload where quality allows.

## Security

- Store tokens in secure storage.
- Do not persist sensitive documents in app cache longer than needed.
- Mask sensitive values in logs.

## Release quality

- Test on small phones and large phones.
- Test long translations.
- Test offline and poor network states.
- Test accessibility font scaling.
