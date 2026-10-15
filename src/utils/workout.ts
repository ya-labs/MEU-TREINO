import type { ColorToken } from '@/theme';
import type { TreinoLabel } from '@/types';

/** Cor semântica do tema associada a cada rótulo de treino (A/B/C). */
export function getTreinoLabelColor(label: TreinoLabel): ColorToken {
  switch (label) {
    case 'A':
      return 'workoutA';
    case 'B':
      return 'workoutB';
    case 'C':
      return 'workoutC';
  }
}
