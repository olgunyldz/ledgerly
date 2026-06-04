import type { IncomeRecord } from './incomeRecords';

export const incomeRecordFixtures: IncomeRecord[] = [
  {
    id: 'income-fixture-1',
    amountPence: 125000,
    date: '2026-04-15',
    source: 'sales',
    taxYear: '2025/26',
    note: 'Sample invoice payment',
    createdAt: '2026-04-15T12:00:00.000Z',
  },
];
