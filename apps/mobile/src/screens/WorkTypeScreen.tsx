import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type WorkTypeScreenProps = NativeStackScreenProps<RootStackParamList, 'WorkType'>;

export function WorkTypeScreen({ navigation }: WorkTypeScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={6}
      totalSteps={9}
      titleKey="workTypeTitle"
      bodyKey="workTypeBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('IncomeSources')}
      onBack={() => navigation.goBack()}
    />
  );
}
