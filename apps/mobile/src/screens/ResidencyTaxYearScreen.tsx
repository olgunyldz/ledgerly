import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type ResidencyTaxYearScreenProps = NativeStackScreenProps<RootStackParamList, 'ResidencyTaxYear'>;

export function ResidencyTaxYearScreen({ navigation }: ResidencyTaxYearScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={5}
      totalSteps={9}
      titleKey="residencyTitle"
      bodyKey="residencyBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('WorkType')}
      onBack={() => navigation.goBack()}
    />
  );
}
