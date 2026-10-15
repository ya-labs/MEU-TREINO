import type { Perfil, ResumoSessao } from '@/types';

export const resumoSessaoMock: ResumoSessao = {
  treinoNome: 'Treino A',
  data: 'Hoje, concluído agora',
  tempo: '42:18',
  series: 18,
  exercicios: 6,
};

export const perfilMock: Perfil = {
  nome: 'Marco',
  email: 'marco@meutreino.app',
};
