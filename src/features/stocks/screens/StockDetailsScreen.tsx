import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { MiniSparkline } from '../../../components/common/MiniSparkline';
import { RootStackParamList } from '../../../navigation/navigationTypes';

type StockDetailsRouteProp = RouteProp<RootStackParamList, 'StockDetails'>;

export const StockDetailsScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<StockDetailsRouteProp>();
  const navigation = useNavigation<any>();

  const { symbol, name, price, change = 12.5, changePercent = 1.2 } = route.params;
  const isGain = change >= 0;

  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y' | 'ALL'>('1D');
  const [inWatchlist, setInWatchlist] = useState(false);

  const chartData = isGain
    ? [price * 0.98, price * 0.985, price * 0.99, price * 0.992, price * 0.997, price * 1.002, price]
    : [price * 1.02, price * 1.015, price * 1.01, price * 1.005, price * 1.002, price * 0.998, price];

  const handleTrade = (action: 'BUY' | 'SELL') => {
    navigation.navigate('StockBuySell', {
      symbol,
      name,
      price,
      action,
    });
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title={symbol}
        rightAction={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity onPress={() => setInWatchlist(prev => !prev)}>
              <AppIcon
                name="bookmark"
                size={22}
                color={inWatchlist ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchModal')}>
              <AppIcon name="search" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: spacing.xl, paddingBottom: 80 + insets.bottom },
        ]}
      >
        {/* Company Title & Live Price */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <AppText variant="h2" color="textPrimary" style={{ fontWeight: '800' }}>
              {name}
            </AppText>
            <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
              NSE: {symbol} • Large Cap
            </AppText>
          </View>
        </View>

        <View style={styles.priceRow}>
          <AppText variant="display" color="textPrimary" style={styles.priceText}>
            ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </AppText>
          <AppText
            variant="body"
            style={{ color: isGain ? colors.gain : colors.loss, fontWeight: '700', marginLeft: 8 }}
          >
            {isGain ? '+' : ''}{change.toFixed(2)} ({isGain ? '+' : ''}{changePercent.toFixed(2)}%)
          </AppText>
        </View>

        {/* Interactive Chart Canvas Simulation */}
        <View style={[styles.chartContainer, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
          <MiniSparkline
            data={chartData}
            isGain={isGain}
            width={320}
            height={160}
            strokeWidth={2.5}
          />
        </View>

        {/* Timeframe Selector Pills */}
        <View style={styles.timeframeRow}>
          {(['1D', '1W', '1M', '1Y', '5Y', 'ALL'] as const).map(tf => (
            <TouchableOpacity
              key={tf}
              onPress={() => setTimeframe(tf)}
              style={[
                styles.tfPill,
                timeframe === tf && { backgroundColor: colors.textPrimary },
              ]}
            >
              <AppText
                variant="caption"
                style={{
                  fontWeight: '700',
                  color: timeframe === tf ? colors.textInverse : colors.textSecondary,
                }}
              >
                {tf}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* 52-Week Range Bar */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700', marginBottom: 12 }}>
            52-WEEK RANGE
          </AppText>
          <View style={styles.rangeLabels}>
            <AppText variant="caption" color="textPrimary">Low: ₹{(price * 0.72).toFixed(2)}</AppText>
            <AppText variant="caption" color="textPrimary">High: ₹{(price * 1.28).toFixed(2)}</AppText>
          </View>
          <View style={[styles.rangeBarTrack, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={[styles.rangeBarThumb, { backgroundColor: colors.primary, left: '62%' }]} />
          </View>
        </View>

        {/* Key Fundamentals Grid */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700', marginBottom: 14 }}>
            FUNDAMENTALS
          </AppText>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">Market Cap</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>₹14.8 Lakh Cr</AppText>
            </View>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">P/E Ratio</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>24.60</AppText>
            </View>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">P/B Ratio</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>3.85</AppText>
            </View>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">Industry P/E</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>21.40</AppText>
            </View>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">ROE</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>16.8%</AppText>
            </View>
            <View style={styles.metricItem}>
              <AppText variant="caption" color="textSecondary">Div. Yield</AppText>
              <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>1.15%</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Action Bar: BUY & SELL */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <AppButton
          title="SELL"
          onPress={() => handleTrade('SELL')}
          variant="outline"
          style={styles.sellBtn}
        />
        <AppButton
          title="BUY"
          onPress={() => handleTrade('BUY')}
          variant="primary"
          style={styles.buyBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 12,
    paddingBottom: 90,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 12,
  },
  priceText: {
    fontSize: 32,
    fontWeight: '800',
  },
  chartContainer: {
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 12,
  },
  timeframeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  tfPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sectionCard: {
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rangeBarTrack: {
    height: 6,
    borderRadius: 3,
    position: 'relative',
  },
  rangeBarThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    top: -4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: '45%',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  sellBtn: {
    flex: 1,
    height: 48,
    borderColor: '#EB5B5B',
  },
  buyBtn: {
    flex: 1.4,
    height: 48,
  },
});

export default StockDetailsScreen;
