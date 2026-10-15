import type { TreinoLabel } from '@/types';

export type WeekDayStatus = {
  initial: string;
  completed: boolean;
  isToday?: boolean;
};

export type TreinoResumo = {
  id: string;
  label: TreinoLabel;
  nome: string;
  foco: string;
  exercicios: number;
};

export type TreinoRecente = {
  id: string;
  nome: string;
  quando: string;
  duracao: string;
};

export const homeMock = {
  usuario: {
    frase: 'Consistência supera motivação.',
  },
} as const;
