import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { getTaxProfile, hasMinimumTaxProfile } from '../lib/taxProfile';
import { getIncomeSummary, type IncomeSummary } from '../lib/incomeRecords';
import { formatPenceAsPounds } from '../lib/money';

type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
type DashboardRoute = 'TaxProfileIntro' | 'AddIncome';

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { t } = useTranslation();
  const [isProfileReady, setIsProfileReady] = React.useState(false);
  const [incomeSummary, setIncomeSummary] = React.useState<IncomeSummary>({ count: 0, totalPence: 0 });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTaxProfile().then((profile) => setIsProfileReady(hasMinimumTaxProfile(profile)));
      getIncomeSummary().then(setIncomeSummary);
    });

    return unsubscribe;
  }, [navigation]);

  const nextBestAction = isProfileReady
    ? {
        label: t('taskIncome'),
        route: 'AddIncome' as DashboardRoute,
        body: t('incomeCardBody'),
      }
    : {
        label: t('dashboardProfileMissing'),
        route: 'TaxProfileIntro' as DashboardRoute,
        body: t('taxProfileBody'),
      };

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
        <Text style={styles.task}>1. {isProfileReady ? t('dashboardProfileReady') : t('dashboardProfileMissing')}</Text>
        <Text style={styles.task}>2. {t('taskIncome')}</Text>
        <Text style={styles.task}>3. {t('taskExpense')}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('nextBestAction')}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate(nextBestAction.route)}
        style={styles.actionCard}
      >
        <Text style={styles.actionTitle}>{nextBestAction.label}</Text>
        <Text style={styles.actionBody}>{nextBestAction.body}</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>{t('dashboardCards')}</Text>
      <View style={styles.cardGrid}>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Transactions')} style={styles.recordCard}>
          <Text style={styles.recordTitle}>{t('incomeCardTitle')}</Text>
          <Text style={styles.recordBody}>
            {incomeSummary.count > 0
              ? t('incomeCardSummary', {
                  count: incomeSummary.count,
                  total: formatPenceAsPounds(incomeSummary.totalPence),
                })
              : t('incomeCardBody')}
          </Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('AddExpense')} style={styles.recordCard}>
          <Text style={styles.recordTitle}>{t('expenseCardTitle')}</Text>
          <Text style={styles.recordBody}>{t('expenseCardBody')}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Documents')} style={styles.recordCard}>
          <Text style={styles.recordTitle}>{t('documentsCardTitle')}</Text>
          <Text style={styles.recordBody}>{t('documentsCardBody')}</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Assistant')} style={styles.button}>
        <Text style={styles.buttonText}>{t('ask')}</Text>
      </Pressable>

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Documents')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{t('upload')}</Text>
      </Pressable>

      <Text style={styles.disclaimer}>{t('disclaimer')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  scrollContent: { padding: spacing.lg, paddingTop: spacing.xl },
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
  actionCard: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  actionTitle: { color: colors.ledgerGreen, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.sm },
  actionBody: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  cardGrid: { gap: spacing.md, marginBottom: spacing.lg },
  recordCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  recordTitle: { color: colors.ink, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.xs },
  recordBody: { color: colors.slate, fontSize: typography.caption, lineHeight: 20 },
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
  disclaimer: { color: colors.slate, lineHeight: 20, marginTop: spacing.lg },
});
