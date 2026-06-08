import { useCallback, useEffect, useState } from 'react';

import { sessionRepository, type SessaoStats } from '@/database';
import type { Sessao } from '@/types';

/** Lista de sessões concluídas (histórico), opcionalmente limitada. */
export function useSessions(limit?: number) {
  const [sessions, setSessions] = useState<Sessao[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await sessionRepository.list(limit);
    setSessions(data);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { sessions, loading, reload };
}

/** Totais agregados do histórico (treinos, séries, tempo). */
export function useSessionStats() {
  const [stats, setStats] = useState<SessaoStats>({ total: 0, totalSeries: 0, totalSegundos: 0 });
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await sessionRepository.stats();
    setStats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { stats, loading, reload };
}
