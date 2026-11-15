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
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type AadhaarFinalStepNavProp = StackNavigationProp<AuthStackParamList, 'AadhaarFinalStep'>;

const { width } = Dimensions.get('window');

export const AadhaarFinalStepScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<AadhaarFinalStepNavProp>();

  const handleProceedToEsign = () => {
    // Navigates to the official Digio Account Opening form preview (Screenshot 4)
    navigation.navigate('VerifyAadhaar');
  };

  return (
    <ScreenContainer>
      {/* Header matching Groww Screenshot 5 */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppIcon name="chevron-left" size={26} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <AppText variant="bodySmall" color="textPrimary" style={styles.dontKnowLink}>
            Don't know Aadhaar?
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        {/* Center Graphic & Messaging */}
        <View style={styles.centerSection}>
          <Image
            source={assets.illustrations.flagPodium}
            style={styles.podiumGraphic}
            resizeMode="contain"
          />

          <AppText variant="display" color="textPrimary" align="center" style={styles.title}>
            You're just one step away!
          </AppText>

          <AppText
            variant="body"
            color="textSecondary"
            align="center"
            style={[styles.subtitle, { paddingHorizontal: spacing.md }]}
          >
            Complete eSign using your Aadhaar to activate your account
          </AppText>
        </View>

        {/* Bottom Action Area */}
        <View style={[styles.bottomSection, { paddingBottom: spacing.xl }]}>
          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <AppIcon name="shield" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
            <AppText variant="caption" color="textSecondary" style={{ fontWeight: '500' }}>
              Secured by UIDAI, Govt. of India
            </AppText>
          </View>

          {/* Big Green Proceed to eSign Button */}
          <AppButton
            title="Proceed to eSign"
            onPress={handleProceedToEsign}
            variant="primary"
            size="lg"
            rightIcon="arrow-up-right"
            style={styles.proceedBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dontKnowLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  podiumGraphic: {
    width: width * 0.55,
    height: width * 0.55,
    marginBottom: 28,
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  proceedBtn: {
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
});

export default AadhaarFinalStepScreen;
