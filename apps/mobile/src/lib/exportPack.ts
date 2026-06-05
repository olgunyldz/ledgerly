import { getExpenseRecords } from './expenseRecords';
import { getIncomeRecords } from './incomeRecords';
import { formatPenceAsPounds } from './money';
import { getTaxEstimatePreview } from './taxEstimate';
import { getTaxProfile } from './taxProfile';

export type ExportPackRecord = {
  amount: string;
  date: string;
  description: string;
  taxYear: string;
  type: 'income' | 'expense';
};

export type ExportPackSummary = {
  generatedAt: string;
  taxYear: string;
  records: ExportPackRecord[];
  csvPreview: string;
  pdfSections: string[];
  history: [];
};

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function buildCsvPreview(records: ExportPackRecord[]): string {
  const header = ['type', 'date', 'description', 'amount', 'tax_year'].map(escapeCsvValue).join(',');
  const rows = records.map((record) => [
    record.type,
    record.date,
    record.description,
    record.amount,
    record.taxYear,
  ].map(escapeCsvValue).join(','));

  return [header, ...rows].join('\n');
}

export async function getExportPackSummary(): Promise<ExportPackSummary> {
  const [profile, incomeRecords, expenseRecords, estimatePreview] = await Promise.all([
    getTaxProfile(),
    getIncomeRecords(),
    getExpenseRecords(),
    getTaxEstimatePreview(),
  ]);
  const incomeRows: ExportPackRecord[] = incomeRecords.map((record) => ({
    amount: formatPenceAsPounds(record.amountPence),
    date: record.date,
    description: record.note || record.source,
    taxYear: record.taxYear,
    type: 'income',
  }));
  const expenseRows: ExportPackRecord[] = expenseRecords.map((record) => ({
    amount: formatPenceAsPounds(record.amountPence),
    date: record.date,
    description: record.note || record.merchant,
    taxYear: record.taxYear,
    type: 'expense',
  }));
  const records = [...incomeRows, ...expenseRows];

  return {
    generatedAt: new Date().toISOString(),
    taxYear: profile.taxYear,
    records,
    csvPreview: buildCsvPreview(records),
    pdfSections: [
      `Tax year: ${profile.taxYear}`,
      `Income: ${formatPenceAsPounds(estimatePreview.incomePence)}`,
      `Expenses: ${formatPenceAsPounds(estimatePreview.expensePence)}`,
      `Taxable profit preview: ${formatPenceAsPounds(estimatePreview.taxableProfitPence)}`,
      'High-risk assumptions require accountant review before export.',
    ],
    history: [],
  };
}
