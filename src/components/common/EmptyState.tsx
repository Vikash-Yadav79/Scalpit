import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon, IconName } from './AppIcon';
import { AppButton } from './AppButton';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'activity',
  title,
  description,
  actionTitle,
  onAction,
  style,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xxl }, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: colors.surfaceSubtle,
            marginBottom: spacing.lg,
          },
        ]}
      >
        <AppIcon name={icon} size={36} color={colors.textTertiary} />
      </View>

      <AppText variant="h3" color="textPrimary" align="center" style={{ fontWeight: '600' }}>
        {title}
      </AppText>

      {description && (
        <AppText
          variant="bodySmall"
          color="textSecondary"
          align="center"
          style={{ marginTop: spacing.xs, marginBottom: spacing.lg }}
        >
          {description}
        </AppText>
      )}

      {actionTitle && onAction && (
        <AppButton
          title={actionTitle}
          onPress={onAction}
          variant="secondary"
          size="sm"
          fullWidth={false}
          style={{ marginTop: spacing.sm }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(EmptyState);
