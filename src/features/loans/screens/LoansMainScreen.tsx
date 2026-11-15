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
import { AppModal } from '../../../components/common/AppModal';
import { AppButton } from '../../../components/common/AppButton';
import { AppInput } from '../../../components/common/AppInput';
import assets from '../../../config/assets';

export const LoansMainScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<any>();

  const [showPartners, setShowPartners] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState('500000');
  const [tenureYears, setTenureYears] = useState('3');

  const partners = [
    { name: 'IDFC FIRST Bank Limited', rbiReg: 'RBI Reg. No. 05.00032', rate: '10.49% onwards' },
    { name: 'Aditya Birla Finance Ltd', rbiReg: 'RBI Reg. No. 05.00018', rate: '11.00% onwards' },
    { name: 'Tata Capital Financial Services', rbiReg: 'RBI Reg. No. 07.00012', rate: '10.99% onwards' },
    { name: 'Muthoot Finance Ltd', rbiReg: 'RBI Reg. No. 11.00045', rate: '10.50% (LAS)' },
  ];

  const calculatedEmi = Math.round(
    (Number(loanAmount || 0) * (0.105 / 12) * Math.pow(1 + 0.105 / 12, Number(tenureYears || 1) * 12)) /
      (Math.pow(1 + 0.105 / 12, Number(tenureYears || 1) * 12) - 1)
  );

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* 1. Header matching PDF Page 18 */}
      <View style={[styles.mainHeader, { borderBottomColor: colors.border }]}>
        <View style={styles.brandRow}>
          <Image
            source={assets.brand.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <AppText variant="h2" color="textPrimary" style={styles.tabTitle}>
            Loans
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {/* Card 1: Personal Loan (Matching PDF Page 18) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowLoanModal(true)}
          style={[
            styles.loanCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
            },
          ]}
        >
          <View style={styles.loanCardLeft}>
            <View style={styles.titleRow}>
              <AppText variant="h2" color="textPrimary" style={{ fontWeight: '700' }}>
                Personal loan
              </AppText>
              <AppIcon name="chevron-right" size={20} color={colors.textSecondary} />
            </View>

            <AppText variant="bodySmall" color="textSecondary" style={{ marginTop: 4 }}>
              Hassle-free money in your bank account
            </AppText>

            <View style={{ marginTop: 24 }}>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                Available upto
              </AppText>
              <AppText variant="display" color="textPrimary" style={styles.loanLimitText}>
                ₹20,00,000
              </AppText>
            </View>
          </View>

          {/* 3D Cash / Calendar Isometric Artwork Simulation */}
          <View style={styles.illustrationBox}>
            <View style={[styles.artCircle, { backgroundColor: '#00D09C15' }]}>
              <AppIcon name="wallet" size={44} color={colors.primary} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Card 2: Loan Against Securities (Matching PDF Page 18) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowLoanModal(true)}
          style={[
            styles.loanCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View style={styles.loanCardLeft}>
            <View style={styles.titleRow}>
              <AppText variant="h2" color="textPrimary" style={{ fontWeight: '700' }}>
                Loan against Securities
              </AppText>
              <AppIcon name="chevron-right" size={20} color={colors.textSecondary} />
            </View>

            <AppText variant="bodySmall" color="textSecondary" style={{ marginTop: 4 }}>
              @10.5% p.a.
            </AppText>

            <View style={{ marginTop: 24 }}>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '600' }}>
                Get up to
              </AppText>
              <AppText variant="display" color="textPrimary" style={styles.loanLimitText}>
                ₹15 Cr
              </AppText>
            </View>
          </View>

          {/* 3D Vault / Token Artwork Simulation */}
          <View style={styles.illustrationBox}>
            <View style={[styles.artCircle, { backgroundColor: '#3B82F615' }]}>
              <AppIcon name="shield" size={44} color="#3B82F6" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Lending Partners Dropdown matching PDF Page 18 */}
        <View style={styles.partnersSection}>
          <TouchableOpacity
            onPress={() => setShowPartners(prev => !prev)}
            activeOpacity={0.7}
            style={styles.partnersToggleBtn}
          >
            <AppText variant="body" color="textSecondary" style={{ fontWeight: '600' }}>
              Our Lending Partners
            </AppText>
            <AppIcon
              name={showPartners ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.textSecondary}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          {showPartners && (
            <View
              style={[
                styles.partnersCard,
                { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg },
              ]}
            >
              {partners.map((partner, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.partnerRow,
                    idx < partners.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
                      {partner.name}
                    </AppText>
                    <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
                      {partner.rbiReg}
                    </AppText>
                  </View>
                  <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
                    {partner.rate}
                  </AppText>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Interactive Loan Apply & EMI Calculator Modal */}
      <AppModal
        visible={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        title="Personal Loan Instant Calculator"
      >
        <View style={{ paddingTop: 8 }}>
          <AppInput
            label="Required Loan Amount (₹)"
            value={loanAmount}
            onChangeText={setLoanAmount}
            keyboardType="numeric"
          />

          <AppInput
            label="Tenure (Years)"
            value={tenureYears}
            onChangeText={setTenureYears}
            keyboardType="numeric"
            containerStyle={{ marginTop: 16 }}
          />

          <View
            style={[
              styles.emiResultBox,
              { backgroundColor: colors.surfaceSubtle, borderColor: colors.primary, borderRadius: radius.md },
            ]}
          >
            <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
              ESTIMATED MONTHLY EMI
            </AppText>
            <AppText variant="display" color="primary" style={{ fontWeight: '800', marginTop: 4 }}>
              ₹{isNaN(calculatedEmi) ? '0' : calculatedEmi.toLocaleString('en-IN')}
            </AppText>
            <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
              Interest rate: 10.5% p.a. • Zero prepayment charges
            </AppText>
          </View>

          <View style={{ marginTop: 24, flexDirection: 'row', gap: 12 }}>
            <AppButton
              title="Close"
              variant="outline"
              onPress={() => setShowLoanModal(false)}
              style={{ flex: 1 }}
            />
            <AppButton
              title="Apply Now"
              variant="primary"
              onPress={() => {
                setShowLoanModal(false);
              }}
              style={{ flex: 1.4 }}
            />
          </View>
        </View>
      </AppModal>
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
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  loanCard: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  loanCardLeft: {
    flex: 1.4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loanLimitText: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  illustrationBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnersSection: {
    alignItems: 'center',
    marginTop: 36,
  },
  partnersToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  partnersCard: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    marginTop: 12,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  emiResultBox: {
    padding: 16,
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoansMainScreen;
