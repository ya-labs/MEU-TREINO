/**
 * Sistema central de tipografia.
 *
 * Usa as fontes nativas do sistema (nenhuma fonte custom carregada ainda).
 * `textVariant` define presets prontos para uso consistente nos textos.
 */

import { Platform, type TextStyle } from 'react-native';

export const fontFamily = Platform.select({
  ios: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
    mono: 'ui-monospace',
  },
  android: {
    regular: 'sans-serif',
    medium: 'sans-serif-medium',
    semibold: 'sans-serif-medium',
    bold: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
    mono: 'monospace',
  },
})!;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, TextStyle['fontWeight']>;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 38,
  '4xl': 44,
  '5xl': 56,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
} as const;

export const textVariant = {
  largeTitle: { fontSize: fontSize['4xl'], lineHeight: lineHeight['4xl'], fontWeight: fontWeight.bold },
  title: { fontSize: fontSize['3xl'], lineHeight: lineHeight['3xl'], fontWeight: fontWeight.bold },
  title2: { fontSize: fontSize['2xl'], lineHeight: lineHeight['2xl'], fontWeight: fontWeight.semibold },
  subtitle: { fontSize: fontSize.lg, lineHeight: lineHeight.md, fontWeight: fontWeight.semibold },
  body: { fontSize: fontSize.md, lineHeight: lineHeight.md, fontWeight: fontWeight.regular },
  bodyBold: { fontSize: fontSize.md, lineHeight: lineHeight.md, fontWeight: fontWeight.semibold },
  caption: { fontSize: fontSize.sm, lineHeight: lineHeight.sm, fontWeight: fontWeight.medium },
  small: { fontSize: fontSize.xs, lineHeight: lineHeight.xs, fontWeight: fontWeight.medium },
  button: { fontSize: fontSize.md, lineHeight: lineHeight.sm, fontWeight: fontWeight.bold },
  timer: {
    fontSize: fontSize['5xl'],
    lineHeight: lineHeight['5xl'],
    fontWeight: fontWeight.bold,
    fontVariant: ['tabular-nums'] as TextStyle['fontVariant'],
  },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textVariant;
