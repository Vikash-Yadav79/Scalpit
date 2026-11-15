import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { isValidPAN } from '../../../utils/validators';

type PanEntryNavProp = StackNavigationProp<AuthStackParamList, 'PanEntry'>;

export const PanEntryScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<PanEntryNavProp>();

  const [pan, setPan] = useState('');
  const [error, setError] = useState('');

  const handlePanChange = (text: string) => {
    const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setPan(cleaned);
    if (error) setError('');
  };

  const handleContinue = () => {
    const trimmed = pan.trim().toUpperCase();
    if (!isValidPAN(trimmed)) {
      setError('Please enter a valid 10-digit PAN (e.g. BKRYSO108A)');
      return;
    }

    // Navigate to Fetching PAN Details screen (matching PDF Pages 4 & 5)
    navigation.navigate('PanFetching', { panNumber: trimmed });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('PanFaq')}
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
            Enter your PAN
          </AppText>
          <AppText
            variant="body"
            color="textSecondary"
            style={[styles.subtitle, { marginTop: spacing.xs }]}
          >
            PAN is compulsory for investing in India
          </AppText>

          {/* Quick Demo Autofill Badge */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPan('BKRYSO108A');
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
            <AppIcon name="shield" size={16} color={colors.primary} />
            <AppText
              variant="micro"
              style={{ color: colors.textSecondary, marginLeft: spacing.xs, flex: 1 }}
            >
              Demo: Tap to fill <AppText variant="micro" color="primary" style={{ fontWeight: '800' }}>BKRYSO108A</AppText> or type your own PAN below.
            </AppText>
          </TouchableOpacity>

          {/* PAN Input Box */}
          <View style={[styles.inputContainer, { marginTop: spacing.lg }]}>
            <AppInput
              value={pan}
              onChangeText={handlePanChange}
              placeholder="e.g. BKRYSO108A"
              autoCapitalize="characters"
              autoCorrect={false}
              showClear
              onClear={() => setPan('')}
              error={error}
              autoFocus
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('PanFaq')}
              activeOpacity={0.7}
              style={{ marginTop: 8 }}
            >
              <AppText variant="bodySmall" color="textSecondary" style={styles.findPanLink}>
                Where can I find my PAN?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Area with Security Badge & CTA */}
        <View style={[styles.bottomSection, { paddingBottom: spacing.xl }]}>
          <View style={styles.securityRow}>
            <AppIcon name="shield" size={16} color={colors.textSecondary} />
            <AppText
              variant="caption"
              color="textSecondary"
              style={[styles.securityText, { marginLeft: spacing.xs }]}
            >
              Your PAN details are 100% safe & secure with us
            </AppText>
          </View>

          <AppButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            style={styles.continueBtn}
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
  },
  topSection: {
    marginTop: 10,
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: -0.5,
  },
  subtitle: {
    lineHeight: 20,
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  inputContainer: {
    width: '100%',
  },
  findPanLink: {
    textDecorationLine: 'underline',
  },
  helpLink: {
    fontWeight: '600',
  },
  bottomSection: {
    width: '100%',
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
  continueBtn: {
    borderRadius: 8,
  },
});

export default PanEntryScreen;
