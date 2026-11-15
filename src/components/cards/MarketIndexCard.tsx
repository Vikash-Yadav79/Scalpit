import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { AppIcon } from '../common/AppIcon';

export interface MarketIndexData {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isOpen?: boolean;
}

export interface MarketIndexCardProps {
  data: MarketIndexData;
  onPress?: () => void;
  style?: ViewStyle;
}

export const MarketIndexCard: React.FC<MarketIndexCardProps> = ({
  data,
  onPress,
  style,
}) => {
  const { colors, radius, spacing, shadows } = useTheme();

  const isPositive = data.change >= 0;
  const trendColor = isPositive ? colors.gain : colors.loss;
  const trendBg = isPositive ? colors.gainSoft : colors.lossSoft;

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
        <AppText variant="h4" color="textPrimary" style={{ fontWeight: '700' }}>
          {data.name}
        </AppText>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: data.isOpen ? colors.gainSoft : colors.surfaceSubtle,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: data.isOpen ? colors.gain : colors.textTertiary },
            ]}
          />
          <AppText
            variant="micro"
            color={data.isOpen ? 'gain' : 'textTertiary'}
            style={{ fontWeight: '600' }}
          >
            {data.isOpen ? 'LIVE' : 'CLOSED'}
          </AppText>
        </View>
      </View>

      <AppText variant="numericMedium" color="textPrimary" style={{ marginVertical: spacing.xs }}>
        {data.value.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </AppText>

      <View style={styles.bottomRow}>
        <View style={[styles.badge, { backgroundColor: trendBg }]}>
          <AppIcon
            name={isPositive ? 'arrow-up-right' : 'arrow-down-right'}
            size={13}
            color={trendColor}
            strokeWidth={2.5}
          />
          <AppText
            variant="micro"
            style={{ color: trendColor, fontWeight: '700', marginLeft: 2 }}
          >
            {isPositive ? '+' : ''}
            {data.change.toFixed(2)} ({isPositive ? '+' : ''}
            {data.changePercent.toFixed(2)}%)
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderWidth: 1,
    marginRight: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
});

export default React.memo(MarketIndexCard);
