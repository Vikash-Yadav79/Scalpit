import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type PersonalDetailsNavProp = StackNavigationProp<AuthStackParamList, 'PersonalDetails'>;

export const PersonalDetailsScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<PersonalDetailsNavProp>();

  const [dob, setDob] = useState('15/08/1992');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [marital, setMarital] = useState<'Single' | 'Married'>('Married');
  const [occupation, setOccupation] = useState('Private Sector');
  const [income, setIncome] = useState('5-10 Lakhs');
  const [fatherName, setFatherName] = useState('SUNIL YADAV');
  const [motherName, setMotherName] = useState('SHANTI DEVI');

  const occupations = ['Private Sector', 'Public Sector', 'Business', 'Professional', 'Student'];
  const incomeRanges = ['< 1 Lakh', '1-5 Lakhs', '5-10 Lakhs', '10-25 Lakhs', '25 Lakhs+'];

  const handleContinue = () => {
    navigation.navigate('ConfirmDetails', {
      name: 'PUNAM KUMARI',
      panNumber: 'BKRYSO108A',
    });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title="Personal Details"
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="h2" color="textPrimary" style={styles.title}>
          Help us know you better
        </AppText>
        <AppText variant="bodySmall" color="textSecondary" style={{ marginTop: 4, marginBottom: 20 }}>
          Required as per SEBI KYC guidelines
        </AppText>

        {/* Date of Birth */}
        <AppInput
          label="Date of Birth (DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
          keyboardType="numeric"
          containerStyle={{ marginBottom: 16 }}
        />

        {/* Gender */}
        <AppText variant="caption" color="textSecondary" style={styles.sectionLabel}>
          GENDER
        </AppText>
        <View style={styles.pillRow}>
          {(['Male', 'Female', 'Other'] as const).map(g => (
            <TouchableOpacity
              key={g}
              onPress={() => setGender(g)}
              style={[
                styles.pill,
                {
                  borderColor: gender === g ? colors.primary : colors.border,
                  backgroundColor: gender === g ? colors.primarySoft : colors.surface,
                  borderRadius: radius.md,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{ fontWeight: '600', color: gender === g ? colors.primary : colors.textPrimary }}
              >
                {g}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Marital Status */}
        <AppText variant="caption" color="textSecondary" style={[styles.sectionLabel, { marginTop: 16 }]}>
          MARITAL STATUS
        </AppText>
        <View style={styles.pillRow}>
          {(['Single', 'Married'] as const).map(m => (
            <TouchableOpacity
              key={m}
              onPress={() => setMarital(m)}
              style={[
                styles.pill,
                {
                  borderColor: marital === m ? colors.primary : colors.border,
                  backgroundColor: marital === m ? colors.primarySoft : colors.surface,
                  borderRadius: radius.md,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{ fontWeight: '600', color: marital === m ? colors.primary : colors.textPrimary }}
              >
                {m}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Occupation */}
        <AppText variant="caption" color="textSecondary" style={[styles.sectionLabel, { marginTop: 16 }]}>
          OCCUPATION
        </AppText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
          {occupations.map(occ => (
            <TouchableOpacity
              key={occ}
              onPress={() => setOccupation(occ)}
              style={[
                styles.pill,
                {
                  borderColor: occupation === occ ? colors.primary : colors.border,
                  backgroundColor: occupation === occ ? colors.primarySoft : colors.surface,
                  borderRadius: radius.md,
                  marginHorizontal: 4,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{ fontWeight: '600', color: occupation === occ ? colors.primary : colors.textPrimary }}
              >
                {occ}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Annual Income */}
        <AppText variant="caption" color="textSecondary" style={[styles.sectionLabel, { marginTop: 16 }]}>
          ANNUAL INCOME
        </AppText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
          {incomeRanges.map(inc => (
            <TouchableOpacity
              key={inc}
              onPress={() => setIncome(inc)}
              style={[
                styles.pill,
                {
                  borderColor: income === inc ? colors.primary : colors.border,
                  backgroundColor: income === inc ? colors.primarySoft : colors.surface,
                  borderRadius: radius.md,
                  marginHorizontal: 4,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{ fontWeight: '600', color: income === inc ? colors.primary : colors.textPrimary }}
              >
                {inc}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Father's & Mother's Names */}
        <AppInput
          label="Father's Full Name"
          value={fatherName}
          onChangeText={setFatherName}
          autoCapitalize="characters"
          containerStyle={{ marginTop: 20 }}
        />

        <AppInput
          label="Mother's Full Name"
          value={motherName}
          onChangeText={setMotherName}
          autoCapitalize="characters"
          containerStyle={{ marginTop: 16, marginBottom: 24 }}
        />

        <AppButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          style={{ marginBottom: 32 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 12,
  },
  title: {
    fontWeight: '700',
  },
  sectionLabel: {
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonalDetailsScreen;
