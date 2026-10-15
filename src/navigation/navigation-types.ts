import type { NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainTabsParamList = {
  Home: undefined;
  Treinos: undefined;
  OrganizarSemana: undefined;
  Configuracoes: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList> | undefined;
  EditarTreino: { treinoId?: string } | undefined;
  Treino: { treinoId?: string } | undefined;
  Descanso:
    | {
        treinoNome?: string;
        exercicioNome?: string;
        serieAtual?: number;
        totalSeries?: number;
        duracaoSegundos?: number;
      }
    | undefined;
  Resumo: { sessionId?: string; treinoId?: string } | undefined;
  Historico: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabsParamList> = BottomTabScreenProps<
  MainTabsParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
