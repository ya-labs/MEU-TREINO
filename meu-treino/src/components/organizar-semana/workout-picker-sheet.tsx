import { Pressable, StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { AppText, BottomSheet } from '@/components/ui';
import { theme } from '@/theme';
import type { Treino } from '@/types';

export type WorkoutPickerSheetProps = {
  visible: boolean;
  diaLabel?: string;
  treinos: Treino[];
  onClose: () => void;
  onSelecionar: (treinoId: string | null) => void;
};

export function WorkoutPickerSheet({
  visible,
  diaLabel,
  treinos,
  onClose,
  onSelecionar,
}: WorkoutPickerSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose} title={diaLabel}>
      {treinos.map((treino) => (
        <Pressable
          key={treino.id}
          accessibilityRole="button"
          onPress={() => onSelecionar(treino.id)}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
          <WorkoutBadge label={treino.label} size="sm" />
          <View style={styles.info}>
            <AppText variant="bodyBold">{treino.nome}</AppText>
            <AppText variant="small" color="textSecondary">
              {treino.foco}
            </AppText>
          </View>
        </Pressable>
      ))}

      <Pressable
        accessibilityRole="button"
        onPress={() => onSelecionar(null)}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <AppText variant="body">😴</AppText>
        <AppText variant="body" color="textSecondary">
          Descanso (sem treino)
        </AppText>
      </Pressable>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  pressed: {
    opacity: 0.6,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
