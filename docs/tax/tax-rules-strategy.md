# Tax Rules Strategy

## Goal

Provide deterministic, versioned and testable UK tax calculations that AI and backend services can call safely.

## Package responsibilities

- Tax-year constants
- Income Tax bands
- National Insurance rules
- Self-employed profit calculations
- Trading allowance handling
- Payments on account estimates
- Source metadata
- Calculation assumptions

## Versioning

Use tax-year versions, for example:

- `2025-26.0`
- `2026-27.0`
- `2026-27.1` for corrections

Every calculation output must include:

- `tax_year`
- `rule_version`
- `inputs_snapshot`
- `assumptions`
- `warnings`

## Source metadata

Each rule constant should include:

- source name
- source URL or internal reference
- retrieved/reviewed date
- effective tax year
- reviewer

## Testing rules

- Add tests for every threshold and band.
- Add boundary tests around thresholds.
- Add scenario tests for common user profiles.
- Add regression tests when fixing bugs.
