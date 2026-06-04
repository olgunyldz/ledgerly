import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { addExpenseRecord } from '../lib/expenseRecords';
import { formatPenceAsPounds, parsePoundsToPence } from '../lib/money';
import { getTaxProfile, type ExpenseHabit } from '../lib/taxProfile';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';

type AddExpenseScreenProps = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

type ExpenseFormState = {
  amount: string;
  businessUsePercentage: string;
  category?: ExpenseHabit;
  date: string;
  merchant: string;
  taxYear: string;
  note: string;
};

export function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
  const { t } = useTranslation();
  const [form, setForm] = React.useState<ExpenseFormState>({
    amount: '',
    businessUsePercentage: '100',
    date: new Date().toISOString().slice(0, 10),
    merchant: '',
    taxYear: '2025/26',
    note: '',
  });
  const [error, setError] = React.useState<string | null>(null);
  const [isReviewing, setIsReviewing] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    async function restoreTaxYear() {
      const profile = await getTaxProfile();

      if (isMounted) {
        setForm((currentForm) => ({ ...currentForm, taxYear: profile.taxYear }));
      }
    }

    restoreTaxYear();

    return () => {
      isMounted = false;
    };
  }, []);

  const amountPence = parsePoundsToPence(form.amount);
  const businessUsePercentage = Number(form.businessUsePercentage);

  const updateForm = (updates: Partial<ExpenseFormState>) => {
    setForm((currentForm) => ({ ...currentForm, ...updates }));
    setError(null);
  };

  const validateForm = () => {
    if (amountPence === null || amountPence <= 0) {
      setError(t('expenseAmountError'));
      return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
      setError(t('expenseDateError'));
      return false;
    }

    if (!form.merchant.trim()) {
      setError(t('expenseMerchantError'));
      return false;
    }

    if (!form.category) {
      setError(t('expenseCategoryError'));
      return false;
    }

    if (!Number.isInteger(businessUsePercentage) || businessUsePercentage < 1 || businessUsePercentage > 100) {
      setError(t('expenseBusinessUseError'));
      return false;
    }

    if (!form.taxYear) {
      setError(t('expenseTaxYearError'));
      return false;
    }

    return true;
  };

  const reviewExpense = () => {
    if (validateForm()) {
      setIsReviewing(true);
    }
  };

  const saveExpense = async () => {
    if (!form.category || amountPence === null) {
      return;
    }

    await addExpenseRecord({
      amountPence,
      businessUsePercentage,
      category: form.category,
      date: form.date,
      merchant: form.merchant.trim(),
      taxYear: form.taxYear,
      note: form.note.trim() || undefined,
    });

    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('addExpenseTitle')}</Text>
      <Text style={styles.body}>{t('addExpenseBody')}</Text>

      <View style={styles.helperCard}>
        <Text style={styles.helperTitle}>{t('allowableExpenseTitle')}</Text>
        <Text style={styles.helperBody}>{t('allowableExpenseBody')}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseAmountLabel')}</Text>
        <TextInput
          accessibilityLabel={t('expenseAmountLabel')}
          inputMode="decimal"
          onChangeText={(amount) => updateForm({ amount })}
          placeholder="45.00"
          style={styles.input}
          value={form.amount}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseDateLabel')}</Text>
        <TextInput
          accessibilityLabel={t('expenseDateLabel')}
          onChangeText={(date) => updateForm({ date })}
          placeholder="2026-04-18"
          style={styles.input}
          value={form.date}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseMerchantLabel')}</Text>
        <TextInput
          accessibilityLabel={t('expenseMerchantLabel')}
          onChangeText={(merchant) => updateForm({ merchant })}
          placeholder={t('expenseMerchantPlaceholder')}
          style={styles.input}
          value={form.merchant}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseCategoryLabel')}</Text>
        <ChoiceGroup
          options={[
            { label: t('expenseHabitTravel'), value: 'travel' },
            { label: t('expenseHabitHomeOffice'), value: 'home-office' },
            { label: t('expenseHabitMaterials'), value: 'materials' },
            { label: t('expenseHabitProfessionalFees'), value: 'professional-fees' },
          ]}
          selectedValues={form.category ? [form.category] : []}
          onToggle={(category) => updateForm({ category })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseBusinessUseLabel')}</Text>
        <TextInput
          accessibilityLabel={t('expenseBusinessUseLabel')}
          inputMode="numeric"
          onChangeText={(businessUsePercentage) => updateForm({ businessUsePercentage })}
          placeholder="100"
          style={styles.input}
          value={form.businessUsePercentage}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('incomeTaxYearLabel')}</Text>
        <ChoiceGroup
          options={[
            { label: t('taxYear2025'), value: '2025/26' },
            { label: t('taxYear2024'), value: '2024/25' },
          ]}
          selectedValues={[form.taxYear]}
          onToggle={(taxYear) => updateForm({ taxYear })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('expenseNoteLabel')}</Text>
        <TextInput
          accessibilityLabel={t('expenseNoteLabel')}
          multiline
          onChangeText={(note) => updateForm({ note })}
          placeholder={t('expenseNotePlaceholder')}
          style={[styles.input, styles.textArea]}
          value={form.note}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isReviewing && form.category && amountPence !== null ? (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>{t('expenseReviewTitle')}</Text>
          <Text style={styles.reviewLine}>{t('expenseReviewAmount')}: {formatPenceAsPounds(amountPence)}</Text>
          <Text style={styles.reviewLine}>{t('expenseDateLabel')}: {form.date}</Text>
          <Text style={styles.reviewLine}>{t('expenseMerchantLabel')}: {form.merchant}</Text>
          <Text style={styles.reviewLine}>{t('expenseCategoryLabel')}: {t(`expenseHabit.${form.category}`)}</Text>
          <Text style={styles.reviewLine}>{t('expenseBusinessUseLabel')}: {businessUsePercentage}%</Text>
          <Text style={styles.reviewLine}>{t('incomeTaxYearLabel')}: {form.taxYear}</Text>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={isReviewing ? saveExpense : reviewExpense} style={styles.button}>
        <Text style={styles.buttonText}>{t(isReviewing ? 'saveExpense' : 'reviewExpense')}</Text>
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
  helperCard: {
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  helperTitle: { color: colors.ledgerGreen, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  helperBody: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  field: { marginBottom: spacing.lg },
  label: { color: colors.ink, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: typography.body,
    padding: spacing.md,
  },
  textArea: { minHeight: 88, textAlignVertical: 'top' },
  error: { color: colors.red, fontSize: typography.body, lineHeight: 22, marginBottom: spacing.md },
  reviewCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  reviewTitle: { color: colors.ink, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.sm },
  reviewLine: { color: colors.slate, fontSize: typography.body, lineHeight: 24 },
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
