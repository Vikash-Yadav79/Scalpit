import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateUserLocal } from '../authSlice';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';
import { maskMobile } from '../../../utils/formatters';

type OtpRouteProp = RouteProp<AuthStackParamList, 'OtpVerification'>;

export const OtpVerificationScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<OtpRouteProp>();
  const dispatch = useAppDispatch();

  const mobile = route.params?.mobile || '9876543210';
  const countryCode = route.params?.countryCode || '+91';

  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const inputRef = useRef<any>(null);

  // Single combined effect for focus and countdown timer (prevents Fast Refresh hook order mismatches)
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 350);

    let countdownTimer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      countdownTimer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(focusTimer);
      if (countdownTimer) clearTimeout(countdownTimer);
    };
  }, [countdown]);

  const verifyAndProceed = (code: string) => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    // Static client demo: accept 123456 or any 6-digit code for testing
    dispatch(
      updateUserLocal({
        id: 'usr_demo_101',
        name: 'Vikash Yadav',
        mobile,
        countryCode,
        isKycVerified: true,
      })
    );

    // Navigate to PAN Entry screen (matching Groww journey PDF Page 6)
    navigation.navigate('PanEntry');
  };

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(cleaned);
    if (error) setError('');

    if (cleaned.length === 6) {
      setTimeout(() => {
        Keyboard.dismiss();
        verifyAndProceed(cleaned);
      }, 350);
    }
  };

  const handleDigitPress = (digit: string) => {
    if (otp.length < 6) {
      const nextOtp = (otp + digit).slice(0, 6);
      setOtp(nextOtp);
      if (error) setError('');

      if (nextOtp.length === 6) {
        setTimeout(() => {
          Keyboard.dismiss();
          verifyAndProceed(nextOtp);
        }, 350);
      }
    }
  };

  const handleBackspace = () => {
    if (otp.length > 0) {
      setOtp((prev) => prev.slice(0, -1));
      if (error) setError('');
    }
  };

  const handleAutofillTestOtp = () => {
    setOtp('123456');
    if (error) setError('');
    setTimeout(() => {
      verifyAndProceed('123456');
    }, 450);
  };

  const keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace'],
  ];

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { padding: spacing.xl }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            Enter OTP
          </AppText>
          <View style={styles.sentRow}>
            <AppText variant="body" color="textSecondary">
              OTP sent to {countryCode} {maskMobile(mobile)}{' '}
            </AppText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AppText variant="body" color="primary" style={{ fontWeight: '700' }}>
                Edit
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Quick Demo Autofill Pill */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAutofillTestOtp}
            style={[
              styles.demoBadge,
              {
                backgroundColor: colors.primarySoft,
                borderColor: colors.primary,
                borderRadius: radius.md,
                padding: spacing.sm,
                marginVertical: spacing.md,
              },
            ]}
          >
            <AppIcon name="shield" size={16} color={colors.primary} />
            <AppText
              variant="micro"
              style={{ color: colors.primary, fontWeight: '700', marginLeft: spacing.xs, flex: 1 }}
            >
              Demo Mode: Enter OTP <AppText variant="micro" style={{ fontWeight: '800', textDecorationLine: 'underline' }}>123456</AppText> or tap here to autofill.
            </AppText>
          </TouchableOpacity>

          {/* OTP Input Container with full touch-interactive overlay */}
          <View style={styles.otpInputWrapper}>
            {/* Visual 6 Digit Boxes */}
            <View style={styles.otpBoxesRow} pointerEvents="none">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const digit = otp[index] || '';
                const isFocused = otp.length === index || (index === 5 && otp.length === 6);

                return (
                  <View
                    key={`otp-box-${index}`}
                    style={[
                      styles.otpBox,
                      {
                        borderColor: isFocused
                          ? colors.primary
                          : digit
                          ? colors.primary
                          : colors.border,
                        backgroundColor: colors.surface,
                        borderRadius: radius.md,
                      },
                    ]}
                  >
                    <AppText
                      variant="h2"
                      color={digit ? 'textPrimary' : 'textTertiary'}
                      style={{ fontWeight: '700' }}
                    >
                      {digit}
                    </AppText>
                  </View>
                );
              })}
            </View>

            {/* Real TextInput sitting directly over the 6 boxes */}
            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={handleOtpChange}
              keyboardType="number-pad"
              maxLength={6}
              caretHidden
              style={styles.realOverlayInput}
              autoFocus={false}
            />
          </View>

          {error ? (
            <AppText variant="caption" color="error" style={{ marginTop: 8 }}>
              {error}
            </AppText>
          ) : null}

          {/* Resend OTP Row */}
          <View style={[styles.resendRow, { marginTop: spacing.md }]}>
            {countdown > 0 ? (
              <View style={styles.countdownRow}>
                <AppIcon name="clock" size={14} color={colors.textTertiary} />
                <AppText
                  variant="caption"
                  color="textTertiary"
                  style={{ marginLeft: 6 }}
                >
                  Resend OTP in 00:{countdown < 10 ? `0${countdown}` : countdown}
                </AppText>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setCountdown(30)}>
                <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
                  Resend OTP
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* On-Screen Numeric Keypad (Matches Groww PIN & OTP Journey) */}
        <View style={[styles.keypadContainer, { marginTop: spacing.lg }]}>
          {keypadRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.keypadRow}>
              {row.map((key, keyIndex) => {
                if (key === 'backspace') {
                  return (
                    <TouchableOpacity
                      key={`key-${keyIndex}`}
                      activeOpacity={0.6}
                      onPress={handleBackspace}
                      style={[
                        styles.keypadBtn,
                        { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                      ]}
                      accessibilityLabel="Backspace"
                    >
                      <AppIcon name="backspace" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                  );
                }

                if (key === '') {
                  return (
                    <View
                      key={`empty-${keyIndex}`}
                      style={[styles.keypadBtn, { backgroundColor: 'transparent', borderColor: 'transparent' }]}
                    />
                  );
                }

                return (
                  <TouchableOpacity
                    key={`key-${key}`}
                    activeOpacity={0.6}
                    onPress={() => handleDigitPress(key)}
                    style={[
                      styles.keypadBtn,
                      { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                    ]}
                  >
                    <AppText variant="h2" color="textPrimary" style={{ fontWeight: '700' }}>
                      {key}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Bottom Verify Button */}
        <View style={[styles.bottomSection, { marginTop: spacing.lg }]}>
          <AppButton
            title="Verify OTP"
            onPress={() => verifyAndProceed(otp)}
            disabled={otp.length !== 6}
            variant="primary"
            size="lg"
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    marginTop: 6,
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: -0.5,
  },
  sentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  otpInputWrapper: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginVertical: 16,
    justifyContent: 'center',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  realOverlayInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 60,
    opacity: 0.01,
    color: 'transparent',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keypadContainer: {
    width: '100%',
    gap: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  keypadBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 16,
  },
});

export default OtpVerificationScreen;
