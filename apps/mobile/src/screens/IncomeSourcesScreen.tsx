import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type IncomeSourcesScreenProps = NativeStackScreenProps<RootStackParamList, 'IncomeSources'>;

export function IncomeSourcesScreen({ navigation }: IncomeSourcesScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={7}
      totalSteps={9}
      titleKey="incomeSourcesTitle"
      bodyKey="incomeSourcesBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('ExpenseHabits')}
      onBack={() => navigation.goBack()}
    />
  );
}
