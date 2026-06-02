import { Text, type TextProps, type TextStyle } from 'react-native';

import { theme, type TextVariant } from '@/theme';

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: keyof typeof theme.colors;
};

export function AppText({
  variant = 'body',
  color = 'text',
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[theme.typography.textVariant[variant], { color: theme.colors[color] }, style]}
      {...rest}
    />
  );
}

export function appTextStyle(variant: TextVariant, color?: keyof typeof theme.colors): TextStyle {
  return {
    ...theme.typography.textVariant[variant],
    ...(color ? { color: theme.colors[color] } : {}),
  };
}
