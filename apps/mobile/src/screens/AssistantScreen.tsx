import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';
import { colors, radius, spacing, typography } from '../theme/tokens';

type AssistantScreenProps = NativeStackScreenProps<RootStackParamList, 'Assistant'>;

const sourceChips = ['GOV.UK', 'HMRC', 'Self Assessment'];

export function AssistantScreen({ navigation }: AssistantScreenProps) {
  const { t } = useTranslation();
  const starterQuestions = [
    t('assistantStarterAllowableExpense'),
    t('assistantStarterSetAside'),
    t('assistantStarterAccountant'),
  ];

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.title}>{t('assistantTitle')}</Text>
      <Text style={styles.body}>{t('assistantBody')}</Text>

      <View style={styles.chatCard}>
        <Text style={styles.messageLabel}>{t('assistantUserExampleLabel')}</Text>
        <Text style={styles.userBubble}>{t('assistantUserExample')}</Text>

        <Text style={styles.messageLabel}>{t('assistantLedgerlyExampleLabel')}</Text>
        <View style={styles.assistantBubble}>
          <Text style={styles.assistantText}>{t('assistantExampleAnswer')}</Text>
          <View style={styles.sourceRow}>
            {sourceChips.map((source) => (
              <Text key={source} style={styles.sourceChip}>{source}</Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>{t('assistantHighRiskTitle')}</Text>
        <Text style={styles.noticeBody}>{t('assistantHighRiskBody')}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('assistantStarterTitle')}</Text>
      {starterQuestions.map((question) => (
        <Pressable key={question} accessibilityRole="button" style={styles.questionCard}>
          <Text style={styles.questionText}>{question}</Text>
        </Pressable>
      ))}

      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>{t('back')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  title: { color: colors.ink, fontSize: 34, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.slate, fontSize: typography.body, lineHeight: 24, marginBottom: spacing.lg },
  chatCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  messageLabel: { color: colors.slate, fontSize: typography.caption, fontWeight: '700', marginBottom: spacing.xs },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.ledgerGreen,
    borderRadius: radius.md,
    color: colors.surface,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
    maxWidth: '88%',
    padding: spacing.md,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.mint,
    borderColor: colors.ledgerGreen,
    borderRadius: radius.md,
    borderWidth: 1,
    maxWidth: '92%',
    padding: spacing.md,
  },
  assistantText: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  sourceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  sourceChip: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.ledgerGreen,
    fontSize: typography.caption,
    fontWeight: '700',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  noticeCard: {
    backgroundColor: colors.surface,
    borderColor: colors.amber,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  noticeTitle: { color: colors.amber, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.sm },
  noticeBody: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  sectionTitle: { color: colors.ink, fontSize: typography.heading, fontWeight: '700', marginBottom: spacing.md },
  questionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  questionText: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
  button: {
    alignItems: 'center',
    backgroundColor: colors.ledgerGreen,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
});
