import type { SQLiteDatabase } from 'expo-sqlite';

import { SCHEMA_SQL, SCHEMA_VERSION } from '@/database/schema';

type SeedExercise = {
  id: string;
  nome: string;
  series: number;
  descansoSegundos: number;
};

type SeedWorkout = {
  id: string;
  label: string;
  nome: string;
  foco: string;
  exercicios: SeedExercise[];
};

/** Dados iniciais inseridos apenas na primeira criação do banco. */
const SEED_WORKOUTS: SeedWorkout[] = [
  {
    id: 'treino-a',
    label: 'A',
    nome: 'Treino A',
    foco: 'Peito e tríceps',
    exercicios: [
      { id: 'a-1', nome: 'Supino inclinado', series: 3, descansoSegundos: 40 },
      { id: 'a-2', nome: 'Supino reto', series: 3, descansoSegundos: 40 },
      { id: 'a-3', nome: 'Crossover', series: 3, descansoSegundos: 40 },
      { id: 'a-4', nome: 'Tríceps pulley', series: 3, descansoSegundos: 30 },
      { id: 'a-5', nome: 'Tríceps testa', series: 3, descansoSegundos: 30 },
      { id: 'a-6', nome: 'Mergulho', series: 3, descansoSegundos: 60 },
    ],
  },
  {
    id: 'treino-b',
    label: 'B',
    nome: 'Treino B',
    foco: 'Costas e bíceps',
    exercicios: [
      { id: 'b-1', nome: 'Puxada frontal', series: 4, descansoSegundos: 60 },
      { id: 'b-2', nome: 'Remada curvada', series: 4, descansoSegundos: 60 },
      { id: 'b-3', nome: 'Remada unilateral', series: 3, descansoSegundos: 40 },
      { id: 'b-4', nome: 'Rosca direta', series: 3, descansoSegundos: 40 },
      { id: 'b-5', nome: 'Rosca martelo', series: 3, descansoSegundos: 40 },
    ],
  },
  {
    id: 'treino-c',
    label: 'C',
    nome: 'Treino C',
    foco: 'Pernas',
    exercicios: [
      { id: 'c-1', nome: 'Agachamento livre', series: 4, descansoSegundos: 90 },
      { id: 'c-2', nome: 'Leg press', series: 4, descansoSegundos: 60 },
      { id: 'c-3', nome: 'Cadeira extensora', series: 3, descansoSegundos: 40 },
      { id: 'c-4', nome: 'Mesa flexora', series: 3, descansoSegundos: 40 },
      { id: 'c-5', nome: 'Panturrilha em pé', series: 4, descansoSegundos: 30 },
      { id: 'c-6', nome: 'Cadeira adutora', series: 3, descansoSegundos: 30 },
    ],
  },
];

const SEED_SCHEDULE: { dia: string; workoutId: string | null }[] = [
  { dia: 'segunda', workoutId: 'treino-a' },
  { dia: 'terca', workoutId: 'treino-b' },
  { dia: 'quarta', workoutId: null },
  { dia: 'quinta', workoutId: 'treino-a' },
  { dia: 'sexta', workoutId: 'treino-b' },
  { dia: 'sabado', workoutId: 'treino-c' },
  { dia: 'domingo', workoutId: null },
];

async function seed(db: SQLiteDatabase): Promise<void> {
  for (let w = 0; w < SEED_WORKOUTS.length; w += 1) {
    const workout = SEED_WORKOUTS[w];
    await db.runAsync(
      'INSERT INTO workouts (id, label, nome, foco, position) VALUES (?, ?, ?, ?, ?);',
      [workout.id, workout.label, workout.nome, workout.foco, w],
    );

    for (let e = 0; e < workout.exercicios.length; e += 1) {
      const ex = workout.exercicios[e];
      await db.runAsync(
        'INSERT INTO exercises (id, workout_id, nome, series, descanso_segundos, position) VALUES (?, ?, ?, ?, ?, ?);',
        [ex.id, workout.id, ex.nome, ex.series, ex.descansoSegundos, e],
      );
    }
  }

  for (const { dia, workoutId } of SEED_SCHEDULE) {
    await db.runAsync('INSERT INTO schedule (dia, workout_id) VALUES (?, ?);', [dia, workoutId]);
  }
}

/**
 * Cria o schema e popula o seed na primeira execução.
 * Usa `PRAGMA user_version` para rodar apenas uma vez por versão.
 */
export async function runMigrations(db: SQLiteDatabase): Promise<void> {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= SCHEMA_VERSION) {
    return;
  }

  await db.withTransactionAsync(async () => {
    await db.execAsync(SCHEMA_SQL);

    if (currentVersion === 0) {
      await seed(db);
    }
  });

  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
}
