/** Versão atual do schema. Incremente ao alterar as tabelas abaixo. */
export const SCHEMA_VERSION = 1;

/** DDL completo do banco. Executado em uma migração nova/limpa. */
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS workouts (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  nome TEXT NOT NULL,
  foco TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY NOT NULL,
  workout_id TEXT NOT NULL,
  nome TEXT NOT NULL,
  series INTEGER NOT NULL DEFAULT 1,
  descanso_segundos INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (workout_id) REFERENCES workouts (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_exercises_workout ON exercises (workout_id);

CREATE TABLE IF NOT EXISTS schedule (
  dia TEXT PRIMARY KEY NOT NULL,
  workout_id TEXT,
  FOREIGN KEY (workout_id) REFERENCES workouts (id) ON DELETE SET NULL
);
`;
