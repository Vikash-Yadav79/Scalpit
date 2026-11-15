import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon, IconName } from './AppIcon';
import assets from '../../config/assets';

export interface HeaderAction {
  icon: IconName;
  onPress: () => void;
  badge?: number | boolean;
  accessibilityLabel?: string;
}

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  actions?: HeaderAction[];
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showLogo = false,
  actions = [],
  rightAction,
  style,
}) => {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          paddingHorizontal: spacing.lg,
        },
        style,
      ]}
    >
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={[styles.backButton, { marginRight: spacing.sm }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <AppIcon name="chevron-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        {showLogo && (
          <View style={styles.logoRow}>
            <Image
              source={assets.brand.logo}
              style={[styles.logoImage, { borderRadius: radius.xs }]}
              resizeMode="contain"
            />
            <AppText
              variant="h3"
              color="textPrimary"
              style={{ fontWeight: '700', marginLeft: spacing.sm }}
            >
              {assets.brand.name}
            </AppText>
          </View>
        )}

        {title && !showLogo && (
          <View>
            <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
              {title}
            </AppText>
            {subtitle && (
              <AppText variant="caption" color="textSecondary">
                {subtitle}
              </AppText>
            )}
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        {rightAction}
        {actions.map((action, index) => (
          <TouchableOpacity
            key={`action-${index}`}
            onPress={action.onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={[styles.actionButton, { marginLeft: spacing.md }]}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel || `Action ${index}`}
          >
            <AppIcon name={action.icon} size={22} color={colors.textPrimary} />
            {action.badge ? (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.surface,
                  },
                ]}
              >
                {typeof action.badge === 'number' && action.badge > 0 && (
                  <AppText variant="micro" color="textInverse" style={{ fontSize: 9 }}>
                    {action.badge > 99 ? '99+' : action.badge}
                  </AppText>
                )}
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  actionButton: {
    position: 'relative',
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(AppHeader);
