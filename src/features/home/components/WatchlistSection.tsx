import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { StockCard, StockData } from '../../../components/cards/StockCard';

export interface WatchlistSectionProps {
  watchlist: StockData[];
  onSelectStock?: (stock: StockData) => void;
  onViewAll?: () => void;
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  watchlist,
  onSelectStock,
  onViewAll,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { marginBottom: spacing.sm }]}>
        <View style={styles.titleWithCount}>
          <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
            My Watchlist
          </AppText>
          <View
            style={[
              styles.countBadge,
              { backgroundColor: colors.surfaceSubtle, marginLeft: spacing.xs },
            ]}
          >
            <AppText variant="micro" color="textSecondary" style={{ fontWeight: '700' }}>
              {watchlist.length}
            </AppText>
          </View>
        </View>

        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              View All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {watchlist.map(stock => (
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
  titleWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});

export default React.memo(WatchlistSection);
