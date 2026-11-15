import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AppModal } from '../../../components/common/AppModal';
import { AppButton } from '../../../components/common/AppButton';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { mockOptionContracts } from '../../../services/mockData';

type OptionChainRouteProp = RouteProp<RootStackParamList, 'OptionChain'>;

export const OptionChainScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const route = useRoute<OptionChainRouteProp>();
  const navigation = useNavigation<any>();

  const indexName = route.params?.indexName || 'NIFTY 50';
  const [selectedExpiry, setSelectedExpiry] = useState('7 Nov');
  const [selectedContract, setSelectedContract] = useState<{ strike: number; type: 'CALL' | 'PUT'; ltp: number } | null>(null);

  const expiries = ['7 Nov', '14 Nov', '21 Nov', '28 Nov', '26 Dec'];

  const handleOrder = () => {
    setSelectedContract(null);
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title={`${indexName} Option Chain`}
        subtitle="Spot: 25,030.35 (+2.01%)"
      />

      {/* Expiry Dates Horizontal Selector */}
      <View style={[styles.expiryRow, { borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 10 }}>
          {expiries.map(exp => (
            <TouchableOpacity
              key={exp}
              onPress={() => setSelectedExpiry(exp)}
              style={[
                styles.expiryPill,
                {
                  backgroundColor: selectedExpiry === exp ? colors.textPrimary : colors.surface,
                  borderColor: colors.border,
                  borderRadius: radius.md,
                },
              ]}
            >
              <AppText
                variant="caption"
                style={{
                  fontWeight: '700',
                  color: selectedExpiry === exp ? colors.textInverse : colors.textSecondary,
                }}
              >
                {exp}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Option Chain Table Header: CALLS | STRIKE | PUTS */}
      <View style={[styles.tableHeader, { backgroundColor: colors.surfaceSubtle, borderBottomColor: colors.border }]}>
        <View style={styles.sideHeader}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
            CALLS (LTP / OI)
          </AppText>
        </View>

        <View style={[styles.centerHeader, { backgroundColor: colors.surface }]}>
          <AppText variant="caption" color="primary" style={{ fontWeight: '800' }}>
            STRIKE
          </AppText>
        </View>

        <View style={styles.sideHeader}>
          <AppText variant="caption" color="textSecondary" style={{ fontWeight: '700' }}>
            PUTS (LTP / OI)
          </AppText>
        </View>
      </View>

      {/* Option Contracts Matrix */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {mockOptionContracts.map((row, idx) => {
          const isCallItm = row.strike < 25030.35;
          const isPutItm = row.strike > 25030.35;

          return (
            <View
              key={row.strike}
              style={[
                styles.matrixRow,
                { borderBottomColor: colors.border },
                idx % 2 === 1 && { backgroundColor: colors.surfaceSubtle },
              ]}
            >
              {/* CALL CELL */}
              <TouchableOpacity
                onPress={() => setSelectedContract({ strike: row.strike, type: 'CALL', ltp: row.callLtp })}
                activeOpacity={0.7}
                style={[
                  styles.sideCell,
                  isCallItm && { backgroundColor: '#00D09C10' },
                ]}
              >
                <AppText variant="bodySmall" color="gain" style={{ fontWeight: '800' }}>
                  ₹{row.callLtp.toFixed(2)}
                </AppText>
                <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
                  OI: {row.callOi}
                </AppText>
              </TouchableOpacity>

              {/* STRIKE CELL */}
              <View style={[styles.centerStrikeCell, { backgroundColor: colors.surface }]}>
                <AppText variant="body" color="textPrimary" style={{ fontWeight: '800' }}>
                  {row.strike}
                </AppText>
              </View>

              {/* PUT CELL */}
              <TouchableOpacity
                onPress={() => setSelectedContract({ strike: row.strike, type: 'PUT', ltp: row.putLtp })}
                activeOpacity={0.7}
                style={[
                  styles.sideCell,
                  isPutItm && { backgroundColor: '#EB5B5B10' },
                ]}
              >
                <AppText variant="bodySmall" color="loss" style={{ fontWeight: '800' }}>
                  ₹{row.putLtp.toFixed(2)}
                </AppText>
                <AppText variant="micro" color="textSecondary" style={{ marginTop: 2 }}>
                  OI: {row.putOi}
                </AppText>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Option Order Quick Trade Modal */}
      <AppModal
        visible={!!selectedContract}
        onClose={() => setSelectedContract(null)}
        title={`${indexName} ${selectedContract?.strike} ${selectedContract?.type}`}
      >
        <View style={{ paddingTop: 8 }}>
          <View style={styles.modalPriceRow}>
            <AppText variant="caption" color="textSecondary">Premium Price</AppText>
            <AppText variant="h2" color="primary" style={{ fontWeight: '800' }}>
              ₹{selectedContract?.ltp.toFixed(2)}
            </AppText>
          </View>

          <View style={styles.modalPriceRow}>
            <AppText variant="caption" color="textSecondary">Lot Size (NIFTY)</AppText>
            <AppText variant="body" color="textPrimary" style={{ fontWeight: '700' }}>
              25 Qty (1 Lot)
            </AppText>
          </View>

          <View style={styles.modalPriceRow}>
            <AppText variant="caption" color="textSecondary">Total Order Value</AppText>
            <AppText variant="h3" color="textPrimary" style={{ fontWeight: '800' }}>
              ₹{((selectedContract?.ltp || 0) * 25).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </AppText>
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={() => setSelectedContract(null)}
              style={{ flex: 1 }}
            />
            <AppButton
              title={`BUY ${selectedContract?.type}`}
              variant="primary"
              onPress={handleOrder}
              style={{ flex: 1.4 }}
            />
          </View>
        </View>
      </AppModal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  expiryRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  expiryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  sideHeader: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  centerHeader: {
    width: 90,
    paddingVertical: 10,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#334155',
  },
  matrixRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  sideCell: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerStrikeCell: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#334155',
  },
  modalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default OptionChainScreen;
