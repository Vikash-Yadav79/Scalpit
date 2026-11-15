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
import { mockMutualFunds } from '../../../services/mockData';

type MfSubTab = 'Explore' | 'Dashboard' | 'SIPs' | 'Watchlist';

export const MutualFundsScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<MfSubTab>('Explore');
  const subTabs: MfSubTab[] = ['Explore', 'Dashboard', 'SIPs', 'Watchlist'];

  const handleFundPress = (fund: { id: string; name: string }) => {
    navigation.navigate('FundDetails', { fundId: fund.id, name: fund.name });
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* 1. Header matching PDF Page 19 */}
      <View style={[styles.mainHeader, { borderBottomColor: colors.border }]}>
        <View style={styles.brandRow}>
          <Image
            source={assets.brand.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <AppText variant="h2" color="textPrimary" style={styles.tabTitle}>
            Mutual Funds
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

      {/* 2. Sub-Tabs Header (Explore | Dashboard | SIPs | Watchlist) */}
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

      {/* 3. Sub-Tab Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {/* VIEW 1: EXPLORE (PDF Pages 22 & 23) */}
        {activeTab === 'Explore' && (
          <View>
            <View style={styles.sectionTitleRow}>
              <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
                Popular Funds
              </AppText>
              <TouchableOpacity onPress={() => {}}>
                <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
                  View all ›
                </AppText>
              </TouchableOpacity>
            </View>

            {/* Popular Funds 2x2 Grid (Matching PDF Page 22) */}
            <View style={styles.cardsRow}>
              {mockMutualFunds.slice(4, 8).map(fund => (
                <TouchableOpacity
                  key={fund.id}
                  activeOpacity={0.8}
                  onPress={() => handleFundPress(fund)}
                  style={[
                    styles.fundCard,
                    { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
                  ]}
                >
                  <View style={styles.fundLogoCircle}>
                    <AppIcon name="mutual-funds" size={20} color={colors.primary} />
                  </View>

                  <AppText variant="bodySmall" color="textPrimary" numberOfLines={2} style={styles.fundCardName}>
                    {fund.name}
                  </AppText>

                  <View style={styles.fundReturnsRow}>
                    <AppText variant="h4" color="gain" style={{ fontWeight: '800' }}>
                      +{fund.returns3Y}%
                    </AppText>
                    <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                      3Y
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Collections Section matching PDF Page 22 */}
            <View style={{ marginTop: spacing.xxl }}>
              <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
                Collections
              </AppText>

              <View style={styles.collectionsRow}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.collectionCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
                >
                  <View style={styles.collectionIconBox}>
                    <AppIcon name="trending-up" size={24} color={colors.primary} />
                  </View>
                  <AppText variant="caption" color="textPrimary" align="center" style={{ fontWeight: '700', marginTop: 8 }}>
                    High return
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.collectionCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
                >
                  <View style={styles.collectionIconBox}>
                    <AppIcon name="wallet" size={24} color="#3B82F6" />
                  </View>
                  <AppText variant="caption" color="textPrimary" align="center" style={{ fontWeight: '700', marginTop: 8 }}>
                    Best SIP funds
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.collectionCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
                >
                  <View style={styles.collectionIconBox}>
                    <AppIcon name="shield" size={24} color="#F59E0B" />
                  </View>
                  <AppText variant="caption" color="textPrimary" align="center" style={{ fontWeight: '700', marginTop: 8 }}>
                    Gold & Silver Funds
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* VIEW 2: DASHBOARD / HOLDINGS (PDF Page 19) */}
        {activeTab === 'Dashboard' && (
          <View>
            <View
              style={[
                styles.portfolioCard,
                { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
              ]}
            >
              <View style={styles.portfolioTopRow}>
                <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                  HOLDINGS (5)
                </AppText>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <AppIcon name="eye" size={18} color={colors.textSecondary} />
                  <AppIcon name="chart" size={18} color={colors.textSecondary} />
                </View>
              </View>

              <AppText variant="display" color="textPrimary" style={styles.portfolioValue}>
                ₹1,33,460
              </AppText>

              <View style={styles.returnsGrid}>
                <View style={{ flex: 1 }}>
                  <AppText variant="caption" color="textSecondary">
                    1D returns
                  </AppText>
                  <AppText variant="body" color="gain" style={{ fontWeight: '700', marginTop: 2 }}>
                    +₹273.54 (0.21%)
                  </AppText>
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="caption" color="textSecondary">
                    Total returns
                  </AppText>
                  <AppText variant="body" color="gain" style={{ fontWeight: '700', marginTop: 2 }}>
                    +₹3,666 (2.82%)
                  </AppText>
                </View>
              </View>

              <View style={[styles.investedRow, { borderTopColor: colors.border }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <View>
                    <AppText variant="caption" color="textSecondary">
                      Invested
                    </AppText>
                    <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginTop: 2 }}>
                      ₹1,29,794
                    </AppText>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <AppText variant="caption" color="textSecondary">
                      XIRR ▼
                    </AppText>
                    <AppText variant="body" color="gain" style={{ fontWeight: '700', marginTop: 2 }}>
                      4.81%
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.sortHeaderRow}>
              <AppIcon name="filter" size={14} color={colors.textSecondary} />
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                ‹› Current (Invested)
              </AppText>
            </View>

            {mockMutualFunds.slice(0, 4).map(fund => (
              <TouchableOpacity
                key={fund.id}
                activeOpacity={0.7}
                onPress={() => handleFundPress(fund)}
                style={[styles.fundListRow, { borderBottomColor: colors.border }]}
              >
                <View style={{ flex: 1.5 }}>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                    {fund.name}
                  </AppText>
                  {fund.hasSip && (
                    <View style={[styles.sipBadge, { backgroundColor: colors.surfaceSubtle }]}>
                      <AppText variant="micro" color="primary" style={{ fontWeight: '700' }}>
                        SIP
                      </AppText>
                    </View>
                  )}
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <AppText variant="body" color="gain" style={{ fontWeight: '700' }}>
                    ₹{fund.currentValue?.toLocaleString('en-IN')}
                  </AppText>
                  <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                    (₹{fund.investedValue?.toLocaleString('en-IN')})
                  </AppText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* VIEW 3: SIPS (PDF Page 20) */}
        {activeTab === 'SIPs' && (
          <View>
            {/* Monthly SIP Amount Card */}
            <View
              style={[
                styles.monthlySipCard,
                { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
              ]}
            >
              <AppText variant="micro" color="textSecondary" style={{ fontWeight: '800', letterSpacing: 1 }}>
                MONTHLY SIP AMOUNT
              </AppText>
              <AppText variant="display" color="textPrimary" style={{ fontWeight: '800', marginVertical: 6 }}>
                ₹9,600
              </AppText>

              <TouchableOpacity
                onPress={() => {}}
                style={[styles.upgradeSipRow, { borderTopColor: colors.border }]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcon name="shield" size={16} color={colors.primary} />
                  <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '600', marginLeft: 8 }}>
                    Upgrade all your SIPs to demat
                  </AppText>
                </View>
                <AppIcon name="chevron-right" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.sectionTitleRow}>
              <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                Active SIPs (6)
              </AppText>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                Sort by: Due date
              </AppText>
            </View>

            {mockMutualFunds.slice(0, 4).map(fund => (
              <TouchableOpacity
                key={fund.id}
                activeOpacity={0.7}
                onPress={() => handleFundPress(fund)}
                style={[styles.sipItemRow, { borderBottomColor: colors.border }]}
              >
                <View style={[styles.fundLogoCircle, { backgroundColor: colors.surfaceSubtle }]}>
                  <AppIcon name="mutual-funds" size={18} color={colors.primary} />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                    {fund.name}
                  </AppText>
                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '800', marginTop: 4 }}>
                    ₹{fund.sipAmount?.toLocaleString('en-IN')}
                  </AppText>
                </View>

                {fund.dueDate && (
                  <View style={[styles.dueDateBadge, { backgroundColor: colors.surfaceSubtle }]}>
                    <AppText variant="body" color="textPrimary" style={{ fontWeight: '800' }}>
                      {fund.dueDate.split(' ')[0]}
                    </AppText>
                    <AppText variant="micro" color="textSecondary" style={{ fontWeight: '700' }}>
                      {fund.dueDate.split(' ')[1]}
                    </AppText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* VIEW 4: WATCHLIST (PDF Page 21) */}
        {activeTab === 'Watchlist' && (
          <View>
            <View style={styles.emptyIllustrationBox}>
              <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
                <AppIcon name="explore" size={48} color={colors.textSecondary} />
              </View>
              <AppText variant="h3" color="textSecondary" style={{ marginTop: 16 }}>
                Start adding funds to Watchlist
              </AppText>
            </View>

            <View style={{ marginTop: spacing.xxl }}>
              <View style={styles.sectionTitleRow}>
                <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                  TRENDING
                </AppText>
                <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                  3Y Returns
                </AppText>
              </View>

              {mockMutualFunds.slice(7).map(fund => (
                <TouchableOpacity
                  key={fund.id}
                  activeOpacity={0.7}
                  onPress={() => handleFundPress(fund)}
                  style={[styles.trendingRow, { borderBottomColor: colors.border }]}
                >
                  <AppText variant="body" color="textPrimary" style={{ flex: 1, fontWeight: '600' }}>
                    {fund.name}
                  </AppText>

                  <AppText variant="body" color="textPrimary" style={{ fontWeight: '700', marginRight: 16 }}>
                    {fund.returns3Y}%
                  </AppText>

                  <AppIcon name="bookmark" size={18} color={colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionHeader: {
    fontWeight: '700',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  fundCard: {
    width: '48%',
    padding: 14,
    borderWidth: 1,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  fundLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundCardName: {
    fontWeight: '700',
    lineHeight: 18,
  },
  fundReturnsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  collectionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  collectionCard: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  collectionIconBox: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 12,
  },
  sortHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  fundListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  sipBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  monthlySipCard: {
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  upgradeSipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  sipItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  dueDateBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});

export default MutualFundsScreen;
