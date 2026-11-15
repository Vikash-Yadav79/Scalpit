import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import { ColorTheme, ThemeType } from './colors';
import { greenTheme } from './themes/greenTheme';
import { blueTheme } from './themes/blueTheme';
import { darkTheme } from './themes/darkTheme';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { dimensions } from './dimensions';

export interface ThemeContextValue {
  themeType: ThemeType;
  colors: ColorTheme;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  dimensions: typeof dimensions;
  isDark: boolean;
  setTheme: (type: ThemeType) => void;
  toggleTheme: () => void;
}

const themeRegistry: Record<ThemeType, ColorTheme> = {
  green: greenTheme,
  blue: blueTheme,
  dark: darkTheme,
};

// Initial default active theme follows the dark visual appearance in provided PDF screenshots:
export const DEFAULT_ACTIVE_THEME: ThemeType = 'dark';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  initialTheme?: ThemeType;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme = DEFAULT_ACTIVE_THEME,
  children,
}) => {
  const [themeType, setThemeType] = useState<ThemeType>(initialTheme);

  const colors = useMemo(() => themeRegistry[themeType] || greenTheme, [themeType]);
  const isDark = themeType === 'dark';

  const setTheme = useCallback((type: ThemeType) => {
    if (themeRegistry[type]) {
      setThemeType(type);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'green' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeType,
      colors,
      typography,
      spacing,
      radius,
      shadows,
      dimensions,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [themeType, colors, isDark, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        {...(Platform.OS === 'android' ? { backgroundColor: colors.background } : {})}
        animated
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
