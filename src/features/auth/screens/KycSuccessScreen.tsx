import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthenticatedUser } from '../authSlice';
import { resetToMain } from '../../../navigation/navigationUtils';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';

export const KycSuccessScreen: React.FC = () => {
  const { colors, spacing, radius, shadows } = useTheme();
  const dispatch = useAppDispatch();

  const handleStartInvesting = () => {
    // Persist authenticated state in Redux
    dispatch(
      setAuthenticatedUser({
        id: 'usr_demo_101',
        name: 'Vikash Yadav',
        mobile: '9876543210',
        countryCode: '+91',
        isKycVerified: true,
        createdAt: new Date().toISOString(),
      })
    );
    // Reset to Main Tab dashboard
    resetToMain();
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <View style={[styles.container, { padding: spacing.xl }]}>
        <View style={styles.centerBox}>
          {/* Green Check Circle */}
          <View style={[styles.successCircle, { backgroundColor: '#00B386' }, shadows.md]}>
            <AppIcon name="check" size={54} color="#FFFFFF" strokeWidth={3} />
          </View>

          <AppText variant="display" color="textPrimary" align="center" style={styles.title}>
            Congratulations!
          </AppText>
          <AppText
            variant="body"
            color="textSecondary"
            align="center"
            style={{ marginTop: 8, lineHeight: 22 }}
          >
            Your Demat & Trading account has been verified and activated successfully.
          </AppText>

          {/* Account Summary Card */}
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.xl,
                padding: spacing.lg,
                marginTop: 28,
              },
              shadows.sm,
            ]}
          >
            <View style={styles.summaryRow}>
              <AppText variant="caption" color="textSecondary">
                Account Holder
              </AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                Vikash Yadav
              </AppText>
            </View>

            <View style={styles.summaryRow}>
              <AppText variant="caption" color="textSecondary">
                Demat BO ID
              </AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '600' }}>
                12081600-984210
              </AppText>
            </View>

            <View style={styles.summaryRow}>
              <AppText variant="caption" color="textSecondary">
                Exchanges
              </AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '600' }}>
                NSE & BSE Active
              </AppText>
            </View>

            <View style={styles.summaryRow}>
              <AppText variant="caption" color="textSecondary">
                Zero Brokerage
              </AppText>
              <AppText variant="body" color="primary" style={{ fontWeight: '700' }}>
                ₹0 on Equity Delivery
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <AppButton
            title="Start Investing"
            onPress={handleStartInvesting}
            variant="primary"
            size="lg"
            rightIcon="arrow-right"
            style={styles.startBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  summaryCard: {
    width: '100%',
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 16,
  },
  startBtn: {
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
});

export default KycSuccessScreen;
