# User Flows

## MVP flow phases

Ledgerly's first build should prioritise a complete, narrow loop over broad feature depth:

1. **Set up trust:** `Splash` -> `Welcome` -> `LanguageSelect` -> `SignIn`.
2. **Create tax context:** `TaxProfileIntro` -> `ResidencyTaxYear` -> `WorkType` -> `IncomeSources` -> `ExpenseHabits` -> `ReviewProfile`.
3. **Record activity:** `Dashboard` -> `Transactions` -> `AddIncome` / `AddExpense` and `Dashboard` -> `Documents` -> `DocumentReview`.
4. **Understand and share:** `Dashboard` -> `TaxEstimate` -> `AccountantPack`, with `Assistant` available for source-grounded explanations.

## First-run onboarding

1. User opens app.
2. App restores session and shows `Welcome` if no profile exists.
3. User selects app language and whether official English tax terms should stay visible.
4. User creates or signs into an account.
5. User confirms UK scope, tax year, work type, income sources and expected expense categories; selections save locally as draft profile data.
6. User reviews the stored profile summary and confirms.
7. User lands on `Dashboard` with setup tasks and a cautious empty estimate.

## Add expense manually

1. User taps `Add expense`.
2. Enters amount, date, merchant and category.
3. Selects business-use percentage if mixed-use.
4. App shows an official-term helper for allowable expenses.
5. User reviews a human-readable summary.
6. User saves expense as confirmed.
7. Dashboard expense card updates with record count and total.
8. User can open `Transactions` to review saved expense records, totals, business-use percentages and notes.
9. Tax estimate remains cautious until deterministic estimate logic is connected.

## Add income manually

1. User taps `Add income`.
2. Enters amount, date, source, tax year and an optional note.
3. App validates amount, date, source and tax year.
4. User reviews a human-readable summary.
5. User saves income as confirmed.
6. Dashboard income card updates with record count and total.
7. User can open `Transactions` to review saved income records, totals and notes.
8. Tax estimate remains cautious until deterministic estimate logic is connected.

## Ask tax question

1. User opens `Assistant`.
2. App shows suggested starter questions and a source-grounded answer preview.
3. App shows source chips and preserves official English tax terms.
4. App explains that high-risk topics require accountant review.
5. Future backend flow identifies intent and risk, retrieves approved tax sources and calls deterministic tools for calculations.
6. High-risk answers show accountant review prompt.

## Upload receipt

1. User taps upload.
2. App opens a receipt upload placeholder until file capture is connected.
3. User sees a clear confirmation rule: Ledgerly will not create records from documents without explicit confirmation.
4. Extracted placeholder fields appear in `DocumentReview`.
5. User returns to `Documents`; no income or expense record is created from the placeholder.
6. Future file capture will require user confirmation before confirmed expense creation.

## Generate accountant pack

1. User chooses tax year.
2. App displays completeness checklist.
3. App highlights missing records, unreviewed documents and high-risk assumptions.
4. App shows export data model, CSV summary preview and PDF summary preview.
5. App shows export history placeholder.
6. App explains that file generation remains disabled until explicit confirmation and export services are connected.
7. Future backend flow requires user confirmation before generating PDF and CSV.

## Preview tax estimate

1. User taps the dashboard tax estimate card.
2. App reads local income and expense totals.
3. App shows taxable profit preview and record breakdown.
4. App shows cautious estimate copy and notes that accountant review is still required.
5. App previews the deterministic estimate API payload before live estimate display is connected.

## Return user dashboard loop

1. User opens app with an existing profile.
2. App restores session and lands on `Dashboard`.
3. Dashboard shows estimate status, missing records, document review tasks and deadlines.
4. User chooses the next action: add record, review document, ask assistant or export pack.
5. Completed actions return to `Dashboard` with updated totals and tasks.
