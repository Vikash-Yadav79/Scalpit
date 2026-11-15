import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppInput } from '../../../components/common/AppInput';
import { AppIcon } from '../../../components/common/AppIcon';

type SipRouteProp = RouteProp<RootStackParamList, 'FundSipInvest'>;
type NavProp = StackNavigationProp<RootStackParamList>;

export const FundSipInvestModal: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<SipRouteProp>();

  const { name } = route.params;

  const [sipAmount, setSipAmount] = useState<string>('5000');
  const [selectedDay, setSelectedDay] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const parsedAmount = parseInt(sipAmount, 10) || 0;
  const isAmountValid = parsedAmount >= 500;

  const handleStartSip = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Set up SIP"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Fund Title Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" numberOfLines={2}>
            {name}
          </AppText>
          <AppText variant="caption" color="textSecondary" style={styles.subText}>
            Direct Plan • Growth • Zero Commission
          </AppText>
        </View>

        {/* Installment Amount Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.inputLabel}>
            MONTHLY SIP AMOUNT
          </AppText>

          <AppInput
            value={sipAmount}
            onChangeText={setSipAmount}
            keyboardType="numeric"
            placeholder="Min ₹500"
            error={!isAmountValid && sipAmount.length > 0 ? 'Minimum investment is ₹500' : undefined}
          />

          {/* Quick Increment Chips */}
          <View style={styles.chipRow}>
            {[500, 1000, 2500, 5000].map((inc) => (
              <TouchableOpacity
                key={inc}
                style={[
                  styles.quickChip,
                  { borderColor: colors.border, backgroundColor: colors.surfaceSubtle },
                ]}
                onPress={() => setSipAmount((prev) => String((parseInt(prev, 10) || 0) + inc))}
              >
                <AppText variant="caption" color="textPrimary">
                  +₹{inc.toLocaleString('en-IN')}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Monthly SIP Date Selector */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.dateHeaderRow}>
            <AppText variant="caption" color="textSecondary">
              MONTHLY SIP DATE
            </AppText>
            <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
              {selectedDay}th of every month
            </AppText>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {[1, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28].map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateCircle,
                  selectedDay === day
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <AppText
                  variant="body"
                  style={{
                    color: selectedDay === day ? '#FFFFFF' : colors.textPrimary,
                    fontWeight: '700',
                  }}
                >
                  {day}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mandate Payment Account */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.inputLabel}>
            AUTOPAY BANK ACCOUNT
          </AppText>
          <View style={styles.bankAccountRow}>
            <View style={[styles.bankIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
              <AppIcon name="bank" size={20} color={colors.primary} />
            </View>
            <View style={styles.bankInfo}>
              <AppText variant="body" style={{ fontWeight: '600' }}>
                State Bank of India
              </AppText>
              <AppText variant="caption" color="textSecondary">
                A/C •••• 4892 • Mandate Active
              </AppText>
            </View>
            <AppIcon name="check-circle" size={20} color={colors.gain} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action */}
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
          title={isLoading ? 'Setting up SIP...' : `Start SIP of ₹${parsedAmount.toLocaleString('en-IN')}`}
          variant="primary"
          disabled={!isAmountValid || isLoading}
          loading={isLoading}
          onPress={handleStartSip}
        />
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={[styles.successIconCircle, { backgroundColor: 'rgba(0,208,156,0.15)' }]}>
              <AppIcon name="check-circle" size={48} color={colors.gain} />
            </View>

            <AppText variant="h2" style={styles.successTitle}>
              SIP Scheduled!
            </AppText>

            <AppText
              variant="body"
              color="textSecondary"
              style={styles.successDescription}
            >
              Your SIP of ₹{parsedAmount.toLocaleString('en-IN')} for {name} has been set up successfully for the {selectedDay}th of every month.
            </AppText>

            <View style={[styles.detailsBox, { backgroundColor: colors.surfaceSubtle }]}>
              <View style={styles.receiptRow}>
                <AppText variant="caption" color="textSecondary">
                  First Due Date
                </AppText>
                <AppText variant="caption" style={{ fontWeight: '700' }}>
                  {selectedDay} Nov 2026
                </AppText>
              </View>
              <View style={styles.receiptRow}>
                <AppText variant="caption" color="textSecondary">
                  AutoPay Mandate
                </AppText>
                <AppText variant="caption" color="gain" style={{ fontWeight: '700' }}>
                  SBI •••• 4892 Approved
                </AppText>
              </View>
            </View>

            <AppButton
              title="Go to Mutual Funds"
              variant="primary"
              style={{ width: '100%' }}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Main', { screen: 'MutualFundsTab' });
              }}
            />
          </View>
        </View>
      </Modal>
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
  subText: {
    marginTop: 6,
  },
  inputLabel: {
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  datesScroll: {
    gap: 8,
    paddingVertical: 4,
  },
  dateCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bankInfo: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  successDescription: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsBox: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 8,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FundSipInvestModal;
