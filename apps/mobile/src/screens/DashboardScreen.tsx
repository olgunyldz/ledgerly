import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { getTaxProfile, hasMinimumTaxProfile } from '../lib/taxProfile';

type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { t } = useTranslation();
  const [isProfileReady, setIsProfileReady] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTaxProfile().then((profile) => setIsProfileReady(hasMinimumTaxProfile(profile)));
    });

    return unsubscribe;
  }, [navigation]);

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
