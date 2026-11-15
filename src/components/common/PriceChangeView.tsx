import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export interface PriceChangeViewProps {
  price: number;
  change?: number;
  changePercent?: number;
  currencyPrefix?: string;
  isGain?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export const PriceChangeView: React.FC<PriceChangeViewProps> = ({
  price,
  change,
  changePercent,
  currencyPrefix = '₹',
  isGain,
  size = 'md',
  layout = 'vertical',
  style,
}) => {
  const { colors, spacing } = useTheme();

  const positive = isGain !== undefined ? isGain : (change !== undefined ? change >= 0 : (changePercent !== undefined ? changePercent >= 0 : true));
  const changeColor = positive ? colors.gain : colors.loss;
  const sign = positive ? '+' : '';

  const priceVariant = size === 'lg' ? 'h2' : size === 'sm' ? 'bodySmall' : 'h4';
  const changeVariant = size === 'lg' ? 'body' : 'caption';

  return (
    <View
      style={[
        layout === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
    >
      <AppText variant={priceVariant} color="textPrimary" style={styles.priceText}>
        {currencyPrefix}{formatCurrency(price).replace('₹', '')}
      </AppText>

      {(change !== undefined || changePercent !== undefined) && (
        <AppText
          variant={changeVariant}
          style={[
            styles.changeText,
            { color: changeColor, marginTop: layout === 'vertical' ? 2 : 0, marginLeft: layout === 'horizontal' ? spacing.sm : 0 },
          ]}
        >
          {change !== undefined && `${sign}${formatCurrency(change).replace('₹', '')} `}
          {changePercent !== undefined && `(${sign}${formatPercentage(changePercent)})`}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  vertical: {
    alignItems: 'flex-end',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontWeight: '700',
  },
  changeText: {
    fontWeight: '600',
  },
});

export default React.memo(PriceChangeView);
