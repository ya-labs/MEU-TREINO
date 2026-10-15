export const Routes = {
  MainTabs: 'MainTabs',
  Home: 'Home',
  Treinos: 'Treinos',
  OrganizarSemana: 'OrganizarSemana',
  Configuracoes: 'Configuracoes',
  EditarTreino: 'EditarTreino',
  Treino: 'Treino',
  Descanso: 'Descanso',
  Resumo: 'Resumo',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
