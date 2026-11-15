import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { AppIcon, IconName } from '../../../components/common/AppIcon';

export interface QuickActionItem {
  id: string;
  title: string;
  icon: IconName;
  badge?: string;
}

export interface QuickActionsProps {
  onActionPress?: (actionId: string) => void;
}

const actions: QuickActionItem[] = [
  { id: 'stocks', title: 'Stocks', icon: 'stocks' },
  { id: 'mutual-funds', title: 'Mutual Funds', icon: 'mutual-funds' },
  { id: 'ipo', title: 'IPO', icon: 'activity', badge: '3 Open' },
  { id: 'watchlist', title: 'Watchlist', icon: 'star' },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionPress }) => {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View style={[styles.container, { marginVertical: spacing.md }]}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.75}
          onPress={() => onActionPress && onActionPress(action.id)}
          style={[
            styles.actionTile,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.md,
            },
            shadows.sm,
          ]}
          accessibilityRole="button"
          accessibilityLabel={action.title}
        >
          {action.badge && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <AppText variant="micro" color="textInverse" style={{ fontSize: 9, fontWeight: '700' }}>
                {action.badge}
              </AppText>
            </View>
          )}

          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: colors.primarySoft,
                borderRadius: radius.md,
                marginBottom: spacing.xs,
              },
            ]}
          >
            <AppIcon name={action.icon} size={22} color={colors.primary} />
          </View>

          <AppText
            variant="caption"
            color="textPrimary"
            align="center"
            style={{ fontWeight: '600' }}
            numberOfLines={1}
          >
            {action.title}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionTile: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    minHeight: 88,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(QuickActions);
