import type { DiaSemana } from '@/types';

const DIA_POR_GETDAY: DiaSemana[] = [
  'domingo',
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
];

/** Dia da semana de hoje, no formato usado pela agenda. */
export function getDiaSemanaHoje(): DiaSemana {
  return DIA_POR_GETDAY[new Date().getDay()];
}

/** Epoch (ms) da segunda-feira da semana atual, à meia-noite local. */
export function getInicioSemanaMs(agora = new Date()): number {
  const inicio = new Date(agora);
  inicio.setHours(0, 0, 0, 0);
  const offsetDesdeSegunda = (inicio.getDay() + 6) % 7;
  inicio.setDate(inicio.getDate() - offsetDesdeSegunda);
  return inicio.getTime();
}
