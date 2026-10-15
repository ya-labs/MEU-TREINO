import { getDb } from '@/database/client';
import type { Exercicio } from '@/types';

type ExerciseRow = {
  id: string;
  nome: string;
  series: number;
  descanso_segundos: number;
};

type ExercicioInput = {
  nome: string;
  series: number;
  descansoSegundos: number;
};

function mapRow(row: ExerciseRow): Exercicio {
  return {
    id: row.id,
    nome: row.nome,
    series: row.series,
    descansoSegundos: row.descanso_segundos,
  };
}

function gerarId(): string {
  return `ex-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export const exerciseRepository = {
  async listByWorkout(workoutId: string): Promise<Exercicio[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<ExerciseRow>(
      'SELECT id, nome, series, descanso_segundos FROM exercises WHERE workout_id = ? ORDER BY position ASC;',
      [workoutId],
    );
    return rows.map(mapRow);
  },

  async create(workoutId: string, input: ExercicioInput): Promise<Exercicio> {
    const db = await getDb();
    const id = gerarId();
    const position = await proximaPosicao(workoutId);
    await db.runAsync(
      'INSERT INTO exercises (id, workout_id, nome, series, descanso_segundos, position) VALUES (?, ?, ?, ?, ?, ?);',
      [id, workoutId, input.nome, input.series, input.descansoSegundos, position],
    );
    return { id, ...input };
  },

  async update(id: string, input: ExercicioInput): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      'UPDATE exercises SET nome = ?, series = ?, descanso_segundos = ? WHERE id = ?;',
      [input.nome, input.series, input.descansoSegundos, id],
    );
  },

  async remove(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync('DELETE FROM exercises WHERE id = ?;', [id]);
  },

  /** Substitui todos os exercícios de um treino, preservando a ordem informada. */
  async replaceAll(workoutId: string, exercicios: ExercicioInput[]): Promise<void> {
    const db = await getDb();
    await db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM exercises WHERE workout_id = ?;', [workoutId]);
      for (let i = 0; i < exercicios.length; i += 1) {
        const ex = exercicios[i];
        await db.runAsync(
          'INSERT INTO exercises (id, workout_id, nome, series, descanso_segundos, position) VALUES (?, ?, ?, ?, ?, ?);',
          [gerarId(), workoutId, ex.nome, ex.series, ex.descansoSegundos, i],
        );
      }
    });
  },
};

async function proximaPosicao(workoutId: string): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ max: number | null }>(
    'SELECT MAX(position) AS max FROM exercises WHERE workout_id = ?;',
    [workoutId],
  );
  return (row?.max ?? -1) + 1;
}
