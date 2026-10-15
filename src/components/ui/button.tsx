import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { theme } from '@/theme';

export type ButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  style: styleProp,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  const resolveStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => [
    styles.base,
    fullWidth && styles.fullWidth,
    isPrimary ? styles.primary : styles.outline,
    state.pressed && !isDisabled && (isPrimary ? styles.primaryPressed : styles.outlinePressed),
    isDisabled && styles.disabled,
    typeof styleProp === 'function' ? styleProp(state) : styleProp,
  ];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={resolveStyle}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? theme.colors.onPrimary : theme.colors.primary} />
      ) : (
        <AppText
          variant="button"
          color={isPrimary ? 'textOnPrimary' : 'primary'}
          style={styles.label}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryPressed: {
    backgroundColor: theme.colors.primaryPressed,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.primary,
  },
  outlinePressed: {
    backgroundColor: theme.colors.primaryMuted,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    textAlign: 'center',
  },
});
