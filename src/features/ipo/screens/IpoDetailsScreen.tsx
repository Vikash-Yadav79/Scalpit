import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
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
import { mockIpos } from '../../../services/mockData';

type IpoDetailsRouteProp = RouteProp<RootStackParamList, 'IpoDetails'>;
type NavProp = StackNavigationProp<RootStackParamList>;

export const IpoDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<IpoDetailsRouteProp>();

  const { ipoId, companyName } = route.params;
  const ipo = mockIpos.find((item) => item.id === ipoId) || {
    id: ipoId,
    companyName: companyName || 'Swiggy Limited',
    symbol: 'SWIGGY',
    priceBand: '₹371 - ₹390',
    lotSize: 38,
    issueSize: '₹11,327 Cr',
    status: 'OPEN' as const,
    dates: '6 Nov - 8 Nov',
    subscriptionTimes: 3.59,
  };

  const timelineSteps = [
    { title: 'Bidding Starts', date: '06 Nov 2026', done: true },
    { title: 'Bidding Ends', date: '08 Nov 2026', done: true },
    { title: 'Allotment Finalisation', date: '11 Nov 2026', done: false },
    { title: 'Refund Initiation', date: '12 Nov 2026', done: false },
    { title: 'Demat Transfer', date: '12 Nov 2026', done: false },
    { title: 'Listing Date', date: '13 Nov 2026', done: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title={ipo.companyName}
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Highlights Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.badgeRow}>
            <View style={[styles.statusBadge, { backgroundColor: 'rgba(0,208,156,0.15)' }]}>
              <AppText variant="micro" color="success" style={{ fontWeight: '700' }}>
                {ipo.status} • Retail Category
              </AppText>
            </View>
            {ipo.subscriptionTimes && (
              <View style={[styles.statusBadge, { backgroundColor: colors.surfaceSubtle }]}>
                <AppText variant="micro" color="primary" style={{ fontWeight: '700' }}>
                  {ipo.subscriptionTimes}x Subscribed
                </AppText>
              </View>
            )}
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <AppText variant="micro" color="textSecondary">
                Price Band
              </AppText>
              <AppText variant="body" style={styles.metricVal}>
                {ipo.priceBand}
              </AppText>
            </View>

            <View style={styles.metricBox}>
              <AppText variant="micro" color="textSecondary">
                Lot Size
              </AppText>
              <AppText variant="body" style={styles.metricVal}>
                {ipo.lotSize} shares
              </AppText>
            </View>

            <View style={styles.metricBox}>
              <AppText variant="micro" color="textSecondary">
                Issue Size
              </AppText>
              <AppText variant="body" style={styles.metricVal}>
                {ipo.issueSize}
              </AppText>
            </View>

            <View style={styles.metricBox}>
              <AppText variant="micro" color="textSecondary">
                Min Investment
              </AppText>
              <AppText variant="body" style={styles.metricVal}>
                ₹{(390 * ipo.lotSize).toLocaleString('en-IN')}
              </AppText>
            </View>
          </View>
        </View>

        {/* Timeline Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.sectionTitle}>
            IPO Timeline
          </AppText>

          {timelineSteps.map((step, idx) => (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    step.done
                      ? { backgroundColor: colors.primary }
                      : { backgroundColor: colors.surfaceSubtle, borderColor: colors.border, borderWidth: 2 },
                  ]}
                >
                  {step.done && <AppIcon name="check" size={12} color="#FFFFFF" />}
                </View>
                {idx < timelineSteps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      { backgroundColor: step.done ? colors.primary : colors.border },
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineRight}>
                <AppText
                  variant="body"
                  style={{ fontWeight: step.done ? '700' : '500' }}
                >
                  {step.title}
                </AppText>
                <AppText variant="micro" color="textSecondary">
                  {step.date}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        {/* About Company */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.sectionTitle}>
            About the Company
          </AppText>
          <AppText variant="body" color="textSecondary" style={styles.aboutText}>
            {ipo.companyName} is one of India&apos;s leading consumer tech platforms, operating an on-demand convenience platform addressing daily consumer needs through food delivery, grocery quick-commerce (Instamart), dining out, and events.
          </AppText>
        </View>
      </ScrollView>

      {/* Sticky Bottom Apply */}
      {ipo.status === 'OPEN' && (
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
            title="Apply for IPO"
            variant="primary"
            onPress={() =>
              navigation.navigate('ApplyIpo', {
                ipoId: ipo.id,
                companyName: ipo.companyName,
                priceBand: ipo.priceBand,
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricBox: {
    width: '47%',
  },
  metricVal: {
    fontWeight: '700',
    marginTop: 3,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 52,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  timelineRight: {
    flex: 1,
  },
  aboutText: {
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
});

export default IpoDetailsScreen;
