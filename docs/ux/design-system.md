# Design System

## Brand attributes

- Clear
- Trustworthy
- Calm
- Helpful
- Multi-language by default
- Professional without feeling intimidating

## Brand idea

Ledgerly should feel like a tidy financial workspace: calm, structured and reassuring. The product should make tax records feel manageable without making tax outcomes seem guaranteed.

## Product voice

- **Plain:** Use everyday language first, then show official English tax terms in parentheses when needed.
- **Careful:** Prefer "estimate", "may", "usually" and "based on what you entered" where tax certainty is limited.
- **Actionable:** Tell users the next useful action, such as adding a missing record or reviewing a high-risk item.
- **Accountant-friendly:** Frame outputs as clean records and summaries that can be reviewed by a professional.

## Colour palette

| Token | Hex | Use |
|---|---:|---|
| `ink` | `#18212F` | Primary text and high-emphasis controls |
| `slate` | `#536171` | Secondary text |
| `paper` | `#F7FAF8` | App background |
| `surface` | `#FFFFFF` | Cards, inputs and sheets |
| `line` | `#DCE4E0` | Borders and dividers |
| `ledgerGreen` | `#1F7A5A` | Primary action and positive progress |
| `mint` | `#DFF5EA` | Gentle success and assistant highlights |
| `amber` | `#B7791F` | Caution, assumptions and review prompts |
| `red` | `#B42318` | Errors and destructive actions |

Use green as the product accent, not as a full-page wash. Most screens should be quiet: paper background, ink text, white surfaces, green for the main action and amber for uncertainty.

## Shape and spacing

- Cards and inputs use `8px` radius.
- Primary buttons use `8px` radius and at least `44pt` height.
- Use generous vertical spacing between record groups so financial information is easy to scan.
- Avoid decorative gradients and oversized marketing-style cards inside the app.

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
