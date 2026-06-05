import { StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { AppText, Button, Card } from '@/components/ui';
import { theme } from '@/theme';
import type { Treino } from '@/types';

export type DailyWorkoutCardProps = {
  treino: Treino;
  diaLabel: string;
  onIniciar: () => void;
};

export function DailyWorkoutCard({ treino, diaLabel, onIniciar }: DailyWorkoutCardProps) {
  return (
    <View style={styles.section}>
      <AppText variant="caption" color="textSecondary">
        {diaLabel}
      </AppText>
      <Card elevated style={styles.card}>
        <View style={styles.header}>
          <WorkoutBadge label={treino.label} />
          <View style={styles.info}>
            <AppText variant="title2">{treino.nome}</AppText>
            <AppText variant="caption" color="textSecondary">
              {treino.foco}
            </AppText>
          </View>
        </View>
        <Button label="Iniciar treino" onPress={onIniciar} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.sm,
  },
  card: {
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
