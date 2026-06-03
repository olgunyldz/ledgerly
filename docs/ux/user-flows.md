# User Flows

## First-run onboarding

1. User opens app.
2. Selects app language.
3. Chooses whether to show English tax terms.
4. Creates account.
5. Completes tax profile questionnaire.
6. Lands on dashboard with setup tasks.

## Add expense manually

1. User taps `Add expense`.
2. Enters amount, date, merchant and category.
3. Selects business-use percentage if mixed-use.
4. App shows tax explanation for selected category.
5. User saves expense as confirmed.
6. Dashboard estimate updates.

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
3. User confirms export.
4. Backend generates PDF and CSV.
5. User downloads or shares pack.
