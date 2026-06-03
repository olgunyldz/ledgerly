# Design System

## Brand attributes

- Clear
- Trustworthy
- Calm
- Helpful
- Multi-language by default
- Professional without feeling intimidating

## UX principles

1. **Make tax less scary.** Use plain language and explain official terms.
2. **Show confidence and uncertainty.** Label estimates, assumptions and high-risk answers.
3. **Confirm before changing records.** AI suggestions must be reviewed by the user.
4. **Design for multilingual text expansion.** UI must handle longer strings.
5. **Use progressive disclosure.** Keep the first screen simple, reveal detail on demand.

## Core components

- `Screen`
- `Card`
- `PrimaryButton`
- `SecondaryButton`
- `TextInputField`
- `MoneyInput`
- `TaxTermTooltip`
- `EstimateBreakdownCard`
- `SourceChip`
- `RiskBadge`
- `DocumentStatusCard`
- `EmptyState`
- `ErrorState`

## Accessibility

- Minimum touch target: 44 x 44 pt.
- Text must support dynamic font scaling.
- Do not rely on colour alone for status.
- Every icon-only control needs an accessible label.
- Forms must show inline validation messages.

## Tone of voice

Use simple, supportive language.

Good:

> This is an estimate based on the information you entered.

Avoid:

> Your final liability has been calculated.

Good:

> HMRC calls this an “allowable expense”.

Avoid:

> This is definitely deductible.
