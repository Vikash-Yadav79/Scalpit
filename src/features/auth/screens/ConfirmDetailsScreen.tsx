import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type ConfirmDetailsNavProp = StackNavigationProp<AuthStackParamList, 'ConfirmDetails'>;

const tradingExperiences = [
  'No experience',
  '1 year',
  '2 years',
  '3 years',
  '4 years',
  '5+ years',
];

export const ConfirmDetailsScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ConfirmDetailsNavProp>();

  // State matching Groww Screenshot 3
  const [selectedExperience, setSelectedExperience] = useState('No experience');
  const [segments, setSegments] = useState({
    equity: true, // Cash (equity) / Mutual funds - mandatory
    fno: false,
    commodities: false,
    debt: true,
  });

  const [declarations, setDeclarations] = useState({
    pep: true, // Not a politically exposed person
    standingInstructions: true,
  });

  const toggleSegment = (key: keyof typeof segments) => {
    if (key === 'equity') return; // Cannot uncheck mandatory equity
    setSegments(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDeclaration = (key: keyof typeof declarations) => {
    setDeclarations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    // Next step in Groww KYC: Select Savings Bank (matching PDF Page 11)
    navigation.navigate('SelectBank', { userName: 'PUNAM KUMARI' });
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.xl }]}
      >
        <AppText variant="h1" color="textPrimary" style={styles.screenTitle}>
          Confirm details
        </AppText>

        {/* 1. Trading Experience Section */}
        <View style={styles.section}>
          <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
            Trading experience
          </AppText>

          <View style={styles.grid}>
            {tradingExperiences.map(exp => {
              const isSelected = selectedExperience === exp;
              return (
                <TouchableOpacity
                  key={exp}
                  activeOpacity={0.75}
                  onPress={() => setSelectedExperience(exp)}
                  style={[
                    styles.gridCard,
                    {
                      borderColor: isSelected ? colors.textPrimary : colors.border,
                      backgroundColor: colors.surface,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="body"
                    color="textPrimary"
                    style={{ fontWeight: isSelected ? '700' : '400' }}
                  >
                    {exp}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Segments Section */}
        <View style={styles.section}>
          <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
            Segments
          </AppText>

          {/* Cash / Mutual Funds (Mandatory) */}
          <View style={styles.checkboxRow}>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: colors.border,
                  borderColor: colors.border,
                  borderRadius: radius.xs,
                },
              ]}
            >
              <AppIcon name="check" size={14} color={colors.textSecondary} />
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Cash (equity) / Mutual funds
            </AppText>
          </View>

          {/* Equity F&O */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleSegment('fno')}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: segments.fno ? '#00B386' : colors.border,
                  backgroundColor: segments.fno ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {segments.fno && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Equity F&O
            </AppText>
          </TouchableOpacity>

          {/* Commodities */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleSegment('commodities')}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: segments.commodities ? '#00B386' : colors.border,
                  backgroundColor: segments.commodities ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {segments.commodities && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Commodities
            </AppText>
          </TouchableOpacity>

          {/* Debt */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleSegment('debt')}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: segments.debt ? '#00B386' : colors.border,
                  backgroundColor: segments.debt ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {segments.debt && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Debt
            </AppText>
          </TouchableOpacity>
        </View>

        {/* 3. Declarations Section */}
        <View style={styles.section}>
          <AppText variant="h3" color="textPrimary" style={styles.sectionHeader}>
            Declarations
          </AppText>

          {/* PEP */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleDeclaration('pep')}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: declarations.pep ? '#00B386' : colors.border,
                  backgroundColor: declarations.pep ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {declarations.pep && <AppIcon name="check" size={14} color="#FFFFFF" />}
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Not a politically exposed person
            </AppText>
          </TouchableOpacity>

          {/* Standing instructions */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleDeclaration('standingInstructions')}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: declarations.standingInstructions ? '#00B386' : colors.border,
                  backgroundColor: declarations.standingInstructions ? '#00B386' : colors.surface,
                  borderRadius: radius.xs,
                },
              ]}
            >
              {declarations.standingInstructions && (
                <AppIcon name="check" size={14} color="#FFFFFF" />
              )}
            </View>
            <AppText variant="body" color="textPrimary" style={styles.checkboxLabel}>
              Standing instructions
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Continue Button */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
            paddingBottom: Math.max(insets.bottom, spacing.md),
          },
        ]}
      >
        <AppButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          style={styles.continueButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '31%',
    height: 52,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  bottomBar: {
    borderTopWidth: 1,
  },
  continueButton: {
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
});

export default ConfirmDetailsScreen;
