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
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type PanConfirmNavProp = StackNavigationProp<AuthStackParamList, 'PanConfirm'>;
type PanConfirmRouteProp = RouteProp<AuthStackParamList, 'PanConfirm'>;

export const PanConfirmScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<PanConfirmNavProp>();
  const route = useRoute<PanConfirmRouteProp>();

  const name = route.params?.name || 'PUNAM KUMARI';
  const panNumber = route.params?.panNumber || 'BKRYSO108A';
  const maskedPan = panNumber.length >= 10
    ? `XXXXX${panNumber.slice(5)}`
    : 'XXXXX7091K';

  const [consent, setConsent] = useState(true);

  const handleConfirm = () => {
    // Next step in KYC: Personal details (DOB, Gender, Marital status, etc.)
    navigation.navigate('PersonalDetails');
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

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        <View style={styles.topSection}>
          <AppText variant="h1" color="textPrimary" style={styles.title}>
            Confirm PAN details
          </AppText>

          {/* Authentic Indian PAN Card UI Mockup (Matching PDF Page 8) */}
          <View
            style={[
              styles.panCard,
              {
                borderRadius: radius.lg,
                marginTop: spacing.xl,
              },
            ]}
          >
            {/* National Emblem & Watermark Badge */}
            <View style={styles.panCardHeader}>
              <View style={styles.emblemBadge}>
                <AppIcon name="shield" size={32} color="#475569" />
              </View>
            </View>

            <View style={styles.panFieldGroup}>
              <AppText variant="caption" style={styles.panLabel}>
                Name
              </AppText>
              <AppText variant="h3" style={styles.panValueName}>
                {name}
              </AppText>
            </View>

            <View style={[styles.panFieldGroup, { marginTop: spacing.md }]}>
              <AppText variant="caption" style={styles.panLabel}>
                Permanent Account Number
              </AppText>
              <AppText variant="h4" style={styles.panValueNumber}>
                {maskedPan}
              </AppText>
            </View>
          </View>

          {/* Consent Checkbox */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setConsent(prev => !prev)}
            style={[styles.consentRow, { marginTop: spacing.xxl }]}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: consent ? colors.primary : 'transparent',
                  borderColor: consent ? colors.primary : colors.border,
                },
              ]}
            >
              {consent && <AppIcon name="check" size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>

            <AppText
              variant="caption"
              color="textSecondary"
              style={[styles.consentText, { marginLeft: spacing.sm }]}
            >
              I give my consent to undertake Online Aadhaar & PAN authentication as per UIDAI & PMLA rules.{' '}
              <AppText variant="caption" color="primary" style={styles.seeMore}>
                See more
              </AppText>
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Dual Bottom Buttons (Matching PDF Page 8) */}
        <View style={[styles.bottomRow, { paddingBottom: spacing.xl }]}>
          <AppButton
            title="No, Edit PAN"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.editBtn}
          />

          <AppButton
            title="Yes, Confirm"
            onPress={handleConfirm}
            variant="primary"
            disabled={!consent}
            style={styles.confirmBtn}
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
    paddingTop: 12,
  },
  helpLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  topSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  panCard: {
    backgroundColor: '#E2E8F0',
    padding: 24,
    minHeight: 180,
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  panCardHeader: {
    position: 'absolute',
    top: 20,
    right: 20,
    opacity: 0.35,
  },
  emblemBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  panFieldGroup: {
    zIndex: 1,
  },
  panLabel: {
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  panValueName: {
    color: '#0F172A',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  panValueNumber: {
    color: '#0F172A',
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  consentText: {
    flex: 1,
    lineHeight: 18,
  },
  seeMore: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1,
    height: 50,
  },
  confirmBtn: {
    flex: 1.2,
    height: 50,
  },
});

export default PanConfirmScreen;
