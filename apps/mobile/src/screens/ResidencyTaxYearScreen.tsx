import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { getTaxProfile, updateTaxProfile, type ResidencyStatus } from '../lib/taxProfile';

type ResidencyTaxYearScreenProps = NativeStackScreenProps<RootStackParamList, 'ResidencyTaxYear'>;

export function ResidencyTaxYearScreen({ navigation }: ResidencyTaxYearScreenProps) {
  const { t } = useTranslation();
  const [taxYear, setTaxYear] = React.useState('2025/26');
  const [residencyStatus, setResidencyStatus] = React.useState<ResidencyStatus>('uk-resident');

  React.useEffect(() => {
    let isMounted = true;

    async function restoreProfile() {
      const profile = await getTaxProfile();

      if (isMounted) {
        setTaxYear(profile.taxYear);
        setResidencyStatus(profile.residencyStatus);
      }
    }

    restoreProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectTaxYear = async (value: string) => {
    setTaxYear(value);
    await updateTaxProfile({ taxYear: value });
  };

  const selectResidency = async (value: ResidencyStatus) => {
    setResidencyStatus(value);
    await updateTaxProfile({ residencyStatus: value });
  };

  return (
    <OnboardingStepScreen
      currentStep={5}
      totalSteps={9}
      titleKey="residencyTitle"
      bodyKey="residencyBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('WorkType')}
      onBack={() => navigation.goBack()}
    >
      <ChoiceGroup
        options={[
          { label: t('taxYear2025'), value: '2025/26' },
          { label: t('taxYear2024'), value: '2024/25' },
        ]}
        selectedValues={[taxYear]}
        onToggle={selectTaxYear}
      />
      <ChoiceGroup
        options={[
          { label: t('ukResident'), value: 'uk-resident' },
          { label: t('residencyNotSure'), value: 'not-sure' },
        ]}
        selectedValues={[residencyStatus]}
        onToggle={selectResidency}
      />
    </OnboardingStepScreen>
  );
}
