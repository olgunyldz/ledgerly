import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Ledgerly',
      subtitle: 'Keep clean records and understand UK tax in your own language.',
      welcomeEyebrow: 'UK tax records, calmly organised',
      welcomeTitle: 'Keep tax records clear from day one.',
      welcomeBody: 'Ledgerly helps you record income, expenses and documents, then explains what your accountant may need to review.',
      languageTitle: 'Choose your language',
      languageBody: 'You can use Ledgerly in your preferred language while keeping official English tax terms visible.',
      signInTitle: 'Create your secure workspace',
      signInBody: 'For now this is a setup placeholder. The real app will protect records before saving personal tax data.',
      taxProfileTitle: 'Build your tax profile',
      taxProfileBody: 'A few careful questions help Ledgerly keep estimates cautious and relevant.',
      residencyTitle: 'Confirm UK scope',
      residencyBody: 'Choose the tax year and confirm that this profile is for UK tax records.',
      workTypeTitle: 'Select your work type',
      workTypeBody: 'Start with self-employment, landlord income, contracting or employment income.',
      incomeSourcesTitle: 'Add income sources',
      incomeSourcesBody: 'Tell Ledgerly what kind of income you expect to record this year.',
      expenseHabitsTitle: 'Choose common expenses',
      expenseHabitsBody: 'Pick likely expense groups so the dashboard can prompt for missing records.',
      reviewProfileTitle: 'Review your setup',
      reviewProfileBody: 'Check the assumptions before Ledgerly creates your starting dashboard.',
      continue: 'Continue',
      startSetup: 'Start setup',
      finishSetup: 'Create dashboard',
      back: 'Back',
      progress: 'Step {{current}} of {{total}}',
      dashboardTitle: 'Today in Ledgerly',
      dashboardSubtitle: 'Your records are ready for the first tax year setup.',
      estimate: 'Tax estimate',
      estimateEmpty: 'Add income and expenses to see a cautious estimate.',
      setupTasks: 'Setup tasks',
      taskProfile: 'Review tax profile',
      taskIncome: 'Add first income record',
      taskExpense: 'Add first expense',
      quickActions: 'Quick actions',
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
      welcomeEyebrow: 'UK vergi kayıtları, sakin ve düzenli',
      welcomeTitle: 'Vergi kayıtlarını ilk günden temiz tut.',
      welcomeBody: 'Ledgerly gelir, gider ve belgelerini kaydetmene yardımcı olur; sonra muhasebecinin inceleyebileceği noktaları açıklar.',
      languageTitle: 'Dilini seç',
      languageBody: 'Ledgerly uygulamasını tercih ettiğin dilde kullanabilir, resmi İngilizce vergi terimlerini görünür tutabilirsin.',
      signInTitle: 'Güvenli çalışma alanını oluştur',
      signInBody: 'Şimdilik bu bir kurulum yer tutucusu. Gerçek uygulama kişisel vergi verilerini kaydetmeden önce kayıtları koruyacak.',
      taxProfileTitle: 'Vergi profilini oluştur',
      taxProfileBody: 'Birkaç dikkatli soru, Ledgerly tahminlerinin temkinli ve ilgili kalmasına yardımcı olur.',
      residencyTitle: 'UK kapsamını doğrula',
      residencyBody: 'Vergi yılını seç ve bu profilin UK vergi kayıtları için olduğunu doğrula.',
      workTypeTitle: 'Çalışma türünü seç',
      workTypeBody: 'Serbest çalışma, kira geliri, sözleşmeli çalışma veya maaş gelirinden başla.',
      incomeSourcesTitle: 'Gelir kaynaklarını ekle',
      incomeSourcesBody: 'Bu yıl hangi gelir türlerini kaydetmeyi beklediğini Ledgerly’ye söyle.',
      expenseHabitsTitle: 'Yaygın giderleri seç',
      expenseHabitsBody: 'Dashboard eksik kayıtları hatırlatabilsin diye beklenen gider gruplarını seç.',
      reviewProfileTitle: 'Kurulumu gözden geçir',
      reviewProfileBody: 'Ledgerly başlangıç dashboard’unu oluşturmadan önce varsayımları kontrol et.',
      continue: 'Devam et',
      startSetup: 'Kuruluma başla',
      finishSetup: 'Dashboard oluştur',
      back: 'Geri',
      progress: 'Adım {{current}} / {{total}}',
      dashboardTitle: 'Bugün Ledgerly’de',
      dashboardSubtitle: 'Kayıtların ilk vergi yılı kurulumu için hazır.',
      estimate: 'Vergi tahmini',
      estimateEmpty: 'Temkinli bir tahmin görmek için gelir ve gider ekle.',
      setupTasks: 'Kurulum görevleri',
      taskProfile: 'Vergi profilini gözden geçir',
      taskIncome: 'İlk gelir kaydını ekle',
      taskExpense: 'İlk gideri ekle',
      quickActions: 'Hızlı işlemler',
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
