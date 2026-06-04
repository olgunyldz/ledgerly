import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function HomeScreen() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.subtitle}>{t('subtitle')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('estimate')}</Text>
        <Text style={styles.amount}>£0.00</Text>
        <Text style={styles.muted}>{t('disclaimer')}</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{t('ask')}</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{t('upload')}</Text>
      </Pressable>

      <Pressable onPress={toggleLanguage} style={styles.languageButton}>
        <Text>EN / TR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: spacing.lg, justifyContent: 'center', backgroundColor: colors.paper },
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
  amount: { fontSize: 36, fontWeight: '700', marginVertical: spacing.sm, color: colors.ink },
  muted: { color: colors.slate, lineHeight: 20 },
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
  languageButton: { marginTop: spacing.lg, alignItems: 'center' }
});
