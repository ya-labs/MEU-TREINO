import { getDb } from '@/database/client';
import type { AgendaSemanal, DiaSemana } from '@/types';

type ScheduleRow = {
  dia: DiaSemana;
  workout_id: string | null;
};

const DIAS: DiaSemana[] = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
];

function agendaVazia(): AgendaSemanal {
  return DIAS.reduce((acc, dia) => {
    acc[dia] = null;
    return acc;
  }, {} as AgendaSemanal);
}

export const scheduleRepository = {
  async get(): Promise<AgendaSemanal> {
    const db = await getDb();
    const rows = await db.getAllAsync<ScheduleRow>('SELECT dia, workout_id FROM schedule;');
    const agenda = agendaVazia();
    for (const row of rows) {
      agenda[row.dia] = row.workout_id;
    }
    return agenda;
  },

  async setDay(dia: DiaSemana, workoutId: string | null): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      'INSERT INTO schedule (dia, workout_id) VALUES (?, ?) ON CONFLICT(dia) DO UPDATE SET workout_id = excluded.workout_id;',
      [dia, workoutId],
    );
  },
};
