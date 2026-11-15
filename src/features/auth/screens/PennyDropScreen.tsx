import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { PennyDropRing } from '../../../components/common/PennyDropRing';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type PennyDropNavProp = StackNavigationProp<AuthStackParamList, 'PennyDrop'>;

export const PennyDropScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<PennyDropNavProp>();

  const handleSuccess = () => {
    // Bank verified successfully -> proceed to Camera KYC Selfie
    navigation.navigate('CameraKyc');
  };

  const handleSimulateFailure = () => {
    // Navigate to Bank verification failed (PDF Page 10)
    navigation.navigate('BankFailed');
  };

  return (
    <ScreenContainer>
      <AppHeader
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('BankFaq')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AppText variant="body" color="textSecondary" style={styles.helpLink}>
              Need help?
            </AppText>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        <PennyDropRing
          initialSeconds={29}
          onComplete={handleSuccess}
        />

        {/* Demo Controls: Instant Next or Simulate Failure */}
        <View style={[styles.demoRow, { paddingBottom: spacing.xl }]}>
          <TouchableOpacity
            onPress={handleSuccess}
            style={[styles.demoPill, { backgroundColor: colors.primarySoft, borderColor: colors.primary }]}
          >
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              ✓ Quick Pass (Demo)
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSimulateFailure}
            style={[styles.demoPill, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
          >
            <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
              ✕ Test Fail State (Page 10)
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
    alignItems: 'center',
    paddingVertical: 16,
  },
  helpLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  demoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  demoPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default PennyDropScreen;
