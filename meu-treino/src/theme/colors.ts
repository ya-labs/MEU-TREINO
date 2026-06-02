/**
 * Paleta central do aplicativo.
 *
 * `palette` contém as cores cruas (não usar diretamente nas telas).
 * `colors` contém os tokens semânticos (usar sempre estes nos componentes).
 *
 * Tema: escuro, inspirado no protótipo, com vermelho como cor principal.
 */

export const palette = {
  black: '#000000',
  white: '#FFFFFF',

  // Vermelho (cor principal)
  red50: '#FFE5E7',
  red500: '#E11D2A',
  red600: '#C4161F',
  red700: '#9E1019',

  // Neutros (fundo, superfícies, textos)
  neutral950: '#0B0B0D',
  neutral900: '#161618',
  neutral850: '#1C1C1F',
  neutral800: '#232327',
  neutral700: '#2E2E33',
  neutral600: '#3F3F46',
  neutral500: '#71717A',
  neutral400: '#A1A1AA',
  neutral300: '#D4D4D8',

  // Acentos (badges de treino, status)
  blue500: '#3B82F6',
  green500: '#22C55E',
  green600: '#16A34A',
  amber500: '#F59E0B',
} as const;

export const colors = {
  // Marca
  primary: palette.red500,
  primaryPressed: palette.red600,
  primaryMuted: 'rgba(225, 29, 42, 0.16)',
  onPrimary: palette.white,

  // Fundos e superfícies
  background: palette.neutral950,
  surface: palette.neutral900,
  surfaceElevated: palette.neutral850,
  surfaceMuted: palette.neutral800,

  // Bordas e divisores
  border: palette.neutral800,
  borderStrong: palette.neutral700,

  // Texto
  text: palette.white,
  textSecondary: palette.neutral400,
  textMuted: palette.neutral500,
  textOnPrimary: palette.white,

  // Status
  success: palette.green500,
  successStrong: palette.green600,
  danger: palette.red500,
  warning: palette.amber500,
  info: palette.blue500,

  // Rótulos de treino (A / B / C no protótipo)
  workoutA: palette.red500,
  workoutB: palette.blue500,
  workoutC: palette.green500,

  // Navegação / barra de abas
  tabBar: palette.neutral950,
  tabBarBorder: palette.neutral800,
  tabBarActive: palette.red500,
  tabBarInactive: palette.neutral500,

  // Diversos
  overlay: 'rgba(0, 0, 0, 0.6)',
  timerTrack: palette.neutral800,
} as const;

export type ColorToken = keyof typeof colors;
