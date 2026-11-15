import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon, IconName } from './AppIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  testID,
}) => {
  const { colors, radius, spacing } = useTheme();

  const isDisabled = disabled || loading;

  const getSizePadding = () => {
    if (size === 'sm') {
      return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, minHeight: 36 };
    }
    if (size === 'lg') {
      return { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, minHeight: 54 };
    }
    return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, minHeight: 48 };
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled ? colors.border : colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled ? colors.surfaceSubtle : colors.primarySoft,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: isDisabled ? colors.border : colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: colors.surfaceSubtle,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
        };
      default:
        return {};
    }
  };

  const containerStyle: ViewStyle = {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...(fullWidth ? { width: '100%' } : {}),
    ...getSizePadding(),
    ...getVariantStyle(),
  };

  const getTextColor = (): string => {
    if (isDisabled) {
      return colors.textTertiary;
    }
    switch (variant) {
      case 'primary':
        return colors.textInverse;
      case 'secondary':
        return colors.primary;
      case 'outline':
        return colors.primary;
      case 'ghost':
        return colors.textPrimary;
      case 'text':
        return colors.primary;
      default:
        return colors.textInverse;
    }
  };

  const textColor = getTextColor();
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[containerStyle, style]}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.textInverse : colors.primary}
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && (
            <AppIcon
              name={leftIcon}
              size={iconSize}
              color={textColor}
              style={{ marginRight: spacing.sm }}
            />
          )}
          <AppText
            variant={size === 'sm' ? 'caption' : 'button'}
            style={{ color: textColor, fontWeight: '600' }}
          >
            {title}
          </AppText>
          {rightIcon && (
            <AppIcon
              name={rightIcon}
              size={iconSize}
              color={textColor}
              style={{ marginLeft: spacing.sm }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(AppButton);
