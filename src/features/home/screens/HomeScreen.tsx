import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import { HomeHeader } from '../components/HomeHeader';
import { SearchSection } from '../components/SearchSection';
import { MarketOverview } from '../components/MarketOverview';
import { PortfolioSummary } from '../components/PortfolioSummary';
import { QuickActions } from '../components/QuickActions';
import { TopMoversSection } from '../components/TopMoversSection';
import { WatchlistSection } from '../components/WatchlistSection';
import { MutualFundsSection } from '../components/MutualFundsSection';
import { homeApi, HomeDashboardData, sampleDashboardData } from '../services/homeApi';

export const HomeScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation();

  const [data, setData] = useState<HomeDashboardData>(sampleDashboardData);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await homeApi.fetchDashboardData();
      setData(result);
    } catch {
      // Keep existing data
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleActionPress = (actionId: string) => {
    switch (actionId) {
      case 'stocks':
        (navigation as any).navigate('StocksTab');
        break;
      case 'mutual-funds':
        (navigation as any).navigate('MutualFundsTab');
        break;
      case 'watchlist':
        // Scroll to or focus watchlist
        break;
      default:
        break;
    }
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <HomeHeader
        onSearchPress={() => {}}
        onNotificationPress={() => {}}
        onProfilePress={() => (navigation as any).navigate('ProfileTab')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Search Bar */}
        <SearchSection />

        {/* Development Data Notice */}
        <View
          style={[
            styles.noticeBar,
            {
              backgroundColor: colors.surfaceSubtle,
              borderColor: colors.border,
              borderRadius: radius.sm,
              padding: spacing.xs,
              marginBottom: spacing.xs,
            },
          ]}
        >
          <AppIcon name="info" size={13} color={colors.textTertiary} />
          <AppText
            variant="micro"
            color="textTertiary"
            style={{ marginLeft: 4, flex: 1 }}
          >
            Sample Market Data: Connect live broker API for real-time order execution.
          </AppText>
        </View>

        {/* Market Indices (Nifty 50, Sensex, etc.) */}
        <MarketOverview indices={data.indices} />

        {/* User Portfolio Summary Card */}
        <PortfolioSummary data={data.portfolio} />

        {/* 4 Quick Action Tiles (Stocks, Mutual Funds, IPO, Watchlist) */}
        <QuickActions onActionPress={handleActionPress} />

        {/* Popular Stocks */}
        <TopMoversSection
          title="Most Active Stocks"
          stocks={data.popularStocks}
          onSeeAll={() => (navigation as any).navigate('StocksTab')}
        />

        {/* User Watchlist */}
        <WatchlistSection
          watchlist={data.watchlist}
          onViewAll={() => {}}
        />

        {/* Top Mutual Funds */}
        <MutualFundsSection
          funds={data.mutualFunds}
          onExploreAll={() => (navigation as any).navigate('MutualFundsTab')}
        />

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default HomeScreen;
