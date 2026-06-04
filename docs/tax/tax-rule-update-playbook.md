# Tax Rule Update Playbook

Use this whenever HMRC/GOV.UK updates thresholds, deadlines, allowances or calculation guidance.

## Steps

1. Identify the affected tax year.
2. Capture the official source and retrieval date.
3. Open a change issue using the tax-rule template.
4. Update constants in `packages/tax-rules`.
5. Add or update boundary tests.
6. Update assumptions/warnings where needed.
7. Update this evidence log.
8. Run all tax-rules tests.
9. Request review from tax/accounting reviewer before release.
10. Add package changelog entry.

## Evidence log

| Date | Tax year | Area | Source | Reviewer | Notes |
|---|---|---|---|---|---|
| 2026-06-04 | 2025-26 | Income Tax allowances and bands | GOV.UK Income Tax rates and allowances for current and previous tax years | AI-assisted draft; accountant review required before production | Added `2025-26.0` constants and boundary tests. |
| 2026-06-04 | 2025-26 | Self-employed Class 4 National Insurance | GOV.UK Self-employed National Insurance rates | AI-assisted draft; accountant review required before production | Added lower/upper profit limits, 6% main rate and 2% additional rate tests. |

## Release note template

```text
Tax rules updated for [tax year]. Changed: [summary]. Source reviewed: [source]. Impact: [impact].
```
