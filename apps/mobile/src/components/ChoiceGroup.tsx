import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export type ChoiceOption<Value extends string> = {
  label: string;
  value: Value;
};

type ChoiceGroupProps<Value extends string> = {
  options: Array<ChoiceOption<Value>>;
  selectedValues: Value[];
  onToggle: (value: Value) => void;
  multiple?: boolean;
};

export function ChoiceGroup<Value extends string>({
  options,
  selectedValues,
  onToggle,
  multiple = false,
}: ChoiceGroupProps<Value>) {
  return (
    <View style={styles.wrapper}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);

        return (
          <Pressable
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityState={{ checked: isSelected }}
            key={option.value}
            onPress={() => onToggle(option.value)}
            style={[styles.option, isSelected ? styles.optionSelected : null]}
          >
            <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm, marginBottom: spacing.lg },
  option: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  optionSelected: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
  },
  optionText: { color: colors.ink, fontSize: typography.body, fontWeight: '700' },
  optionTextSelected: { color: colors.ledgerGreen },
});
