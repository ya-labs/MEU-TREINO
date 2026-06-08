import { useCallback, useEffect, useRef, useState } from 'react';

import { sessionRepository } from '@/database';
import type { Sessao, Treino } from '@/types';

export type ProximoDescanso = {
  treinoNome: string;
  exercicioNome: string;
  serieAtual: number;
  totalSeries: number;
  duracaoSegundos: number;
};

export type ResultadoSerie =
  | { concluido: true }
  | { concluido: false; descanso: ProximoDescanso };

/**
 * Controla a execução de um treino: série/exercício atual, progresso e
 * persistência da sessão concluída. O estado vive na TreinoScreen, que não é
 * desmontada enquanto o Descanso fica empilhado por cima.
 */
export function useWorkoutSession(treino: Treino | null) {
  const [exIndex, setExIndex] = useState(0);
  const [serie, setSerie] = useState(1);
  const inicioRef = useRef(Date.now());
  const seriesFeitasRef = useRef(0);

  const exercicio = treino?.exercicios[exIndex] ?? null;
  const totalExercicios = treino?.exercicios.length ?? 0;
  const proximoExercicioNome = treino?.exercicios[exIndex + 1]?.nome ?? 'Último exercício';

  /** Marca a série atual como feita e avança o estado. */
  const registrarSerie = useCallback((): ResultadoSerie => {
    if (!treino || !exercicio) {
      return { concluido: true };
    }

    seriesFeitasRef.current += 1;

    const ehUltimaSerie = serie >= exercicio.series;
    const ehUltimoExercicio = exIndex >= totalExercicios - 1;

    if (ehUltimaSerie && ehUltimoExercicio) {
      return { concluido: true };
    }

    const proximoIndex = ehUltimaSerie ? exIndex + 1 : exIndex;
    const proximaSerie = ehUltimaSerie ? 1 : serie + 1;

    setExIndex(proximoIndex);
    setSerie(proximaSerie);

    return {
      concluido: false,
      descanso: {
        treinoNome: treino.nome,
        exercicioNome: treino.exercicios[proximoIndex].nome,
        serieAtual: proximaSerie,
        totalSeries: treino.exercicios[proximoIndex].series,
        duracaoSegundos: exercicio.descansoSegundos,
      },
    };
  }, [treino, exercicio, serie, exIndex, totalExercicios]);

  /** Persiste a sessão concluída e retorna o registro salvo. */
  const salvarSessao = useCallback(async (): Promise<Sessao | null> => {
    if (!treino) {
      return null;
    }
    const fim = Date.now();
    return sessionRepository.create({
      treinoId: treino.id,
      treinoNome: treino.nome,
      treinoLabel: treino.label,
      inicioEm: inicioRef.current,
      fimEm: fim,
      duracaoSegundos: Math.max(0, Math.round((fim - inicioRef.current) / 1000)),
      series: seriesFeitasRef.current,
      exercicios: totalExercicios,
    });
  }, [treino, totalExercicios]);

  return {
    exIndex,
    serie,
    exercicio,
    totalExercicios,
    proximoExercicioNome,
    registrarSerie,
    salvarSessao,
  };
}

/** Carrega uma sessão salva por id (usado na tela de resumo). */
export function useSessao(id?: string) {
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    let active = true;
    if (!id) {
      setSessao(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    sessionRepository.getById(id).then((data) => {
      if (active) {
        setSessao(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  return { sessao, loading };
}
