/**
 * Adaptador de compatibilidade.
 *
 * A fonte única de verdade do tema agora vive em `src/theme`.
 * Este arquivo apenas reexpõe os tokens no formato que os componentes
 * legados do template (themed-text, themed-view, etc.) esperam.
 *
 * Em código novo, importe sempre de `@/theme`.
 */

import '@/global.css';

import { Platform } from 'react-native';

import { colors, spacing } from '@/theme';

const tokens = {
  text: colors.text,
  background: colors.background,
  backgroundElement: colors.surface,
  backgroundSelected: colors.surfaceElevated,
  textSecondary: colors.textSecondary,
} as const;

// App é dark-only: ambos os esquemas apontam para a mesma paleta escura.
export const Colors = {
  light: tokens,
  dark: tokens,
} as const;

export type ThemeColor = keyof typeof tokens;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: spacing.xxs,
  one: spacing.xs,
  two: spacing.sm,
  three: spacing.lg,
  four: spacing['2xl'],
  five: spacing['3xl'],
  six: spacing['6xl'],
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
