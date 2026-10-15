import { useCallback, useEffect, useState } from 'react';

import { workoutRepository } from '@/database';
import type { Treino } from '@/types';

/** Lista reativa de treinos, com recarregamento e exclusão. */
export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await workoutRepository.list();
    setWorkouts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const removeWorkout = useCallback(
    async (id: string) => {
      await workoutRepository.remove(id);
      await reload();
    },
    [reload],
  );

  return { workouts, loading, reload, removeWorkout };
}
