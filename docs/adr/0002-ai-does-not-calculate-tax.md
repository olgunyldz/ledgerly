# ADR 0002: AI does not calculate final tax amounts

## Status

Accepted

## Context

UK tax calculations are compliance-sensitive and must be reproducible. LLMs can hallucinate, omit edge cases or change behaviour between versions.

## Decision

AI may explain, classify, ask follow-up questions and call deterministic tools. Deterministic tax rules calculate estimates and tax-impacting outputs.

## Consequences

- Tax rules need strong test coverage and versioning.
- AI prompts must route calculation requests to tools.
- Audit logs must include rule version and input snapshot.
