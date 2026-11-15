import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { mockMutualFunds } from '../../../services/mockData';

type FundDetailsRouteProp = RouteProp<RootStackParamList, 'FundDetails'>;
type NavProp = StackNavigationProp<RootStackParamList>;

export const FundDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<FundDetailsRouteProp>();

  const { fundId, name } = route.params;
  const fund = mockMutualFunds.find((f) => f.id === fundId) || {
    id: fundId,
    name: name || 'Equity Growth Fund',
    returns3Y: 21.5,
    category: 'Large Cap Direct Growth',
    currentValue: 24500,
    investedValue: 20000,
  };

  const [activeTimeframe, setActiveTimeframe] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL'>('3Y');
  const [calcType, setCalcType] = useState<'SIP' | 'LUMPSUM'>('SIP');
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);

  const estimatedProfit =
    calcType === 'SIP'
      ? Math.round(monthlyAmount * 36 * (1 + fund.returns3Y / 100 * 0.55) - monthlyAmount * 36)
      : Math.round(monthlyAmount * Math.pow(1 + fund.returns3Y / 100, 3) - monthlyAmount);

  const totalInvestment = calcType === 'SIP' ? monthlyAmount * 36 : monthlyAmount;
  const totalValue = totalInvestment + estimatedProfit;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Mutual Fund"
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('SearchModal')}
          >
            <AppIcon name="bookmark" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Fund Title Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.fundHeaderRow}>
            <View style={[styles.logoPlaceholder, { backgroundColor: colors.surfaceSubtle }]}>
              <AppIcon name="mutual-funds" size={24} color={colors.primary} />
            </View>
            <View style={styles.fundTitleWrap}>
              <AppText variant="h3" numberOfLines={2}>
                {fund.name}
              </AppText>
              <View style={styles.badgeRow}>
                <View style={[styles.badge, { backgroundColor: colors.surfaceSubtle }]}>
                  <AppText variant="micro" color="textSecondary">
                    {fund.category}
                  </AppText>
                </View>
                <View style={[styles.badge, { backgroundColor: colors.surfaceSubtle }]}>
                  <AppText variant="micro" color="primary">
                    Very High Risk
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          {/* NAV & 3Y Return */}
          <View style={styles.navRow}>
            <View>
              <AppText variant="caption" color="textSecondary">
                NAV (07 Nov 2026)
              </AppText>
              <AppText variant="h2">₹84.32</AppText>
            </View>
            <View style={styles.alignRight}>
              <AppText variant="caption" color="textSecondary">
                3Y Annualised Return
              </AppText>
              <AppText variant="h2" color="gain">
                +{fund.returns3Y}%
              </AppText>
            </View>
          </View>

          {/* Timeframe Chips */}
          <View style={styles.timeframeRow}>
            {(['1M', '6M', '1Y', '3Y', '5Y', 'ALL'] as const).map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[
                  styles.tfChip,
                  activeTimeframe === tf && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setActiveTimeframe(tf)}
              >
                <AppText
                  variant="caption"
                  style={{
                    color: activeTimeframe === tf ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: activeTimeframe === tf ? '700' : '500',
                  }}
                >
                  {tf}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Investment Return Calculator */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.sectionTitle}>
            Return Calculator
          </AppText>
          <View style={[styles.pillToggle, { backgroundColor: colors.surfaceSubtle }]}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                calcType === 'SIP' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setCalcType('SIP')}
            >
              <AppText
                variant="caption"
                style={{
                  color: calcType === 'SIP' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: '700',
                }}
              >
                Monthly SIP
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                calcType === 'LUMPSUM' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setCalcType('LUMPSUM')}
            >
              <AppText
                variant="caption"
                style={{
                  color: calcType === 'LUMPSUM' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: '700',
                }}
              >
                One-Time
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.calcAmountRow}>
            <AppText variant="body" color="textSecondary">
              {calcType === 'SIP' ? 'Investment per month' : 'Total investment'}
            </AppText>
            <AppText variant="h3">₹{monthlyAmount.toLocaleString('en-IN')}</AppText>
          </View>

          {/* Quick preset pills */}
          <View style={styles.quickPillRow}>
            {[1000, 2500, 5000, 10000, 25000].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.amtPill,
                  monthlyAmount === amt && {
                    borderColor: colors.primary,
                    backgroundColor: colors.surfaceSubtle,
                  },
                  { borderColor: colors.border },
                ]}
                onPress={() => setMonthlyAmount(amt)}
              >
                <AppText
                  variant="micro"
                  style={{
                    color: monthlyAmount === amt ? colors.primary : colors.textSecondary,
                    fontWeight: monthlyAmount === amt ? '700' : '500',
                  }}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.calcResultBox, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={styles.resRow}>
              <AppText variant="caption" color="textSecondary">
                Total Invested over 3Y
              </AppText>
              <AppText variant="body">₹{totalInvestment.toLocaleString('en-IN')}</AppText>
            </View>
            <View style={styles.resRow}>
              <AppText variant="caption" color="textSecondary">
                Estimated Gain (+{fund.returns3Y}%)
              </AppText>
              <AppText variant="body" color="gain">
                +₹{estimatedProfit.toLocaleString('en-IN')}
              </AppText>
            </View>
            <View style={[styles.resRow, styles.resTotalRow]}>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                Estimated Value
              </AppText>
              <AppText variant="h3" color="primary">
                ₹{totalValue.toLocaleString('en-IN')}
              </AppText>
            </View>
          </View>
        </View>

        {/* Fund Fundamentals */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.sectionTitle}>
            Fund Information
          </AppText>

          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                AUM (Fund Size)
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                ₹48,210 Cr
              </AppText>
            </View>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                Expense Ratio
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                0.74%
              </AppText>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                Exit Load
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                1.00% if redeemed &lt; 1 yr
              </AppText>
            </View>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                Benchmark
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                NIFTY 50 TRI
              </AppText>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                Lock-in Period
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                None (Open Ended)
              </AppText>
            </View>
            <View style={styles.gridCol}>
              <AppText variant="micro" color="textSecondary">
                Fund Manager
              </AppText>
              <AppText variant="body" style={styles.gridVal}>
                R. Srinivasan
              </AppText>
            </View>
          </View>
        </View>

        {/* Top Holdings */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.sectionTitle}>
            Top Portfolio Holdings
          </AppText>

          {[
            { company: 'HDFC Bank Ltd', sector: 'Financials', share: '9.4%' },
            { company: 'Reliance Industries Ltd', sector: 'Energy', share: '8.1%' },
            { company: 'ICICI Bank Ltd', sector: 'Financials', share: '6.7%' },
            { company: 'Infosys Ltd', sector: 'Technology', share: '5.2%' },
            { company: 'Tata Consultancy Services', sector: 'Technology', share: '4.3%' },
          ].map((item, idx) => (
            <View
              key={item.company}
              style={[
                styles.holdingRow,
                idx !== 4 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View>
                <AppText variant="body" style={{ fontWeight: '600' }}>
                  {item.company}
                </AppText>
                <AppText variant="micro" color="textSecondary">
                  {item.sector}
                </AppText>
              </View>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                {item.share}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <AppButton
          title="One-Time"
          variant="outline"
          style={styles.oneTimeBtn}
          onPress={() =>
            navigation.navigate('FundSipInvest', {
              fundId: fund.id,
              name: fund.name,
            })
          }
        />
        <AppButton
          title="Start SIP"
          variant="primary"
          style={styles.sipBtn}
          onPress={() =>
            navigation.navigate('FundSipInvest', {
              fundId: fund.id,
              name: fund.name,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBtn: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  fundHeaderRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fundTitleWrap: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  timeframeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  tfChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 14,
  },
  pillToggle: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  calcAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amtPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  calcResultBox: {
    borderRadius: 12,
    padding: 14,
  },
  resRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resTotalRow: {
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 0,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  gridCol: {
    flex: 1,
  },
  gridVal: {
    marginTop: 3,
    fontWeight: '600',
  },
  holdingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  oneTimeBtn: {
    flex: 1,
  },
  sipBtn: {
    flex: 1,
  },
});

export default FundDetailsScreen;
