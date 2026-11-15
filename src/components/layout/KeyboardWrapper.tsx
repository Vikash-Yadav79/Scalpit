import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';

export interface KeyboardWrapperProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
  children,
  scrollEnabled = true,
  contentContainerStyle,
  style,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
      style={[styles.container, style]}
    >
      {scrollEnabled ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.scrollContent, contentContainerStyle]}>
          {children}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default KeyboardWrapper;
