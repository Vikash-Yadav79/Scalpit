import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon, IconName } from './AppIcon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface AppToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss: () => void;
  style?: ViewStyle;
}

export const AppToast: React.FC<AppToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3500,
  onDismiss,
  style,
}) => {
  const { colors, radius, spacing, shadows } = useTheme();

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  const getTypeConfig = (): { icon: IconName; bg: string; border: string; text: string } => {
    switch (type) {
      case 'success':
        return {
          icon: 'check-circle',
          bg: colors.gainSoft,
          border: colors.gain,
          text: colors.gain,
        };
      case 'error':
        return {
          icon: 'alert',
          bg: colors.lossSoft,
          border: colors.loss,
          text: colors.loss,
        };
      case 'warning':
        return {
          icon: 'warning',
          bg: colors.warning + '20',
          border: colors.warning,
          text: colors.warning,
        };
      default:
        return {
          icon: 'info',
          bg: colors.primarySoft,
          border: colors.primary,
          text: colors.primary,
        };
    }
  };

  const config = getTypeConfig();

  return (
    <View
      style={[
        styles.toastWrapper,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          borderRadius: radius.md,
          padding: spacing.md,
        },
        shadows.md,
        style,
      ]}
      accessibilityRole="alert"
    >
      <AppIcon name={config.icon} size={20} color={config.text} style={{ marginRight: spacing.sm }} />
      <AppText variant="bodySmall" style={[styles.message, { color: colors.textPrimary }]}>
        {message}
      </AppText>
      <TouchableOpacity
        onPress={onDismiss}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <AppIcon name="close" size={16} color={colors.textTertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 99999,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  message: {
    flex: 1,
    fontWeight: '500',
  },
});

export default React.memo(AppToast);
