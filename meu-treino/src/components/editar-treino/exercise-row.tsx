import { StyleSheet, View } from 'react-native';

import { AppText, Card, IconButton } from '@/components/ui';
import { theme } from '@/theme';
import type { Exercicio } from '@/types';

export type ExerciseRowProps = {
  exercicio: Exercicio;
  onRemover: () => void;
};

export function ExerciseRow({ exercicio, onRemover }: ExerciseRowProps) {
  return (
    <Card style={styles.card}>
      <AppText variant="body" color="textMuted">
        ≡
      </AppText>
      <View style={styles.info}>
        <AppText variant="bodyBold">{exercicio.nome}</AppText>
        <AppText variant="small" color="textSecondary">
          {exercicio.series} séries · descanso {exercicio.descansoSegundos}s
        </AppText>
      </View>
      <IconButton
        icon="🗑️"
        background="surfaceMuted"
        color="danger"
        onPress={onRemover}
        accessibilityLabel={`Remover ${exercicio.nome}`}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
