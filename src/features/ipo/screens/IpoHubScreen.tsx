import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { mockIpos, IpoItem } from '../../../services/mockData';

type NavProp = StackNavigationProp<RootStackParamList>;

export const IpoHubScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const [activeTab, setActiveTab] = useState<'OPEN' | 'UPCOMING' | 'CLOSED'>('OPEN');

  const filteredIpos = mockIpos.filter((item) => item.status === activeTab);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Initial Public Offerings (IPO)"
        showBack
        onBack={() => navigation.goBack()}
      />

      {/* Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {(['OPEN', 'UPCOMING', 'CLOSED'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem,
              activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <AppText
              variant="body"
              style={{
                color: activeTab === tab ? colors.primary : colors.textSecondary,
                fontWeight: activeTab === tab ? '700' : '500',
              }}
            >
              {tab === 'OPEN'
                ? `Open (${mockIpos.filter((i) => i.status === 'OPEN').length})`
                : tab === 'UPCOMING'
                ? `Upcoming (${mockIpos.filter((i) => i.status === 'UPCOMING').length})`
                : `Closed (${mockIpos.filter((i) => i.status === 'CLOSED').length})`}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredIpos.map((ipo: IpoItem) => {
          const minPrice = parseInt(ipo.priceBand.split('-')[0].replace(/[^0-9]/g, ''), 10) || 300;
          const minInvestment = minPrice * ipo.lotSize;

          return (
            <TouchableOpacity
              key={ipo.id}
              activeOpacity={0.85}
              style={[
                styles.ipoCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() =>
                navigation.navigate('IpoDetails', {
                  ipoId: ipo.id,
                  companyName: ipo.companyName,
                })
              }
            >
              {/* Header */}
              <View style={styles.ipoHeader}>
                <View style={styles.companyInfo}>
                  <AppText variant="h3" numberOfLines={1}>
                    {ipo.companyName}
                  </AppText>
                  <AppText variant="caption" color="textSecondary" style={styles.datesText}>
                    {ipo.dates}
                  </AppText>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    {
                      backgroundColor:
                        ipo.status === 'OPEN'
                          ? 'rgba(0,208,156,0.15)'
                          : ipo.status === 'UPCOMING'
                          ? 'rgba(255,186,0,0.15)'
                          : colors.surfaceSubtle,
                    },
                  ]}
                >
                  <AppText
                    variant="micro"
                    style={{
                      color:
                        ipo.status === 'OPEN'
                          ? colors.success
                          : ipo.status === 'UPCOMING'
                          ? '#FFBA00'
                          : colors.textSecondary,
                      fontWeight: '700',
                    }}
                  >
                    {ipo.status}
                  </AppText>
                </View>
              </View>

              {/* Specs Grid */}
              <View style={styles.specsRow}>
                <View style={styles.specCol}>
                  <AppText variant="micro" color="textSecondary">
                    PRICE BAND
                  </AppText>
                  <AppText variant="caption" style={styles.specVal}>
                    {ipo.priceBand}
                  </AppText>
                </View>

                <View style={styles.specCol}>
                  <AppText variant="micro" color="textSecondary">
                    MIN INVESTMENT
                  </AppText>
                  <AppText variant="caption" style={styles.specVal}>
                    ₹{minInvestment.toLocaleString('en-IN')} ({ipo.lotSize} shares)
                  </AppText>
                </View>

                <View style={styles.specCol}>
                  <AppText variant="micro" color="textSecondary">
                    ISSUE SIZE
                  </AppText>
                  <AppText variant="caption" style={styles.specVal}>
                    {ipo.issueSize}
                  </AppText>
                </View>
              </View>

              {/* Bottom Row */}
              <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                {ipo.subscriptionTimes ? (
                  <View style={styles.subTag}>
                    <AppIcon name="trending-up" size={14} color={colors.primary} />
                    <AppText variant="micro" color="primary" style={{ fontWeight: '700' }}>
                      {ipo.subscriptionTimes}x Subscribed
                    </AppText>
                  </View>
                ) : (
                  <AppText variant="micro" color="textSecondary">
                    Bidding opens 10:00 AM
                  </AppText>
                )}

                {ipo.status === 'OPEN' && (
                  <AppButton
                    title="Apply"
                    size="sm"
                    variant="primary"
                    style={styles.applyBtn}
                    onPress={() =>
                      navigation.navigate('ApplyIpo', {
                        ipoId: ipo.id,
                        companyName: ipo.companyName,
                        priceBand: ipo.priceBand,
                      })
                    }
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  ipoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  ipoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyInfo: {
    flex: 1,
    marginRight: 12,
  },
  datesText: {
    marginTop: 4,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  specCol: {
    flex: 1,
  },
  specVal: {
    fontWeight: '700',
    marginTop: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  subTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyBtn: {
    minWidth: 80,
    height: 36,
  },
});

export default IpoHubScreen;
