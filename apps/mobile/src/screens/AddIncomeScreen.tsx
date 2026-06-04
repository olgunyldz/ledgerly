import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import type { RootStackParamList } from '../navigation/routes';

type AddIncomeScreenProps = NativeStackScreenProps<RootStackParamList, 'AddIncome'>;

export function AddIncomeScreen({ navigation }: AddIncomeScreenProps) {
  return (
    <PlaceholderScreen
      titleKey="addIncomeTitle"
      bodyKey="addIncomePlaceholder"
      onBack={() => navigation.goBack()}
    />
  );
}
