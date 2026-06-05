import { StyleSheet, View } from 'react-native';

import { theme } from '@/theme';

export type SetDotsProps = {
  total: number;
  atual: number;
};

/** Indicador de séries: pontos preenchidos representam séries concluídas/atual. */
export function SetDots({ total, atual }: SetDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => (
        <View key={index} style={[styles.dot, index < atual ? styles.dotAtivo : styles.dotInativo]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: theme.radius.full,
  },
  dotAtivo: {
    backgroundColor: theme.colors.primary,
  },
  dotInativo: {
    backgroundColor: theme.colors.timerTrack,
  },
});
