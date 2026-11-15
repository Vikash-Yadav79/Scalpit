import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type VerifyAadhaarNavProp = StackNavigationProp<AuthStackParamList, 'VerifyAadhaar'>;

export const VerifyAadhaarScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<VerifyAadhaarNavProp>();

  const [agreed, setAgreed] = useState(true);
  const [isSigning, setIsSigning] = useState(false);

  const signerName = 'VIKASH YADAV';

  const handleSignNow = () => {
    setIsSigning(true);
    // Simulate instantaneous eSign completion with Digio / UIDAI
    setTimeout(() => {
      setIsSigning(false);
      navigation.navigate('KycSuccess');
    }, 900);
  };

  return (
    <ScreenContainer>
      {/* Top Header bar */}
      <View style={styles.topBar}>
        <View style={styles.leftBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ marginRight: 12 }}
          >
            <AppIcon name="chevron-left" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
          <AppText variant="h3" color="textPrimary" style={styles.headerTitle}>
            Verify Aadhaar
          </AppText>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <AppText variant="bodySmall" color="textPrimary" style={styles.forgotLink}>
            Forgot Aadhaar?
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {/* Brand Bar */}
        <View style={styles.brandBar}>
          <View style={styles.logoRow}>
            <Image
              source={assets.brand.logo}
              style={styles.logoIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.utilityIcons}>
            <View style={[styles.langBadge, { borderColor: colors.border }]}>
              <AppText variant="micro" color="primary" style={{ fontWeight: '700' }}>
                अA
              </AppText>
            </View>
            <View style={[styles.accessBadge, { borderColor: colors.border, marginLeft: 8 }]}>
              <AppIcon name="user" size={14} color={colors.textPrimary} />
            </View>
          </View>
        </View>

        {/* Document Preview Card (Matching Screenshot 4) */}
        <View
          style={[
            styles.documentPreviewCard,
            {
              backgroundColor: '#E8F5E9',
              borderRadius: radius.lg,
              padding: spacing.md,
            },
          ]}
        >
          {/* Document Sheet Simulation */}
          <View
            style={[
              styles.documentPaper,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                padding: spacing.md,
              },
            ]}
          >
            <View style={styles.docHeader}>
              <View style={styles.docLogoRow}>
                <Image
                  source={assets.brand.logo}
                  style={styles.tinyLogo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.docTitleCol}>
                <AppText variant="caption" color="primary" style={{ fontWeight: '800' }}>
                  ACCOUNT
                </AppText>
                <AppText variant="caption" color="primary" style={{ fontWeight: '800' }}>
                  OPENING FORM
                </AppText>
              </View>
            </View>

            {/* SEBI & Broker Document Header */}
            <View style={styles.mandateHeader}>
              <AppText variant="micro" color="textPrimary" align="center" style={{ fontWeight: '700' }}>
                MANDATORY DOCUMENTS AS PRESCRIBED BY SEBI & EXCHANGES
              </AppText>
            </View>

            {/* Mock Clauses Table */}
            <View style={styles.clausesTable}>
              <View style={styles.tableRow}>
                <AppText variant="micro" color="textSecondary" style={{ flex: 1 }}>
                  1. Rights & Obligations of Stock Broker & Client
                </AppText>
              </View>
              <View style={styles.tableRow}>
                <AppText variant="micro" color="textSecondary" style={{ flex: 1 }}>
                  2. Risk Disclosure Document for Capital Market & F&O
                </AppText>
              </View>
              <View style={styles.tableRow}>
                <AppText variant="micro" color="textSecondary" style={{ flex: 1 }}>
                  3. Guidance Note - Do's & Don'ts for Trading on Exchange
                </AppText>
              </View>
              <View style={styles.tableRow}>
                <AppText variant="micro" color="textSecondary" style={{ flex: 1 }}>
                  4. Electronic Contract Note (ECN) Declaration
                </AppText>
              </View>
            </View>

            {/* Digital Stamp of Signer */}
            <View style={styles.stampRow}>
              <View style={styles.signatureBox}>
                <AppIcon name="check" size={14} color="#00B386" />
                <AppText variant="micro" color="primary" style={{ fontWeight: '800', marginLeft: 4 }}>
                  eSigned by {signerName}
                </AppText>
              </View>
            </View>
          </View>

          {/* View Full Document Link */}
          <TouchableOpacity activeOpacity={0.7} style={styles.viewDocLink}>
            <AppText variant="bodySmall" color="primary" style={{ fontWeight: '700' }}>
              View full document
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet Information (Screenshot 4) */}
        <View style={styles.signerSection}>
          <View style={styles.signerNameRow}>
            <AppText variant="body" color="textSecondary">
              Signer name:{' '}
            </AppText>
            <AppText variant="bodyLarge" color="textPrimary" style={{ fontWeight: '800' }}>
              {signerName}
            </AppText>
          </View>

          {/* Consent Checkbox */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAgreed(prev => !prev)}
            style={styles.consentRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: agreed ? '#00B386' : colors.border,
                  backgroundColor: agreed ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {agreed && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <AppText variant="caption" color="textSecondary" style={styles.consentText}>
              1. By continuing, I agree to do eKyc using Aadhaar to eSign with one of ESPs (CVL or eMudhra or others) Digio is registered as ASP
            </AppText>
          </TouchableOpacity>

          {/* Sign Now Button */}
          <AppButton
            title={isSigning ? 'Processing Signature...' : 'Sign Now'}
            onPress={handleSignNow}
            disabled={!agreed || isSigning}
            loading={isSigning}
            variant="primary"
            size="lg"
            style={styles.signNowBtn}
          />

          {/* Secured by Digio footer */}
          <View style={styles.digioFooter}>
            <AppText variant="micro" color="textTertiary">
              Secured by <AppText variant="micro" style={{ fontWeight: '700', color: colors.textSecondary }}>digio</AppText>
            </AppText>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
  },
  forgotLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  brandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 90,
    height: 32,
    borderRadius: 4,
  },
  utilityIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentPreviewCard: {
    marginVertical: 12,
  },
  documentPaper: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 280,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  docLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 65,
    height: 24,
    borderRadius: 3,
  },
  docTitleCol: {
    alignItems: 'flex-end',
  },
  mandateHeader: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 8,
    borderRadius: 4,
  },
  clausesTable: {
    marginVertical: 6,
  },
  tableRow: {
    paddingVertical: 3,
  },
  stampRow: {
    marginTop: 18,
    alignItems: 'flex-end',
  },
  signatureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00B386',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewDocLink: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  signerSection: {
    marginTop: 12,
  },
  signerNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  consentText: {
    flex: 1,
    lineHeight: 18,
  },
  signNowBtn: {
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
  digioFooter: {
    alignItems: 'center',
    marginTop: 14,
  },
});

export default VerifyAadhaarScreen;
