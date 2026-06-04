import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { getTaxProfile, updateTaxProfile, type IncomeSource } from '../lib/taxProfile';

type IncomeSourcesScreenProps = NativeStackScreenProps<RootStackParamList, 'IncomeSources'>;

export function IncomeSourcesScreen({ navigation }: IncomeSourcesScreenProps) {
  const { t } = useTranslation();
  const [incomeSources, setIncomeSources] = React.useState<IncomeSource[]>([]);

  React.useEffect(() => {
    let isMounted = true;

    async function restoreProfile() {
      const profile = await getTaxProfile();

      if (isMounted) {
        setIncomeSources(profile.incomeSources);
      }
    }

    restoreProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleIncomeSource = async (value: IncomeSource) => {
    const nextIncomeSources = incomeSources.includes(value)
      ? incomeSources.filter((source) => source !== value)
      : [...incomeSources, value];

    setIncomeSources(nextIncomeSources);
    await updateTaxProfile({ incomeSources: nextIncomeSources });
  };

  return (
    <OnboardingStepScreen
      currentStep={7}
      totalSteps={9}
      titleKey="incomeSourcesTitle"
      bodyKey="incomeSourcesBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('ExpenseHabits')}
      onBack={() => navigation.goBack()}
    >
      <ChoiceGroup
        multiple
        options={[
          { label: t('incomeSourceSales'), value: 'sales' },
          { label: t('incomeSourcePlatform'), value: 'platform' },
          { label: t('incomeSourceRent'), value: 'rent' },
          { label: t('incomeSourceSalary'), value: 'salary' },
        ]}
        selectedValues={incomeSources}
        onToggle={toggleIncomeSource}
      />
    </OnboardingStepScreen>
  );
}
