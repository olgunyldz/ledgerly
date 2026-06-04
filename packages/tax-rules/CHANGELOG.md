# Tax Rules Changelog

## Unreleased

- Added draft `2025-26.0` deterministic self-employed reserve estimate with Income Tax and Class 4 National Insurance breakdown.
- Added source metadata for GOV.UK Income Tax and self-employed National Insurance thresholds.
- Added boundary tests for personal allowance, basic-rate limit and Class 4 National Insurance thresholds.
- Added audit-friendly calculation metadata with `tax_year`, `rule_version`, `inputs_snapshot`, assumptions and warnings.
- Added a small CLI entrypoint for backend service integration.
- Added requirement that all future rule changes include source metadata and tests.
