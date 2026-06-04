/**
 * Shared calculation response shape.
 * Keep calculation output serialisable and audit-friendly.
 */
export function withRuleMetadata(result, { taxYear, ruleVersion, assumptions = [], warnings = [] }) {
  return {
    ...result,
    tax_year: taxYear,
    rule_version: ruleVersion,
    inputs_snapshot: result.inputs_snapshot ?? {},
    assumptions,
    warnings,
  };
}
