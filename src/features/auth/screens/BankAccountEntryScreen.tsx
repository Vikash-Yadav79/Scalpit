import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { KeyboardWrapper } from '../../../components/layout/KeyboardWrapper';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type BankAccountNavProp = StackNavigationProp<AuthStackParamList, 'BankAccountEntry'>;
type BankAccountRouteProp = RouteProp<AuthStackParamList, 'BankAccountEntry'>;

export const BankAccountEntryScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<BankAccountNavProp>();
  const route = useRoute<BankAccountRouteProp>();

  const bankName = route.params?.bankName || 'STATE BANK OF INDIA';
  const branch = route.params?.branch || 'new market , patna, PATNA';
  const ifsc = route.params?.ifsc || 'SBIN0000152';

  const [accountNo, setAccountNo] = useState('');
  const [reAccountNo, setReAccountNo] = useState('');
  const [error, setError] = useState('');

  const handleVerifyBank = () => {
    if (accountNo.length < 9) {
      setError('Please enter a valid 9 to 18 digit account number');
      return;
    }
    if (accountNo !== reAccountNo) {
      setError('Account numbers do not match');
      return;
    }

    // Navigate to Penny-Drop Verification Screen (PDF Page 12)
    navigation.navigate('PennyDrop', {
      bankName,
      accountNo,
    });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('BankFaq')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AppText variant="body" color="textSecondary" style={styles.helpLink}>
              Need help?
            </AppText>
          </TouchableOpacity>
        }
      />

      <KeyboardWrapper contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}>
        <View style={styles.topSection}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            Enter bank account number for PUNAM KUMARI
          </AppText>

          {/* Selected Bank Badge (Matching PDF Page 13) */}
          <View
            style={[
              styles.selectedBankCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.md,
                marginTop: spacing.xl,
              },
            ]}
          >
            <View style={[styles.bankLogoCircle, { backgroundColor: '#280071' }]}>
              <AppIcon name="bank" size={20} color="#FFFFFF" />
            </View>

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
                {bankName}
              </AppText>
              <AppText variant="bodySmall" color="textPrimary" style={{ fontWeight: '600', marginTop: 2 }}>
                {branch}
              </AppText>
              <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
                IFSC: {ifsc}
              </AppText>
            </View>
          </View>

          {/* Quick Demo Autofill Badge */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAccountNo('38491028475');
              setReAccountNo('38491028475');
              if (error) setError('');
            }}
            style={[
              styles.demoBadge,
              {
                backgroundColor: colors.surfaceSubtle,
                borderColor: colors.border,
                borderRadius: radius.md,
                padding: spacing.sm,
                marginTop: spacing.md,
              },
            ]}
          >
            <AppIcon name="bank" size={16} color={colors.primary} />
            <AppText
              variant="micro"
              style={{ color: colors.textSecondary, marginLeft: spacing.xs, flex: 1 }}
            >
              Demo: Tap to fill <AppText variant="micro" color="primary" style={{ fontWeight: '800' }}>38491028475</AppText> or enter your account below.
            </AppText>
          </TouchableOpacity>

          {/* Account Number Input Boxes */}
          <View style={{ marginTop: spacing.lg }}>
            <AppInput
              value={accountNo}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '').slice(0, 18);
                setAccountNo(cleaned);
                if (error) setError('');
              }}
              placeholder="9-18 digit account number"
              keyboardType="number-pad"
              showClear
              onClear={() => setAccountNo('')}
              containerStyle={{ marginBottom: spacing.lg }}
            />

            <AppInput
              value={reAccountNo}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '').slice(0, 18);
                setReAccountNo(cleaned);
                if (error) setError('');
              }}
              placeholder="Re-enter account number"
              keyboardType="number-pad"
              showClear
              onClear={() => setReAccountNo('')}
              error={error}
            />
          </View>
        </View>

        {/* Bottom Area with Security Badge and CTA */}
        <View style={[styles.bottomSection, { paddingBottom: spacing.xl }]}>
          <View style={styles.securityRow}>
            <AppIcon name="shield" size={16} color={colors.textSecondary} />
            <AppText
              variant="caption"
              color="textSecondary"
              style={[styles.securityText, { marginLeft: spacing.xs }]}
            >
              Your details are 100% safe & secure with us
            </AppText>
          </View>

          <AppButton
            title="Verify bank"
            onPress={handleVerifyBank}
            variant="primary"
            size="lg"
            style={styles.verifyBtn}
          />
        </View>
      </KeyboardWrapper>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  helpLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  topSection: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  selectedBankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
  },
  bankLogoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    paddingTop: 16,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontWeight: '500',
  },
  verifyBtn: {
    height: 52,
    borderRadius: 8,
  },
});

export default BankAccountEntryScreen;
