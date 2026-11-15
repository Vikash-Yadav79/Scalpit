import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { MutualFundCard, MutualFundData } from '../../../components/cards/MutualFundCard';

export interface MutualFundsSectionProps {
  funds: MutualFundData[];
  onSelectFund?: (fund: MutualFundData) => void;
  onExploreAll?: () => void;
}

export const MutualFundsSection: React.FC<MutualFundsSectionProps> = ({
  funds,
  onSelectFund,
  onExploreAll,
}) => {
  const { spacing } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { marginBottom: spacing.sm }]}>
        <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
          Top Rated Mutual Funds
        </AppText>
        {onExploreAll && (
          <TouchableOpacity onPress={onExploreAll}>
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              Explore All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {funds.map(fund => (
        <MutualFundCard
          key={fund.id}
          fund={fund}
          onPress={onSelectFund ? () => onSelectFund(fund) : undefined}
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

export default React.memo(MutualFundsSection);
