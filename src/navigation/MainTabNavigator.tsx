import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { MainTabParamList } from './navigationTypes';
import { StocksScreen } from '../features/stocks/screens/StocksScreen';
import { FnoMainScreen } from '../features/fno/screens/FnoMainScreen';
import { MutualFundsScreen } from '../features/mutualfunds/screens/MutualFundsScreen';
import { LoansMainScreen } from '../features/loans/screens/LoansMainScreen';
import { AppIcon, IconName } from '../components/common/AppIcon';
import { AppText } from '../components/common/AppText';

const Tab = createBottomTabNavigator<MainTabParamList>();

const getTabIconName = (routeName: keyof MainTabParamList): IconName => {
  switch (routeName) {
    case 'StocksTab':
      return 'stocks';
    case 'FnoTab':
      return 'activity';
    case 'MutualFundsTab':
      return 'mutual-funds';
    case 'LoansTab':
      return 'wallet';
  }
};

const getTabLabel = (routeName: keyof MainTabParamList): string => {
  switch (routeName) {
    case 'StocksTab':
      return 'Stocks';
    case 'FnoTab':
      return 'F&O';
    case 'MutualFundsTab':
      return 'Mutual Funds';
    case 'LoansTab':
      return 'Loans';
  }
};

export const MainTabNavigator: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Android navigation bar inset handling:
  // On 3-button navigation, insets.bottom is typically 48dp.
  // On gesture navigation, insets.bottom is typically 16-24dp.
  // On hardware buttons / hidden bar, insets.bottom is 0dp.
  // We guarantee proper elevation and padding so buttons are never hidden behind Android system controls.
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 8);
  const baseHeight = Platform.OS === 'ios' ? 52 : 56;
  const tabBarHeight = baseHeight + bottomPadding;

  return (
    <Tab.Navigator
      initialRouteName="StocksTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingTop: 6,
          paddingBottom: bottomPadding,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarLabel: ({ focused, color }) => (
          <AppText
            variant="micro"
            style={{
              color,
              fontWeight: focused ? '700' : '500',
              marginTop: 2,
              fontSize: 11,
            }}
          >
            {getTabLabel(route.name)}
          </AppText>
        ),
        tabBarIcon: ({ focused, color }) => (
          <AppIcon
            name={getTabIconName(route.name)}
            size={22}
            color={color}
            strokeWidth={focused ? 2.5 : 2}
          />
        ),
      })}
    >
      <Tab.Screen name="StocksTab" component={StocksScreen} />
      <Tab.Screen name="FnoTab" component={FnoMainScreen} />
      <Tab.Screen name="MutualFundsTab" component={MutualFundsScreen} />
      <Tab.Screen name="LoansTab" component={LoansMainScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
