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

type ApplyIpoRouteProp = RouteProp<RootStackParamList, 'ApplyIpo'>;
type NavProp = StackNavigationProp<RootStackParamList>;

export const ApplyIpoModal: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ApplyIpoRouteProp>();

  const { companyName, priceBand } = route.params;

  const lotSize = 38;
  const cutOffPrice = 390;
  const [lots, setLots] = useState<number>(1);
  const [useCutoff, setUseCutoff] = useState<boolean>(true);
  const [upiUser, setUpiUser] = useState<string>('ankit9842');
  const [selectedBankHandle, setSelectedBankHandle] = useState<string>('@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const totalShares = lots * lotSize;
  const totalAmount = totalShares * cutOffPrice;

  const handleSubmitBid = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Apply for IPO"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* IPO Details Header */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3">{companyName}</AppText>
          <AppText variant="caption" color="textSecondary" style={styles.subInfo}>
            Price Band: {priceBand} • Cut-off: ₹{cutOffPrice}
          </AppText>
        </View>

        {/* Lots Selector */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.label}>
            NUMBER OF LOTS (MAX 13 LOTS FOR RETAIL)
          </AppText>

          <View style={styles.lotCounterRow}>
            <TouchableOpacity
              style={[
                styles.counterBtn,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}
              disabled={lots <= 1}
              onPress={() => setLots((prev) => Math.max(1, prev - 1))}
            >
              <AppText variant="h3" color={lots <= 1 ? 'textTertiary' : 'textPrimary'}>
                -
              </AppText>
            </TouchableOpacity>

            <View style={styles.lotDisplay}>
              <AppText variant="h2">{lots}</AppText>
              <AppText variant="micro" color="textSecondary">
                ({totalShares} Shares)
              </AppText>
            </View>

            <TouchableOpacity
              style={[
                styles.counterBtn,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}
              disabled={lots >= 13}
              onPress={() => setLots((prev) => Math.min(13, prev + 1))}
            >
              <AppText variant="h3" color={lots >= 13 ? 'textTertiary' : 'textPrimary'}>
                +
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Cut-off price toggle */}
          <TouchableOpacity
            style={styles.cutoffRow}
            activeOpacity={0.8}
            onPress={() => setUseCutoff(!useCutoff)}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: useCutoff ? colors.primary : colors.border,
                  backgroundColor: useCutoff ? colors.primary : 'transparent',
                },
              ]}
            >
              {useCutoff && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <View style={styles.cutoffTextWrap}>
              <AppText variant="body" style={{ fontWeight: '600' }}>
                Bid at Cut-off Price (₹{cutOffPrice})
              </AppText>
              <AppText variant="micro" color="textSecondary">
                Recommended for higher allotment chance
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* UPI Mandate Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.label}>
            ENTER YOUR UPI ID FOR MANDATE
          </AppText>

          <View style={styles.upiInputRow}>
            <View style={{ flex: 1 }}>
              <AppInput
                value={upiUser}
                onChangeText={setUpiUser}
                placeholder="UPI username"
              />
            </View>
            <View style={[styles.handleBadge, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
              <AppText variant="body" color="primary" style={{ fontWeight: '700' }}>
                {selectedBankHandle}
              </AppText>
            </View>
          </View>

          {/* Quick Bank Handles */}
          <View style={styles.handlesRow}>
            {['@okhdfcbank', '@oksbi', '@icici', '@axisbank', '@paytm'].map((h) => (
              <TouchableOpacity
                key={h}
                style={[
                  styles.handleChip,
                  selectedBankHandle === h
                    ? { borderColor: colors.primary, backgroundColor: colors.surfaceSubtle }
                    : { borderColor: colors.border, backgroundColor: 'transparent' },
                ]}
                onPress={() => setSelectedBankHandle(h)}
              >
                <AppText
                  variant="micro"
                  style={{
                    color: selectedBankHandle === h ? colors.primary : colors.textSecondary,
                    fontWeight: selectedBankHandle === h ? '700' : '500',
                  }}
                >
                  {h}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Total Amount Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.surfaceSubtle }]}>
          <View style={styles.summaryRow}>
            <AppText variant="body" color="textSecondary">
              Total Bid Amount
            </AppText>
            <AppText variant="h2" color="primary">
              ₹{totalAmount.toLocaleString('en-IN')}
            </AppText>
          </View>
          <AppText variant="micro" color="textSecondary" style={styles.summaryNote}>
            Amount will only be blocked in your bank account, not debited until allotment.
          </AppText>
        </View>
      </ScrollView>

      {/* Sticky Bottom Submit Button */}
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
          title={isSubmitting ? 'Submitting Bid...' : `Apply with UPI • ₹${totalAmount.toLocaleString('en-IN')}`}
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting || !upiUser.trim()}
          onPress={handleSubmitBid}
        />
      </View>

      {/* Bid Submitted Success Modal */}
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
              <AppIcon name="check-circle" size={48} color={colors.success} />
            </View>

            <AppText variant="h2" style={styles.successTitle}>
              IPO Bid Placed!
            </AppText>

            <AppText
              variant="body"
              color="textSecondary"
              style={styles.successDescription}
            >
              Application for {totalShares} shares ({lots} lots) of {companyName} submitted.
            </AppText>

            <View style={[styles.receiptBox, { backgroundColor: colors.surfaceSubtle }]}>
              <View style={styles.receiptRow}>
                <AppText variant="caption" color="textSecondary">
                  Application No.
                </AppText>
                <AppText variant="caption" style={{ fontWeight: '700' }}>
                  SCAL-IPO-2026-89412
                </AppText>
              </View>
              <View style={styles.receiptRow}>
                <AppText variant="caption" color="textSecondary">
                  Blocked Amount
                </AppText>
                <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </AppText>
              </View>
              <View style={styles.receiptRow}>
                <AppText variant="caption" color="textSecondary">
                  UPI Mandate Sent To
                </AppText>
                <AppText variant="caption" style={{ fontWeight: '700' }}>
                  {upiUser}{selectedBankHandle}
                </AppText>
              </View>
            </View>

            <AppText variant="micro" color="textSecondary" style={styles.mandateWarning}>
              Please approve the mandate request in your UPI app before 5:00 PM today to finalize your bid.
            </AppText>

            <AppButton
              title="Done"
              variant="primary"
              style={{ width: '100%' }}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
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
  subInfo: {
    marginTop: 4,
  },
  label: {
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  lotCounterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 12,
  },
  counterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotDisplay: {
    alignItems: 'center',
    minWidth: 80,
  },
  cutoffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cutoffTextWrap: {
    flex: 1,
  },
  upiInputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  handleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  handlesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  handleChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryNote: {
    lineHeight: 16,
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
  receiptBox: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 8,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mandateWarning: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 16,
  },
});

export default ApplyIpoModal;
