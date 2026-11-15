import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { KeyboardWrapper } from '../../../components/layout/KeyboardWrapper';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type LoginNavProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<LoginNavProp>();

  const countryCode = '+91';
  const [mobile, setMobile] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(cleaned);
    if (validationError) setValidationError('');
  };

  const handleContinue = () => {
    if (mobile.length !== 10) {
      setValidationError('Please enter a valid 10-digit mobile number');
      return;
    }

    navigation.navigate('OtpVerification', {
      mobile,
      countryCode,
      isSignup: false,
    });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
      />

      <KeyboardWrapper contentContainerStyle={[styles.scrollContent, { padding: spacing.xl }]}>
        <View style={styles.topSection}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            Enter Mobile number
          </AppText>
          <AppText
            variant="body"
            color="textSecondary"
            style={{ marginTop: spacing.xs }}
          >
            We will send you an OTP to verify your number
          </AppText>

          {/* Quick Demo Autofill Badge */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setMobile('9876543210');
              if (validationError) setValidationError('');
            }}
            style={[
              styles.demoBadge,
              {
                backgroundColor: colors.surfaceSubtle,
                borderColor: colors.border,
                borderRadius: radius.md,
                padding: spacing.sm,
                marginTop: spacing.md,
              },
            ]}
          >
            <AppIcon name="phone" size={16} color={colors.primary} />
            <AppText
              variant="micro"
              style={{ color: colors.textSecondary, marginLeft: spacing.xs, flex: 1 }}
            >
              Demo: Tap to fill <AppText variant="micro" color="primary" style={{ fontWeight: '800' }}>9876543210</AppText> or type your own number below.
            </AppText>
          </TouchableOpacity>

          {/* Input Form */}
          <View style={[styles.form, { marginTop: spacing.lg }]}>
            <View style={styles.inputRow}>
              {/* Country Code Pill */}
              <View
                style={[
                  styles.countryCodePill,
                  {
                    backgroundColor: colors.surfaceSubtle,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                    marginRight: spacing.sm,
                  },
                ]}
              >
                <AppText variant="h4" color="textPrimary" style={{ fontWeight: '600' }}>
                  {countryCode}
                </AppText>
              </View>

              {/* Mobile Number Input */}
              <View style={{ flex: 1 }}>
                <AppInput
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={handleMobileChange}
                  showClear
                  onClear={() => setMobile('')}
                  error={validationError}
                  containerStyle={{ marginBottom: 0 }}
                  autoFocus
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomSection}>
          <AppButton
            title="Continue"
            onPress={handleContinue}
            disabled={mobile.length !== 10}
            variant="primary"
            size="lg"
            style={styles.continueBtn}
          />

          <View style={styles.footerRow}>
            <AppText variant="caption" color="textSecondary">
              By proceeding, you agree to the terms & privacy policy.
            </AppText>
          </View>
        </View>
      </KeyboardWrapper>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    marginTop: 10,
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: -0.5,
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  form: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countryCodePill: {
    height: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 16,
  },
  continueBtn: {
    borderRadius: 8,
  },
  footerRow: {
    alignItems: 'center',
    marginTop: 12,
  },
});

export default LoginScreen;
