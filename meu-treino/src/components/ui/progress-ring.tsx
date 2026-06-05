import { StyleSheet, View } from 'react-native';

import { theme } from '@/theme';

export type ProgressRingProps = {
  size?: number;
  strokeWidth?: number;
  /** Cor do anel preenchido. */
  color: string;
  trackColor?: string;
  /** `true` desenha o anel completo; `false` desenha apenas um arco (indicador). */
  filled?: boolean;
  children?: React.ReactNode;
};

/**
 * Anel de progresso sem dependência de SVG.
 * `filled` = anel completo (usado no cronômetro); caso contrário desenha um
 * arco parcial (indicador visual da série atual).
 */
export function ProgressRing({
  size = 220,
  strokeWidth = 14,
  color,
  trackColor = theme.colors.timerTrack,
  filled = false,
  children,
}: ProgressRingProps) {
  const half = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          { width: size, height: size, borderRadius: half, borderWidth: strokeWidth, borderColor: trackColor },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: strokeWidth,
            borderColor: filled ? color : 'transparent',
            borderTopColor: color,
            borderRightColor: color,
            transform: [{ rotate: filled ? '0deg' : '-45deg' }],
          },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
