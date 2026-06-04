import { getExpenseSummary } from './expenseRecords';
import { getIncomeSummary } from './incomeRecords';
import { formatPenceAsPounds } from './money';
import { getTaxProfile } from './taxProfile';

export type TaxEstimatePreview = {
  taxYear: string;
  incomePence: number;
  expensePence: number;
  taxableProfitPence: number;
  hasEnoughRecords: boolean;
};

export async function getTaxEstimatePreview(): Promise<TaxEstimatePreview> {
  const [profile, incomeSummary, expenseSummary] = await Promise.all([
    getTaxProfile(),
    getIncomeSummary(),
    getExpenseSummary(),
  ]);
  const taxableProfitPence = Math.max(0, incomeSummary.totalPence - expenseSummary.totalPence);

  return {
    taxYear: profile.taxYear.replace('/', '-'),
    incomePence: incomeSummary.totalPence,
    expensePence: expenseSummary.totalPence,
    taxableProfitPence,
    hasEnoughRecords: incomeSummary.count > 0,
  };
}

export function buildEstimateApiPayload(preview: TaxEstimatePreview) {
  return {
    tax_year: preview.taxYear,
    income: preview.incomePence / 100,
    expenses: preview.expensePence / 100,
    profile_type: 'self_employed',
  };
}

export function formatEstimateSourceSummary(preview: TaxEstimatePreview): string {
  return `${formatPenceAsPounds(preview.incomePence)} income − ${formatPenceAsPounds(preview.expensePence)} expenses`;
}
