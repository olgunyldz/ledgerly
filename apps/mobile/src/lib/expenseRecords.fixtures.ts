import type { ExpenseRecord } from './expenseRecords';

export const sampleExpenseRecords: ExpenseRecord[] = [
  {
    id: 'expense-fixture-1',
    amountPence: 4500,
    businessUsePercentage: 100,
    category: 'travel',
    date: '2026-04-18',
    merchant: 'National Rail',
    taxYear: '2025/26',
    note: 'Client meeting travel',
    createdAt: '2026-04-18T12:00:00.000Z',
  },
];
