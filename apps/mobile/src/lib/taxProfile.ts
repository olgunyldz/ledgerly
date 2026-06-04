import AsyncStorage from '@react-native-async-storage/async-storage';

export type ResidencyStatus = 'uk-resident' | 'not-sure';
export type WorkType = 'self-employed' | 'landlord' | 'contractor' | 'employment';
export type IncomeSource = 'sales' | 'platform' | 'rent' | 'salary';
export type ExpenseHabit = 'travel' | 'home-office' | 'materials' | 'professional-fees';

export type TaxProfile = {
  taxYear: string;
  residencyStatus: ResidencyStatus;
  workType?: WorkType;
  incomeSources: IncomeSource[];
  expenseHabits: ExpenseHabit[];
  updatedAt: string;
};

export const defaultTaxProfile: TaxProfile = {
  taxYear: '2025/26',
  residencyStatus: 'uk-resident',
  incomeSources: [],
  expenseHabits: [],
  updatedAt: new Date(0).toISOString(),
};

const taxProfileKey = 'ledgerly.taxProfile';

export async function getTaxProfile(): Promise<TaxProfile> {
  const value = await AsyncStorage.getItem(taxProfileKey);

  if (!value) {
    return defaultTaxProfile;
  }

  try {
    return { ...defaultTaxProfile, ...JSON.parse(value) };
  } catch {
    return defaultTaxProfile;
  }
}

export async function updateTaxProfile(updates: Partial<Omit<TaxProfile, 'updatedAt'>>): Promise<TaxProfile> {
  const currentProfile = await getTaxProfile();
  const nextProfile: TaxProfile = {
    ...currentProfile,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(taxProfileKey, JSON.stringify(nextProfile));
  return nextProfile;
}

export function hasMinimumTaxProfile(profile: TaxProfile): boolean {
  return Boolean(profile.taxYear && profile.residencyStatus && profile.workType);
}
