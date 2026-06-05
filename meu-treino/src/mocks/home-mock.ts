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
    nome: 'Marco',
    frase: 'Consistência supera motivação.',
  },
  resumo: {
    treinosConcluidos: 67,
    seriesRealizadas: 312,
    tempoTreinandoHoras: 24,
  },
  sequenciaSemanal: [
    { initial: 'S', completed: true },
    { initial: 'T', completed: true },
    { initial: 'Q', completed: true },
    { initial: 'Q', completed: false },
    { initial: 'S', completed: false, isToday: true },
    { initial: 'S', completed: false },
    { initial: 'D', completed: false },
  ] satisfies WeekDayStatus[],
  treinoDoDia: {
    id: 'treino-a',
    label: 'A',
    nome: 'Treino A',
    foco: 'Peito e tríceps',
    exercicios: 6,
  } satisfies TreinoResumo,
  treinosRecentes: [
    { id: '1', nome: 'Treino A', quando: 'Há 2 dias', duracao: '52 min' },
    { id: '2', nome: 'Treino B', quando: 'Há 4 dias', duracao: '48 min' },
    { id: '3', nome: 'Treino C', quando: 'Há 6 dias', duracao: '55 min' },
  ] satisfies TreinoRecente[],
} as const;
