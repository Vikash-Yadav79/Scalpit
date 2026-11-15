import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { StockCard, StockData } from '../../../components/cards/StockCard';

export interface TopMoversSectionProps {
  title?: string;
  stocks: StockData[];
  onSelectStock?: (stock: StockData) => void;
  onSeeAll?: () => void;
}

export const TopMoversSection: React.FC<TopMoversSectionProps> = ({
  title = 'Popular Stocks',
  stocks,
  onSelectStock,
  onSeeAll,
}) => {
  const { spacing } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { marginBottom: spacing.sm }]}>
        <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
          {title}
        </AppText>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              See All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {stocks.map(stock => (
        <StockCard
          key={stock.id}
          stock={stock}
          onPress={onSelectStock ? () => onSelectStock(stock) : undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(TopMoversSection);
