import { getExpenseSummary } from './expenseRecords';
import { getIncomeSummary } from './incomeRecords';
import { getTaxEstimatePreview } from './taxEstimate';

export type ExportReadiness = {
  hasIncomeRecords: boolean;
  hasExpenseRecords: boolean;
  hasTaxEstimatePreview: boolean;
  hasUnreviewedDocuments: boolean;
  hasHighRiskAssumptions: boolean;
};

export async function getExportReadiness(): Promise<ExportReadiness> {
  const [incomeSummary, expenseSummary, estimatePreview] = await Promise.all([
    getIncomeSummary(),
    getExpenseSummary(),
    getTaxEstimatePreview(),
  ]);

  return {
    hasIncomeRecords: incomeSummary.count > 0,
    hasExpenseRecords: expenseSummary.count > 0,
    hasTaxEstimatePreview: estimatePreview.hasEnoughRecords,
    hasUnreviewedDocuments: false,
    hasHighRiskAssumptions: true,
  };
}
