# Contributing

## Workflow

1. Create a feature branch.
2. Update code and relevant docs.
3. Add or update tests.
4. Run checks locally with `bash scripts/qa-baseline.sh`.
5. Open PR using the pull request template.

## Required docs updates

See `AGENTS.md` update matrix.

## Coding standards

- Prefer TypeScript strictness.
- Keep backend services testable.
- Do not hardcode user-facing strings.
- Do not put tax logic in UI components.
- Do not log sensitive user data.

## Pull request expectations

- Explain user impact.
- Explain tax/compliance impact.
- Include screenshots for UI changes.
- Include test evidence.
