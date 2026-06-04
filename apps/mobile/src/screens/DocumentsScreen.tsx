import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import type { RootStackParamList } from '../navigation/routes';

type DocumentsScreenProps = NativeStackScreenProps<RootStackParamList, 'Documents'>;

export function DocumentsScreen({ navigation }: DocumentsScreenProps) {
  return (
    <PlaceholderScreen
      titleKey="documentsTitle"
      bodyKey="documentsPlaceholder"
      onBack={() => navigation.goBack()}
    />
  );
}
