import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { store } from './src/store';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { RootNavigator } from './src/navigation/RootNavigator';
import { navigationRef } from './src/navigation/navigationUtils';

const AppContent: React.FC = () => {
  const { colors, isDark } = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
