# Screen Map

## MVP route order

Ledgerly's MVP should move users through one calm setup path before exposing the full app:

1. `Splash`
2. `Welcome`
3. `LanguageSelect`
4. `SignIn`
5. `TaxProfileIntro`
6. `ResidencyTaxYear`
7. `WorkType`
8. `IncomeSources`
9. `ExpenseHabits`
10. `ReviewProfile`
11. `Dashboard`

After setup, the primary app loop is `Dashboard` -> `Transactions` / `Documents` / `Assistant` -> `TaxEstimate` -> `AccountantPack`.

## Navigation groups

### Public / pre-auth

| Screen | Purpose | Key components |
|---|---|---|
| Splash | App loading, auth restore | logo, loading state |
| Welcome | Explain value proposition | language-aware intro, CTA |
| Language Select | Choose app/explanation language | language list, English tax terms toggle |
| Sign In | Account access | email/social auth, privacy notice |

### Onboarding

| Screen | Purpose | Key components |
|---|---|---|
| Tax Profile Intro | Explain questions | progress indicator, trust copy |
| Residency & Tax Year | Establish scope | UK residency, selected tax year |
| Work Type | Segment user | self-employed, landlord, employment, contractor |
| Income Sources | Capture initial income types | chips, add custom source |
| Expense Habits | Set expected categories | category checklist |
| Review Profile | Confirm profile | summary cards, edit links |

### Main app

| Screen | Purpose | Key components |
|---|---|---|
| Dashboard | Tax health overview | estimate card, tasks, deadlines |
| Assistant | Multi-language tax chat | chat, source chips, suggested questions |
| Transactions | Income/expense list | filters, totals, add button |
| Add Income | Capture income | amount, source, tax year, document link |
| Add Expense | Capture expense | amount, category, business percentage |
| Documents | Uploaded documents | status list, upload CTA |
| Document Review | Confirm extracted data | field review, confidence badges |
| Tax Estimate | Explain estimate | breakdown, assumptions, caveats |
| Accountant Pack | Export summary | tax year selector, PDF/CSV actions |
| Deadlines | Show upcoming obligations | deadline list, reminders |
| Settings | Account and preferences | language, privacy, export/delete data |

### Future HMRC integration

| Screen | Purpose | Key components |
|---|---|---|
| HMRC Connect | OAuth consent | explanation, scopes, risk copy |
| Submission Review | Final review before HMRC | locked summary, declaration checkbox |
| Submission Result | Confirmation/failure | receipt, next steps |

## Screen design rules

- Every screen must have an empty state, loading state and error state.
- Every tax-impacting confirmation must show a human-readable summary.
- Avoid dense HMRC-style copy on mobile; use progressive disclosure.
- Keep official English tax terms visible where user may need them later.
- Every MVP route must map to a `RootStackParamList` entry before implementation starts.
