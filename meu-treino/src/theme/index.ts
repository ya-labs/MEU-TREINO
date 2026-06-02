import { colors, palette } from './colors';
import { borderWidth, hitSlop, radius, spacing } from './spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textVariant,
} from './typography';

/**
 * Objeto central do tema. Fonte única de verdade para estilização.
 * O app é dark-only (inspirado no protótipo), então não há alternância de modo.
 */
export const theme = {
  colors,
  palette,
  spacing,
  radius,
  borderWidth,
  hitSlop,
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textVariant,
  },
} as const;

export type Theme = typeof theme;

export * from './colors';
export * from './spacing';
export * from './typography';
