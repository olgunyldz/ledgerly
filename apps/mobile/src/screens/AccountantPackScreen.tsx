import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getExportPackSummary, type ExportPackSummary } from '../lib/exportPack';
import { getExportReadiness, type ExportReadiness } from '../lib/exportReadiness';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';

type AccountantPackScreenProps = NativeStackScreenProps<RootStackParamList, 'AccountantPack'>;

type ChecklistItem = {
  isReady: boolean;
  labelKey: string;
};

export function AccountantPackScreen({ navigation }: AccountantPackScreenProps) {
  const { t } = useTranslation();
  const [packSummary, setPackSummary] = React.useState<ExportPackSummary | null>(null);
  const [readiness, setReadiness] = React.useState<ExportReadiness | null>(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getExportReadiness().then(setReadiness);
      getExportPackSummary().then(setPackSummary);
    });

    return unsubscribe;
  }, [navigation]);

  const checklist: ChecklistItem[] = readiness
    ? [
        { isReady: readiness.hasIncomeRecords, labelKey: 'exportIncomeReady' },
        { isReady: readiness.hasExpenseRecords, labelKey: 'exportExpenseReady' },
        { isReady: readiness.hasTaxEstimatePreview, labelKey: 'exportEstimateReady' },
        { isReady: !readiness.hasUnreviewedDocuments, labelKey: 'exportDocumentsReady' },
      ]
    : [];

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('accountantPackTitle')}</Text>
      <Text style={styles.body}>{t('accountantPackBody')}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('exportChecklistTitle')}</Text>
        {readiness ? checklist.map((item) => (
          <View key={item.labelKey} style={styles.checkRow}>
            <Text style={[styles.statusDot, item.isReady ? styles.ready : styles.missing]}>
              {item.isReady ? '✓' : '!'}
            </Text>
            <Text style={styles.checkText}>{t(item.labelKey)}</Text>
          </View>
        )) : <Text style={styles.muted}>{t('restoringPreferences')}</Text>}
      </View>

      <View style={styles.warningCard}>
        <Text style={styles.warningTitle}>{t('exportRiskTitle')}</Text>
        <Text style={styles.warningBody}>
          {readiness?.hasHighRiskAssumptions ? t('exportRiskBody') : t('exportRiskClearBody')}
        </Text>
      </View>

      <View style={styles.confirmCard}>
        <Text style={styles.sectionTitle}>{t('exportConfirmationTitle')}</Text>
        <Text style={styles.muted}>{t('exportConfirmationBody')}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('exportDataModelTitle')}</Text>
        <Text style={styles.line}>{t('profileTaxYear')}: {packSummary?.taxYear ?? t('profileMissing')}</Text>
        <Text style={styles.line}>{t('exportRecordCount')}: {packSummary?.records.length ?? 0}</Text>
        <Text style={styles.line}>{t('exportGeneratedAt')}: {packSummary?.generatedAt ?? t('profileMissing')}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('exportCsvPreviewTitle')}</Text>
        <Text style={styles.codeLine}>{packSummary?.csvPreview || t('exportNoRecords')}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('exportPdfPreviewTitle')}</Text>
        {packSummary?.pdfSections.map((section) => (
          <Text key={section} style={styles.line}>{section}</Text>
        )) ?? <Text style={styles.muted}>{t('restoringPreferences')}</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('exportHistoryTitle')}</Text>
        <Text style={styles.muted}>{t('exportHistoryEmpty')}</Text>
      </View>

      <Pressable accessibilityRole="button" style={styles.disabledButton}>
        <Text style={styles.disabledButtonText}>{t('exportDisabled')}</Text>
      </Pressable>

      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{t('back')}</Text>
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
  sectionTitle: { color: colors.ink, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.sm },
  checkRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  statusDot: {
    borderRadius: radius.lg,
    color: colors.surface,
    fontSize: typography.caption,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  ready: { backgroundColor: colors.ledgerGreen },
  missing: { backgroundColor: colors.amber },
  checkText: { color: colors.ink, flex: 1, fontSize: typography.body, lineHeight: 22 },
  line: { color: colors.slate, fontSize: typography.body, lineHeight: 26 },
  muted: { color: colors.slate, fontSize: typography.body, lineHeight: 22 },
  codeLine: { color: colors.ink, fontSize: typography.caption, lineHeight: 20 },
  warningCard: {
    backgroundColor: colors.surface,
    borderColor: colors.amber,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  warningTitle: { color: colors.amber, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  warningBody: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  confirmCard: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: colors.line,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  disabledButtonText: { color: colors.slate, fontWeight: '700' },
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
