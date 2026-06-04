import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type ExpenseHabitsScreenProps = NativeStackScreenProps<RootStackParamList, 'ExpenseHabits'>;

export function ExpenseHabitsScreen({ navigation }: ExpenseHabitsScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={8}
      totalSteps={9}
      titleKey="expenseHabitsTitle"
      bodyKey="expenseHabitsBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('ReviewProfile')}
      onBack={() => navigation.goBack()}
    />
  );
}
