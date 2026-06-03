import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  term: string;
  explanation: string;
};

export function TaxTermTooltip({ term, explanation }: Props) {
  return (
    <View accessibilityRole="text">
      <Text>{term}</Text>
      <Text>{explanation}</Text>
    </View>
  );
}
