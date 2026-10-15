import type { TreinoLabel } from './workout';

export type ResumoSessao = {
  treinoNome: string;
  data: string;
  tempo: string;
  series: number;
  exercicios: number;
};

/** Sessão de treino concluída, persistida no banco. */
export type Sessao = {
  id: string;
  treinoId: string | null;
  treinoNome: string;
  treinoLabel: TreinoLabel;
  inicioEm: number;
  fimEm: number;
  duracaoSegundos: number;
  series: number;
  exercicios: number;
};
