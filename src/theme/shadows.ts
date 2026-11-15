import { Platform, ViewStyle } from 'react-native';

/**
 * Cross-platform Shadow and Elevation Tokens
 */
export const shadows: Record<'none' | 'sm' | 'md' | 'lg' | 'floating', ViewStyle> = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: Platform.OS === 'ios' ? 0.05 : 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: Platform.OS === 'ios' ? 0.12 : 0.16,
    shadowRadius: 14,
    elevation: 8,
  },
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: Platform.OS === 'ios' ? 0.18 : 0.22,
    shadowRadius: 20,
    elevation: 12,
  },
};
