# Mobile Architecture

## Stack

- Expo / React Native
- TypeScript
- React Navigation
- i18next / react-i18next
- TanStack Query for server state
- Zod for runtime validation where useful
- SecureStore/Keychain for tokens

## Suggested folder structure

```text
apps/mobile/src
  components/       shared UI components
  features/         feature modules
  i18n/             translations and locale config
  navigation/       navigators and route types
  theme/            tokens and typography
  lib/              API client, formatting, utilities
```

## Feature module structure

```text
features/transactions
  components/
  screens/
  hooks/
  api.ts
  types.ts
  validation.ts
```

## State management

- Server state: TanStack Query.
- Local UI state: React state.
- Cross-screen app preferences: lightweight store only if needed.
- Do not duplicate backend tax calculations in mobile state.

## API client rules

- Use typed request/response schemas.
- Handle network failure, 401, 403, 422 and 500 separately.
- Never log tokens, PII, document text or full AI prompts.

## i18n rules

- No hardcoded user-facing strings in screens.
- Translation keys should be stable and semantic.
- Use interpolation for dynamic values.
- Keep English tax terms in glossary entries.
