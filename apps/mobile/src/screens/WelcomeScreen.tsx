import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <OnboardingStepScreen
      currentStep={1}
      totalSteps={9}
      eyebrowKey="welcomeEyebrow"
      titleKey="welcomeTitle"
      bodyKey="welcomeBody"
      actionKey="startSetup"
      onContinue={() => navigation.navigate('LanguageSelect')}
    />
  );
}
