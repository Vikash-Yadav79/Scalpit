import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type BankFailedNavProp = StackNavigationProp<AuthStackParamList, 'BankFailed'>;

export const BankFailedScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<BankFailedNavProp>();

  const handleAddAnother = () => {
    navigation.navigate('SelectBank', { userName: 'PUNAM KUMARI' });
  };

  return (
    <ScreenContainer>
      <AppHeader
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

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        <View style={styles.centerBox}>
          {/* Big Red Circle with X Icon (Matching PDF Page 10) */}
          <View style={[styles.redCircle, { backgroundColor: colors.error + '20', borderColor: colors.error }]}>
            <AppIcon name="close" size={48} color={colors.error} strokeWidth={3} />
          </View>

          <AppText variant="h1" color="textPrimary" align="center" style={styles.title}>
            Bank verification failed
          </AppText>

          <AppText
            variant="bodyLarge"
            color="textSecondary"
            align="center"
            style={[styles.subtitle, { marginTop: spacing.md }]}
          >
            Bank account already exists for another user. Enter new bank details to proceed
          </AppText>
        </View>

        {/* Bottom CTA (Matching PDF Page 10) */}
        <View style={[styles.bottomSection, { paddingBottom: spacing.xl }]}>
          <AppButton
            title="Add another bank account"
            onPress={handleAddAnother}
            variant="primary"
            size="lg"
            style={styles.actionBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  helpLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  redCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    lineHeight: 24,
  },
  bottomSection: {
    paddingTop: 16,
  },
  actionBtn: {
    height: 52,
    borderRadius: 8,
  },
});

export default BankFailedScreen;
