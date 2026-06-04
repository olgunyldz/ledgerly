# RAG Strategy

## Source hierarchy

1. GOV.UK and HMRC guidance
2. HMRC manuals where appropriate
3. Legislation references where needed
4. Internally reviewed tax notes
5. Accountant-reviewed FAQs

## Ingestion rules

- Store source URL, title, retrieval date and tax-year applicability.
- Chunk by section heading.
- Preserve official terminology.
- Mark deprecated or archived content.
- Re-index after tax-year updates.

## Retrieval rules

- Prefer tax-year-specific sources.
- Retrieve multiple source types for high-risk answers.
- Do not answer from low-confidence retrieval alone.
- If sources conflict, surface uncertainty and escalate.

## Answer grounding

Every tax-rule answer should include:

- concise answer
- assumptions
- source chips or references
- next action

## Starter source contract

Assistant responses use source objects with:

- `title`
- `source_type`
- `url`
- `tax_year`
- `retrieved_at`

Allowed `source_type` values are `govuk`, `hmrc`, `internal_policy` and `accountant_reviewed`.
