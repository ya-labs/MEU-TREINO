import { Pressable, StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { AppText, Card } from '@/components/ui';
import { theme } from '@/theme';
import type { Treino } from '@/types';

export type DayScheduleRowProps = {
  diaLabel: string;
  treino: Treino | null;
  onPress: () => void;
};

export function DayScheduleRow({ diaLabel, treino, onPress }: DayScheduleRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card style={styles.card}>
        <AppText variant="bodyBold" style={styles.dia}>
          {diaLabel}
        </AppText>
        <View style={styles.selecao}>
          {treino ? (
            <>
              <WorkoutBadge label={treino.label} size="sm" />
              <AppText variant="caption" color="textSecondary">
                {treino.nome}
              </AppText>
            </>
          ) : (
            <AppText variant="caption" color="textMuted">
              Descanso
            </AppText>
          )}
          <AppText variant="caption" color="textMuted">
            ▾
          </AppText>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  dia: {
    flex: 1,
  },
  selecao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});
