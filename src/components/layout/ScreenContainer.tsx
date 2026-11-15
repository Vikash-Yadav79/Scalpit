import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, Platform } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export interface ScreenContainerProps {
  children: React.ReactNode;
  edges?: Edge[];
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  edges = ['top', 'left', 'right'],
  backgroundColor,
  style,
}) => {
  const { colors } = useTheme();
  const bg = backgroundColor || colors.background;

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: bg }, style]}
    >
      <StatusBar
        barStyle={colors.statusBarStyle}
        {...(Platform.OS === 'android' ? { backgroundColor: bg } : {})}
        animated
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
