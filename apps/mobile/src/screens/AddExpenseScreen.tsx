import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import type { RootStackParamList } from '../navigation/routes';

type AddExpenseScreenProps = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

export function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
  return (
    <PlaceholderScreen
      titleKey="addExpenseTitle"
      bodyKey="addExpensePlaceholder"
      onBack={() => navigation.goBack()}
    />
  );
}
