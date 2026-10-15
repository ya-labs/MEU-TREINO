import { useCallback, useEffect, useState } from 'react';

import { scheduleRepository } from '@/database';
import type { AgendaSemanal, DiaSemana } from '@/types';

/** Agenda semanal (dia -> treino) com atualização persistida. */
export function useWeeklySchedule() {
  const [agenda, setAgenda] = useState<AgendaSemanal | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await scheduleRepository.get();
    setAgenda(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const setDay = useCallback(async (dia: DiaSemana, workoutId: string | null) => {
    setAgenda((atual) => (atual ? { ...atual, [dia]: workoutId } : atual));
    await scheduleRepository.setDay(dia, workoutId);
  }, []);

  return { agenda, loading, setDay, reload };
}
