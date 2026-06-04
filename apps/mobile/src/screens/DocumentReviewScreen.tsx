import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';

type DocumentReviewScreenProps = NativeStackScreenProps<RootStackParamList, 'DocumentReview'>;

export function DocumentReviewScreen({ navigation, route }: DocumentReviewScreenProps) {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('documentReviewTitle')}</Text>
      <Text style={styles.body}>{t('documentReviewBody')}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('documentExtractedFieldsTitle')}</Text>
        <Text style={styles.fieldLine}>{t('documentIdLabel')}: {route.params.documentId}</Text>
        <Text style={styles.fieldLine}>{t('expenseMerchantLabel')}: {t('documentSampleMerchant')}</Text>
        <Text style={styles.fieldLine}>{t('expenseAmountLabel')}: {t('documentSampleAmount')}</Text>
        <Text style={styles.fieldLine}>{t('expenseDateLabel')}: {t('documentSampleDate')}</Text>
        <Text style={styles.fieldLine}>{t('expenseCategoryLabel')}: {t('expenseHabitTravel')}</Text>
      </View>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>{t('documentConfirmationTitle')}</Text>
        <Text style={styles.noticeBody}>{t('documentReviewConfirmationBody')}</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>{t('confirmDocumentLater')}</Text>
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
  fieldLine: { color: colors.slate, fontSize: typography.body, lineHeight: 26 },
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
  button: {
    alignItems: 'center',
    backgroundColor: colors.ledgerGreen,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
});
