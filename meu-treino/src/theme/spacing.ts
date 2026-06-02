/**
 * Escala central de espaçamentos, raios de borda e larguras de borda.
 * Base de 4px para manter ritmo visual consistente em todo o app.
 */

import { StyleSheet } from 'react-native';

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const;

export const borderWidth = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  thick: 2,
} as const;

export const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 } as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
