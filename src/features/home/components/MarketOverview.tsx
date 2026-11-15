import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { MarketIndexCard, MarketIndexData } from '../../../components/cards/MarketIndexCard';

export interface MarketOverviewProps {
  indices: MarketIndexData[];
  onSelectIndex?: (index: MarketIndexData) => void;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({
  indices,
  onSelectIndex,
}) => {
  const { spacing } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { marginBottom: spacing.sm }]}>
        <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
          Market Indices
        </AppText>
        <AppText variant="caption" color="textSecondary">
          NSE / BSE
        </AppText>
      </View>

      <FlatList
        data={indices}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MarketIndexCard
            data={item}
            onPress={onSelectIndex ? () => onSelectIndex(item) : undefined}
          />
        )}
        contentContainerStyle={{ paddingVertical: 4 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(MarketOverview);
