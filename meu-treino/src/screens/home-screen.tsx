import { useCallback } from 'react';

import { ScreenScroll } from '@/components/common/screen-scroll';
import {
  HomeHeader,
  RecentWorkouts,
  SummarySection,
  TodayWorkoutCard,
  WeeklyStreak,
} from '@/components/home';
import { homeMock } from '@/mocks/home-mock';
import type { MainTabScreenProps } from '@/navigation/navigation-types';

export default function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const irParaTreinos = useCallback(() => {
    navigation.navigate('Treinos');
  }, [navigation]);

  const iniciarTreino = useCallback(() => {
    navigation.getParent()?.navigate('Treino', {
      treinoId: homeMock.treinoDoDia.id,
    });
  }, [navigation]);

  return (
    <ScreenScroll>
      <HomeHeader nome={homeMock.usuario.nome} frase={homeMock.usuario.frase} />

      <SummarySection
        treinosConcluidos={homeMock.resumo.treinosConcluidos}
        seriesRealizadas={homeMock.resumo.seriesRealizadas}
        tempoTreinandoHoras={homeMock.resumo.tempoTreinandoHoras}
      />

      <WeeklyStreak dias={[...homeMock.sequenciaSemanal]} />

      <TodayWorkoutCard treino={homeMock.treinoDoDia} onIniciar={iniciarTreino} />

      <RecentWorkouts treinos={[...homeMock.treinosRecentes]} onVerTodos={irParaTreinos} />
    </ScreenScroll>
  );
}
