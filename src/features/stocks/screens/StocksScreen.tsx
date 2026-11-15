import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import { MiniSparkline } from '../../../components/common/MiniSparkline';
import assets from '../../../config/assets';
import {
  mockMarketIndices,
  mockWatchlistStocks,
  mockHoldings,
  mockPopularBonds,
  mockGoldEtfs,
  mockPriceMovers,
} from '../../../services/mockData';

type StocksSubTab =
  | 'Explore'
  | 'Holdings'
  | 'Positions'
  | 'Orders'
  | "Ankit's Watchlist"
  | 'All watchlists';

export const StocksScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<StocksSubTab>('Explore');
  const [holdingCategory, setHoldingCategory] = useState<'STOCKS' | 'US STOCKS' | 'BONDS'>('STOCKS');
  const [positionsTimeframe, setPositionsTimeframe] = useState<'5 mins' | '15 mins' | '1 hour'>('5 mins');

  const subTabs: StocksSubTab[] = [
    'Explore',
    'Holdings',
    'Positions',
    'Orders',
    "Ankit's Watchlist",
    'All watchlists',
  ];

  const handleStockPress = (stock: { symbol: string; name: string; price: number; change: number; changePercent?: number }) => {
    navigation.navigate('StockDetails', {
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
    });
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* 1. Persistent Top Header matching PDF Page 15 */}
      <View style={[styles.mainHeader, { borderBottomColor: colors.border }]}>
        <View style={styles.brandRow}>
          <Image
            source={assets.brand.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <AppText variant="h2" color="textPrimary" style={styles.tabTitle}>
            Stocks
          </AppText>
        </View>

        <View style={styles.headerIconsRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchModal')}
            style={styles.iconCircle}
            accessibilityLabel="Search"
          >
            <AppIcon name="search" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={styles.iconCircle}
            accessibilityLabel="Refresh feeds"
          >
            <AppIcon name="refresh" size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileModal')}
            style={[styles.avatarCircle, { borderColor: colors.primary }]}
            accessibilityLabel="Profile settings"
          >
            <AppIcon name="user" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Top Market Indices Bar matching PDF Pages 15, 27, 28 */}
      <View style={[styles.indicesTickerBar, { backgroundColor: colors.surfaceSubtle, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.indicesScroll}>
          {mockMarketIndices.map(index => {
            const isGain = index.change >= 0;
            return (
              <View key={index.symbol} style={styles.indexTickerItem}>
                <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                  {index.name}{' '}
                </AppText>
                <AppText variant="caption" color="textPrimary" style={{ fontWeight: '700' }}>
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}{' '}
                </AppText>
                <AppText
                  variant="micro"
                  style={{ color: isGain ? colors.gain : colors.loss, fontWeight: '700' }}
                >
                  {isGain ? '+' : ''}{index.change.toFixed(2)} ({isGain ? '+' : ''}{index.changePercent.toFixed(2)}%)
                </AppText>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. Horizontal Scrollable Sub-Tabs Navigation (PDF Pages 15, 28, 29, 31, 32) */}
      <View style={[styles.subTabsContainer, { borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subTabsScroll}>
          {subTabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
                style={[
                  styles.subTabItem,
                  isActive && { borderBottomColor: colors.textPrimary, borderBottomWidth: 2 },
                ]}
              >
                <AppText
                  variant="body"
                  style={[
                    styles.subTabText,
                    { color: isActive ? colors.textPrimary : colors.textSecondary },
                  ]}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Sub-Tab Body Views */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {/* VIEW 1: EXPLORE (PDF Pages 15 & 33) */}
        {activeTab === 'Explore' && (
          <View style={styles.viewSection}>
            {/* Festive Muhurat Banner matching PDF Page 15 */}
            <View
              style={[
                styles.muhuratBanner,
                { backgroundColor: '#1A1528', borderColor: '#4C1D95', borderRadius: radius.lg },
              ]}
            >
              <AppText variant="micro" color="warning" style={{ fontWeight: '800', letterSpacing: 1.5 }}>
                🪔 HAPPY DIWALI 🪔
              </AppText>
              <AppText variant="display" color="warning" style={styles.muhuratTitle}>
                Muhurat
              </AppText>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700', letterSpacing: 1 }}>
                TRADING STARTS ON
              </AppText>
              <View style={[styles.dateBadge, { backgroundColor: '#FF6B00' }]}>
                <AppText variant="caption" color="textInverse" style={{ fontWeight: '800' }}>
                  ◆ 8 Nov, 2:20 PM ◆
                </AppText>
              </View>
            </View>

            {/* Buy Gold ETFs Section matching PDF Page 15 */}
            <View style={{ marginTop: spacing.xl }}>
              <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
                Buy Gold ETFs
              </AppText>

              <View style={styles.cardsRow}>
                {mockGoldEtfs.map(etf => (
                  <TouchableOpacity
                    key={etf.id}
                    activeOpacity={0.8}
                    onPress={() => handleStockPress({ symbol: etf.id, name: etf.name, price: etf.price, change: etf.change, changePercent: etf.changePercent })}
                    style={[
                      styles.productCard,
                      { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
                    ]}
                  >
                    <View style={styles.cardHeaderRow}>
                      <View style={[styles.etfLogoCircle, { backgroundColor: '#F59E0B20' }]}>
                        <AppText variant="micro" color="warning" style={{ fontWeight: '800' }}>
                          GOLD
                        </AppText>
                      </View>
                    </View>

                    <AppText variant="bodySmall" color="textPrimary" numberOfLines={2} style={styles.cardName}>
                      {etf.name}
                    </AppText>

                    <View style={{ marginTop: 8 }}>
                      <AppText variant="h4" color="textPrimary" style={{ fontWeight: '700' }}>
                        ₹{etf.price.toFixed(2)}
                      </AppText>
                      <AppText variant="caption" style={{ color: colors.loss, fontWeight: '600' }}>
                        {etf.change.toFixed(2)} ({etf.changePercent.toFixed(2)}%)
                      </AppText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Bonds Section matching PDF Page 33 */}
            <View style={{ marginTop: spacing.xxl }}>
              <View style={styles.sectionTitleRow}>
                <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
                  Popular Bonds
                </AppText>
                <TouchableOpacity onPress={() => {}}>
                  <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
                    See all ›
                  </AppText>
                </TouchableOpacity>
              </View>

              <View style={styles.cardsRow}>
                {mockPopularBonds.map(bond => (
                  <View
                    key={bond.id}
                    style={[
                      styles.productCard,
                      { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
                    ]}
                  >
                    <View style={styles.cardHeaderRow}>
                      <View style={[styles.bondIcon, { backgroundColor: '#6366F120' }]}>
                        <AppIcon name="shield" size={16} color="#6366F1" />
                      </View>
                    </View>

                    <AppText variant="bodySmall" color="textPrimary" numberOfLines={2} style={styles.cardName}>
                      {bond.name}
                    </AppText>

                    <View style={{ marginTop: 8 }}>
                      <AppText variant="h4" color="gain" style={{ fontWeight: '800' }}>
                        {bond.interestRate.toFixed(2)}%
                      </AppText>
                      <View style={styles.bondRatingRow}>
                        <AppText variant="micro" color="textSecondary">
                          {bond.tenureMonths} months
                        </AppText>
                        <View style={styles.ratingBadge}>
                          <AppText variant="micro" color="gain" style={{ fontWeight: '800', marginRight: 4 }}>
                            {bond.rating}
                          </AppText>
                          <View style={[styles.greenDot, { backgroundColor: colors.gain }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* VIEW 2: HOLDINGS (PDF Page 32) */}
        {activeTab === 'Holdings' && (
          <View style={styles.viewSection}>
            {/* Holdings Sub-filter Pills: STOCKS | US STOCKS | BONDS */}
            <View style={styles.filterPillRow}>
              {(['STOCKS', 'US STOCKS', 'BONDS'] as const).map(cat => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setHoldingCategory(cat)}
                  style={[
                    styles.categoryPill,
                    {
                      backgroundColor: holdingCategory === cat ? colors.textPrimary : colors.surface,
                      borderColor: colors.border,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={{
                      fontWeight: '700',
                      color: holdingCategory === cat ? colors.textInverse : colors.textSecondary,
                    }}
                  >
                    {cat}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Portfolio Summary Card matching PDF Page 32 */}
            <View
              style={[
                styles.portfolioCard,
                { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
              ]}
            >
              <View style={styles.portfolioTopRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                    HOLDINGS (9) ▼
                  </AppText>
                </View>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <AppIcon name="eye" size={18} color={colors.textSecondary} />
                  <AppIcon name="chart" size={18} color={colors.textSecondary} />
                </View>
              </View>

              <AppText variant="display" color="textPrimary" style={styles.portfolioValue}>
                ₹38,405.67
              </AppText>

              <View style={styles.returnsGrid}>
                <View style={{ flex: 1 }}>
                  <AppText variant="caption" color="textSecondary">
                    1D returns
                  </AppText>
                  <AppText variant="body" color="loss" style={{ fontWeight: '700', marginTop: 2 }}>
                    -₹95.97 (0.25%)
                  </AppText>
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="caption" color="textSecondary">
                    Total returns
                  </AppText>
                  <AppText variant="body" color="loss" style={{ fontWeight: '700', marginTop: 2 }}>
                    -₹8,755.92 (18.57%)
                  </AppText>
                </View>
              </View>

              <View style={[styles.investedRow, { borderTopColor: colors.border }]}>
                <AppText variant="bodySmall" color="textSecondary">
                  Invested
                </AppText>
                <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '700' }}>
                  ₹47,161.59
                </AppText>
              </View>
            </View>

            {/* Sort & Metric Header */}
            <View style={styles.sortHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppIcon name="filter" size={14} color={colors.textSecondary} />
                <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600', marginLeft: 4 }}>
                  Sort
                </AppText>
              </View>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                ‹› Current (Invested)
              </AppText>
            </View>

            {/* Holdings List matching PDF Page 32 */}
            {mockHoldings
              .filter(h => !h.category || h.category === holdingCategory)
              .map(item => (
                <TouchableOpacity
                  key={item.symbol}
                  activeOpacity={0.7}
                  onPress={() => handleStockPress(item)}
                  style={[styles.stockRow, { borderBottomColor: colors.border }]}
                >
                  <View style={{ flex: 1.2 }}>
                    <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                      {item.name}
                    </AppText>
                    <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                      {item.qty} shares
                    </AppText>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <MiniSparkline
                      data={item.sparkline}
                      isGain={item.change >= 0}
                      width={56}
                      height={20}
                    />
                  </View>

                  <View style={{ flex: 1.4, alignItems: 'flex-end' }}>
                    <AppText variant="body" color="gain" style={{ fontWeight: '700' }}>
                      ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </AppText>
                    {item.investedPrice && (
                      <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                        (₹{item.investedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })})
                      </AppText>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* VIEW 3: POSITIONS (PDF Page 31) */}
        {activeTab === 'Positions' && (
          <View style={styles.viewSection}>
            {/* Telescope Empty State Illustration */}
            <View style={styles.emptyIllustrationBox}>
              <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                <AppIcon name="explore" size={48} color={colors.textSecondary} />
              </View>
              <AppText variant="h3" color="textSecondary" style={{ marginTop: 16 }}>
                No open positions
              </AppText>
            </View>

            {/* Price Change > 1% Section matching PDF Page 31 */}
            <View style={{ marginTop: spacing.xxl }}>
              <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
                Price change &gt; 1%
              </AppText>

              {/* Timeframe Pills: 5 mins | 15 mins | 1 hour */}
              <View style={styles.timeframeRow}>
                {(['5 mins', '15 mins', '1 hour'] as const).map(tf => (
                  <TouchableOpacity
                    key={tf}
                    onPress={() => setPositionsTimeframe(tf)}
                    style={[
                      styles.timeframePill,
                      {
                        backgroundColor: positionsTimeframe === tf ? colors.textPrimary : colors.surface,
                        borderColor: colors.border,
                        borderRadius: radius.md,
                      },
                    ]}
                  >
                    <AppText
                      variant="caption"
                      style={{
                        fontWeight: '700',
                        color: positionsTimeframe === tf ? colors.textInverse : colors.textSecondary,
                      }}
                    >
                      {tf}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Mover Cards Grid */}
              <View style={styles.cardsRow}>
                {mockPriceMovers.map(mover => (
                  <TouchableOpacity
                    key={mover.symbol}
                    activeOpacity={0.7}
                    onPress={() => handleStockPress(mover)}
                    style={[
                      styles.productCard,
                      { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
                    ]}
                  >
                    <View style={[styles.etfLogoCircle, { backgroundColor: '#3B82F620' }]}>
                      <AppText variant="micro" color="info" style={{ fontWeight: '800' }}>
                        {mover.symbol.slice(0, 4)}
                      </AppText>
                    </View>

                    <AppText variant="bodySmall" color="textPrimary" numberOfLines={2} style={styles.cardName}>
                      {mover.name}
                    </AppText>

                    <View style={{ marginTop: 8 }}>
                      <AppText variant="h4" color="textPrimary" style={{ fontWeight: '700' }}>
                        ₹{mover.price.toFixed(2)}
                      </AppText>
                      <AppText
                        variant="caption"
                        style={{
                          color: mover.change >= 0 ? colors.gain : colors.loss,
                          fontWeight: '700',
                        }}
                      >
                        {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)} ({mover.change >= 0 ? '+' : ''}{mover.changePercent.toFixed(2)}%)
                      </AppText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* VIEW 4: ORDERS (PDF Page 30) */}
        {activeTab === 'Orders' && (
          <View style={styles.emptyIllustrationBox}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
              <AppIcon name="orders" size={48} color={colors.textSecondary} />
            </View>
            <AppText variant="h2" color="textPrimary" style={{ marginTop: 20, fontWeight: '700' }}>
              You have no open orders
            </AppText>
            <TouchableOpacity onPress={() => {}} style={{ marginTop: 8 }}>
              <AppText variant="body" color="primary" style={{ fontWeight: '700' }}>
                All orders
              </AppText>
            </TouchableOpacity>
          </View>
        )}

        {/* VIEW 5: USER WATCHLIST (PDF Page 29) */}
        {activeTab === "Ankit's Watchlist" && (
          <View style={styles.viewSection}>
            <View style={styles.watchlistBar}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                11 stocks
              </AppText>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={[styles.actionSquare, { borderColor: colors.border }]}>
                  <AppIcon name="plus" size={16} color={colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionSquare, { borderColor: colors.border }]}>
                  <AppIcon name="edit" size={16} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sortHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppIcon name="filter" size={14} color={colors.textSecondary} />
                <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600', marginLeft: 4 }}>
                  Sort
                </AppText>
              </View>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                ‹› Mkt price / 1D
              </AppText>
            </View>

            {mockWatchlistStocks.map(stock => (
              <TouchableOpacity
                key={stock.symbol}
                activeOpacity={0.7}
                onPress={() => handleStockPress(stock)}
                style={[styles.stockRow, { borderBottomColor: colors.border }]}
              >
                <View style={{ flex: 1.2 }}>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                    {stock.name}
                  </AppText>
                  {stock.qty && (
                    <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                      {stock.qty} Qty
                    </AppText>
                  )}
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                  <MiniSparkline
                    data={stock.sparkline}
                    isGain={stock.change >= 0}
                    width={56}
                    height={20}
                  />
                </View>

                <View style={{ flex: 1.4, alignItems: 'flex-end' }}>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                    ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </AppText>
                  <AppText
                    variant="caption"
                    style={{
                      color: stock.change >= 0 ? colors.gain : colors.loss,
                      fontWeight: '700',
                      marginTop: 2,
                    }}
                  >
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </AppText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* VIEW 6: ALL WATCHLISTS (PDF Page 28) */}
        {activeTab === 'All watchlists' && (
          <View style={styles.viewSection}>
            <View style={styles.watchlistBar}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                1 Watchlists
              </AppText>
              <TouchableOpacity style={[styles.pinBtn, { borderColor: colors.border }]}>
                <AppIcon name="pin" size={14} color={colors.textPrimary} />
                <AppText variant="caption" color="textPrimary" style={{ fontWeight: '700', marginLeft: 4 }}>
                  Pin
                </AppText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setActiveTab("Ankit's Watchlist")}
              activeOpacity={0.7}
              style={[styles.watchlistListItem, { borderBottomColor: colors.border }]}
            >
              <View style={[styles.wlBadgeCircle, { backgroundColor: colors.surfaceSubtle }]}>
                <AppText variant="bodySmall" color="textSecondary" style={{ fontWeight: '800' }}>
                  AW
                </AppText>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <AppText variant="bodyLarge" color="textPrimary" style={{ fontWeight: '700' }}>
                  Ankit's Watchlist
                </AppText>
              </View>
              <AppIcon name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}
            >
              <AppIcon name="plus" size={18} color={colors.primary} />
              <AppText variant="body" color="primary" style={{ fontWeight: '700', marginLeft: 8 }}>
                Add watchlist
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  tabTitle: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicesTickerBar: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  indicesScroll: {
    paddingHorizontal: 16,
    gap: 20,
  },
  indexTickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTabsContainer: {
    borderBottomWidth: 1,
  },
  subTabsScroll: {
    paddingHorizontal: 16,
    gap: 20,
  },
  subTabItem: {
    paddingVertical: 12,
  },
  subTabText: {
    fontWeight: '600',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  viewSection: {
    width: '100%',
  },
  muhuratBanner: {
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muhuratTitle: {
    fontFamily: 'serif',
    fontSize: 34,
    fontWeight: '800',
    marginVertical: 4,
  },
  dateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  sectionHeader: {
    fontWeight: '700',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  productCard: {
    width: '48%',
    padding: 14,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  cardHeaderRow: {
    marginBottom: 8,
  },
  etfLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bondIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: {
    fontWeight: '600',
    lineHeight: 18,
    minHeight: 36,
  },
  bondRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  filterPillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
  },
  portfolioCard: {
    padding: 18,
    borderWidth: 1,
  },
  portfolioTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portfolioValue: {
    fontSize: 28,
    fontWeight: '800',
    marginVertical: 8,
  },
  returnsGrid: {
    flexDirection: 'row',
    marginTop: 8,
  },
  investedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 12,
  },
  sortHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  emptyIllustrationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeframeRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  timeframePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
  },
  watchlistBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actionSquare: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  watchlistListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  wlBadgeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StocksScreen;
