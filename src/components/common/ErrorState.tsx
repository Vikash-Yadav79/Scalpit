import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';
import { AppButton } from './AppButton';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryTitle?: string;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not fetch the latest market data. Please check your connection and try again.',
  onRetry,
  retryTitle = 'Try Again',
  style,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xxl }, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: colors.lossSoft,
            marginBottom: spacing.lg,
          },
        ]}
      >
        <AppIcon name="alert" size={36} color={colors.loss} />
      </View>

      <AppText variant="h3" color="textPrimary" align="center" style={{ fontWeight: '600' }}>
        {title}
      </AppText>

      <AppText
        variant="bodySmall"
        color="textSecondary"
        align="center"
        style={{ marginTop: spacing.xs, marginBottom: spacing.xl }}
      >
        {message}
      </AppText>

      {onRetry && (
        <AppButton
          title={retryTitle}
          onPress={onRetry}
          variant="primary"
          size="md"
          leftIcon="refresh"
          fullWidth={false}
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

export default React.memo(ErrorState);
