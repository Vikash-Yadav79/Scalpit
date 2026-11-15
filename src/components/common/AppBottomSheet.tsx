import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  showClose?: boolean;
  children: React.ReactNode;
  maxHeightRatio?: number;
}

export const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  showClose = true,
  children,
  maxHeightRatio = 0.85,
}) => {
  const { colors, spacing, radius, dimensions } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={[
                styles.sheetContainer,
                {
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: radius.xl,
                  borderTopRightRadius: radius.xl,
                  maxHeight: dimensions.window.height * maxHeightRatio,
                },
              ]}
            >
              {/* Drag Handle Bar */}
              <View style={styles.handleRow}>
                <View style={[styles.handleBar, { backgroundColor: colors.border }]} />
              </View>

              {/* Sheet Header */}
              {(title || showClose) && (
                <View
                  style={[
                    styles.headerRow,
                    {
                      paddingHorizontal: spacing.xl,
                      paddingBottom: spacing.md,
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    {title && (
                      <AppText variant="h3" color="textPrimary" style={styles.titleText}>
                        {title}
                      </AppText>
                    )}
                    {subtitle && (
                      <AppText variant="caption" color="textSecondary" style={{ marginTop: 2 }}>
                        {subtitle}
                      </AppText>
                    )}
                  </View>

                  {showClose && (
                    <TouchableOpacity
                      onPress={onClose}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={styles.closeBtn}
                    >
                      <AppIcon name="close" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Sheet Body */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: spacing.xl }}
              >
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  handleRow: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  titleText: {
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
});

export default AppBottomSheet;
