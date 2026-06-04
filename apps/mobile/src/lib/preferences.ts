import AsyncStorage from '@react-native-async-storage/async-storage';

export type SupportedLanguage = 'en' | 'tr';

const keys = {
  language: 'ledgerly.language',
  setupComplete: 'ledgerly.setupComplete',
} as const;

export async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  const value = await AsyncStorage.getItem(keys.language);
  return value === 'en' || value === 'tr' ? value : null;
}

export async function setStoredLanguage(language: SupportedLanguage): Promise<void> {
  await AsyncStorage.setItem(keys.language, language);
}

export async function getSetupComplete(): Promise<boolean> {
  return (await AsyncStorage.getItem(keys.setupComplete)) === 'true';
}

export async function setSetupComplete(isComplete: boolean): Promise<void> {
  await AsyncStorage.setItem(keys.setupComplete, String(isComplete));
}
