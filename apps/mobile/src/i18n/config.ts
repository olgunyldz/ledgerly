import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Ledgerly',
      subtitle: 'Keep clean records and understand UK tax in your own language.',
      estimate: 'Tax estimate',
      expenses: 'Expenses',
      ask: 'Ask the tax assistant',
      upload: 'Upload receipt',
      disclaimer: 'Guidance only. Confirm important tax decisions with an accountant.'
    }
  },
  tr: {
    translation: {
      title: 'Ledgerly',
      subtitle: 'Kayıtlarını düzenli tut, UK vergi sistemini kendi dilinde anla.',
      estimate: 'Vergi tahmini',
      expenses: 'Giderler',
      ask: 'Vergi asistanına sor',
      upload: 'Fiş/fatura yükle',
      disclaimer: 'Sadece genel bilgilendirme. Önemli vergi kararlarını muhasebeciyle doğrula.'
    }
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
