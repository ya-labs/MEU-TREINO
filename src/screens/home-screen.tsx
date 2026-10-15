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
import { DIAS_SEMANA } from '@/constants/config';
import { useSessions, useSessionStats } from '@/hooks/use-sessions';
import { useWeeklySchedule } from '@/hooks/use-weekly-schedule';
import { useWorkouts } from '@/hooks/use-workouts';
import { homeMock } from '@/mocks/home-mock';
import type { TreinoRecente, TreinoResumo, WeekDayStatus } from '@/mocks/home-mock';
import type { MainTabScreenProps } from '@/navigation/navigation-types';
import { formatDiaRelativo, formatDuracaoMin, getDiaSemanaHoje, getInicioSemanaMs } from '@/utils';

const DIA_MS = 86_400_000;

export default function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { sessions, reload: reloadSessions } = useSessions();
  const { stats, reload: reloadStats } = useSessionStats();
  const { agenda, reload: reloadAgenda } = useWeeklySchedule();
  const { workouts, reload: reloadWorkouts } = useWorkouts();

  useFocusEffect(
    useCallback(() => {
      reloadSessions();
      reloadStats();
      reloadAgenda();
      reloadWorkouts();
    }, [reloadSessions, reloadStats, reloadAgenda, reloadWorkouts]),
  );

  const diaHoje = getDiaSemanaHoje();
  const treinoHojeId = agenda?.[diaHoje] ?? null;
  const treinoHoje = treinoHojeId
    ? (workouts.find((treino) => treino.id === treinoHojeId) ?? null)
    : null;

  const treinoHojeResumo: TreinoResumo | null = treinoHoje
    ? {
        id: treinoHoje.id,
        label: treinoHoje.label,
        nome: treinoHoje.nome,
        foco: treinoHoje.foco,
        exercicios: treinoHoje.exercicios.length,
      }
    : null;

  const inicioSemana = getInicioSemanaMs();
  const sequencia: WeekDayStatus[] = DIAS_SEMANA.map((dia, index) => {
    const inicioDia = inicioSemana + index * DIA_MS;
    const fimDia = inicioDia + DIA_MS;
    return {
      initial: dia.label.charAt(0),
      completed: sessions.some((sessao) => sessao.fimEm >= inicioDia && sessao.fimEm < fimDia),
      isToday: dia.key === diaHoje,
    };
  });

  const treinosRecentes: TreinoRecente[] = sessions.slice(0, 3).map((sessao) => ({
    id: sessao.id,
    nome: sessao.treinoNome,
    quando: formatDiaRelativo(sessao.fimEm),
    duracao: formatDuracaoMin(sessao.duracaoSegundos),
  }));

  const verHistorico = useCallback(() => {
    navigation.getParent()?.navigate('Historico');
  }, [navigation]);

  const iniciarTreino = useCallback(() => {
    if (treinoHoje) {
      navigation.getParent()?.navigate('Treino', { treinoId: treinoHoje.id });
    }
  }, [navigation, treinoHoje]);

  return (
    <ScreenScroll>
      <HomeHeader frase={homeMock.usuario.frase} />

      <SummarySection
        treinosConcluidos={stats.total}
        seriesRealizadas={stats.totalSeries}
        tempoTreinandoHoras={Math.floor(stats.totalSegundos / 3600)}
      />

      <WeeklyStreak dias={sequencia} />

      <TodayWorkoutCard treino={treinoHojeResumo} onIniciar={iniciarTreino} />

      <RecentWorkouts treinos={treinosRecentes} onVerTodos={verHistorico} />
    </ScreenScroll>
  );
}
