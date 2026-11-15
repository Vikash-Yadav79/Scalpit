import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TypographyVariant } from '../../theme/typography';
import { ColorTheme } from '../../theme/colors';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: keyof ColorTheme | string;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = 'textPrimary',
  align,
  children,
  style,
  ...rest
}) => {
  const { colors, typography } = useTheme();

  // Resolve color token if it matches a ColorTheme key, otherwise use literal color
  const resolvedColor =
    typeof color === 'string' && color in colors
      ? (colors as any)[color]
      : color || colors.textPrimary;

  const typographyStyle = typography[variant] || typography.body;

  const computedStyle: TextStyle = {
    ...typographyStyle,
    color: resolvedColor,
    ...(align ? { textAlign: align } : {}),
  };

  return (
    <RNText style={[computedStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default React.memo(AppText);
