import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { KeyboardWrapper } from '../../../components/layout/KeyboardWrapper';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type EmailLoginNavProp = StackNavigationProp<AuthStackParamList, 'EmailPasswordLogin'>;

export const EmailPasswordLoginScreen: React.FC = () => {
  const { spacing } = useTheme();
  const navigation = useNavigation<EmailLoginNavProp>();

  const [email, setEmail] = useState('poonamsunil1966@gmail.com');
  const [password, setPassword] = useState('99326');
  const [showPassword, setShowPassword] = useState(false);

  const handleEnter = () => {
    // Navigates to App PIN screen (matching Groww journey Page 1 -> Page 3)
    navigation.navigate('AppPin', {
      userName: 'Punam Kumari',
      targetRoute: 'Main',
    });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
      />

      <KeyboardWrapper contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}>
        {/* Top Centered Brand Logo */}
        <View style={styles.logoRow}>
          <Image
            source={assets.brand.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Input Fields */}
        <View style={[styles.formContainer, { marginTop: spacing.xxl }]}>
          {/* Email Address */}
          <AppText
            variant="caption"
            color="textSecondary"
            style={styles.inputLabel}
          >
            EMAIL ADDRESS
          </AppText>
          <AppInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputBox}
          />

          {/* Password */}
          <AppText
            variant="caption"
            color="textSecondary"
            style={[styles.inputLabel, { marginTop: spacing.xl }]}
          >
            ENTER PASSWORD
          </AppText>
          <AppInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword(prev => !prev)}
            containerStyle={styles.inputBox}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.7}
            style={styles.forgotLinkContainer}
          >
            <AppText
              variant="bodySmall"
              color="primary"
              style={styles.forgotLink}
            >
              Forgot Password?
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Bottom CTA Button */}
        <View style={[styles.bottomContainer, { paddingBottom: spacing.xl }]}>
          <AppButton
            title="ENTER"
            onPress={handleEnter}
            variant="primary"
            size="lg"
            style={styles.enterBtn}
          />
        </View>
      </KeyboardWrapper>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  logoRow: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 130,
    height: 48,
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputBox: {
    marginBottom: 4,
  },
  forgotLinkContainer: {
    alignSelf: 'flex-end',
    marginTop: 12,
    padding: 4,
  },
  forgotLink: {
    fontWeight: '600',
  },
  bottomContainer: {
    paddingTop: 16,
  },
  enterBtn: {
    height: 52,
    borderRadius: 8,
  },
});

export default EmailPasswordLoginScreen;
