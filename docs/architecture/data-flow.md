# Data Flow

## Tax estimate flow

```text
User enters income/expenses
  → mobile validates format
  → API receives typed payload
  → backend normalises amounts and dates
  → tax rules engine calculates estimate
  → audit event stores inputs + rule version + output
  → mobile displays estimate with caveats and next actions
```

## AI question flow

```text
User asks question in preferred language
  → language detection
  → intent and risk classification
  → retrieve approved UK tax sources
  → deterministic tools called when calculation is needed
  → answer generated in user's language with English tax terms
  → source references + confidence + escalation flag returned
  → audit event stored
```

## Document upload flow

```text
User uploads receipt/P60/P45/invoice
  → mobile obtains signed upload URL
  → file goes to private object storage
  → backend creates document record
  → async worker extracts text and fields
  → AI/heuristic classifier proposes category
  → user reviews and confirms
  → confirmed fields update tax records
```

## Accountant export flow

```text
User selects tax year and export type
  → backend gathers confirmed records
  → rules engine prepares summary
  → worker generates PDF/CSV pack
  → audit event stores pack version
  → user downloads or shares with accountant
```
