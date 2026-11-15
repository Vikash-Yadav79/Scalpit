import { Platform, TextStyle } from 'react-native';

/**
 * Platform font family definitions with graceful system fallbacks
 */
export const fontFamilies = {
  regular: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
};

export const fontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extraBold: '800' as TextStyle['fontWeight'],
};

export const fontSizes = {
  display: 32,
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  bodyLarge: 16,
  body: 14,
  bodySmall: 13,
  caption: 12,
  micro: 10,
};

export const lineHeights = {
  display: 40,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 22,
  bodyLarge: 24,
  body: 20,
  bodySmall: 18,
  caption: 16,
  micro: 14,
};

export const letterSpacings = {
  tight: -0.4,
  normal: 0,
  wide: 0.2,
  wider: 0.5,
};

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'micro'
  | 'button'
  | 'numericLarge'
  | 'numericMedium';

export const typography: Record<TypographyVariant, TextStyle> = {
  display: {
    fontFamily: fontFamilies.bold,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacings.tight,
  },
  h1: {
    fontFamily: fontFamilies.bold,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: fontFamilies.semiBold,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights.h2,
    letterSpacing: letterSpacings.normal,
  },
  h3: {
    fontFamily: fontFamilies.semiBold,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights.h3,
    letterSpacing: letterSpacings.normal,
  },
  h4: {
    fontFamily: fontFamilies.medium,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.h4,
    lineHeight: lineHeights.h4,
    letterSpacing: letterSpacings.normal,
  },
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    letterSpacing: letterSpacings.normal,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacings.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.bodySmall,
    lineHeight: lineHeights.bodySmall,
    letterSpacing: letterSpacings.normal,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    letterSpacing: letterSpacings.wide,
  },
  micro: {
    fontFamily: fontFamilies.medium,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.micro,
    lineHeight: lineHeights.micro,
    letterSpacing: letterSpacings.wider,
  },
  button: {
    fontFamily: fontFamilies.semiBold,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    letterSpacing: letterSpacings.normal,
  },
  numericLarge: {
    fontFamily: fontFamilies.bold,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
    letterSpacing: letterSpacings.tight,
  },
  numericMedium: {
    fontFamily: fontFamilies.semiBold,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights.h3,
    letterSpacing: letterSpacings.normal,
  },
};
