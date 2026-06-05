import { Pressable, StyleSheet } from 'react-native';

import { AppText, BottomSheet } from '@/components/ui';
import { theme, type ColorToken } from '@/theme';
import type { Treino } from '@/types';

export type WorkoutActionSheetProps = {
  treino: Treino | null;
  onClose: () => void;
  onEditar: () => void;
  onRenomear: () => void;
  onExcluir: () => void;
};

type Acao = {
  icon: string;
  label: string;
  color: ColorToken;
  onPress: () => void;
};

export function WorkoutActionSheet({
  treino,
  onClose,
  onEditar,
  onRenomear,
  onExcluir,
}: WorkoutActionSheetProps) {
  const acoes: Acao[] = [
    { icon: '✏️', label: 'Editar treino', color: 'text', onPress: onEditar },
    { icon: '🔤', label: 'Renomear', color: 'text', onPress: onRenomear },
    { icon: '🗑️', label: 'Excluir', color: 'danger', onPress: onExcluir },
  ];

  return (
    <BottomSheet visible={treino !== null} onClose={onClose} title={treino?.nome}>
      {acoes.map((acao) => (
        <Pressable
          key={acao.label}
          accessibilityRole="button"
          onPress={acao.onPress}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
          <AppText variant="body">{acao.icon}</AppText>
          <AppText variant="body" color={acao.color}>
            {acao.label}
          </AppText>
        </Pressable>
      ))}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  pressed: {
    opacity: 0.6,
  },
});
