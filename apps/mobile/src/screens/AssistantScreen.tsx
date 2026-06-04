import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import type { RootStackParamList } from '../navigation/routes';

type AssistantScreenProps = NativeStackScreenProps<RootStackParamList, 'Assistant'>;

export function AssistantScreen({ navigation }: AssistantScreenProps) {
  return (
    <PlaceholderScreen
      titleKey="assistantTitle"
      bodyKey="assistantPlaceholder"
      onBack={() => navigation.goBack()}
    />
  );
}
