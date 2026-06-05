export type DiaSemana =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo';

/** Mapa de dia da semana para o id do treino (ou null quando é dia de descanso). */
export type AgendaSemanal = Record<DiaSemana, string | null>;
