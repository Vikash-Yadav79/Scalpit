import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export const OrdersScreen: React.FC = () => {
  const { spacing } = useTheme();

  return (
    <ScreenContainer>
      <AppHeader title="Orders & Positions" />
      <View style={[styles.container, { padding: spacing.xl }]}>
        <EmptyState
          icon="orders"
          title="No open orders today"
          description="Your executed stock and mutual fund orders for the current trading session will appear here."
          actionTitle="Explore Markets"
          onAction={() => {}}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
