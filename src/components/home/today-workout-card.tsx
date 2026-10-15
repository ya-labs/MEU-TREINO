import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card } from '@/components/ui';
import { WorkoutBadge } from '@/components/home/workout-badge';
import type { TreinoResumo } from '@/mocks/home-mock';
import { theme } from '@/theme';

export type TodayWorkoutCardProps = {
  treino: TreinoResumo | null;
  onIniciar: () => void;
};

export function TodayWorkoutCard({ treino, onIniciar }: TodayWorkoutCardProps) {
  if (!treino) {
    return (
      <View style={styles.section}>
        <AppText variant="title2">Treino de hoje</AppText>
        <Card elevated style={styles.card}>
          <View style={styles.header}>
            <AppText variant="body">😴</AppText>
            <View style={styles.info}>
              <AppText variant="bodyBold">Dia de descanso</AppText>
              <AppText variant="caption" color="textSecondary">
                Nenhum treino agendado para hoje. Aproveite para recuperar.
              </AppText>
            </View>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <AppText variant="title2">Treino de hoje</AppText>
      <Card elevated style={styles.card}>
        <View style={styles.header}>
          <WorkoutBadge label={treino.label} />
          <View style={styles.info}>
            <AppText variant="bodyBold">{treino.nome}</AppText>
            {treino.foco ? (
              <AppText variant="caption" color="textSecondary">
                {treino.foco}
              </AppText>
            ) : null}
            <AppText variant="small" color="textMuted">
              {treino.exercicios} exercícios
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
    gap: theme.spacing.md,
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
