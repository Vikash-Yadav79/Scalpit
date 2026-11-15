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
import assets from '../../../config/assets';
import {
  mockMarketIndices,
} from '../../../services/mockData';

type FnoSubTab = 'Explore' | 'Positions' | 'Orders' | 'All watchlists';

export const FnoMainScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<FnoSubTab>('Explore');
  const [topTradedSegment, setTopTradedSegment] = useState<'Equity' | 'Commodities'>('Equity');

  const subTabs: FnoSubTab[] = ['Explore', 'Positions', 'Orders', 'All watchlists'];

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* 1. Header matching PDF Page 27 */}
      <View style={[styles.mainHeader, { borderBottomColor: colors.border }]}>
        <View style={styles.brandRow}>
          <Image
            source={assets.brand.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <AppText variant="h2" color="textPrimary" style={styles.tabTitle}>
            F&O
          </AppText>
        </View>

        <View style={styles.headerIconsRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchModal')}
            style={styles.iconCircle}
          >
            <AppIcon name="search" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCircle}>
            <AppIcon name="refresh" size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileModal')}
            style={[styles.avatarCircle, { borderColor: colors.primary }]}
          >
            <AppIcon name="user" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Top Indices Bar matching PDF Pages 24, 25, 26, 27 */}
      <View style={[styles.indicesBar, { backgroundColor: colors.surfaceSubtle, borderBottomColor: colors.border }]}>
        <View style={styles.indexBox}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
            NIFTY 50
          </AppText>
          <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>
            25,030.35{' '}
            <AppText variant="caption" color="gain" style={{ fontWeight: '700' }}>
              +493.75 (2.01%)
            </AppText>
          </AppText>
        </View>

        <View style={[styles.dividerVertical, { backgroundColor: colors.border }]} />

        <View style={styles.indexBox}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
            SENSEX
          </AppText>
          <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>
            81,028.02{' '}
            <AppText variant="caption" color="gain" style={{ fontWeight: '700' }}>
              +1,718.01 (2.17%)
            </AppText>
          </AppText>
        </View>
      </View>

      {/* 3. Sub-Tabs Header (Explore | Positions | Orders | All watchlists) */}
      <View style={[styles.subTabsContainer, { borderBottomColor: colors.border }]}>
        <View style={styles.subTabsRow}>
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
                  style={{
                    fontWeight: '700',
                    color: isActive ? colors.textPrimary : colors.textSecondary,
                  }}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 4. Sub-Tab Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {/* VIEW 1: EXPLORE (PDF Page 27) */}
        {activeTab === 'Explore' && (
          <View>
            {/* Muhurat Banner matching PDF Page 27 */}
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

            {/* Quick Option Chain CTA Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('OptionChain', { indexName: 'NIFTY 50' })}
              activeOpacity={0.8}
              style={[
                styles.optionChainBar,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderRadius: radius.md,
                  marginTop: spacing.xl,
                },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.optionIconBox, { backgroundColor: colors.primarySoft }]}>
                  <AppIcon name="chart" size={20} color={colors.primary} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <AppText variant="bodyLarge" color="textPrimary" style={{ fontWeight: '700' }}>
                    Option Chain
                  </AppText>
                  <AppText variant="caption" color="textSecondary">
                    Calls & Puts Strike Matrix for NIFTY
                  </AppText>
                </View>
              </View>
              <AppIcon name="chevron-right" size={20} color={colors.primary} />
            </TouchableOpacity>

            {/* Top Traded Section matching PDF Page 27 */}
            <View style={{ marginTop: spacing.xxl }}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700', marginBottom: 12 }}>
                Top traded
              </AppText>

              {/* Segment Pills: Equity | Commodities */}
              <View style={styles.segmentPillRow}>
                {(['Equity', 'Commodities'] as const).map(seg => (
                  <TouchableOpacity
                    key={seg}
                    onPress={() => setTopTradedSegment(seg)}
                    style={[
                      styles.segmentPill,
                      {
                        backgroundColor: topTradedSegment === seg ? colors.textPrimary : colors.surface,
                        borderColor: colors.border,
                        borderRadius: radius.round,
                      },
                    ]}
                  >
                    <AppText
                      variant="bodySmall"
                      style={{
                        fontWeight: '700',
                        color: topTradedSegment === seg ? colors.textInverse : colors.textSecondary,
                      }}
                    >
                      {seg}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Top Traded Index Derivative Cards matching PDF Page 27 */}
              {mockMarketIndices.map(index => (
                <TouchableOpacity
                  key={index.symbol}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('OptionChain', { indexName: index.name })}
                  style={[styles.fnoItemRow, { borderBottomColor: colors.border }]}
                >
                  <View style={[styles.symbolLogoBadge, { backgroundColor: colors.surfaceSubtle }]}>
                    <AppText variant="h4" color="primary" style={{ fontWeight: '800' }}>
                      ∞
                    </AppText>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <AppText variant="bodyLarge" color="textPrimary" style={{ fontWeight: '700' }}>
                      {index.name}
                    </AppText>
                    <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                      {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </AppText>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <AppText variant="body" color="gain" style={{ fontWeight: '700' }}>
                      +{index.change.toFixed(2)} (+{index.changePercent.toFixed(2)}%)
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* VIEW 2: POSITIONS (PDF Page 26) */}
        {activeTab === 'Positions' && (
          <View style={styles.emptyIllustrationBox}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
              <AppIcon name="layers" size={48} color={colors.textSecondary} />
            </View>
            <AppText variant="h3" color="textSecondary" style={{ marginTop: 20 }}>
              No active positions
            </AppText>
          </View>
        )}

        {/* VIEW 3: ORDERS (PDF Page 25) */}
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

        {/* VIEW 4: ALL WATCHLISTS (PDF Page 24) */}
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
              onPress={() => {}}
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
  indicesBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  indexBox: {
    flex: 1,
  },
  dividerVertical: {
    width: 1,
    marginHorizontal: 12,
  },
  subTabsContainer: {
    borderBottomWidth: 1,
  },
  subTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  subTabItem: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
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
  optionChainBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1.5,
  },
  optionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentPillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  segmentPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
  },
  fnoItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  symbolLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIllustrationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSection: {
    width: '100%',
  },
  watchlistBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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

export default FnoMainScreen;
