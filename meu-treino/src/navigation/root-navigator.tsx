import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ConfiguracoesScreen,
  DescansoScreen,
  EditarTreinoScreen,
  HomeScreen,
  OrganizarSemanaScreen,
  ResumoScreen,
  TreinoScreen,
  TreinosScreen,
} from '@/screens';

import type { MainTabsParamList, RootStackParamList } from './navigation-types';

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabsNavigator() {
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tabs.Screen name="Treinos" component={TreinosScreen} options={{ title: 'Treinos' }} />
      <Tabs.Screen
        name="OrganizarSemana"
        component={OrganizarSemanaScreen}
        options={{ title: 'Semana' }}
      />
      <Tabs.Screen
        name="Configuracoes"
        component={ConfiguracoesScreen}
        options={{ title: 'Ajustes' }}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={MainTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarTreino"
        component={EditarTreinoScreen}
        options={{ title: 'Editar Treino' }}
      />
      <Stack.Screen name="Treino" component={TreinoScreen} options={{ title: 'Treino' }} />
      <Stack.Screen
        name="Descanso"
        component={DescansoScreen}
        options={{ title: 'Descanso', presentation: 'modal' }}
      />
      <Stack.Screen name="Resumo" component={ResumoScreen} options={{ title: 'Resumo' }} />
    </Stack.Navigator>
  );
}
