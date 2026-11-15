import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PortfolioCard, PortfolioSummaryData } from '../../../components/cards/PortfolioCard';

export interface PortfolioSummaryProps {
  data: PortfolioSummaryData;
  onPress?: () => void;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <PortfolioCard data={data} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});

export default React.memo(PortfolioSummary);
