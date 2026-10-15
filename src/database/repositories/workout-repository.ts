import { getDb } from '@/database/client';
import type { Exercicio, Treino, TreinoLabel } from '@/types';

type WorkoutRow = {
  id: string;
  label: string;
  nome: string;
  foco: string;
  position: number;
};

type ExerciseRow = {
  id: string;
  workout_id: string;
  nome: string;
  series: number;
  descanso_segundos: number;
};

export type WorkoutInput = {
  nome: string;
  foco?: string;
  label?: TreinoLabel;
};

const LABELS: TreinoLabel[] = ['A', 'B', 'C'];

function mapExercise(row: ExerciseRow): Exercicio {
  return {
    id: row.id,
    nome: row.nome,
    series: row.series,
    descansoSegundos: row.descanso_segundos,
  };
}

function mapWorkout(row: WorkoutRow, exercicios: Exercicio[]): Treino {
  return {
    id: row.id,
    label: (row.label as TreinoLabel) ?? 'A',
    nome: row.nome,
    foco: row.foco,
    exercicios,
  };
}

function gerarId(): string {
  return `treino-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export const workoutRepository = {
  async list(): Promise<Treino[]> {
    const db = await getDb();
    const workouts = await db.getAllAsync<WorkoutRow>(
      'SELECT id, label, nome, foco, position FROM workouts ORDER BY position ASC;',
    );
    const exercises = await db.getAllAsync<ExerciseRow>(
      'SELECT id, workout_id, nome, series, descanso_segundos FROM exercises ORDER BY position ASC;',
    );

    const porTreino = new Map<string, Exercicio[]>();
    for (const row of exercises) {
      const lista = porTreino.get(row.workout_id) ?? [];
      lista.push(mapExercise(row));
      porTreino.set(row.workout_id, lista);
    }

    return workouts.map((w) => mapWorkout(w, porTreino.get(w.id) ?? []));
  },

  async getById(id: string): Promise<Treino | null> {
    const db = await getDb();
    const workout = await db.getFirstAsync<WorkoutRow>(
      'SELECT id, label, nome, foco, position FROM workouts WHERE id = ?;',
      [id],
    );
    if (!workout) {
      return null;
    }
    const exercises = await db.getAllAsync<ExerciseRow>(
      'SELECT id, workout_id, nome, series, descanso_segundos FROM exercises WHERE workout_id = ? ORDER BY position ASC;',
      [id],
    );
    return mapWorkout(workout, exercises.map(mapExercise));
  },

  async create(input: WorkoutInput): Promise<Treino> {
    const db = await getDb();
    const id = gerarId();
    const total = await contar();
    const label = input.label ?? LABELS[total % LABELS.length];
    await db.runAsync(
      'INSERT INTO workouts (id, label, nome, foco, position) VALUES (?, ?, ?, ?, ?);',
      [id, label, input.nome, input.foco ?? '', total],
    );
    return { id, label, nome: input.nome, foco: input.foco ?? '', exercicios: [] };
  },

  async update(id: string, input: WorkoutInput): Promise<void> {
    const db = await getDb();
    const atual = await db.getFirstAsync<{ label: string; foco: string }>(
      'SELECT label, foco FROM workouts WHERE id = ?;',
      [id],
    );
    await db.runAsync('UPDATE workouts SET nome = ?, foco = ?, label = ? WHERE id = ?;', [
      input.nome,
      input.foco ?? atual?.foco ?? '',
      input.label ?? (atual?.label as TreinoLabel) ?? 'A',
      id,
    ]);
  },

  async remove(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync('DELETE FROM workouts WHERE id = ?;', [id]);
  },
};

async function contar(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ total: number }>('SELECT COUNT(*) AS total FROM workouts;');
  return row?.total ?? 0;
}
