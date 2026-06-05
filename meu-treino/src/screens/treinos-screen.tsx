import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/common';
import { DailyWorkoutCard, WorkoutActionSheet, WorkoutListItem } from '@/components/treinos';
import { AppText, Button, SectionHeader } from '@/components/ui';
import { useWorkouts } from '@/hooks/use-workouts';
import type { MainTabScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import type { Treino } from '@/types';

export default function TreinosScreen({ navigation }: MainTabScreenProps<'Treinos'>) {
  const { workouts, reload, removeWorkout } = useWorkouts();
  const [treinoSelecionado, setTreinoSelecionado] = useState<Treino | null>(null);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const treinoDoDia = workouts[0] ?? null;

  const abrirExecucao = useCallback(
    (treinoId: string) => {
      navigation.getParent()?.navigate('Treino', { treinoId });
    },
    [navigation],
  );

  const abrirEdicao = useCallback(
    (treinoId?: string) => {
      navigation.getParent()?.navigate('EditarTreino', treinoId ? { treinoId } : undefined);
    },
    [navigation],
  );

  const fecharMenu = useCallback(() => setTreinoSelecionado(null), []);

  const editarPeloMenu = useCallback(() => {
    const id = treinoSelecionado?.id;
    fecharMenu();
    abrirEdicao(id);
  }, [treinoSelecionado, fecharMenu, abrirEdicao]);

  const excluirPeloMenu = useCallback(async () => {
    const id = treinoSelecionado?.id;
    fecharMenu();
    if (id) {
      await removeWorkout(id);
    }
  }, [treinoSelecionado, fecharMenu, removeWorkout]);

  return (
    <ScreenScroll>
      <AppText variant="largeTitle">Treinos</AppText>

      {treinoDoDia ? (
        <DailyWorkoutCard
          treino={treinoDoDia}
          diaLabel="Hoje • treino do dia"
          onIniciar={() => abrirExecucao(treinoDoDia.id)}
        />
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Meus treinos" />
        <View style={styles.list}>
          {workouts.length === 0 ? (
            <AppText variant="caption" color="textMuted">
              Nenhum treino ainda. Toque em “+ Novo treino”.
            </AppText>
          ) : (
            workouts.map((treino) => (
              <WorkoutListItem
                key={treino.id}
                treino={treino}
                onPress={() => abrirEdicao(treino.id)}
                onMenu={() => setTreinoSelecionado(treino)}
              />
            ))
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <Button label="+ Novo treino" variant="outline" onPress={() => abrirEdicao()} />
        <Button
          label="Organizar treinamentos"
          variant="outline"
          onPress={() => navigation.navigate('OrganizarSemana')}
        />
      </View>

      <WorkoutActionSheet
        treino={treinoSelecionado}
        onClose={fecharMenu}
        onEditar={editarPeloMenu}
        onRenomear={editarPeloMenu}
        onExcluir={excluirPeloMenu}
      />
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  list: {
    gap: theme.spacing.sm,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
