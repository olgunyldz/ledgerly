import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { firstRunRouteOrder } from '../navigation/routes';

type SetupRoute = Exclude<(typeof firstRunRouteOrder)[number], 'Splash' | 'Dashboard'>;

const setupRoutes = firstRunRouteOrder.filter(
  (route): route is SetupRoute => route !== 'Splash' && route !== 'Dashboard',
);

const routeCopy = {
  Welcome: {
    eyebrow: 'welcomeEyebrow',
    title: 'welcomeTitle',
    body: 'welcomeBody',
    action: 'startSetup',
  },
  LanguageSelect: {
    title: 'languageTitle',
    body: 'languageBody',
    action: 'continue',
  },
  SignIn: {
    title: 'signInTitle',
    body: 'signInBody',
    action: 'continue',
  },
  TaxProfileIntro: {
    title: 'taxProfileTitle',
    body: 'taxProfileBody',
    action: 'continue',
  },
  ResidencyTaxYear: {
    title: 'residencyTitle',
    body: 'residencyBody',
    action: 'continue',
  },
  WorkType: {
    title: 'workTypeTitle',
    body: 'workTypeBody',
    action: 'continue',
  },
  IncomeSources: {
    title: 'incomeSourcesTitle',
    body: 'incomeSourcesBody',
    action: 'continue',
  },
  ExpenseHabits: {
    title: 'expenseHabitsTitle',
    body: 'expenseHabitsBody',
    action: 'continue',
  },
  ReviewProfile: {
    title: 'reviewProfileTitle',
    body: 'reviewProfileBody',
    action: 'finishSetup',
  },
} as const;

export function HomeScreen() {
  const { t, i18n } = useTranslation();
  const [stepIndex, setStepIndex] = React.useState(0);
  const [hasCompletedSetup, setHasCompletedSetup] = React.useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  const currentRoute = setupRoutes[stepIndex];
  const currentCopy = routeCopy[currentRoute];
  const isFirstStep = stepIndex === 0;
  const isFinalStep = stepIndex === setupRoutes.length - 1;

  const continueSetup = () => {
    if (isFinalStep) {
      setHasCompletedSetup(true);
      return;
    }

    setStepIndex((currentStep) => currentStep + 1);
  };

  const goBack = () => {
    setStepIndex((currentStep) => Math.max(currentStep - 1, 0));
  };

  if (hasCompletedSetup) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
        <Text style={styles.title}>{t('dashboardTitle')}</Text>
        <Text style={styles.subtitle}>{t('dashboardSubtitle')}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('estimate')}</Text>
          <Text style={styles.amount}>£0.00</Text>
          <Text style={styles.muted}>{t('estimateEmpty')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('setupTasks')}</Text>
          <Text style={styles.task}>1. {t('taskProfile')}</Text>
          <Text style={styles.task}>2. {t('taskIncome')}</Text>
          <Text style={styles.task}>3. {t('taskExpense')}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>{t('ask')}</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{t('upload')}</Text>
        </Pressable>

        <Text style={styles.disclaimer}>{t('disclaimer')}</Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.progress}>
        {t('progress', { current: stepIndex + 1, total: setupRoutes.length })}
      </Text>
      {'eyebrow' in currentCopy ? <Text style={styles.eyebrow}>{t(currentCopy.eyebrow)}</Text> : null}
      <Text style={styles.title}>{t(currentCopy.title)}</Text>
      <Text style={styles.subtitle}>{t(currentCopy.body)}</Text>

      {currentRoute === 'LanguageSelect' ? (
        <View style={styles.languageCard}>
          <Pressable accessibilityRole="button" onPress={() => i18n.changeLanguage('en')} style={styles.languageChoice}>
            <Text style={styles.languageChoiceText}>English</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => i18n.changeLanguage('tr')} style={styles.languageChoice}>
            <Text style={styles.languageChoiceText}>Türkçe</Text>
          </Pressable>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={continueSetup} style={styles.button}>
        <Text style={styles.buttonText}>{t(currentCopy.action)}</Text>
      </Pressable>

      {!isFirstStep ? (
        <Pressable accessibilityRole="button" onPress={goBack} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{t('back')}</Text>
        </Pressable>
      ) : null}

      <Pressable onPress={toggleLanguage} style={styles.languageButton}>
        <Text style={styles.languageToggle}>EN / TR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  scrollContent: { padding: spacing.lg, paddingTop: spacing.xl },
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderColor: colors.line,
    borderWidth: 1,
    padding: 20,
    marginBottom: 18,
  },
  cardTitle: { fontSize: typography.body, color: colors.slate },
  sectionTitle: {
    color: colors.ink,
    fontSize: typography.heading,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  amount: { fontSize: 36, fontWeight: '700', marginVertical: spacing.sm, color: colors.ink },
  muted: { color: colors.slate, lineHeight: 20 },
  task: { color: colors.ink, fontSize: typography.body, lineHeight: 28 },
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
  languageButton: { marginTop: spacing.lg, alignItems: 'center' },
  languageToggle: { color: colors.slate, fontWeight: '700' },
  disclaimer: { color: colors.slate, lineHeight: 20, marginTop: spacing.lg }
});
