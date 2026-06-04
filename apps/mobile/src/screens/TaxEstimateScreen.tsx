import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import {
  buildEstimateApiPayload,
  formatEstimateSourceSummary,
  getTaxEstimatePreview,
  type TaxEstimatePreview,
} from '../lib/taxEstimate';
import { formatPenceAsPounds } from '../lib/money';
import { colors, radius, spacing, typography } from '../theme/tokens';

type TaxEstimateScreenProps = NativeStackScreenProps<RootStackParamList, 'TaxEstimate'>;

export function TaxEstimateScreen({ navigation }: TaxEstimateScreenProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = React.useState<TaxEstimatePreview | null>(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTaxEstimatePreview().then(setPreview);
    });

    return unsubscribe;
  }, [navigation]);

  const apiPayload = preview ? buildEstimateApiPayload(preview) : null;

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('taxEstimateTitle')}</Text>
      <Text style={styles.body}>{t('taxEstimateBody')}</Text>

      {preview ? (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('taxEstimateTaxableProfit')}</Text>
            <Text style={styles.amount}>{formatPenceAsPounds(preview.taxableProfitPence)}</Text>
            <Text style={styles.muted}>{formatEstimateSourceSummary(preview)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t('taxEstimateBreakdownTitle')}</Text>
            <Text style={styles.line}>{t('profileTaxYear')}: {preview.taxYear}</Text>
            <Text style={styles.line}>{t('incomeCardTitle')}: {formatPenceAsPounds(preview.incomePence)}</Text>
            <Text style={styles.line}>{t('expenseCardTitle')}: {formatPenceAsPounds(preview.expensePence)}</Text>
          </View>

          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>{t('taxEstimateCautionTitle')}</Text>
            <Text style={styles.noticeBody}>
              {preview.hasEnoughRecords ? t('taxEstimateCautionBody') : t('taxEstimateEmptyRecordsBody')}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t('taxEstimateApiPayloadTitle')}</Text>
            <Text style={styles.codeLine}>{JSON.stringify(apiPayload, null, 2)}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.muted}>{t('restoringPreferences')}</Text>
      )}

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Transactions')} style={styles.button}>
        <Text style={styles.buttonText}>{t('reviewTransactions')}</Text>
      </Pressable>

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('AccountantPack')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{t('prepareAccountantPack')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  title: { color: colors.ink, fontSize: 34, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.slate, fontSize: typography.body, lineHeight: 24, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  cardTitle: { color: colors.slate, fontSize: typography.body },
  amount: { color: colors.ink, fontSize: 36, fontWeight: '700', marginVertical: spacing.sm },
  sectionTitle: { color: colors.ink, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.sm },
  line: { color: colors.slate, fontSize: typography.body, lineHeight: 26 },
  muted: { color: colors.slate, fontSize: typography.body, lineHeight: 22 },
  noticeCard: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  noticeTitle: { color: colors.ledgerGreen, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  noticeBody: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  codeLine: { color: colors.ink, fontSize: typography.caption, lineHeight: 20 },
  button: {
    alignItems: 'center',
    backgroundColor: colors.ledgerGreen,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  secondaryButtonText: { color: colors.ink, fontWeight: '700' },
});
