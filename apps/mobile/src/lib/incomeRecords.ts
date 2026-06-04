import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IncomeSource } from './taxProfile';

export type IncomeRecord = {
  id: string;
  amountPence: number;
  date: string;
  source: IncomeSource;
  taxYear: string;
  note?: string;
  createdAt: string;
};

export type IncomeSummary = {
  count: number;
  totalPence: number;
};

const incomeRecordsKey = 'ledgerly.incomeRecords';

export async function getIncomeRecords(): Promise<IncomeRecord[]> {
  const value = await AsyncStorage.getItem(incomeRecordsKey);

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

export async function addIncomeRecord(record: Omit<IncomeRecord, 'id' | 'createdAt'>): Promise<IncomeRecord> {
  const records = await getIncomeRecords();
  const nextRecord: IncomeRecord = {
    ...record,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(incomeRecordsKey, JSON.stringify([nextRecord, ...records]));
  return nextRecord;
}

export async function getIncomeSummary(): Promise<IncomeSummary> {
  const records = await getIncomeRecords();
  return {
    count: records.length,
    totalPence: records.reduce((total, record) => total + record.amountPence, 0),
  };
}
