import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';

export interface AppPinKeypadProps {
  pin: string;
  maxDigits?: number;
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
}

export const AppPinKeypad: React.FC<AppPinKeypadProps> = ({
  pin,
  maxDigits = 4,
  onDigitPress,
  onBackspace,
}) => {
  const { colors, spacing, radius } = useTheme();

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace'],
  ];

  return (
    <View style={styles.container}>
      {/* 4-Digit Rounded PIN Boxes (Matching PDF Page 3) */}
      <View style={styles.pinBoxesRow}>
        {Array.from({ length: maxDigits }).map((_, index) => {
          const isFilled = index < pin.length;
          const isActive = index === pin.length;

          return (
            <View
              key={index}
              style={[
                styles.pinBox,
                {
                  borderColor: isActive
                    ? colors.primary
                    : isFilled
                    ? colors.textPrimary
                    : colors.border,
                  backgroundColor: colors.surface,
                  borderRadius: radius.md,
                },
              ]}
            >
              {isFilled && (
                <View
                  style={[
                    styles.pinFilledDot,
                    { backgroundColor: colors.textPrimary },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>

      {/* On-screen Numeric Keypad */}
      <View style={[styles.keypadGrid, { marginTop: spacing.xxl }]}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map(key => {
              if (key === 'backspace') {
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.6}
                    onPress={onBackspace}
                    style={styles.keyBtn}
                    accessibilityLabel="Backspace"
                  >
                    <AppIcon name="backspace" size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                );
              }

              if (key === '.') {
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.6}
                    onPress={() => onDigitPress('.')}
                    style={styles.keyBtn}
                  >
                    <View
                      style={[
                        styles.dotKey,
                        { backgroundColor: colors.textPrimary },
                      ]}
                    />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.6}
                  onPress={() => {
                    if (pin.length < maxDigits) {
                      onDigitPress(key);
                    }
                  }}
                  style={styles.keyBtn}
                >
                  <AppText variant="h1" color="textPrimary" style={styles.digitText}>
                    {key}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  pinBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  pinBox: {
    width: 58,
    height: 58,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinFilledDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  keypadGrid: {
    width: '100%',
    maxWidth: 320,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  keyBtn: {
    width: 80,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 28,
    fontWeight: '600',
  },
  dotKey: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default AppPinKeypad;
