import type { DiaSemana } from '@/types';

/** Nome do arquivo do banco SQLite no dispositivo. */
export const DB_NAME = 'meu-treino.db';

/** Opções de descanso rápido (em segundos) usadas na edição de treino. */
export const DEFAULT_REST_OPTIONS = [30, 40, 60] as const;

/** Descanso padrão (em segundos) ao criar um novo exercício. */
export const DEFAULT_REST_SECONDS = 40;

/** Dias da semana na ordem de exibição, com rótulo legível. */
export const DIAS_SEMANA: { key: DiaSemana; label: string }[] = [
  { key: 'segunda', label: 'Segunda' },
  { key: 'terca', label: 'Terça' },
  { key: 'quarta', label: 'Quarta' },
  { key: 'quinta', label: 'Quinta' },
  { key: 'sexta', label: 'Sexta' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
];
