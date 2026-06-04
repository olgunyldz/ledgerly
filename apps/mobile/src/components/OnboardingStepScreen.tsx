import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, radius, spacing, typography } from '../theme/tokens';

type OnboardingStepScreenProps = {
  titleKey: string;
  bodyKey: string;
  actionKey: string;
  currentStep: number;
  totalSteps: number;
  eyebrowKey?: string;
  onContinue: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
};

export function OnboardingStepScreen({
  titleKey,
  bodyKey,
  actionKey,
  currentStep,
  totalSteps,
  eyebrowKey,
  onContinue,
  onBack,
  children,
}: OnboardingStepScreenProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.progress}>
        {t('progress', { current: currentStep, total: totalSteps })}
      </Text>
      {eyebrowKey ? <Text style={styles.eyebrow}>{t(eyebrowKey)}</Text> : null}
      <Text style={styles.title}>{t(titleKey)}</Text>
      <Text style={styles.subtitle}>{t(bodyKey)}</Text>

      {children}

      <Pressable accessibilityRole="button" onPress={onContinue} style={styles.button}>
        <Text style={styles.buttonText}>{t(actionKey)}</Text>
      </Pressable>

      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{t('back')}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: spacing.lg, justifyContent: 'center', backgroundColor: colors.paper },
  progress: {
    color: colors.ledgerGreen,
    fontSize: typography.caption,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.slate,
    fontSize: typography.caption,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: { fontSize: 34, fontWeight: '700', marginBottom: spacing.sm, color: colors.ink },
  subtitle: { fontSize: 17, color: colors.slate, marginBottom: spacing.lg, lineHeight: 24 },
  button: {
    backgroundColor: colors.ledgerGreen,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.ink, fontWeight: '700' },
});
