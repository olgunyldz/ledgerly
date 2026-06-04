const govUkIncomeTaxSource = {
  name: 'GOV.UK Income Tax rates and allowances',
  url: 'https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past',
  reviewedDate: '2026-06-04',
  reviewer: 'AI-assisted draft; accountant review required before production',
};

const govUkSelfEmployedNicSource = {
  name: 'GOV.UK Self-employed National Insurance rates',
  url: 'https://www.gov.uk/self-employed-national-insurance-rates',
  reviewedDate: '2026-06-04',
  reviewer: 'AI-assisted draft; accountant review required before production',
};

export const INCOME_TAX_RULES = {
  '2025-26': {
    ruleVersion: '2025-26.0',
    personalAllowance: 12570,
    basicRateLimit: 37700,
    higherRateLimit: 125140,
    incomeTaxBands: [
      { name: 'basic', rate: 0.2 },
      { name: 'higher', rate: 0.4 },
      { name: 'additional', rate: 0.45 },
    ],
    class4NationalInsurance: {
      lowerProfitsLimit: 12570,
      upperProfitsLimit: 50270,
      mainRate: 0.06,
      additionalRate: 0.02,
    },
    tradingAllowance: 1000,
    sources: [
      { ...govUkIncomeTaxSource, effectiveTaxYear: '2025-26' },
      { ...govUkSelfEmployedNicSource, effectiveTaxYear: '2025-26' },
    ],
  },
};
