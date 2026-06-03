/**
 * Shared calculation response shape.
 * Keep calculation output serialisable and audit-friendly.
 */
export function withRuleMetadata(result, { taxYear, ruleVersion, assumptions = [], warnings = [] }) {
  return {
    taxYear,
    ruleVersion,
    assumptions,
    warnings,
    ...result,
  };
}
