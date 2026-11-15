import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

export interface PennyDropRingProps {
  initialSeconds?: number;
  onComplete?: () => void;
}

export const PennyDropRing: React.FC<PennyDropRingProps> = ({
  initialSeconds = 29,
  onComplete,
}) => {
  const { colors, spacing } = useTheme();
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  return (
    <View style={styles.container}>
      {/* Animated Glowing Ring Center */}
      <View
        style={[
          styles.outerRing,
          {
            borderColor: colors.border,
            shadowColor: colors.primary,
          },
        ]}
      >
        <View style={[styles.innerCircle, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </View>

      <AppText
        variant="h2"
        color="textPrimary"
        align="center"
        style={[styles.headline, { marginTop: spacing.xxl }]}
      >
        We're depositing ₹1 in your bank account for verification
      </AppText>

      <AppText
        variant="bodyLarge"
        color="textSecondary"
        align="center"
        style={[styles.subheadline, { marginTop: spacing.sm }]}
      >
        This will take {seconds} seconds
      </AppText>

      <AppText
        variant="caption"
        color="textTertiary"
        align="center"
        style={[styles.warningText, { marginTop: spacing.xl }]}
      >
        Do not press the 'back' button or close the app
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  outerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  innerCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontWeight: '700',
    lineHeight: 30,
    maxWidth: 320,
  },
  subheadline: {
    fontWeight: '500',
  },
  warningText: {
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

export default PennyDropRing;
