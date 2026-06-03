import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

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
  wrapper: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 17, color: '#4b5563', marginBottom: 24 },
  card: { backgroundColor: 'white', borderRadius: 18, padding: 20, marginBottom: 18 },
  cardTitle: { fontSize: 16, color: '#6b7280' },
  amount: { fontSize: 36, fontWeight: '700', marginVertical: 8 },
  muted: { color: '#6b7280', lineHeight: 20 },
  button: { backgroundColor: '#111827', padding: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontWeight: '700' },
  secondaryButton: { backgroundColor: 'white', padding: 16, borderRadius: 14, alignItems: 'center' },
  secondaryButtonText: { color: '#111827', fontWeight: '700' },
  languageButton: { marginTop: 24, alignItems: 'center' }
});
