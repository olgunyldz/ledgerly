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
4. App shows tax explanation for selected category.
5. User reviews a human-readable summary.
6. User saves expense as confirmed.
7. Dashboard estimate updates and records the rule version used.

## Add income manually

1. User taps `Add income`.
2. Enters amount, date, payer or source and tax year.
3. Selects whether the income is self-employment, landlord, employment or other.
4. App shows how the selected income type affects estimates.
5. User reviews a human-readable summary.
6. User saves income as confirmed.
7. Dashboard totals and tax estimate update.

## Ask tax question

1. User asks in their preferred language.
2. Assistant identifies intent and risk.
3. Assistant retrieves approved tax sources.
4. If calculation is needed, backend calls tax rules engine.
5. Assistant answers with English tax terms and sources.
6. High-risk answers show accountant review prompt.

## Upload receipt

1. User taps upload.
2. App captures image or file.
3. Backend stores file and starts extraction.
4. User sees pending status.
5. Extracted fields appear in review screen.
6. User confirms or edits.
7. Confirmed expense is created.

## Generate accountant pack

1. User chooses tax year.
2. App displays completeness checklist.
3. App highlights missing records, unreviewed documents and high-risk assumptions.
4. User confirms export.
5. Backend generates PDF and CSV.
6. User downloads or shares pack.

## Return user dashboard loop

1. User opens app with an existing profile.
2. App restores session and lands on `Dashboard`.
3. Dashboard shows estimate status, missing records, document review tasks and deadlines.
4. User chooses the next action: add record, review document, ask assistant or export pack.
5. Completed actions return to `Dashboard` with updated totals and tasks.
