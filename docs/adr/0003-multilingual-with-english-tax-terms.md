# ADR 0003: Multilingual answers preserve English tax terms

## Status

Accepted

## Context

Users may prefer Turkish, Arabic, Urdu, Polish and other languages, but UK tax forms, HMRC services and accountants use English terms.

## Decision

The assistant answers in the user's chosen language and includes official English tax terms on first mention, for example: `vergiden düşülebilen iş gideri (allowable expense)`.

## Consequences

- Maintain a multilingual glossary.
- UX must support mixed-language legal/tax terminology.
- QA needs language-specific fixtures.
