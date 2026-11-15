import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';

export interface SearchSectionProps {
  onPress?: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onPress }) => {
  const { colors, radius, spacing } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.searchBar,
        {
          backgroundColor: colors.surfaceSubtle,
          borderColor: colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          marginVertical: spacing.md,
        },
      ]}
      accessibilityRole="search"
    >
      <AppIcon name="search" size={18} color={colors.textTertiary} style={{ marginRight: spacing.sm }} />
      <AppText variant="bodySmall" color="textPlaceholder" style={styles.placeholder}>
        Search stocks, mutual funds, ETFs...
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  placeholder: {
    flex: 1,
  },
});

export default React.memo(SearchSection);
