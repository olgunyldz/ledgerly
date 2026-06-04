import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExpenseHabit } from './taxProfile';

export type ExpenseRecord = {
  id: string;
  amountPence: number;
  businessUsePercentage: number;
  category: ExpenseHabit;
  date: string;
  merchant: string;
  taxYear: string;
  note?: string;
  createdAt: string;
};

export type ExpenseSummary = {
  count: number;
  totalPence: number;
};

const expenseRecordsKey = 'ledgerly.expenseRecords';

export async function getExpenseRecords(): Promise<ExpenseRecord[]> {
  const value = await AsyncStorage.getItem(expenseRecordsKey);

  if (!value) {
    return [];
  }

  try {
    const records = JSON.parse(value);
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

export async function addExpenseRecord(record: Omit<ExpenseRecord, 'id' | 'createdAt'>): Promise<ExpenseRecord> {
  const records = await getExpenseRecords();
  const nextRecord: ExpenseRecord = {
    ...record,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(expenseRecordsKey, JSON.stringify([nextRecord, ...records]));
  return nextRecord;
}

export async function getExpenseSummary(): Promise<ExpenseSummary> {
  const records = await getExpenseRecords();
  return {
    count: records.length,
    totalPence: records.reduce((total, record) => total + record.amountPence, 0),
  };
}
