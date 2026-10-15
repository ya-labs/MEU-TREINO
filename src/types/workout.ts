import type { Exercicio } from './exercise';

export type TreinoLabel = 'A' | 'B' | 'C';

export type Treino = {
  id: string;
  label: TreinoLabel;
  nome: string;
  foco: string;
  exercicios: Exercicio[];
};
