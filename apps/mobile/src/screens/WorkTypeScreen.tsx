import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { getTaxProfile, updateTaxProfile, type WorkType } from '../lib/taxProfile';

type WorkTypeScreenProps = NativeStackScreenProps<RootStackParamList, 'WorkType'>;

export function WorkTypeScreen({ navigation }: WorkTypeScreenProps) {
  const { t } = useTranslation();
  const [workType, setWorkType] = React.useState<WorkType | undefined>();

  React.useEffect(() => {
    let isMounted = true;

    async function restoreProfile() {
      const profile = await getTaxProfile();

      if (isMounted) {
        setWorkType(profile.workType);
      }
    }

    restoreProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectWorkType = async (value: WorkType) => {
    setWorkType(value);
    await updateTaxProfile({ workType: value });
  };

  return (
    <OnboardingStepScreen
      currentStep={6}
      totalSteps={9}
      titleKey="workTypeTitle"
      bodyKey="workTypeBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('IncomeSources')}
      onBack={() => navigation.goBack()}
    >
      <ChoiceGroup
        options={[
          { label: t('workTypeSelfEmployed'), value: 'self-employed' },
          { label: t('workTypeLandlord'), value: 'landlord' },
          { label: t('workTypeContractor'), value: 'contractor' },
          { label: t('workTypeEmployment'), value: 'employment' },
        ]}
        selectedValues={workType ? [workType] : []}
        onToggle={selectWorkType}
      />
    </OnboardingStepScreen>
  );
}
