import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import { getExpenseRecords, type ExpenseRecord } from '../lib/expenseRecords';
import { getIncomeRecords, type IncomeRecord } from '../lib/incomeRecords';
import { formatPenceAsPounds } from '../lib/money';
import { colors, radius, spacing, typography } from '../theme/tokens';

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

export function TransactionsScreen({ navigation }: TransactionsScreenProps) {
  const { t } = useTranslation();
  const [expenseRecords, setExpenseRecords] = React.useState<ExpenseRecord[]>([]);
  const [incomeRecords, setIncomeRecords] = React.useState<IncomeRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      Promise.all([getIncomeRecords(), getExpenseRecords()])
        .then(([nextIncomeRecords, nextExpenseRecords]) => {
          setIncomeRecords(nextIncomeRecords);
          setExpenseRecords(nextExpenseRecords);
        })
        .finally(() => setIsLoading(false));
    });

    return unsubscribe;
  }, [navigation]);

  const totalExpensePence = expenseRecords.reduce((total, record) => total + record.amountPence, 0);
  const totalIncomePence = incomeRecords.reduce((total, record) => total + record.amountPence, 0);

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('transactionsTitle')}</Text>
      <Text style={styles.body}>{t('transactionsBody')}</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>{t('incomeRecordsTitle')}</Text>
        <Text style={styles.summaryText}>
          {t('incomeRecordsSummary', {
            count: incomeRecords.length,
            total: formatPenceAsPounds(totalIncomePence),
          })}
        </Text>
      </View>

      {isLoading ? <Text style={styles.muted}>{t('restoringPreferences')}</Text> : null}

      {!isLoading && incomeRecords.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>{t('incomeRecordsEmptyTitle')}</Text>
          <Text style={styles.muted}>{t('incomeRecordsEmptyBody')}</Text>
        </View>
      ) : null}

      {incomeRecords.map((record) => (
        <View key={record.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordAmount}>{formatPenceAsPounds(record.amountPence)}</Text>
            <Text style={styles.recordDate}>{record.date}</Text>
          </View>
          <Text style={styles.recordMeta}>{t(`incomeSource.${record.source}`)}</Text>
          <Text style={styles.recordMeta}>{t('profileTaxYear')}: {record.taxYear}</Text>
          {record.note ? <Text style={styles.note}>{record.note}</Text> : null}
        </View>
      ))}

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('AddIncome')} style={styles.button}>
        <Text style={styles.buttonText}>{t('addIncome')}</Text>
      </Pressable>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>{t('expenseRecordsTitle')}</Text>
        <Text style={styles.summaryText}>
          {t('expenseRecordsSummary', {
            count: expenseRecords.length,
            total: formatPenceAsPounds(totalExpensePence),
          })}
        </Text>
      </View>

      {!isLoading && expenseRecords.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>{t('expenseRecordsEmptyTitle')}</Text>
          <Text style={styles.muted}>{t('expenseRecordsEmptyBody')}</Text>
        </View>
      ) : null}

      {expenseRecords.map((record) => (
        <View key={record.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordAmount}>{formatPenceAsPounds(record.amountPence)}</Text>
            <Text style={styles.recordDate}>{record.date}</Text>
          </View>
          <Text style={styles.recordMeta}>{record.merchant}</Text>
          <Text style={styles.recordMeta}>{t(`expenseHabit.${record.category}`)}</Text>
          <Text style={styles.recordMeta}>{t('expenseBusinessUseLabel')}: {record.businessUsePercentage}%</Text>
          <Text style={styles.recordMeta}>{t('profileTaxYear')}: {record.taxYear}</Text>
          {record.note ? <Text style={styles.note}>{record.note}</Text> : null}
        </View>
      ))}

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('AddExpense')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{t('addExpense')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  title: { color: colors.ink, fontSize: 34, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.slate, fontSize: typography.body, lineHeight: 24, marginBottom: spacing.lg },
  summaryCard: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  sectionTitle: { color: colors.ink, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.sm },
  summaryText: { color: colors.ledgerGreen, fontSize: typography.body, fontWeight: '700' },
  emptyCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  emptyTitle: { color: colors.ink, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  muted: { color: colors.slate, fontSize: typography.body, lineHeight: 22 },
  recordCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  recordHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  recordAmount: { color: colors.ink, fontSize: typography.heading, fontWeight: '700' },
  recordDate: { color: colors.slate, fontSize: typography.caption },
  recordMeta: { color: colors.slate, fontSize: typography.body, lineHeight: 24 },
  note: { color: colors.ink, fontSize: typography.body, lineHeight: 22, marginTop: spacing.sm },
  button: {
    alignItems: 'center',
    backgroundColor: colors.ledgerGreen,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  secondaryButtonText: { color: colors.ink, fontWeight: '700' },
});
