import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';

export interface HomeHeaderProps {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSearchPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const { colors, spacing, radius } = useTheme();
  const { user } = useAppSelector(state => state.auth);

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          paddingHorizontal: spacing.lg,
        },
      ]}
    >
      {/* Official Company Branding - Display Logo, no hardcoded brand text */}
      <View style={styles.brandingRow}>
        <Image
          source={assets.brand.logo}
          style={[styles.logo, { borderRadius: radius.xs }]}
          resizeMode="contain"
        />
      </View>

      {/* Right Controls */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={onSearchPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.iconBtn,
            { backgroundColor: colors.surfaceSubtle, borderRadius: radius.round, marginRight: spacing.sm },
          ]}
          accessibilityLabel="Search"
          accessibilityRole="button"
        >
          <AppIcon name="search" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNotificationPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.iconBtn,
            { backgroundColor: colors.surfaceSubtle, borderRadius: radius.round, marginRight: spacing.sm },
          ]}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
        >
          <AppIcon name="bell" size={20} color={colors.textPrimary} />
          <View style={[styles.notificationDot, { backgroundColor: colors.primary }]} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onProfilePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.profileAvatar,
            {
              backgroundColor: colors.primarySoft,
              borderColor: colors.primary,
              borderRadius: radius.round,
            },
          ]}
          accessibilityLabel="User profile"
          accessibilityRole="button"
        >
          <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
            {userInitial}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 34,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(HomeHeader);
