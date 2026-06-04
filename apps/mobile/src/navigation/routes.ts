export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  LanguageSelect: undefined;
  SignIn: undefined;
  TaxProfileIntro: undefined;
  ResidencyTaxYear: undefined;
  WorkType: undefined;
  IncomeSources: undefined;
  ExpenseHabits: undefined;
  ReviewProfile: undefined;
  Dashboard: undefined;
  Assistant: undefined;
  Transactions: undefined;
  AddIncome: undefined;
  AddExpense: undefined;
  Documents: undefined;
  DocumentReview: { documentId: string };
  TaxEstimate: undefined;
  AccountantPack: undefined;
  Deadlines: undefined;
  Settings: undefined;
};

export const firstRunRouteOrder = [
  'Splash',
  'Welcome',
  'LanguageSelect',
  'SignIn',
  'TaxProfileIntro',
  'ResidencyTaxYear',
  'WorkType',
  'IncomeSources',
  'ExpenseHabits',
  'ReviewProfile',
  'Dashboard',
] as const satisfies ReadonlyArray<keyof RootStackParamList>;

export const primaryAppRoutes = [
  'Dashboard',
  'Assistant',
  'Transactions',
  'AddIncome',
  'AddExpense',
  'Documents',
  'DocumentReview',
  'TaxEstimate',
  'AccountantPack',
  'Deadlines',
  'Settings',
] as const satisfies ReadonlyArray<keyof RootStackParamList>;
