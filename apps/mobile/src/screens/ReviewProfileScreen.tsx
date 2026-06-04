import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';

type ReviewProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewProfile'> & {
  onCompleteSetup: () => Promise<void>;
};

export function ReviewProfileScreen({ navigation, onCompleteSetup }: ReviewProfileScreenProps) {
  const completeSetup = async () => {
    await onCompleteSetup();
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  return (
    <OnboardingStepScreen
      currentStep={9}
      totalSteps={9}
      titleKey="reviewProfileTitle"
      bodyKey="reviewProfileBody"
      actionKey="finishSetup"
      onContinue={completeSetup}
      onBack={() => navigation.goBack()}
    />
  );
}
