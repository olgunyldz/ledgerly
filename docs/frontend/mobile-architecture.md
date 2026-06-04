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
- Cross-screen app preferences: AsyncStorage via `apps/mobile/src/lib/preferences.ts`.
- Draft tax profile state: AsyncStorage via `apps/mobile/src/lib/taxProfile.ts` until backend persistence exists.
- Do not duplicate backend tax calculations in mobile state.

## Navigation

- `apps/mobile/src/navigation/AppNavigator.tsx` owns the root React Navigation native stack.
- `apps/mobile/src/navigation/routes.ts` is the source of truth for route names and params.
- First-run screens are route-level files in `apps/mobile/src/screens/`.
- Shared onboarding layout belongs in `apps/mobile/src/components/OnboardingStepScreen.tsx`.
- Setup-complete state, selected language and English tax-term visibility are persisted through `apps/mobile/src/lib/preferences.ts`.
- Dashboard next-best-action logic can read local draft profile state from `apps/mobile/src/lib/taxProfile.ts`.

## API client rules

- Use typed request/response schemas.
- Handle network failure, 401, 403, 422 and 500 separately.
- Never log tokens, PII, document text or full AI prompts.

## i18n rules

- No hardcoded user-facing strings in screens.
- Translation keys should be stable and semantic.
- Use interpolation for dynamic values.
- Keep English tax terms in glossary entries.
