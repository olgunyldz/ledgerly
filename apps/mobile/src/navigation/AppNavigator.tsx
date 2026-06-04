import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/tokens';
import type { RootStackParamList } from './routes';
import { SplashScreen } from '../screens/SplashScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LanguageSelectScreen } from '../screens/LanguageSelectScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { TaxProfileIntroScreen } from '../screens/TaxProfileIntroScreen';
import { ResidencyTaxYearScreen } from '../screens/ResidencyTaxYearScreen';
import { WorkTypeScreen } from '../screens/WorkTypeScreen';
import { IncomeSourcesScreen } from '../screens/IncomeSourcesScreen';
import { ExpenseHabitsScreen } from '../screens/ExpenseHabitsScreen';
import { ReviewProfileScreen } from '../screens/ReviewProfileScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AssistantScreen } from '../screens/AssistantScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { t } = useTranslation();
  const [hasCompletedSetup, setHasCompletedSetup] = React.useState(false);
  const initialRouteName = hasCompletedSetup ? 'Dashboard' : 'Welcome';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          contentStyle: { backgroundColor: colors.paper },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.paper },
          headerTitleStyle: { color: colors.ink },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ title: t('title') }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: t('welcomeHeader') }} />
        <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} options={{ title: t('languageHeader') }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: t('signInHeader') }} />
        <Stack.Screen name="TaxProfileIntro" component={TaxProfileIntroScreen} options={{ title: t('taxProfileHeader') }} />
        <Stack.Screen name="ResidencyTaxYear" component={ResidencyTaxYearScreen} options={{ title: t('residencyHeader') }} />
        <Stack.Screen name="WorkType" component={WorkTypeScreen} options={{ title: t('workTypeHeader') }} />
        <Stack.Screen name="IncomeSources" component={IncomeSourcesScreen} options={{ title: t('incomeSourcesHeader') }} />
        <Stack.Screen name="ExpenseHabits" component={ExpenseHabitsScreen} options={{ title: t('expenseHabitsHeader') }} />
        <Stack.Screen name="ReviewProfile" options={{ title: t('reviewProfileHeader') }}>
          {(props) => <ReviewProfileScreen {...props} onCompleteSetup={() => setHasCompletedSetup(true)} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: t('dashboardHeader') }} />
        <Stack.Screen name="Assistant" component={AssistantScreen} options={{ title: t('assistantTitle') }} />
        <Stack.Screen name="Documents" component={DocumentsScreen} options={{ title: t('documentsTitle') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
