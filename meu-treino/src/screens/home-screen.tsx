import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { ScreenScroll } from '@/components/common/screen-scroll';
import {
  HomeHeader,
  RecentWorkouts,
  SummarySection,
  TodayWorkoutCard,
  WeeklyStreak,
} from '@/components/home';
import { useSessions, useSessionStats } from '@/hooks/use-sessions';
import { homeMock } from '@/mocks/home-mock';
import type { TreinoRecente } from '@/mocks/home-mock';
import type { MainTabScreenProps } from '@/navigation/navigation-types';
import { formatDiaRelativo, formatDuracaoMin } from '@/utils';

export default function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { sessions, reload: reloadSessions } = useSessions(3);
  const { stats, reload: reloadStats } = useSessionStats();

  useFocusEffect(
    useCallback(() => {
      reloadSessions();
      reloadStats();
    }, [reloadSessions, reloadStats]),
  );

  const treinosRecentes: TreinoRecente[] = sessions.map((sessao) => ({
    id: sessao.id,
    nome: sessao.treinoNome,
    quando: formatDiaRelativo(sessao.fimEm),
    duracao: formatDuracaoMin(sessao.duracaoSegundos),
  }));

  const verHistorico = useCallback(() => {
    navigation.getParent()?.navigate('Historico');
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
        treinosConcluidos={stats.total}
        seriesRealizadas={stats.totalSeries}
        tempoTreinandoHoras={Math.floor(stats.totalSegundos / 3600)}
      />

      <WeeklyStreak dias={[...homeMock.sequenciaSemanal]} />

      <TodayWorkoutCard treino={homeMock.treinoDoDia} onIniciar={iniciarTreino} />

      <RecentWorkouts treinos={treinosRecentes} onVerTodos={verHistorico} />
    </ScreenScroll>
  );
}
