import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon, IconName } from './AppIcon';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  showClear?: boolean;
  onClear?: () => void;
  containerStyle?: ViewStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  showClear = true,
  onClear,
  secureTextEntry,
  containerStyle,
  style,
  value,
  onChangeText,
  ...rest
}) => {
  const { colors, radius, spacing, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<any>(null);

  const isPassword = Boolean(secureTextEntry);
  const actualSecure = isPassword && !isPasswordVisible;

  const hasValue = typeof value === 'string' && value.length > 0;
  const canShowClear = showClear && hasValue && !isPassword && !rightIcon;

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  const getBorderColor = (): string => {
    if (error) return colors.error;
    if (isFocused) return colors.borderFocus;
    return colors.border;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <AppText
          variant="caption"
          color={error ? 'error' : isFocused ? 'primary' : 'textSecondary'}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: getBorderColor(),
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        {leftIcon && (
          <AppIcon
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary : colors.textTertiary}
            style={{ marginRight: spacing.sm }}
          />
        )}

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.textPlaceholder}
          secureTextEntry={actualSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.textInput,
            typography.body,
            { color: colors.textPrimary, lineHeight: undefined },
            style,
          ]}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <AppIcon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        ) : canShowClear ? (
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Clear input"
            accessibilityRole="button"
          >
            <AppIcon name="close" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AppIcon name={rightIcon} size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>

      {error ? (
        <View style={styles.messageRow}>
          <AppIcon name="alert" size={14} color={colors.error} />
          <AppText
            variant="micro"
            color="error"
            style={{ marginLeft: spacing.xs }}
          >
            {error}
          </AppText>
        </View>
      ) : helperText ? (
        <AppText
          variant="micro"
          color="textTertiary"
          style={styles.helperText}
        >
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  helperText: {
    marginTop: 4,
  },
});

export default React.memo(AppInput);
