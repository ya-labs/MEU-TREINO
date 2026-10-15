import { StyleSheet, View, type ViewProps } from 'react-native';

import { theme } from '@/theme';

export type CardProps = ViewProps & {
  elevated?: boolean;
};

export function Card({ elevated = false, style, ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated ? styles.elevated : styles.surface,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },
  surface: {
    backgroundColor: theme.colors.surface,
  },
  elevated: {
    backgroundColor: theme.colors.surfaceElevated,
  },
});
