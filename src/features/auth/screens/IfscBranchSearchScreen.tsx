import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppInput } from '../../../components/common/AppInput';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type IfscNavProp = StackNavigationProp<AuthStackParamList, 'IfscBranchSearch'>;
type IfscRouteProp = RouteProp<AuthStackParamList, 'IfscBranchSearch'>;

interface BranchItem {
  address: string;
  ifsc: string;
}

const mockBranches: BranchItem[] = [
  { address: 'sector-10, vashi branch, VASHI', ifsc: 'SBIN0030419' },
  { address: 'rbo, region 10, dzoi, DELHI', ifsc: 'SBIN0016299' },
  { address: 'phase 11, mohali, MOHALI', ifsc: 'SBIN0018020' },
  { address: 'sector 12, panipat, PANIPAT', ifsc: 'SBIN0016969' },
  { address: 'sector 12 r k puram, DELHI', ifsc: 'SBIN0017190' },
  { address: 'sector 12 kharghar, KHARGHAR', ifsc: 'SBIN0017265' },
  { address: 'sector 13 17, panipat, PANIPAT', ifsc: 'SBIN0016896' },
  { address: 'new market, patna, PATNA', ifsc: 'SBIN0000152' },
];

export const IfscBranchSearchScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<IfscNavProp>();
  const route = useRoute<IfscRouteProp>();

  const bankName = route.params?.bankName || 'STATE BANK OF INDIA';
  const [query, setQuery] = useState('');

  const filtered = mockBranches.filter(
    b =>
      b.address.toLowerCase().includes(query.toLowerCase()) ||
      b.ifsc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectBranch = (branch: BranchItem) => {
    navigation.navigate('BankAccountEntry', {
      bankName,
      branch: branch.address,
      ifsc: branch.ifsc,
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

      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
        <AppText variant="h1" color="textPrimary" style={styles.title}>
          Find your branch by address or IFSC
        </AppText>
        <AppText variant="caption" color="textSecondary" style={styles.bankSubtitle}>
          {bankName}
        </AppText>

        {/* Search Bar with Bank Logo */}
        <AppInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search branch name or IFSC code"
          leftIcon="search"
          containerStyle={{ marginTop: spacing.lg, marginBottom: spacing.md }}
        />

        {/* Live Branches List (Matching PDF Page 9) */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {filtered.map(branch => (
            <TouchableOpacity
              key={branch.ifsc}
              activeOpacity={0.7}
              onPress={() => handleSelectBranch(branch)}
              style={[
                styles.branchRow,
                { borderBottomColor: colors.border, paddingVertical: spacing.lg },
              ]}
            >
              <View style={styles.searchIconCol}>
                <AppIcon name="search" size={18} color={colors.textSecondary} />
              </View>

              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <AppText variant="body" color="textPrimary" style={styles.branchAddress}>
                  {branch.address}
                </AppText>
                <AppText variant="caption" color="textSecondary" style={styles.branchIfsc}>
                  {branch.ifsc}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  helpLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  bankSubtitle: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchIconCol: {
    paddingTop: 2,
  },
  branchAddress: {
    fontWeight: '600',
    lineHeight: 20,
  },
  branchIfsc: {
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});

export default IfscBranchSearchScreen;
