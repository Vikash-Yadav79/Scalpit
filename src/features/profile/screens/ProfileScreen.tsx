import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { logoutUser } from '../../auth/authSlice';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppIcon, IconName } from '../../../components/common/AppIcon';
import { AppDivider } from '../../../components/common/AppDivider';
import { AppModal } from '../../../components/common/AppModal';
import { AppButton } from '../../../components/common/AppButton';
import { ThemeType } from '../../../theme/colors';
import { maskMobile } from '../../../utils/formatters';
import { resetToAuth } from '../../../navigation/navigationUtils';

export const ProfileScreen: React.FC = () => {
  const { colors, spacing, radius, shadows, themeType, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { user, isMockMode } = useAppSelector(state => state.auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await dispatch(logoutUser());
    resetToAuth('Login');
  };

  const themes: Array<{ id: ThemeType; label: string; color: string }> = [
    { id: 'green', label: 'Emerald Green', color: '#00B386' },
    { id: 'blue', label: 'Fintech Blue', color: '#1E40AF' },
    { id: 'dark', label: 'Dark Mode', color: '#1F2937' },
  ];

  const profileOptions: Array<{
    id: string;
    icon: IconName;
    title: string;
    subtitle?: string;
  }> = [
    { id: 'bank', icon: 'wallet', title: 'Bank & Mandates', subtitle: 'HDFC Bank •••• 4012' },
    { id: 'kyc', icon: 'shield', title: 'KYC & Demat Documents', subtitle: 'Verified & Active' },
    { id: 'statements', icon: 'orders', title: 'P&L and Tax Reports' },
    { id: 'security', icon: 'lock', title: 'App Lock & Biometrics' },
    { id: 'help', icon: 'info', title: '24/7 Investor Help Center' },
  ];

  return (
    <ScreenContainer>
      <AppHeader title="Account & Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}
      >
        {/* User Card */}
        <View
          style={[
            styles.userCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.xl,
              padding: spacing.lg,
            },
            shadows.sm,
          ]}
        >
          <View style={styles.userRow}>
            <View
              style={[
                styles.avatarCircle,
                {
                  backgroundColor: colors.primarySoft,
                  borderColor: colors.primary,
                  borderRadius: radius.round,
                },
              ]}
            >
              <AppText variant="h2" color="primary" style={{ fontWeight: '800' }}>
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </AppText>
            </View>

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                {user?.name || 'Scalpit Investor'}
              </AppText>
              <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                {user?.mobile ? maskMobile(user.mobile) : '+91 98******10'}
              </AppText>
              {user?.email && (
                <AppText variant="micro" color="textTertiary" style={{ marginTop: 2 }}>
                  {user.email}
                </AppText>
              )}
            </View>

            <View
              style={[
                styles.kycPill,
                {
                  backgroundColor: user?.isKycVerified ? colors.gainSoft : colors.warning + '25',
                  borderRadius: radius.sm,
                },
              ]}
            >
              <AppIcon
                name={user?.isKycVerified ? 'check-circle' : 'alert'}
                size={12}
                color={user?.isKycVerified ? colors.gain : colors.warning}
              />
              <AppText
                variant="micro"
                style={{
                  color: user?.isKycVerified ? colors.gain : colors.warning,
                  fontWeight: '700',
                  marginLeft: 3,
                }}
              >
                {user?.isKycVerified ? 'KYC Verified' : 'KYC Pending'}
              </AppText>
            </View>
          </View>
        </View>

        {/* Centralized Theme Switcher */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginTop: spacing.lg,
            },
            shadows.sm,
          ]}
        >
          <View style={styles.sectionHeader}>
            <AppIcon name="sliders" size={18} color={colors.primary} />
            <AppText
              variant="h4"
              color="textPrimary"
              style={{ fontWeight: '700', marginLeft: spacing.sm }}
            >
              App Color Theme
            </AppText>
          </View>
          <AppText
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 2, marginBottom: spacing.md }}
          >
            Centralized design system: Changes apply instantly across the whole app.
          </AppText>

          <View style={styles.themeButtonsRow}>
            {themes.map(t => {
              const isSelected = themeType === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  onPress={() => setTheme(t.id)}
                  style={[
                    styles.themeBtn,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                      backgroundColor: isSelected ? colors.primarySoft : colors.surfaceSubtle,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: t.color, borderRadius: radius.round },
                    ]}
                  />
                  <AppText
                    variant="caption"
                    color={isSelected ? 'primary' : 'textSecondary'}
                    style={{ fontWeight: isSelected ? '700' : '500', marginLeft: 6 }}
                  >
                    {t.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Account Details & Settings Items */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.xl,
              marginTop: spacing.lg,
            },
            shadows.sm,
          ]}
        >
          {profileOptions.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={[styles.menuRow, { padding: spacing.md }]}
                onPress={() => {}}
              >
                <View
                  style={[
                    styles.menuIconCircle,
                    { backgroundColor: colors.surfaceSubtle, borderRadius: radius.md },
                  ]}
                >
                  <AppIcon name={item.icon} size={18} color={colors.textPrimary} />
                </View>

                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '600' }}>
                    {item.title}
                  </AppText>
                  {item.subtitle && (
                    <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                      {item.subtitle}
                    </AppText>
                  )}
                </View>

                <AppIcon name="chevron-right" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
              {index < profileOptions.length - 1 && <AppDivider />}
            </React.Fragment>
          ))}
        </View>

        {/* Mode Indicator & App Info */}
        <View style={[styles.infoFooter, { marginTop: spacing.xl }]}>
          <AppText variant="micro" color="textTertiary">
            Scalpit v1.0.0 (Build 1) • {isMockMode ? 'Dev Mock Mode Active' : 'Production API'}
          </AppText>
          <AppText variant="micro" color="textTertiary" style={{ marginTop: 2 }}>
            SEBI Reg No: INZ000201334 • Member of NSE & BSE
          </AppText>
        </View>

        {/* Logout Button */}
        <AppButton
          title="Log Out"
          onPress={() => setShowLogoutModal(true)}
          variant="outline"
          size="md"
          leftIcon="logout"
          style={{ marginTop: spacing.xl, marginBottom: spacing.xxl }}
        />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <AppModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log Out of Scalpit?"
      >
        <AppText variant="body" color="textSecondary" style={{ marginBottom: spacing.xl }}>
          You will need to verify with your mobile number to sign back in.
        </AppText>

        <View style={styles.modalButtonsRow}>
          <AppButton
            title="Cancel"
            onPress={() => setShowLogoutModal(false)}
            variant="ghost"
            size="md"
            fullWidth={false}
            style={{ flex: 1, marginRight: spacing.sm }}
          />
          <AppButton
            title="Log Out"
            onPress={handleLogout}
            variant="primary"
            size="md"
            fullWidth={false}
            style={{ flex: 1, backgroundColor: colors.loss }}
          />
        </View>
      </AppModal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  userCard: {
    borderWidth: 1,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kycPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sectionCard: {
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 3,
    borderWidth: 1.5,
  },
  colorDot: {
    width: 10,
    height: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
