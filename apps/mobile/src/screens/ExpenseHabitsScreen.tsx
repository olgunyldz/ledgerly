import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { OnboardingStepScreen } from '../components/OnboardingStepScreen';
import type { RootStackParamList } from '../navigation/routes';
import { getTaxProfile, updateTaxProfile, type ExpenseHabit } from '../lib/taxProfile';

type ExpenseHabitsScreenProps = NativeStackScreenProps<RootStackParamList, 'ExpenseHabits'>;

export function ExpenseHabitsScreen({ navigation }: ExpenseHabitsScreenProps) {
  const { t } = useTranslation();
  const [expenseHabits, setExpenseHabits] = React.useState<ExpenseHabit[]>([]);

  React.useEffect(() => {
    let isMounted = true;

    async function restoreProfile() {
      const profile = await getTaxProfile();

      if (isMounted) {
        setExpenseHabits(profile.expenseHabits);
      }
    }

    restoreProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleExpenseHabit = async (value: ExpenseHabit) => {
    const nextExpenseHabits = expenseHabits.includes(value)
      ? expenseHabits.filter((habit) => habit !== value)
      : [...expenseHabits, value];

    setExpenseHabits(nextExpenseHabits);
    await updateTaxProfile({ expenseHabits: nextExpenseHabits });
  };

  return (
    <OnboardingStepScreen
      currentStep={8}
      totalSteps={9}
      titleKey="expenseHabitsTitle"
      bodyKey="expenseHabitsBody"
      actionKey="continue"
      onContinue={() => navigation.navigate('ReviewProfile')}
      onBack={() => navigation.goBack()}
    >
      <ChoiceGroup
        multiple
        options={[
          { label: t('expenseHabitTravel'), value: 'travel' },
          { label: t('expenseHabitHomeOffice'), value: 'home-office' },
          { label: t('expenseHabitMaterials'), value: 'materials' },
          { label: t('expenseHabitProfessionalFees'), value: 'professional-fees' },
        ]}
        selectedValues={expenseHabits}
        onToggle={toggleExpenseHabit}
      />
    </OnboardingStepScreen>
  );
}
