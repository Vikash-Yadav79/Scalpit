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

type SelectBankNavProp = StackNavigationProp<AuthStackParamList, 'SelectBank'>;
type SelectBankRouteProp = RouteProp<AuthStackParamList, 'SelectBank'>;

interface PopularBank {
  id: string;
  name: string;
  iconBg: string;
  iconName: 'bank' | 'building' | 'wallet';
}

const popularBanks: PopularBank[] = [
  { id: 'hdfc', name: 'HDFC BANK', iconBg: '#004C8F', iconName: 'bank' },
  { id: 'kotak', name: 'KOTAK MAHINDRA', iconBg: '#ED1C24', iconName: 'building' },
  { id: 'sbi', name: 'STATE BANK OF INDIA', iconBg: '#280071', iconName: 'bank' },
  { id: 'icici', name: 'ICICI BANK LIMITED', iconBg: '#F37021', iconName: 'building' },
  { id: 'axis', name: 'AXIS BANK', iconBg: '#97144D', iconName: 'bank' },
];

const allBanks = [
  'THE AJARA URBAN CO OP BANK LTD',
  'MODEL COOPERATIVE BANK LTD',
  'BANK OF BARODA',
  'PUNJAB NATIONAL BANK',
  'CANARA BANK',
  'UNION BANK OF INDIA',
  'INDUSIND BANK',
  'YES BANK',
  'FEDERAL BANK',
  'IDBI BANK',
];

export const SelectBankScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<SelectBankNavProp>();
  const route = useRoute<SelectBankRouteProp>();

  const userName = route.params?.userName || 'PUNAM KUMARI';
  const [search, setSearch] = useState('');

  const filteredBanks = allBanks.filter(b =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBank = (bankName: string) => {
    // Navigate to Find your branch by address or IFSC (PDF Page 9)
    navigation.navigate('IfscBranchSearch', { bankName });
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

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="h1" color="textPrimary" style={styles.title}>
          Select savings bank account for {userName}
        </AppText>

        {/* Search Bar matching PDF Page 11 */}
        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search your bank here"
          leftIcon="search"
          containerStyle={{ marginTop: spacing.xl, marginBottom: spacing.xl }}
        />

        {/* Popular Banks 2x3 Grid (Matching PDF Page 11) */}
        {!search && (
          <View style={styles.popularGrid}>
            {popularBanks.map(bank => (
              <TouchableOpacity
                key={bank.id}
                activeOpacity={0.7}
                onPress={() => handleSelectBank(bank.name)}
                style={[
                  styles.bankCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                  },
                ]}
              >
                <View
                  style={[
                    styles.bankIconCircle,
                    { backgroundColor: bank.iconBg },
                  ]}
                >
                  <AppIcon name={bank.iconName} size={18} color="#FFFFFF" />
                </View>

                <AppText
                  variant="caption"
                  color="textPrimary"
                  align="center"
                  style={styles.bankCardName}
                >
                  {bank.name}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* All Banks Section List (Matching PDF Page 11) */}
        <View style={[styles.allBanksSection, { marginTop: spacing.xl }]}>
          <AppText variant="body" color="textSecondary" style={styles.allBanksTitle}>
            All banks
          </AppText>

          {filteredBanks.map(bank => (
            <TouchableOpacity
              key={bank}
              activeOpacity={0.7}
              onPress={() => handleSelectBank(bank)}
              style={[
                styles.bankListItem,
                { borderBottomColor: colors.border, paddingVertical: spacing.lg },
              ]}
            >
              <View
                style={[
                  styles.listBankIcon,
                  { backgroundColor: colors.surfaceSubtle, borderRadius: radius.round },
                ]}
              >
                <AppIcon name="bank" size={16} color={colors.textSecondary} />
              </View>

              <AppText
                variant="body"
                color="textPrimary"
                style={[styles.bankListName, { marginLeft: spacing.md }]}
              >
                {bank}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingBottom: 32,
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
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bankCard: {
    width: '48%',
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  bankIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bankCardName: {
    fontWeight: '700',
  },
  allBanksSection: {
    width: '100%',
  },
  allBanksTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  bankListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  listBankIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankListName: {
    flex: 1,
    fontWeight: '600',
  },
});

export default SelectBankScreen;
