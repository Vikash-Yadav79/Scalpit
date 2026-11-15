import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { SplashScreen } from '../features/auth/screens/SplashScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { StockDetailsScreen } from '../features/stocks/screens/StockDetailsScreen';
import { StockBuySellModal } from '../features/stocks/screens/StockBuySellModal';
import { OptionChainScreen } from '../features/fno/screens/OptionChainScreen';
import { FundDetailsScreen } from '../features/mutualfunds/screens/FundDetailsScreen';
import { FundSipInvestModal } from '../features/mutualfunds/screens/FundSipInvestModal';
import { IpoHubScreen } from '../features/ipo/screens/IpoHubScreen';
import { IpoDetailsScreen } from '../features/ipo/screens/IpoDetailsScreen';
import { ApplyIpoModal } from '../features/ipo/screens/ApplyIpoModal';
import { PersonalLoanApplyScreen } from '../features/loans/screens/PersonalLoanApplyScreen';
import { ProfileModalScreen } from '../features/profile/screens/ProfileModalScreen';
import { SearchModalScreen } from '../features/search/screens/SearchModalScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />

      {/* Global Modals & Feature Detail Stacks */}
      <Stack.Screen
        name="StockDetails"
        component={StockDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="StockBuySell"
        component={StockBuySellModal}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="OptionChain"
        component={OptionChainScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="FundDetails"
        component={FundDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="FundSipInvest"
        component={FundSipInvestModal}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="IpoHub"
        component={IpoHubScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="IpoDetails"
        component={IpoDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ApplyIpo"
        component={ApplyIpoModal}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="PersonalLoanApply"
        component={PersonalLoanApplyScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ProfileModal"
        component={ProfileModalScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="SearchModal"
        component={SearchModalScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
