import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/components/ui';
import type { TreinoRecente } from '@/mocks/home-mock';
import { theme } from '@/theme';

export type RecentWorkoutsProps = {
  treinos: TreinoRecente[];
  onVerTodos: () => void;
};

export function RecentWorkouts({ treinos, onVerTodos }: RecentWorkoutsProps) {
  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <AppText variant="title2">Treinos recentes</AppText>
        <Pressable
          accessibilityRole="button"
          onPress={onVerTodos}
          hitSlop={theme.hitSlop}
          style={({ pressed }) => pressed && styles.linkPressed}>
          <AppText variant="caption" color="primary">
            Ver todos
          </AppText>
        </Pressable>
      </View>
      <View style={styles.list}>
        {treinos.map((treino) => (
          <Card key={treino.id} style={styles.item}>
            <View style={styles.icon}>
              <AppText variant="body">🏋️</AppText>
            </View>
            <View style={styles.meta}>
              <AppText variant="bodyBold">{treino.nome}</AppText>
              <AppText variant="small" color="textSecondary">
                {treino.quando} · {treino.duracao}
              </AppText>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkPressed: {
    opacity: 0.7,
  },
  list: {
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
