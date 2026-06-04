import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import type { RootStackParamList } from '../navigation/routes';
import { addIncomeRecord } from '../lib/incomeRecords';
import { formatPenceAsPounds, parsePoundsToPence } from '../lib/money';
import { getTaxProfile, type IncomeSource } from '../lib/taxProfile';
import { colors, radius, spacing, typography } from '../theme/tokens';

type AddIncomeScreenProps = NativeStackScreenProps<RootStackParamList, 'AddIncome'>;

type IncomeFormState = {
  amount: string;
  date: string;
  source?: IncomeSource;
  taxYear: string;
  note: string;
};

export function AddIncomeScreen({ navigation }: AddIncomeScreenProps) {
  const { t } = useTranslation();
  const [form, setForm] = React.useState<IncomeFormState>({
    amount: '',
    date: new Date().toISOString().slice(0, 10),
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

  const updateForm = (updates: Partial<IncomeFormState>) => {
    setForm((currentForm) => ({ ...currentForm, ...updates }));
    setError(null);
  };

  const validateForm = () => {
    if (amountPence === null || amountPence <= 0) {
      setError(t('incomeAmountError'));
      return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
      setError(t('incomeDateError'));
      return false;
    }

    if (!form.source) {
      setError(t('incomeSourceError'));
      return false;
    }

    if (!form.taxYear) {
      setError(t('incomeTaxYearError'));
      return false;
    }

    return true;
  };

  const reviewIncome = () => {
    if (validateForm()) {
      setIsReviewing(true);
    }
  };

  const saveIncome = async () => {
    if (!form.source || amountPence === null) {
      return;
    }

    await addIncomeRecord({
      amountPence,
      date: form.date,
      source: form.source,
      taxYear: form.taxYear,
      note: form.note.trim() || undefined,
    });

    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('addIncomeTitle')}</Text>
      <Text style={styles.body}>{t('addIncomeBody')}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>{t('incomeAmountLabel')}</Text>
        <TextInput
          accessibilityLabel={t('incomeAmountLabel')}
          inputMode="decimal"
          onChangeText={(amount) => updateForm({ amount })}
          placeholder="1250.00"
          style={styles.input}
          value={form.amount}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('incomeDateLabel')}</Text>
        <TextInput
          accessibilityLabel={t('incomeDateLabel')}
          onChangeText={(date) => updateForm({ date })}
          placeholder="2026-04-15"
          style={styles.input}
          value={form.date}
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
        <Text style={styles.label}>{t('incomeSourceLabel')}</Text>
        <ChoiceGroup
          options={[
            { label: t('incomeSourceSales'), value: 'sales' },
            { label: t('incomeSourcePlatform'), value: 'platform' },
            { label: t('incomeSourceRent'), value: 'rent' },
            { label: t('incomeSourceSalary'), value: 'salary' },
          ]}
          selectedValues={form.source ? [form.source] : []}
          onToggle={(source) => updateForm({ source })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('incomeNoteLabel')}</Text>
        <TextInput
          accessibilityLabel={t('incomeNoteLabel')}
          multiline
          onChangeText={(note) => updateForm({ note })}
          placeholder={t('incomeNotePlaceholder')}
          style={[styles.input, styles.textArea]}
          value={form.note}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isReviewing && form.source && amountPence !== null ? (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>{t('incomeReviewTitle')}</Text>
          <Text style={styles.reviewLine}>{t('incomeReviewAmount')}: {formatPenceAsPounds(amountPence)}</Text>
          <Text style={styles.reviewLine}>{t('incomeDateLabel')}: {form.date}</Text>
          <Text style={styles.reviewLine}>{t('incomeSourceLabel')}: {t(`incomeSource.${form.source}`)}</Text>
          <Text style={styles.reviewLine}>{t('incomeTaxYearLabel')}: {form.taxYear}</Text>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={isReviewing ? saveIncome : reviewIncome} style={styles.button}>
        <Text style={styles.buttonText}>{t(isReviewing ? 'saveIncome' : 'reviewIncome')}</Text>
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
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.ink, fontWeight: '700' },
});
