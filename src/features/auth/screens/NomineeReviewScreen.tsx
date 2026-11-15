import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppModal } from '../../../components/common/AppModal';
import { AppInput } from '../../../components/common/AppInput';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type NomineeReviewNavProp = StackNavigationProp<AuthStackParamList, 'NomineeReview'>;

interface NomineeItem {
  id: string;
  name: string;
  relationship: string;
  share: number;
}

export const NomineeReviewScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<NomineeReviewNavProp>();

  const [nominees, setNominees] = useState<NomineeItem[]>([
    {
      id: 'nom_1',
      name: 'GHANSHYAM YADAV',
      relationship: 'Father',
      share: 100,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newNomineeName, setNewNomineeName] = useState('');
  const [newNomineeRelation, setNewNomineeRelation] = useState('');

  const handleSaveAndContinue = () => {
    // Next step in Groww KYC: Aadhaar eSign
    navigation.navigate('AadhaarFinalStep');
  };

  const handleSkip = () => {
    navigation.navigate('AadhaarFinalStep');
  };

  const handleAddNominee = () => {
    if (newNomineeName.trim()) {
      const remainingShare = Math.floor(100 / (nominees.length + 1));
      const updated = nominees.map(n => ({ ...n, share: remainingShare }));
      updated.push({
        id: `nom_${Date.now()}`,
        name: newNomineeName.trim().toUpperCase(),
        relationship: newNomineeRelation.trim() || 'Family',
        share: 100 - remainingShare * nominees.length,
      });
      setNominees(updated);
      setNewNomineeName('');
      setNewNomineeRelation('');
      setShowAddModal(false);
    }
  };

  return (
    <ScreenContainer>
      {/* Top Header Bar matching Groww Screenshot */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.backBtn}
        >
          <AppIcon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <AppText
            variant="body"
            color="textSecondary"
            style={styles.skipLink}
          >
            Skip nominee addition
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Title */}
        <AppText variant="h1" color="textPrimary" style={styles.title}>
          Review nominees
        </AppText>

        {/* Column Labels */}
        <View style={styles.columnsHeader}>
          <AppText variant="bodySmall" color="textSecondary" style={styles.colLabelLeft}>
            Name
          </AppText>
          <AppText variant="bodySmall" color="textSecondary" style={styles.colLabelRight}>
            % share
          </AppText>
        </View>

        {/* Nominee List */}
        {nominees.map(nominee => (
          <View
            key={nominee.id}
            style={[
              styles.nomineeRow,
              {
                borderBottomColor: colors.border,
                paddingVertical: spacing.md,
              },
            ]}
          >
            {/* Nominee Name & Edit Action */}
            <View style={styles.nomineeLeft}>
              <AppText variant="h4" color="textPrimary" style={styles.nomineeName}>
                {nominee.name}
              </AppText>
              <TouchableOpacity
                onPress={() => setShowAddModal(true)}
                activeOpacity={0.7}
                style={{ marginTop: 4 }}
              >
                <AppText
                  variant="bodySmall"
                  color="textSecondary"
                  style={styles.editLink}
                >
                  Edit details
                </AppText>
              </TouchableOpacity>
            </View>

            {/* Percentage Share Box */}
            <View
              style={[
                styles.shareBox,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  borderRadius: radius.md,
                },
              ]}
            >
              <AppText variant="h4" color="textPrimary" style={styles.shareText}>
                {nominee.share} %
              </AppText>
            </View>
          </View>
        ))}

        {/* Add Another Nominee Action Button */}
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.7}
          style={[styles.addNomineeRow, { marginTop: spacing.xl }]}
        >
          <View
            style={[
              styles.plusCircle,
              {
                borderColor: colors.primary,
              },
            ]}
          >
            <AppIcon name="plus" size={16} color={colors.primary} strokeWidth={2.5} />
          </View>
          <AppText
            variant="body"
            color="primary"
            style={[styles.addNomineeText, { marginLeft: spacing.sm }]}
          >
            Add another nominee
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Save & Continue CTA */}
      <View style={[styles.bottomContainer, { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl }]}>
        <AppButton
          title="Save and continue"
          onPress={handleSaveAndContinue}
          variant="primary"
          size="lg"
          style={styles.saveBtn}
        />
      </View>

      {/* Add / Edit Nominee Modal */}
      <AppModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Nominee"
      >
        <View style={{ paddingTop: spacing.sm }}>
          <AppInput
            label="Full Name (as per PAN/Aadhaar)"
            placeholder="e.g. GHANSHYAM YADAV"
            value={newNomineeName}
            onChangeText={setNewNomineeName}
            autoCapitalize="characters"
          />

          <AppInput
            label="Relationship"
            placeholder="e.g. Father, Mother, Spouse"
            value={newNomineeRelation}
            onChangeText={setNewNomineeRelation}
            containerStyle={{ marginTop: spacing.md }}
          />

          <View style={{ marginTop: spacing.xl, flexDirection: 'row', gap: 12 }}>
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={() => setShowAddModal(false)}
              style={{ flex: 1 }}
            />
            <AppButton
              title="Add"
              variant="primary"
              onPress={handleAddNominee}
              disabled={!newNomineeName.trim()}
              style={{ flex: 1.4 }}
            />
          </View>
        </View>
      </AppModal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  skipLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  content: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 28,
  },
  columnsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  colLabelLeft: {
    fontWeight: '600',
  },
  colLabelRight: {
    fontWeight: '600',
    marginRight: 24,
  },
  nomineeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomineeLeft: {
    flex: 1,
    paddingRight: 16,
  },
  nomineeName: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  editLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  shareBox: {
    width: 140,
    height: 52,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    fontWeight: '700',
    fontSize: 18,
  },
  addNomineeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNomineeText: {
    fontWeight: '700',
    fontSize: 15,
  },
  bottomContainer: {
    paddingTop: 12,
  },
  saveBtn: {
    height: 52,
    borderRadius: 8,
  },
});

export default NomineeReviewScreen;
