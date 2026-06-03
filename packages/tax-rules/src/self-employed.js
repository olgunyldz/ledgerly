export function estimateReserve({ annualProfit }) {
  if (annualProfit < 0) {
    throw new Error('annualProfit must be positive');
  }

  return {
    annualProfit,
    reservePercent: 0.25,
    estimatedTaxToSetAside: Math.round(annualProfit * 0.25 * 100) / 100,
    warning: 'Placeholder only. Replace with official tax-year rules.'
  };
}
