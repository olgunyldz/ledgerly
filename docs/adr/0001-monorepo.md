# ADR 0001: Use a monorepo

## Status

Accepted

## Context

The product needs a mobile app, API backend and shared tax rules package. The teams are small and rapid iteration matters.

## Decision

Use a monorepo with:

- `apps/mobile`
- `apps/api`
- `packages/tax-rules`
- `docs`

## Consequences

- Easier cross-stack coordination.
- Shared docs and workflows stay near code.
- CI must be structured to avoid slow full-repo jobs on every change.
