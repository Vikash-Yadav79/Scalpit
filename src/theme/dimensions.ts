import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Screen dimensions & responsive metrics
 */
export const dimensions = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isTablet: width >= 768,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  headerHeight: Platform.OS === 'ios' ? 56 : 56,
  bottomBarHeight: Platform.OS === 'ios' ? 78 : 64,
  inputHeight: 50,
  buttonHeight: 48,
  compactButtonHeight: 38,
};
