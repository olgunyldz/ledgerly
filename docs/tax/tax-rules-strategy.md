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

## Initial implemented coverage

`packages/tax-rules` currently implements a draft `2025-26.0` self-employed reserve estimate for England, Wales and Northern Ireland planning support.

Included:

- Income Tax personal allowance and basic/higher/additional rates.
- Class 4 National Insurance lower and upper profit limits.
- Source metadata in rule constants.
- Calculation output metadata with `tax_year`, `rule_version`, `inputs_snapshot`, `assumptions` and `warnings`.

Not yet included:

- Scottish Income Tax.
- Personal Allowance tapering above £100,000.
- Class 2 voluntary contribution choices.
- Student loans, payments on account, Marriage Allowance, Blind Person's Allowance or other reliefs.
- Audit event persistence.

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
