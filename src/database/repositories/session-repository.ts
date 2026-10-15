import { getDb } from '@/database/client';
import type { Sessao, TreinoLabel } from '@/types';

type SessionRow = {
  id: string;
  workout_id: string | null;
  treino_nome: string;
  treino_label: string;
  inicio_em: number;
  fim_em: number;
  duracao_segundos: number;
  series: number;
  exercicios: number;
};

export type SessaoInput = Omit<Sessao, 'id'>;

export type SessaoStats = {
  total: number;
  totalSeries: number;
  totalSegundos: number;
};

function mapRow(row: SessionRow): Sessao {
  return {
    id: row.id,
    treinoId: row.workout_id,
    treinoNome: row.treino_nome,
    treinoLabel: (row.treino_label as TreinoLabel) ?? 'A',
    inicioEm: row.inicio_em,
    fimEm: row.fim_em,
    duracaoSegundos: row.duracao_segundos,
    series: row.series,
    exercicios: row.exercicios,
  };
}

function gerarId(): string {
  return `sessao-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export const sessionRepository = {
  async create(input: SessaoInput): Promise<Sessao> {
    const db = await getDb();
    const id = gerarId();
    await db.runAsync(
      `INSERT INTO sessions
        (id, workout_id, treino_nome, treino_label, inicio_em, fim_em, duracao_segundos, series, exercicios)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        input.treinoId,
        input.treinoNome,
        input.treinoLabel,
        input.inicioEm,
        input.fimEm,
        input.duracaoSegundos,
        input.series,
        input.exercicios,
      ],
    );
    return { id, ...input };
  },

  async getById(id: string): Promise<Sessao | null> {
    const db = await getDb();
    const row = await db.getFirstAsync<SessionRow>(
      `SELECT id, workout_id, treino_nome, treino_label, inicio_em, fim_em, duracao_segundos, series, exercicios
       FROM sessions WHERE id = ?;`,
      [id],
    );
    return row ? mapRow(row) : null;
  },

  async list(limit?: number): Promise<Sessao[]> {
    const db = await getDb();
    const base =
      `SELECT id, workout_id, treino_nome, treino_label, inicio_em, fim_em, duracao_segundos, series, exercicios
       FROM sessions ORDER BY fim_em DESC`;
    const rows = limit
      ? await db.getAllAsync<SessionRow>(`${base} LIMIT ?;`, [limit])
      : await db.getAllAsync<SessionRow>(`${base};`);
    return rows.map(mapRow);
  },

  async stats(): Promise<SessaoStats> {
    const db = await getDb();
    const row = await db.getFirstAsync<{
      total: number;
      total_series: number | null;
      total_segundos: number | null;
    }>(
      `SELECT COUNT(*) AS total,
              SUM(series) AS total_series,
              SUM(duracao_segundos) AS total_segundos
       FROM sessions;`,
    );
    return {
      total: row?.total ?? 0,
      totalSeries: row?.total_series ?? 0,
      totalSegundos: row?.total_segundos ?? 0,
    };
  },
};
