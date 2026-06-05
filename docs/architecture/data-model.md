# Data Model

This is the target domain model. Implement progressively.

## Core entities

### User

- `id`
- `email`
- `preferred_language`
- `secondary_language`
- `show_english_tax_terms`
- `created_at`
- `updated_at`

### TaxProfile

- `id`
- `user_id`
- `tax_year`
- `profile_types`: self-employed, landlord, employment, director, contractor
- `utr_status`: unknown, has_utr, needs_registration
- `vat_status`
- `student_loan_plan`
- `child_benefit_context`
- `created_at`
- `updated_at`

### IncomeSource

- `id`
- `user_id`
- `tax_year`
- `type`: employment, self_employment, property, dividends, interest, other
- `name`
- `gross_amount`
- `tax_deducted`
- `currency`
- `source_document_id`

### Expense

- `id`
- `user_id`
- `tax_year`
- `category`
- `amount`
- `business_percentage`
- `date`
- `merchant`
- `description`
- `status`: draft, ai_suggested, user_confirmed, excluded
- `source_document_id`

### Document

- `id`
- `user_id`
- `type`: receipt, invoice, bank_statement, p60, p45, payslip, other
- `storage_key`
- `mime_type`
- `extraction_status`
- `extracted_fields_json`
- `created_at`

### TaxEstimate

- `id`
- `user_id`
- `tax_year`
- `inputs_snapshot_json`
- `outputs_json`
- `rule_version`
- `created_at`

### AssistantMessage

- `id`
- `conversation_id`
- `role`
- `detected_language`
- `response_language`
- `content`
- `source_references_json`
- `risk_level`
- `created_at`

### AuditEvent

- `id`
- `user_id`
- `event_type`
- `entity_type`
- `entity_id`
- `input_hash`
- `rule_version`
- `metadata_json`
- `created_at`
- `retention_until`

## Repository boundaries

- Tax profiles: `apps/api/app/repositories/tax_profiles.py`
- Income and expense records: `apps/api/app/repositories/records.py`
- Audit events: `apps/api/app/repositories/audit_events.py`

These are in-memory private-beta scaffolds. Production persistence should replace them with database-backed repositories while keeping ownership checks at the repository boundary.

## Data design rules

- Store money in minor units where practical, or use decimal types with explicit currency.
- Store tax-year-specific data separately.
- Keep AI suggestions distinct from user-confirmed records.
- Avoid overwriting tax-impacting data; prefer append-only revisions for confirmed records.
- Store audit hashes alongside minimal metadata; avoid storing raw documents, prompts or full personal records in audit metadata.
