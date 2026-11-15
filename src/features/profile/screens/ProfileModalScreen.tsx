import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { logoutUser } from '../../auth/authSlice';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon, IconName } from '../../../components/common/AppIcon';
import { AppModal } from '../../../components/common/AppModal';
import { ThemeType } from '../../../theme/colors';
import { maskMobile } from '../../../utils/formatters';

type NavProp = StackNavigationProp<RootStackParamList>;

export const ProfileModalScreen: React.FC = () => {
  const { colors, spacing, radius, themeType, setTheme } = useTheme();
  const navigation = useNavigation<NavProp>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', params: { screen: 'Login' } }],
    });
  };

  const themes: Array<{ id: ThemeType; label: string; color: string }> = [
    { id: 'dark', label: 'Dark Mode (Obsidian)', color: '#0B0E14' },
    { id: 'green', label: 'Emerald Green', color: '#00B386' },
    { id: 'blue', label: 'Fintech Blue', color: '#1E40AF' },
  ];

  const profileOptions: Array<{
    id: string;
    icon: IconName;
    title: string;
    subtitle?: string;
  }> = [
    { id: 'demat', icon: 'shield', title: 'Demat & Trading Account', subtitle: 'BO ID: 12081600-984210' },
    { id: 'bank', icon: 'bank', title: 'Bank Accounts & Mandates', subtitle: 'State Bank of India •••• 4892' },
    { id: 'nominee', icon: 'user', title: 'Nominee Details', subtitle: 'GHANSHYAM YADAV (100%)' },
    { id: 'reports', icon: 'orders', title: 'P&L, Tax & Contract Notes', subtitle: 'FY 2026-27' },
    { id: 'security', icon: 'lock', title: 'PIN & Biometric Security', subtitle: '4-Digit PIN Enabled' },
    { id: 'help', icon: 'help-circle', title: '24x7 Scalpit Help & Support', subtitle: 'Tickets & FAQ' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Account & Profile"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}
      >
        {/* User Card */}
        <View
          style={[
            styles.userCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={styles.userRow}>
            <View
              style={[
                styles.avatarCircle,
                {
                  backgroundColor: colors.surfaceSubtle,
                  borderColor: colors.primary,
                  borderRadius: radius.round,
                },
              ]}
            >
              <AppText variant="h2" color="primary" style={{ fontWeight: '800' }}>
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </AppText>
            </View>

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                {user?.name || 'Ankit Yadav'}
              </AppText>
              <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                {user?.mobile ? maskMobile(user.mobile) : '+91 98421 89410'}
              </AppText>
              <AppText variant="micro" color="textTertiary" style={{ marginTop: 2 }}>
                {user?.email || 'ankit.investor@scalpit.com'}
              </AppText>
            </View>

            <View
              style={[
                styles.kycPill,
                {
                  backgroundColor: 'rgba(0,208,156,0.15)',
                  borderRadius: radius.sm,
                },
              ]}
            >
              <AppIcon name="check-circle" size={12} color={colors.gain} />
              <AppText
                variant="micro"
                style={{
                  color: colors.gain,
                  fontWeight: '700',
                  marginLeft: 3,
                }}
              >
                KYC Active
              </AppText>
            </View>
          </View>
        </View>

        {/* Centralized Theme Switcher */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <AppIcon name="sliders" size={18} color={colors.primary} />
            <AppText
              variant="h4"
              color="textPrimary"
              style={{ fontWeight: '700', marginLeft: spacing.sm }}
            >
              Application Theme
            </AppText>
          </View>

          <View style={[styles.themeRow, { marginTop: spacing.md }]}>
            {themes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setTheme(item.id)}
                style={[
                  styles.themeButton,
                  {
                    borderColor: themeType === item.id ? colors.primary : colors.border,
                    backgroundColor:
                      themeType === item.id ? colors.surfaceSubtle : colors.surface,
                    borderRadius: radius.md,
                    padding: spacing.sm,
                  },
                ]}
              >
                <View
                  style={[
                    styles.themeColorDot,
                    {
                      backgroundColor: item.color,
                      borderColor: '#4B5563',
                      borderWidth: 1,
                    },
                  ]}
                />
                <AppText
                  variant="micro"
                  style={{
                    color: themeType === item.id ? colors.primary : colors.textSecondary,
                    fontWeight: themeType === item.id ? '700' : '500',
                    marginTop: 4,
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Options List */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
              marginTop: spacing.lg,
            },
          ]}
        >
          {profileOptions.map((opt, idx) => (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionRow,
                {
                  padding: spacing.md,
                  borderBottomColor: colors.border,
                  borderBottomWidth: idx < profileOptions.length - 1 ? 1 : 0,
                },
              ]}
            >
              <View
                style={[
                  styles.optionIconCircle,
                  {
                    backgroundColor: colors.surfaceSubtle,
                    borderRadius: radius.md,
                  },
                ]}
              >
                <AppIcon name={opt.icon} size={18} color={colors.primary} />
              </View>

              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <AppText variant="body" color="textPrimary" style={{ fontWeight: '600' }}>
                  {opt.title}
                </AppText>
                {opt.subtitle && (
                  <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
                    {opt.subtitle}
                  </AppText>
                )}
              </View>

              <AppIcon name="chevron-right" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Action */}
        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={[
            styles.logoutButton,
            {
              backgroundColor: 'rgba(235,87,87,0.1)',
              borderColor: colors.error,
              borderRadius: radius.lg,
              padding: spacing.md,
              marginTop: spacing.xl,
            },
          ]}
        >
          <AppIcon name="logout" size={18} color={colors.error} />
          <AppText
            variant="body"
            color="error"
            style={{ fontWeight: '700', marginLeft: spacing.sm }}
          >
            Log Out from Scalpit
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <AppModal
        visible={showLogoutModal}
        title="Log Out?"
        onClose={() => setShowLogoutModal(false)}
      >
        <AppText variant="body" color="textSecondary" style={{ lineHeight: 22 }}>
          Are you sure you want to log out from Scalpit? You will need to enter your mobile number and PIN to access your account again.
        </AppText>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={() => setShowLogoutModal(false)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AppButton
              title="Yes, Log Out"
              variant="primary"
              onPress={handleLogout}
            />
          </View>
        </View>
      </AppModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  kycPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sectionCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  themeColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconCircle: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default ProfileModalScreen;
