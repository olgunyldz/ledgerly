import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type TaxProfileIntroScreenProps = NativeStackScreenProps<RootStackParamList, 'TaxProfileIntro'>;

export function TaxProfileIntroScreen({ navigation }: TaxProfileIntroScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={4}
      totalSteps={9}
      titleKey="taxProfileTitle"
      bodyKey="taxProfileBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('ResidencyTaxYear')}
      onBack={() => navigation.goBack()}
    />
  );
}
