import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import {
  mockWatchlistStocks,
  mockMutualFunds,
  mockMarketIndices,
} from '../../../services/mockData';

type NavProp = StackNavigationProp<RootStackParamList>;

export const SearchModalScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();

  const [query, setQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'STOCKS' | 'FNO' | 'MF'>('ALL');

  const normalizedQuery = query.toLowerCase().trim();

  const filteredStocks = mockWatchlistStocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(normalizedQuery) ||
      s.name.toLowerCase().includes(normalizedQuery)
  );

  const filteredMfs = mockMutualFunds.filter((m) =>
    m.name.toLowerCase().includes(normalizedQuery)
  );

  const filteredIndices = mockMarketIndices.filter(
    (i) =>
      i.symbol.toLowerCase().includes(normalizedQuery) ||
      i.name.toLowerCase().includes(normalizedQuery)
  );

  const recentSearches = [
    { title: 'Reliance Industries', type: 'Stock', symbol: 'RELIANCE', price: 2980.50 },
    { title: 'NIFTY 50', type: 'Index', symbol: 'NIFTY', price: 25030.35 },
    { title: 'SBI Large Cap Direct Plan', type: 'Mutual Fund', id: 'mf1' },
    { title: 'Tata Motors', type: 'Stock', symbol: 'TATAMOTORS', price: 942.30 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />

      {/* Top Search Bar */}
      <View style={[styles.headerBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AppIcon name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={[styles.inputWrapper, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
          <AppIcon name="search" size={18} color={colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Search stocks, mutual funds, F&O..."
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <AppIcon name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { borderBottomColor: colors.border }]}>
        {(['ALL', 'STOCKS', 'FNO', 'MF'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterPill,
              activeFilter === filter
                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                : { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <AppText
              variant="caption"
              style={{
                color: activeFilter === filter ? '#FFFFFF' : colors.textSecondary,
                fontWeight: activeFilter === filter ? '700' : '500',
              }}
            >
              {filter === 'ALL'
                ? 'All'
                : filter === 'STOCKS'
                ? 'Stocks'
                : filter === 'FNO'
                ? 'F&O'
                : 'Mutual Funds'}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* If no query, show Recent Searches */}
        {normalizedQuery.length === 0 ? (
          <View>
            <AppText variant="caption" color="textSecondary" style={styles.sectionHeader}>
              RECENT SEARCHES
            </AppText>

            {recentSearches.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={[styles.resultItem, { borderBottomColor: colors.border }]}
                onPress={() => {
                  if (item.symbol) {
                    navigation.navigate('StockDetails', {
                      symbol: item.symbol,
                      name: item.title,
                      price: item.price || 1000,
                    });
                  } else if (item.id) {
                    navigation.navigate('FundDetails', {
                      fundId: item.id,
                      name: item.title,
                    });
                  }
                }}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                    <AppIcon
                      name={item.type === 'Stock' ? 'stocks' : item.type === 'Index' ? 'activity' : 'mutual-funds'}
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <View>
                    <AppText variant="body" style={{ fontWeight: '600' }}>
                      {item.title}
                    </AppText>
                    <AppText variant="micro" color="textSecondary">
                      {item.type}
                    </AppText>
                  </View>
                </View>
                <AppIcon name="arrow-up-right" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Show Results */
          <View>
            {/* Stocks Results */}
            {(activeFilter === 'ALL' || activeFilter === 'STOCKS') &&
              filteredStocks.map((s) => (
                <TouchableOpacity
                  key={s.symbol}
                  style={[styles.resultItem, { borderBottomColor: colors.border }]}
                  onPress={() =>
                    navigation.navigate('StockDetails', {
                      symbol: s.symbol,
                      name: s.name,
                      price: s.price,
                      change: s.change,
                      changePercent: s.changePercent,
                    })
                  }
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                      <AppIcon name="stocks" size={18} color={colors.primary} />
                    </View>
                    <View>
                      <AppText variant="body" style={{ fontWeight: '600' }}>
                        {s.name}
                      </AppText>
                      <AppText variant="micro" color="textSecondary">
                        NSE • {s.symbol}
                      </AppText>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <AppText variant="body" style={{ fontWeight: '700' }}>
                      ₹{s.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </AppText>
                    <AppText
                      variant="micro"
                      color={s.change >= 0 ? 'gain' : 'loss'}
                    >
                      {s.change >= 0 ? '+' : ''}
                      {s.changePercent}%
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}

            {/* Indices Results */}
            {(activeFilter === 'ALL' || activeFilter === 'FNO') &&
              filteredIndices.map((i) => (
                <TouchableOpacity
                  key={i.symbol}
                  style={[styles.resultItem, { borderBottomColor: colors.border }]}
                  onPress={() =>
                    navigation.navigate('OptionChain', {
                      indexName: i.name,
                    })
                  }
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                      <AppIcon name="activity" size={18} color={colors.primary} />
                    </View>
                    <View>
                      <AppText variant="body" style={{ fontWeight: '600' }}>
                        {i.name} Option Chain
                      </AppText>
                      <AppText variant="micro" color="textSecondary">
                        Index Derivatives
                      </AppText>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <AppText variant="body" style={{ fontWeight: '700' }}>
                      {i.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </AppText>
                    <AppText variant="micro" color="gain">
                      +{i.changePercent}%
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}

            {/* Mutual Funds Results */}
            {(activeFilter === 'ALL' || activeFilter === 'MF') &&
              filteredMfs.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.resultItem, { borderBottomColor: colors.border }]}
                  onPress={() =>
                    navigation.navigate('FundDetails', {
                      fundId: m.id,
                      name: m.name,
                    })
                  }
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                      <AppIcon name="mutual-funds" size={18} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <AppText variant="body" numberOfLines={1} style={{ fontWeight: '600' }}>
                        {m.name}
                      </AppText>
                      <AppText variant="micro" color="textSecondary">
                        {m.category}
                      </AppText>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <AppText variant="caption" color="gain" style={{ fontWeight: '700' }}>
                      +{m.returns3Y}% 3Y
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeader: {
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});

export default SearchModalScreen;
