import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../theme/tokens';

export function RestoringPreferencesScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.body}>{t('restoringPreferences')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', padding: spacing.lg, backgroundColor: colors.paper },
  title: { color: colors.ink, fontSize: typography.title, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.slate, fontSize: typography.body, lineHeight: 24 },
});
