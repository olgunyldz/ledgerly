# Privacy Impact Notes

## Scope

These notes cover the current private-beta skeleton: local mobile records, deterministic tax estimate payloads, assistant guardrails and accountant pack previews.

## Personal data processed

- Language and setup preferences.
- Draft tax profile selections.
- Income and expense records.
- Document placeholders and future uploaded receipts.
- Tax estimate inputs and outputs.
- Assistant messages and risk classification metadata.
- Accountant pack preview data.

## Minimisation decisions

- Mobile stores only draft records until backend persistence exists.
- Tax estimate audit payloads include `input_hash`, `rule_version`, source metadata and input field names rather than duplicating complete raw inputs in audit metadata.
- Export previews remain local and disabled for file generation until explicit confirmation and export services exist.
- Assistant backend returns deterministic guardrail responses and approved source contracts before live RAG/LLM handling is connected.

## Open privacy work

- Add authenticated backend persistence with ownership checks.
- Add user export/delete flows.
- Add production DPIA before launch.
- Add structured log redaction tests.
- Add retention job design for expired records and assistant messages.
