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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';

type NavProp = StackNavigationProp<RootStackParamList>;

export const PersonalLoanApplyScreen: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);

  const interestRate = 10.5; // 10.5% p.a.
  const monthlyRate = interestRate / 12 / 100;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;

  const handleApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApprovalModal(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <AppHeader
        title="Apply for Personal Loan"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Loan Amount Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.label}>
            REQUIRED LOAN AMOUNT
          </AppText>
          <AppText variant="h1" color="primary" style={styles.amountText}>
            ₹{loanAmount.toLocaleString('en-IN')}
          </AppText>

          <View style={styles.amountPills}>
            {[100000, 250000, 500000, 1000000, 1500000, 2000000].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.pill,
                  loanAmount === amt
                    ? { borderColor: colors.primary, backgroundColor: colors.surfaceSubtle }
                    : { borderColor: colors.border, backgroundColor: 'transparent' },
                ]}
                onPress={() => setLoanAmount(amt)}
              >
                <AppText
                  variant="caption"
                  style={{
                    color: loanAmount === amt ? colors.primary : colors.textSecondary,
                    fontWeight: loanAmount === amt ? '700' : '500',
                  }}
                >
                  ₹{amt >= 100000 ? `${amt / 100000} Lakh` : amt}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tenure Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.label}>
            LOAN TENURE (MONTHS)
          </AppText>

          <View style={styles.tenureRow}>
            {[12, 24, 36, 48, 60].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.tenureBtn,
                  tenureMonths === m
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                ]}
                onPress={() => setTenureMonths(m)}
              >
                <AppText
                  variant="body"
                  style={{
                    color: tenureMonths === m ? '#FFFFFF' : colors.textPrimary,
                    fontWeight: '700',
                  }}
                >
                  {m}M
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calculation Details Box */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="h3" style={styles.cardHeading}>
            EMI Breakdown
          </AppText>

          <View style={styles.emiHighlightRow}>
            <View>
              <AppText variant="caption" color="textSecondary">
                Monthly EMI
              </AppText>
              <AppText variant="h2" color="primary">
                ₹{emi.toLocaleString('en-IN')}/mo
              </AppText>
            </View>
            <View style={styles.rateBadge}>
              <AppText variant="micro" color="textSecondary">
                Interest Rate
              </AppText>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                10.5% p.a.
              </AppText>
            </View>
          </View>

          <View style={[styles.breakdownTable, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={styles.tableRow}>
              <AppText variant="caption" color="textSecondary">
                Principal Amount
              </AppText>
              <AppText variant="caption" style={{ fontWeight: '600' }}>
                ₹{loanAmount.toLocaleString('en-IN')}
              </AppText>
            </View>
            <View style={styles.tableRow}>
              <AppText variant="caption" color="textSecondary">
                Total Interest Payable
              </AppText>
              <AppText variant="caption" style={{ fontWeight: '600' }}>
                ₹{totalInterest.toLocaleString('en-IN')}
              </AppText>
            </View>
            <View style={[styles.tableRow, styles.tableTotalRow]}>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                Total Amount Payable
              </AppText>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                ₹{totalPayable.toLocaleString('en-IN')}
              </AppText>
            </View>
          </View>
        </View>

        {/* Disbursement Bank */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText variant="caption" color="textSecondary" style={styles.label}>
            DISBURSAL DESTINATION
          </AppText>
          <View style={styles.bankRow}>
            <View style={[styles.bankIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
              <AppIcon name="bank" size={20} color={colors.primary} />
            </View>
            <View style={styles.bankDetails}>
              <AppText variant="body" style={{ fontWeight: '600' }}>
                State Bank of India
              </AppText>
              <AppText variant="caption" color="textSecondary">
                A/C •••• 4892 (Demat Linked Bank)
              </AppText>
            </View>
            <AppIcon name="check-circle" size={20} color={colors.success} />
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
          title={isSubmitting ? 'Evaluating Offer...' : 'Get Instant Approval'}
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleApply}
        />
      </View>

      {/* Loan Approved Modal */}
      <Modal
        visible={showApprovalModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowApprovalModal(false)}
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
              Loan Approved In-Principle!
            </AppText>

            <AppText
              variant="body"
              color="textSecondary"
              style={styles.successDescription}
            >
              Congratulations! Your pre-approved personal loan offer of ₹{loanAmount.toLocaleString('en-IN')} has been sanctioned by our lending partner IDFC FIRST Bank.
            </AppText>

            <View style={[styles.sanctionBox, { backgroundColor: colors.surfaceSubtle }]}>
              <View style={styles.tableRow}>
                <AppText variant="caption" color="textSecondary">
                  Monthly EMI
                </AppText>
                <AppText variant="caption" color="primary" style={{ fontWeight: '700' }}>
                  ₹{emi.toLocaleString('en-IN')} / mo ({tenureMonths} Months)
                </AppText>
              </View>
              <View style={styles.tableRow}>
                <AppText variant="caption" color="textSecondary">
                  Disbursal Timeline
                </AppText>
                <AppText variant="caption" style={{ fontWeight: '700' }}>
                  Within 2 Hours
                </AppText>
              </View>
            </View>

            <AppButton
              title="Return to Loans"
              variant="primary"
              style={{ width: '100%' }}
              onPress={() => {
                setShowApprovalModal(false);
                navigation.navigate('Main', { screen: 'LoansTab' });
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
  label: {
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  amountText: {
    marginVertical: 8,
  },
  amountPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  tenureRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tenureBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  cardHeading: {
    marginBottom: 12,
  },
  emiHighlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rateBadge: {
    alignItems: 'flex-end',
  },
  breakdownTable: {
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableTotalRow: {
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 8,
    marginTop: 4,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  bankIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bankDetails: {
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
  sanctionBox: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
});

export default PersonalLoanApplyScreen;
