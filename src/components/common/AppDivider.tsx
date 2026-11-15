import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface AppDividerProps {
  vertical?: boolean;
  spacing?: number;
  color?: string;
  style?: ViewStyle;
}

export const AppDivider: React.FC<AppDividerProps> = ({
  vertical = false,
  spacing = 0,
  color,
  style,
}) => {
  const { colors } = useTheme();
  const dividerColor = color || colors.divider;

  if (vertical) {
    return (
      <View
        style={[
          styles.vertical,
          {
            backgroundColor: dividerColor,
            marginHorizontal: spacing,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        {
          backgroundColor: dividerColor,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

export default React.memo(AppDivider);
