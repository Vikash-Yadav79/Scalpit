import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type CameraKycNavProp = StackNavigationProp<AuthStackParamList, 'CameraKyc'>;

const { width } = Dimensions.get('window');

export const CameraKycScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<CameraKycNavProp>();

  const [hasCaptured, setHasCaptured] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasCaptured(true);
    }, 600);
  };

  const handleRetake = () => {
    setHasCaptured(false);
  };

  const handleProceed = () => {
    // Next step in Groww flow: Nominee Review (matching uploaded screenshot)
    navigation.navigate('NomineeReview');
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title="Face Verification"
      />

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        <View style={styles.topInfo}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            {hasCaptured ? 'Selfie captured!' : 'Take a selfie'}
          </AppText>
          <AppText
            variant="body"
            color="textSecondary"
            style={{ marginTop: spacing.xs, textAlign: 'center' }}
          >
            {hasCaptured
              ? 'Make sure your face is clearly visible without blur or glare.'
              : 'As per SEBI regulations, a live photo is required to complete your KYC.'}
          </AppText>
        </View>

        {/* Camera Viewfinder Oval Frame */}
        <View style={styles.viewfinderContainer}>
          <View
            style={[
              styles.ovalFrame,
              {
                borderColor: hasCaptured ? '#00B386' : colors.primary,
                backgroundColor: hasCaptured ? colors.primarySoft : '#0F172A',
              },
            ]}
          >
            {hasCaptured ? (
              <View style={styles.capturedState}>
                <View style={[styles.avatarCircle, { backgroundColor: '#00B386' }]}>
                  <AppIcon name="user" size={72} color="#FFFFFF" />
                </View>
                <View style={styles.verifiedBadge}>
                  <AppIcon name="check" size={16} color="#FFFFFF" />
                  <AppText variant="micro" color="textInverse" style={{ fontWeight: '700', marginLeft: 4 }}>
                    FACE MATCHED (99.4%)
                  </AppText>
                </View>
              </View>
            ) : (
              <View style={styles.liveCameraState}>
                <View style={styles.faceSilhouette}>
                  <AppIcon name="user" size={84} color="rgba(255,255,255,0.4)" />
                </View>
                <View style={styles.liveIndicator}>
                  <View style={styles.blinkingDot} />
                  <AppText variant="micro" color="textInverse" style={{ fontWeight: '600' }}>
                    LIVE CAMERA VIEW
                  </AppText>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Guiding Instructions */}
        {!hasCaptured ? (
          <View style={styles.tipsBox}>
            <View style={styles.tipRow}>
              <AppIcon name="check" size={14} color="#00B386" style={{ marginRight: 8 }} />
              <AppText variant="caption" color="textSecondary">
                Look straight into the camera
              </AppText>
            </View>
            <View style={styles.tipRow}>
              <AppIcon name="check" size={14} color="#00B386" style={{ marginRight: 8 }} />
              <AppText variant="caption" color="textSecondary">
                Remove glasses, cap or face mask
              </AppText>
            </View>
            <View style={styles.tipRow}>
              <AppIcon name="check" size={14} color="#00B386" style={{ marginRight: 8 }} />
              <AppText variant="caption" color="textSecondary">
                Ensure good background lighting
              </AppText>
            </View>
          </View>
        ) : null}

        {/* Controls */}
        <View style={[styles.bottomSection, { paddingBottom: spacing.xl }]}>
          {hasCaptured ? (
            <View style={styles.actionRow}>
              <AppButton
                title="Retake"
                onPress={handleRetake}
                variant="outline"
                size="lg"
                fullWidth={false}
                style={{ flex: 1, marginRight: spacing.sm }}
              />
              <AppButton
                title="Looks Good"
                onPress={handleProceed}
                variant="primary"
                size="lg"
                fullWidth={false}
                style={[styles.primaryBtn, { flex: 1.4 }]}
              />
            </View>
          ) : (
            <View style={styles.shutterWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCapture}
                style={[styles.shutterOuter, { borderColor: '#00B386' }]}
              >
                <View style={[styles.shutterInner, { backgroundColor: '#00B386' }]} />
              </TouchableOpacity>
              <AppText variant="caption" color="textSecondary" style={{ marginTop: 8 }}>
                {isProcessing ? 'Capturing...' : 'Tap to take selfie'}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  viewfinderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ovalFrame: {
    width: width * 0.72,
    height: width * 0.92,
    borderRadius: (width * 0.72) / 2,
    borderWidth: 3,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  capturedState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00B386',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 16,
  },
  liveCameraState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceSilhouette: {
    marginBottom: 20,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  blinkingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  tipsBox: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: '#00B386',
  },
  shutterWrapper: {
    alignItems: 'center',
  },
  shutterOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
});

export default CameraKycScreen;
