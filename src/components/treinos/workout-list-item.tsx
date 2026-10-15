import { Pressable, StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { AppText, Card, IconButton } from '@/components/ui';
import { theme } from '@/theme';
import type { Treino } from '@/types';

export type WorkoutListItemProps = {
  treino: Treino;
  onPress: () => void;
  onMenu: () => void;
};

export function WorkoutListItem({ treino, onPress, onMenu }: WorkoutListItemProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card style={styles.card}>
        <WorkoutBadge label={treino.label} size="sm" />
        <View style={styles.info}>
          <AppText variant="bodyBold">{treino.nome}</AppText>
          {treino.foco ? (
            <AppText variant="small" color="textSecondary">
              {treino.foco}
            </AppText>
          ) : null}
          <AppText variant="small" color="textMuted">
            {treino.exercicios.length} exercícios
          </AppText>
        </View>
        <IconButton
          icon="⋮"
          background="surfaceMuted"
          color="textSecondary"
          onPress={onMenu}
          accessibilityLabel={`Ações do ${treino.nome}`}
        />
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
    gap: theme.spacing.md,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
