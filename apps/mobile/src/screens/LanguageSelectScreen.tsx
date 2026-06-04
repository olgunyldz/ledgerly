import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { setStoredLanguage, type SupportedLanguage } from '../lib/preferences';

type LanguageSelectScreenProps = NativeStackScreenProps<RootStackParamList, 'LanguageSelect'>;

export function LanguageSelectScreen({ navigation }: LanguageSelectScreenProps) {
  const { t, i18n } = useTranslation();

  const selectLanguage = async (language: SupportedLanguage) => {
    await setStoredLanguage(language);
    await i18n.changeLanguage(language);
  };

  return (
    <OnboardingStepScreen
      currentStep={2}
      totalSteps={9}
      titleKey="languageTitle"
      bodyKey="languageBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('SignIn')}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.languageCard}>
        <Pressable accessibilityRole="button" onPress={() => selectLanguage('en')} style={styles.languageChoice}>
          <Text style={styles.languageChoiceText}>{t('languageEnglish')}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => selectLanguage('tr')} style={styles.languageChoice}>
          <Text style={styles.languageChoiceText}>{t('languageTurkish')}</Text>
        </Pressable>
      </View>
    </OnboardingStepScreen>
  );
}

const styles = StyleSheet.create({
  languageCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.sm,
  },
  languageChoice: { padding: spacing.md },
  languageChoiceText: { color: colors.ink, fontSize: typography.body, fontWeight: '700' },
});
