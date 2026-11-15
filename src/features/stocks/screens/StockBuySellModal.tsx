import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppInput } from '../../../components/common/AppInput';
import { AppIcon } from '../../../components/common/AppIcon';
import { RootStackParamList } from '../../../navigation/navigationTypes';

type BuySellRouteProp = RouteProp<RootStackParamList, 'StockBuySell'>;

export const StockBuySellModal: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const route = useRoute<BuySellRouteProp>();
  const navigation = useNavigation();

  const { symbol, name, price, action } = route.params;

  const [orderType, setOrderType] = useState<'Delivery' | 'Intraday'>('Delivery');
  const [priceType, setPriceType] = useState<'Market' | 'Limit'>('Market');
  const [qty, setQty] = useState('1');
  const [limitPrice, setLimitPrice] = useState(price.toFixed(2));
  const [isSuccess, setIsSuccess] = useState(false);

  const numQty = Math.max(1, parseInt(qty || '1', 10));
  const activePrice = priceType === 'Market' ? price : (parseFloat(limitPrice) || price);
  const totalAmount = numQty * activePrice;
  const requiredMargin = orderType === 'Intraday' ? totalAmount * 0.2 : totalAmount;

  const handleExecute = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <ScreenContainer>
        <View style={styles.successContainer}>
          <View style={[styles.successCircle, { backgroundColor: action === 'BUY' ? colors.primary : '#EB5B5B' }]}>
            <AppIcon name="check" size={54} color="#FFFFFF" strokeWidth={3} />
          </View>

          <AppText variant="h1" color="textPrimary" style={{ fontWeight: '800', marginTop: 24 }}>
            Order Placed Successfully!
          </AppText>

          <AppText variant="body" color="textSecondary" align="center" style={{ marginTop: 8, paddingHorizontal: 32 }}>
            Your {orderType} order to {action} {numQty} shares of {name} ({symbol}) at ₹{activePrice.toFixed(2)} has been executed.
          </AppText>

          <View style={[styles.orderReceiptCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, marginTop: 32 }]}>
            <View style={styles.receiptRow}>
              <AppText variant="caption" color="textSecondary">Order ID</AppText>
              <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '700' }}>ORD_{Date.now().toString().slice(-8)}</AppText>
            </View>
            <View style={styles.receiptRow}>
              <AppText variant="caption" color="textSecondary">Exchange</AppText>
              <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '700' }}>NSE Live</AppText>
            </View>
            <View style={styles.receiptRow}>
              <AppText variant="caption" color="textSecondary">Total Amount</AppText>
              <AppText variant="bodySmall" color="primary" style={{ fontWeight: '800' }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</AppText>
            </View>
          </View>

          <AppButton
            title="Done"
            onPress={() => navigation.goBack()}
            variant="primary"
            size="lg"
            style={{ width: '88%', marginTop: 32 }}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title={`${action} ${symbol}`}
        subtitle={`₹${price.toFixed(2)}`}
      />

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        <View style={styles.topSection}>
          {/* Order Type Toggle: Delivery vs Intraday */}
          <View style={[styles.segmentedRow, { backgroundColor: colors.surfaceSubtle, borderRadius: radius.md }]}>
            {(['Delivery', 'Intraday'] as const).map(ot => (
              <TouchableOpacity
                key={ot}
                onPress={() => setOrderType(ot)}
                style={[
                  styles.segmentBtn,
                  orderType === ot && { backgroundColor: colors.surface, borderRadius: radius.sm },
                ]}
              >
                <AppText
                  variant="bodySmall"
                  style={{ fontWeight: '700', color: orderType === ot ? colors.primary : colors.textSecondary }}
                >
                  {ot} {ot === 'Intraday' ? '(5x)' : ''}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Counter */}
          <View style={{ marginTop: spacing.xl }}>
            <AppInput
              label="Quantity (NSE)"
              value={qty}
              onChangeText={setQty}
              keyboardType="number-pad"
            />
          </View>

          {/* Price Type Toggle: Market vs Limit */}
          <View style={{ marginTop: spacing.lg }}>
            <View style={styles.priceTypeHeader}>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                PRICE
              </AppText>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {(['Market', 'Limit'] as const).map(pt => (
                  <TouchableOpacity
                    key={pt}
                    onPress={() => setPriceType(pt)}
                    style={[
                      styles.ptPill,
                      {
                        backgroundColor: priceType === pt ? colors.primarySoft : colors.surface,
                        borderColor: priceType === pt ? colors.primary : colors.border,
                        borderRadius: radius.sm,
                      },
                    ]}
                  >
                    <AppText
                      variant="caption"
                      style={{ fontWeight: '700', color: priceType === pt ? colors.primary : colors.textSecondary }}
                    >
                      {pt}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {priceType === 'Limit' && (
              <AppInput
                value={limitPrice}
                onChangeText={setLimitPrice}
                keyboardType="numeric"
                containerStyle={{ marginTop: 8 }}
              />
            )}
          </View>
        </View>

        {/* Bottom Financial Metrics and Execution CTA */}
        <View style={[styles.bottomSection, { borderTopColor: colors.border, paddingBottom: spacing.xl }]}>
          <View style={styles.metricRow}>
            <AppText variant="bodySmall" color="textSecondary">
              Required Margin
            </AppText>
            <AppText variant="body" color="textPrimary" style={{ fontWeight: '800' }}>
              ₹{requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </AppText>
          </View>

          <View style={[styles.metricRow, { marginTop: 4 }]}>
            <AppText variant="caption" color="textSecondary">
              Available Balance
            </AppText>
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              ₹1,48,650.00
            </AppText>
          </View>

          <AppButton
            title={`${action} ${symbol}`}
            onPress={handleExecute}
            variant="primary"
            size="lg"
            style={[styles.actionBtn, action === 'SELL' && { backgroundColor: '#EB5B5B' }]}
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
    paddingTop: 16,
  },
  topSection: {
    flex: 1,
  },
  segmentedRow: {
    flexDirection: 'row',
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  priceTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  ptPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
  },
  bottomSection: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    height: 52,
    borderRadius: 8,
    marginTop: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderReceiptCard: {
    width: '90%',
    padding: 18,
    borderWidth: 1,
    gap: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StockBuySellModal;
