import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: SplashScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={1}
      totalSteps={1}
      eyebrowKey="welcomeEyebrow"
      titleKey="title"
      bodyKey="subtitle"
      actionKey="continue"
      onContinue={() => navigation.replace('Welcome')}
    />
  );
}
