import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { AppIcon } from '../common/AppIcon';

export interface MutualFundData {
  id: string;
  name: string;
  category: string;
  cagr3y: number;
  rating: number;
  minSip: number;
}

export interface MutualFundCardProps {
  fund: MutualFundData;
  onPress?: () => void;
  style?: ViewStyle;
}

export const MutualFundCard: React.FC<MutualFundCardProps> = ({
  fund,
  onPress,
  style,
}) => {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: spacing.md,
        },
        shadows.sm,
        style,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.fundInfo}>
          <AppText
            variant="h4"
            color="textPrimary"
            style={{ fontWeight: '600' }}
            numberOfLines={2}
          >
            {fund.name}
          </AppText>
          <View style={styles.categoryRow}>
            <AppText variant="caption" color="textSecondary">
              {fund.category}
            </AppText>
            <View style={[styles.dot, { backgroundColor: colors.textTertiary }]} />
            <View style={styles.ratingRow}>
              <AppIcon name="star" size={12} color="#F59E0B" />
              <AppText
                variant="micro"
                color="textSecondary"
                style={{ marginLeft: 3, fontWeight: '600' }}
              >
                {fund.rating}★
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.returnCol}>
          <AppText variant="h3" color="gain" style={{ fontWeight: '700' }}>
            +{fund.cagr3y.toFixed(1)}%
          </AppText>
          <AppText variant="micro" color="textTertiary">
            3Y Annualized
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.bottomRow,
          {
            borderTopColor: colors.divider,
            paddingTop: spacing.xs,
            marginTop: spacing.sm,
          },
        ]}
      >
        <AppText variant="micro" color="textTertiary">
          Min SIP: ₹{fund.minSip.toLocaleString('en-IN')} / mo
        </AppText>
        <View style={styles.exploreLink}>
          <AppText variant="micro" color="primary" style={{ fontWeight: '600' }}>
            Invest Now
          </AppText>
          <AppIcon name="chevron-right" size={12} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fundInfo: {
    flex: 1,
    marginRight: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnCol: {
    alignItems: 'flex-end',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  exploreLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(MutualFundCard);
