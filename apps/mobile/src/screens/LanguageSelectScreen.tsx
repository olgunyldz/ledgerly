import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';
import {
  getShowEnglishTaxTerms,
  setShowEnglishTaxTerms,
  setStoredLanguage,
  type SupportedLanguage,
} from '../lib/preferences';

type LanguageSelectScreenProps = NativeStackScreenProps<RootStackParamList, 'LanguageSelect'>;

export function LanguageSelectScreen({ navigation }: LanguageSelectScreenProps) {
  const { t, i18n } = useTranslation();
  const [showEnglishTaxTerms, setShowEnglishTaxTermsState] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function restoreTaxTermPreference() {
      const storedPreference = await getShowEnglishTaxTerms();

      if (isMounted) {
        setShowEnglishTaxTermsState(storedPreference);
      }
    }

    restoreTaxTermPreference();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectLanguage = async (language: SupportedLanguage) => {
    await setStoredLanguage(language);
    await i18n.changeLanguage(language);
  };

  const selectTaxTermPreference = async (shouldShow: boolean) => {
    await setShowEnglishTaxTerms(shouldShow);
    setShowEnglishTaxTermsState(shouldShow);
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

      <View style={styles.preferenceCard}>
        <Text style={styles.preferenceTitle}>{t('englishTaxTermsTitle')}</Text>
        <Text style={styles.preferenceBody}>{t('englishTaxTermsBody')}</Text>
        <View style={styles.preferenceOptions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => selectTaxTermPreference(true)}
            style={[styles.preferenceOption, showEnglishTaxTerms ? styles.preferenceOptionSelected : null]}
          >
            <Text style={[styles.preferenceOptionText, showEnglishTaxTerms ? styles.preferenceOptionTextSelected : null]}>
              {t('englishTaxTermsShow')}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => selectTaxTermPreference(false)}
            style={[styles.preferenceOption, !showEnglishTaxTerms ? styles.preferenceOptionSelected : null]}
          >
            <Text style={[styles.preferenceOptionText, !showEnglishTaxTerms ? styles.preferenceOptionTextSelected : null]}>
              {t('englishTaxTermsHide')}
            </Text>
          </Pressable>
        </View>
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
  preferenceCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  preferenceTitle: { color: colors.ink, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  preferenceBody: { color: colors.slate, fontSize: typography.caption, lineHeight: 20, marginBottom: spacing.md },
  preferenceOptions: { flexDirection: 'row', gap: spacing.sm },
  preferenceOption: {
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  preferenceOptionSelected: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
  },
  preferenceOptionText: { color: colors.slate, fontWeight: '700' },
  preferenceOptionTextSelected: { color: colors.ledgerGreen },
});
