import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { AppIcon } from '../common/AppIcon';

export interface StockData {
  id: string;
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: string;
}

export interface StockCardProps {
  stock: StockData;
  onPress?: () => void;
  style?: ViewStyle;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onPress, style }) => {
  const { colors, radius, spacing, shadows } = useTheme();

  const isPositive = stock.change >= 0;
  const trendColor = isPositive ? colors.gain : colors.loss;
  const trendBg = isPositive ? colors.gainSoft : colors.lossSoft;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.row,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          marginBottom: spacing.sm,
        },
        shadows.sm,
        style,
      ]}
    >
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: colors.surfaceSubtle,
            borderRadius: radius.sm,
            marginRight: spacing.md,
          },
        ]}
      >
        <AppText variant="h4" color="primary" style={{ fontWeight: '700' }}>
          {stock.symbol.slice(0, 2).toUpperCase()}
        </AppText>
      </View>

      <View style={styles.leftCol}>
        <AppText variant="h4" color="textPrimary" style={{ fontWeight: '600' }} numberOfLines={1}>
          {stock.symbol}
        </AppText>
        <AppText variant="caption" color="textSecondary" numberOfLines={1}>
          {stock.companyName}
        </AppText>
      </View>

      <View style={styles.rightCol}>
        <AppText variant="h4" color="textPrimary" style={{ fontWeight: '700' }}>
          ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </AppText>
        <View style={[styles.badge, { backgroundColor: trendBg }]}>
          <AppIcon
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={12}
            color={trendColor}
          />
          <AppText variant="micro" style={{ color: trendColor, fontWeight: '700', marginLeft: 3 }}>
            {isPositive ? '+' : ''}
            {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
            {stock.changePercent.toFixed(2)}%)
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCol: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 3,
  },
});

export default React.memo(StockCard);
