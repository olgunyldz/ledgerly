import { INCOME_TAX_RULES } from './income-tax/constants.js';
import { withRuleMetadata } from './shared/types.js';

function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

function getRules(taxYear) {
  const rules = INCOME_TAX_RULES[taxYear];

  if (!rules) {
    throw new Error(`Unsupported tax year: ${taxYear}`);
  }

  return rules;
}

export function calculateIncomeTax({ annualProfit, taxYear = '2025-26' }) {
  const rules = getRules(taxYear);
  const taxableAfterAllowance = Math.max(0, annualProfit - rules.personalAllowance);
  const basicBandTaxable = Math.min(taxableAfterAllowance, rules.basicRateLimit);
  const higherBandTaxable = Math.min(
    Math.max(0, taxableAfterAllowance - rules.basicRateLimit),
    rules.higherRateLimit - rules.basicRateLimit,
  );
  const additionalBandTaxable = Math.max(
    0,
    taxableAfterAllowance - rules.higherRateLimit,
  );

  return roundCurrency(
    basicBandTaxable * rules.incomeTaxBands[0].rate
      + higherBandTaxable * rules.incomeTaxBands[1].rate
      + additionalBandTaxable * rules.incomeTaxBands[2].rate,
  );
}

export function calculateClass4NationalInsurance({ annualProfit, taxYear = '2025-26' }) {
  const rules = getRules(taxYear).class4NationalInsurance;
  const mainBandProfit = Math.min(
    Math.max(0, annualProfit - rules.lowerProfitsLimit),
    rules.upperProfitsLimit - rules.lowerProfitsLimit,
  );
  const additionalBandProfit = Math.max(0, annualProfit - rules.upperProfitsLimit);

  return roundCurrency(
    mainBandProfit * rules.mainRate
      + additionalBandProfit * rules.additionalRate,
  );
}

export function estimateReserve({ annualProfit, taxYear = '2025-26' }) {
  if (!Number.isFinite(annualProfit) || annualProfit < 0) {
    throw new Error('annualProfit must be a positive number');
  }

  const rules = getRules(taxYear);
  const estimatedIncomeTax = calculateIncomeTax({ annualProfit, taxYear });
  const estimatedClass4NationalInsurance = calculateClass4NationalInsurance({ annualProfit, taxYear });
  const estimatedTaxToSetAside = roundCurrency(estimatedIncomeTax + estimatedClass4NationalInsurance);

  return withRuleMetadata(
    {
      annualProfit,
      reservePercent: annualProfit === 0 ? 0 : roundCurrency(estimatedTaxToSetAside / annualProfit),
      estimatedTaxToSetAside,
      breakdown: {
        estimatedIncomeTax,
        estimatedClass4NationalInsurance,
      },
      inputs_snapshot: {
        annualProfit,
        taxYear,
      },
      sources: rules.sources,
    },
    {
      taxYear,
      ruleVersion: rules.ruleVersion,
      assumptions: [
        'Calculation treats annual profit as UK self-employment profit before Income Tax and Class 4 National Insurance.',
        'Calculation assumes England, Wales or Northern Ireland Income Tax bands and does not apply Scottish Income Tax.',
      ],
      warnings: [
        'Draft rule package for planning support only; accountant review is required before production use.',
        'Personal Allowance tapering, student loans, payments on account and other reliefs are not yet implemented.',
      ],
    },
  );
}
