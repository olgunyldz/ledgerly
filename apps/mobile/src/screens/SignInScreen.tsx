import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: SignInScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={3}
      totalSteps={9}
      titleKey="signInTitle"
      bodyKey="signInBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('TaxProfileIntro')}
      onBack={() => navigation.goBack()}
    />
  );
}
