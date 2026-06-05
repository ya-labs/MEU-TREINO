import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { theme, type ColorToken } from '@/theme';

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  /** Ícone como texto/emoji (mantém o app sem dependência de pacote de ícones). */
  icon: string;
  color?: ColorToken;
  background?: ColorToken;
  size?: number;
};

export function IconButton({
  icon,
  color = 'text',
  background = 'surface',
  size = 40,
  style,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={theme.hitSlop}
      style={(state) => [
        styles.base,
        { width: size, height: size, backgroundColor: theme.colors[background] },
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <AppText variant="body" color={color}>
        {icon}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
