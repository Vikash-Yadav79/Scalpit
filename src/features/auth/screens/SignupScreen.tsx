import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { sendOtp, clearAuthError } from '../authSlice';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { KeyboardWrapper } from '../../../components/layout/KeyboardWrapper';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { AppToast } from '../../../components/common/AppToast';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';
import { signupSchema } from '../authValidation';

type SignupNavProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<SignupNavProp>();
  const dispatch = useAppDispatch();
  const { isSendingOtp, error, isMockMode } = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const result = signupSchema.safeParse({
      name,
      countryCode: '+91',
      mobile,
      email: email || undefined,
      termsAccepted,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(
        sendOtp({ mobile, countryCode: '+91' })
      ).unwrap();

      navigation.navigate('OtpVerification', {
        mobile,
        countryCode: '+91',
        isSignup: true,
        name,
        email,
      });
    } catch {
      // Handled via Redux state.error
    }
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title="Open Demat Account"
      />

      <KeyboardWrapper contentContainerStyle={[styles.content, { padding: spacing.xl }]}>
        {isMockMode && (
          <View
            style={[
              styles.mockBadge,
              {
                backgroundColor: colors.warning + '25',
                borderColor: colors.warning,
                borderRadius: radius.md,
                padding: spacing.sm,
                marginBottom: spacing.md,
              },
            ]}
          >
            <AppIcon name="alert" size={16} color={colors.warning} />
            <AppText
              variant="micro"
              style={{ color: colors.warning, fontWeight: '600', marginLeft: spacing.xs, flex: 1 }}
            >
              Development Mock Mode: Free registration enabled for test flows.
            </AppText>
          </View>
        )}

        <View style={{ marginBottom: spacing.lg }}>
          <AppText variant="h2" color="textPrimary" style={{ fontWeight: '800' }}>
            Invest for Your Future
          </AppText>
          <AppText variant="bodySmall" color="textSecondary" style={{ marginTop: spacing.xs }}>
            Zero brokerage on equity investments. SEBI registered platform.
          </AppText>
        </View>

        <AppInput
          label="Full Legal Name"
          placeholder="As on your PAN card"
          value={name}
          onChangeText={val => {
            setName(val);
            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
          }}
          error={errors.name}
          leftIcon="user"
        />

        <AppInput
          label="Mobile Number"
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={val => {
            setMobile(val.replace(/[^0-9]/g, ''));
            if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
          }}
          error={errors.mobile}
          leftIcon="phone"
        />

        <AppInput
          label="Email Address (Optional)"
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={val => {
            setEmail(val);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
          error={errors.email}
          leftIcon="mail"
        />

        {/* Terms & Conditions Checkbox */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setTermsAccepted(prev => !prev);
            if (errors.termsAccepted) {
              setErrors(prev => ({ ...prev, termsAccepted: '' }));
            }
          }}
          style={styles.termsRow}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: errors.termsAccepted
                  ? colors.error
                  : termsAccepted
                  ? colors.primary
                  : colors.border,
                backgroundColor: termsAccepted ? colors.primary : colors.surface,
                borderRadius: radius.xs,
              },
            ]}
          >
            {termsAccepted && <AppIcon name="check" size={14} color={colors.textInverse} />}
          </View>

          <View style={styles.termsTextCol}>
            <AppText variant="caption" color="textSecondary">
              I agree to Scalpit's{' '}
              <AppText variant="caption" color="primary" style={{ fontWeight: '600' }}>
                Terms & Conditions
              </AppText>{' '}
              and{' '}
              <AppText variant="caption" color="primary" style={{ fontWeight: '600' }}>
                Privacy Policy
              </AppText>
            </AppText>
            {errors.termsAccepted && (
              <AppText variant="micro" color="error" style={{ marginTop: 2 }}>
                {errors.termsAccepted}
              </AppText>
            )}
          </View>
        </TouchableOpacity>

        <AppButton
          title="Proceed to Verification"
          onPress={handleSignup}
          loading={isSendingOtp}
          variant="primary"
          size="lg"
          rightIcon="arrow-right"
          style={{ marginTop: spacing.xl }}
        />

        <View style={styles.footerRow}>
          <AppText variant="bodySmall" color="textSecondary">
            Already have an account?{' '}
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardWrapper>

      <AppToast
        visible={Boolean(error)}
        message={error || ''}
        type="error"
        onDismiss={() => dispatch(clearAuthError())}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  mockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  termsTextCol: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 20,
  },
});

export default SignupScreen;
