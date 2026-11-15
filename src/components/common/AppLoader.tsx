import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

export interface AppLoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  fullScreen = false,
  message,
  size = 'large',
  color,
  style,
}) => {
  const { colors, spacing } = useTheme();
  const spinnerColor = color || colors.primary;

  const content = (
    <View style={[styles.innerContainer, style]}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <AppText
          variant="bodySmall"
          color="textSecondary"
          style={{ marginTop: spacing.md }}
        >
          {message}
        </AppText>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreenOverlay,
          { backgroundColor: colors.overlay },
        ]}
      >
        <View
          style={[
            styles.cardModal,
            { backgroundColor: colors.surface, padding: spacing.xl },
          ]}
        >
          {content}
        </View>
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  fullScreenOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardModal: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
});

export default React.memo(AppLoader);
