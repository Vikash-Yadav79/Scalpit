import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';

export interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  containerStyle?: ViewStyle;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  containerStyle,
}) => {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: colors.surface,
                  borderRadius: radius.xl,
                  padding: spacing.xl,
                },
                shadows.lg,
                containerStyle,
              ]}
            >
              {(title || showCloseButton) && (
                <View style={[styles.headerRow, { marginBottom: spacing.lg }]}>
                  {title ? (
                    <AppText variant="h3" color="textPrimary" style={{ fontWeight: '700' }}>
                      {title}
                    </AppText>
                  ) : <View />}

                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      accessibilityLabel="Close modal"
                      accessibilityRole="button"
                    >
                      <AppIcon name="close" size={20} color={colors.textTertiary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(AppModal);
