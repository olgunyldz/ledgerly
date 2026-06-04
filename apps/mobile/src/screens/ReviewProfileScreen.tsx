import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { getTaxProfile, type TaxProfile } from '../lib/taxProfile';
import { colors, radius, spacing, typography } from '../theme/tokens';

type ReviewProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewProfile'> & {
  onCompleteSetup: () => Promise<void>;
};

export function ReviewProfileScreen({ navigation, onCompleteSetup }: ReviewProfileScreenProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState<TaxProfile | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function restoreProfile() {
      const storedProfile = await getTaxProfile();

      if (isMounted) {
        setProfile(storedProfile);
      }
    }

    restoreProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const completeSetup = async () => {
    await onCompleteSetup();
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  const profileRows = profile
    ? [
        [t('profileTaxYear'), profile.taxYear],
        [t('profileResidency'), t(profile.residencyStatus === 'uk-resident' ? 'ukResident' : 'residencyNotSure')],
        [t('profileWorkType'), profile.workType ? t(`workType.${profile.workType}`) : t('profileMissing')],
        [
          t('profileIncomeSources'),
          profile.incomeSources.length
            ? profile.incomeSources.map((source) => t(`incomeSource.${source}`)).join(', ')
            : t('profileMissing'),
        ],
        [
          t('profileExpenseHabits'),
          profile.expenseHabits.length
            ? profile.expenseHabits.map((habit) => t(`expenseHabit.${habit}`)).join(', ')
            : t('profileMissing'),
        ],
      ]
    : [];

  return (
    <OnboardingStepScreen
      currentStep={9}
      totalSteps={9}
      titleKey="reviewProfileTitle"
      bodyKey="reviewProfileBody"
      actionKey="finishSetup"
      onContinue={completeSetup}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('profileSummary')}</Text>
        {profileRows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </OnboardingStepScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  cardTitle: { color: colors.ink, fontSize: typography.body, fontWeight: '700', marginBottom: spacing.md },
  row: { gap: spacing.xs, marginBottom: spacing.md },
  label: { color: colors.slate, fontSize: typography.caption, fontWeight: '700' },
  value: { color: colors.ink, fontSize: typography.body, lineHeight: 22 },
});
