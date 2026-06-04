import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, radius, spacing, typography } from '../theme/tokens';

type PlaceholderScreenProps = {
  titleKey: string;
  bodyKey: string;
  onBack: () => void;
};

export function PlaceholderScreen({ titleKey, bodyKey, onBack }: PlaceholderScreenProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t(titleKey)}</Text>
      <Text style={styles.body}>{t(bodyKey)}</Text>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.button}>
        <Text style={styles.buttonText}>{t('back')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: spacing.lg, justifyContent: 'center', backgroundColor: colors.paper },
  title: { color: colors.ink, fontSize: typography.title, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.slate, fontSize: typography.body, lineHeight: 24, marginBottom: spacing.lg },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: colors.ink, fontWeight: '700' },
});
