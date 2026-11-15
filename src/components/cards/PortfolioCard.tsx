import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { AppIcon } from '../common/AppIcon';

export interface PortfolioSummaryData {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  totalReturnsPercent: number;
  oneDayReturns: number;
  oneDayReturnsPercent: number;
}

export interface PortfolioCardProps {
  data: PortfolioSummaryData;
  onPress?: () => void;
  style?: ViewStyle;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  data,
  onPress,
  style,
}) => {
  const { colors, radius, spacing, shadows } = useTheme();

  const isTotalGain = data.totalReturns >= 0;
  const isOneDayGain = data.oneDayReturns >= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.xl,
          padding: spacing.lg,
        },
        shadows.md,
        style,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppIcon name="wallet" size={18} color={colors.primary} style={{ marginRight: 6 }} />
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
            PORTFOLIO VALUE
          </AppText>
        </View>
        <AppIcon name="chevron-right" size={18} color={colors.textTertiary} />
      </View>

      <AppText
        variant="numericLarge"
        color="textPrimary"
        style={{ marginVertical: spacing.xs, fontSize: 28 }}
      >
        ₹{data.currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </AppText>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCol}>
          <AppText variant="caption" color="textSecondary">
            Invested
          </AppText>
          <AppText variant="h4" color="textPrimary" style={{ fontWeight: '600', marginTop: 2 }}>
            ₹{data.totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </AppText>
        </View>

        <View style={[styles.verticalDivider, { backgroundColor: colors.divider }]} />

        <View style={styles.metricCol}>
          <AppText variant="caption" color="textSecondary">
            Total Returns
          </AppText>
          <View style={styles.trendRow}>
            <AppText
              variant="h4"
              style={{
                color: isTotalGain ? colors.gain : colors.loss,
                fontWeight: '700',
                marginTop: 2,
              }}
            >
              {isTotalGain ? '+' : ''}₹
              {data.totalReturns.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </AppText>
            <AppText
              variant="caption"
              style={{
                color: isTotalGain ? colors.gain : colors.loss,
                fontWeight: '600',
                marginLeft: 4,
              }}
            >
              ({isTotalGain ? '+' : ''}
              {data.totalReturnsPercent.toFixed(2)}%)
            </AppText>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.dayReturnBar,
          {
            backgroundColor: colors.surfaceSubtle,
            borderRadius: radius.sm,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            marginTop: spacing.md,
          },
        ]}
      >
        <AppText variant="micro" color="textSecondary">
          1-Day Returns:
        </AppText>
        <AppText
          variant="micro"
          style={{
            color: isOneDayGain ? colors.gain : colors.loss,
            fontWeight: '700',
            marginLeft: 4,
          }}
        >
          {isOneDayGain ? '+' : ''}₹{data.oneDayReturns.toFixed(2)} ({isOneDayGain ? '+' : ''}
          {data.oneDayReturnsPercent.toFixed(2)}%)
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metricCol: {
    flex: 1,
  },
  verticalDivider: {
    width: 1,
    height: 32,
    marginHorizontal: 12,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dayReturnBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default React.memo(PortfolioCard);
