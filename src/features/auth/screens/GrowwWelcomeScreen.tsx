import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type GrowwWelcomeNavProp = StackNavigationProp<AuthStackParamList, 'GrowwWelcome'>;

const { width } = Dimensions.get('window');

export const GrowwWelcomeScreen: React.FC = () => {
  const { colors, spacing, radius, shadows } = useTheme();
  const navigation = useNavigation<GrowwWelcomeNavProp>();

  const handleContinueWithGoogle = () => {
    // Navigate straight to mobile / OTP flow with realistic demo credentials (PDF Page 2)
    navigation.navigate('Login');
  };

  const handleUseAnotherEmail = () => {
    // Navigate to Email & Password Login Screen (PDF Page 1)
    navigation.navigate('EmailPasswordLogin');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        {/* Top Company Brand Logo */}
        <View style={styles.topLogoRow}>
          <Image
            source={assets.brand.logo}
            style={styles.brandLogo}
            resizeMode="contain"
          />
        </View>

        {/* Title Header */}
        <View style={styles.header}>
          <AppText
            variant="display"
            color="textPrimary"
            align="center"
            style={styles.title}
          >
            Grow your wealth
          </AppText>
          <AppText
            variant="h4"
            color="textSecondary"
            align="center"
            style={styles.subtitle}
          >
            Stocks • Mutual Funds • F&O
          </AppText>
        </View>

        {/* Center Isometric City & Logo Orb Graphic */}
        <View style={styles.graphicContainer}>
          <Image
            source={assets.illustrations.emptyPortfolio}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Continue with Google */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleContinueWithGoogle}
            style={[
              styles.authButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.lg,
              },
              shadows.sm,
            ]}
          >
            {/* Google G icon representation */}
            <View style={styles.googleIconBox}>
              <AppIcon name="explore" size={20} color="#4285F4" />
            </View>
            <AppText
              variant="bodyLarge"
              color="textPrimary"
              style={styles.buttonText}
            >
              Continue with Google
            </AppText>
          </TouchableOpacity>

          {/* Use another email / phone */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleUseAnotherEmail}
            style={[
              styles.authButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.lg,
                marginTop: spacing.md,
              },
              shadows.sm,
            ]}
          >
            <AppIcon
              name="mail"
              size={20}
              color={colors.textPrimary}
              style={{ marginRight: 12 }}
            />
            <AppText
              variant="bodyLarge"
              color="textPrimary"
              style={styles.buttonText}
            >
              Use another email
            </AppText>
          </TouchableOpacity>

          {/* Trouble Logging In? */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
            style={styles.troubleRow}
          >
            <AppText
              variant="bodySmall"
              color="textPrimary"
              style={styles.troubleText}
            >
              Trouble logging in?
            </AppText>
          </TouchableOpacity>

          {/* Terms & Declarations Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <AppText variant="caption" color="textSecondary" align="center">
              By proceeding, I accept{' '}
              <AppText variant="caption" color="primary" style={styles.linkText}>
                T&C
              </AppText>
              ,{' '}
              <AppText variant="caption" color="primary" style={styles.linkText}>
                Privacy Policy
              </AppText>
              ,{' '}
              <AppText variant="caption" color="primary" style={styles.linkText}>
                Tariff Rates
              </AppText>
              ,{'\n'}
              <AppText variant="caption" color="primary" style={styles.linkText}>
                FATCA Declaration
              </AppText>{' '}
              &{' '}
              <AppText variant="caption" color="primary" style={styles.linkText}>
                CIBIL T&C
              </AppText>
              .
            </AppText>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  topLogoRow: {
    alignItems: 'center',
    marginTop: 12,
  },
  brandLogo: {
    width: 110,
    height: 38,
    borderRadius: 8,
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontWeight: '500',
    fontSize: 16,
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: width * 0.95,
    overflow: 'hidden',
  },
  illustration: {
    width: width * 0.9,
    height: width * 0.9,
  },
  actionsContainer: {
    width: '100%',
    paddingBottom: 8,
  },
  authButton: {
    height: 54,
    borderWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  googleIconBox: {
    marginRight: 12,
  },
  buttonText: {
    fontWeight: '600',
  },
  troubleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  troubleText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerDisclaimer: {
    marginTop: 6,
    paddingHorizontal: 8,
  },
  linkText: {
    fontWeight: '600',
  },
});

export default GrowwWelcomeScreen;
