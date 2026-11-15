import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateUserLocal } from '../authSlice';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { KeyboardWrapper } from '../../../components/layout/KeyboardWrapper';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { isValidPAN } from '../../../utils/validators';

type RootNavProp = StackNavigationProp<RootStackParamList>;

export const ProfileSetupScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<RootNavProp>();
  const dispatch = useAppDispatch();

  const [panNumber, setPanNumber] = useState('');
  const [panError, setPanError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (panNumber && !isValidPAN(panNumber)) {
      setPanError('Please enter a valid 10-digit PAN (e.g. ABCDE1234F)');
      return;
    }

    setIsSubmitting(true);
    // Simulate updating KYC profile
    setTimeout(() => {
      dispatch(
        updateUserLocal({
          panNumber: panNumber.toUpperCase(),
          isKycVerified: Boolean(panNumber),
        })
      );
      setIsSubmitting(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 600);
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <ScreenContainer>
      <AppHeader
        title="Complete Profile"
        actions={[
          {
            icon: 'close',
            onPress: handleSkip,
            accessibilityLabel: 'Skip profile setup',
          },
        ]}
      />

      <KeyboardWrapper contentContainerStyle={[styles.content, { padding: spacing.xl }]}>
        <View style={styles.topInfo}>
          <View
            style={[
              styles.shieldBadge,
              {
                backgroundColor: colors.primarySoft,
                borderRadius: radius.xxl,
                marginBottom: spacing.md,
              },
            ]}
          >
            <AppIcon name="shield" size={32} color={colors.primary} />
          </View>
          <AppText variant="h2" color="textPrimary" style={{ fontWeight: '800' }}>
            Verify Your Identity
          </AppText>
          <AppText
            variant="bodySmall"
            color="textSecondary"
            style={{ marginTop: spacing.xs, textAlign: 'center' }}
          >
            As per SEBI guidelines, your Permanent Account Number (PAN) is required to open an investment account.
          </AppText>
        </View>

        <View style={{ marginVertical: spacing.xl }}>
          <AppInput
            label="PAN Number"
            placeholder="ABCDE1234F"
            autoCapitalize="characters"
            maxLength={10}
            value={panNumber}
            onChangeText={val => {
              setPanNumber(val.toUpperCase());
              if (panError) setPanError('');
            }}
            error={panError}
            leftIcon="lock"
            helperText="10-digit alphanumeric identifier issued by the Income Tax Department"
          />
        </View>

        <View style={styles.buttonCol}>
          <AppButton
            title="Complete Verification"
            onPress={handleComplete}
            loading={isSubmitting}
            variant="primary"
            size="lg"
            style={{ marginBottom: spacing.md }}
          />

          <AppButton
            title="I'll do this later"
            onPress={handleSkip}
            variant="ghost"
            size="md"
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
  topInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  shieldBadge: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCol: {
    width: '100%',
    paddingBottom: 16,
  },
});

export default ProfileSetupScreen;
