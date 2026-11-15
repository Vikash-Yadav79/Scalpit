import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthenticatedUser } from '../authSlice';
import { resetToMain } from '../../../navigation/navigationUtils';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppPinKeypad } from '../../../components/common/AppPinKeypad';
import { AppIcon } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type AppPinRouteProp = RouteProp<AuthStackParamList, 'AppPin'>;

export const AppPinScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const route = useRoute<AppPinRouteProp>();
  const dispatch = useAppDispatch();

  const userName = route.params?.userName || 'Punam Kumari';
  const [pin, setPin] = useState('');

  const handleDigitPress = (digit: string) => {
    if (digit === '.') return; // Skip dot for numeric PIN
    const nextPin = pin + digit;
    setPin(nextPin);

    // Auto-authenticate when 4 digits entered (e.g. 1234 or any demo PIN)
    if (nextPin.length === 4) {
      setTimeout(() => {
        dispatch(
          setAuthenticatedUser({
            id: 'usr_punam_102',
            name: userName,
            email: 'poonamsunil1966@gmail.com',
            mobile: '9608856585',
            countryCode: '+91',
            isKycVerified: true,
            createdAt: new Date().toISOString(),
          })
        );
        resetToMain();
      }, 200);
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(prev => prev.slice(0, -1));
    }
  };

  return (
    <ScreenContainer>
      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        {/* Top Header Row with Logo and User Avatar */}
        <View style={styles.topHeader}>
          <Image
            source={assets.brand.logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={[styles.avatarCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <AppIcon name="user" size={20} color={colors.primary} />
          </View>
        </View>

        {/* Title and Security Description */}
        <View style={styles.titleSection}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            Enter {userName}'s Scalpit PIN
          </AppText>
          <AppText
            variant="body"
            color="textSecondary"
            style={[styles.subtitle, { marginTop: spacing.xs }]}
          >
            To keep your finances secure, we'll ask for this PIN every time you open the app.
          </AppText>
        </View>

        {/* 4-Digit Rounded Boxes and On-Screen Keypad */}
        <View style={styles.keypadContainer}>
          <AppPinKeypad
            pin={pin}
            maxDigits={4}
            onDigitPress={handleDigitPress}
            onBackspace={handleBackspace}
          />

          {/* Forgot PIN Link */}
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.7}
            style={styles.forgotContainer}
          >
            <AppText variant="bodySmall" color="textSecondary" style={styles.forgotText}>
              Forgot Pin?
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  logo: {
    width: 100,
    height: 36,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  subtitle: {
    lineHeight: 20,
  },
  keypadContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  forgotContainer: {
    marginTop: 12,
    padding: 6,
  },
  forgotText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default AppPinScreen;
