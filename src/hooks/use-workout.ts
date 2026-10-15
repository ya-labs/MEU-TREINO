import { useEffect, useState } from 'react';

import { exerciseRepository, workoutRepository, type WorkoutInput } from '@/database';
import type { Exercicio, Treino } from '@/types';

type ExercicioInput = {
  nome: string;
  series: number;
  descansoSegundos: number;
};

/** Carrega um treino (com exercícios) por id. Retorna null para "novo treino". */
export function useWorkout(id?: string) {
  const [treino, setTreino] = useState<Treino | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    let active = true;
    if (!id) {
      setTreino(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    workoutRepository.getById(id).then((data) => {
      if (active) {
        setTreino(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  return { treino, loading };
}

/**
 * Cria ou atualiza um treino junto de seus exercícios em uma única operação.
 * Centraliza a orquestração entre os repositories (sem SQL nas telas).
 */
export async function salvarTreino(params: {
  id?: string;
  dados: WorkoutInput;
  exercicios: ExercicioInput[];
}): Promise<Treino> {
  const { id, dados, exercicios } = params;
  const treino = id
    ? ((await workoutRepository.update(id, dados), await workoutRepository.getById(id)) as Treino)
    : await workoutRepository.create(dados);

  await exerciseRepository.replaceAll(treino.id, exercicios);
  return (await workoutRepository.getById(treino.id)) as Treino;
}

export type { Exercicio };
