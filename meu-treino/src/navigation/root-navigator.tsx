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
import { theme } from '@/theme';

import type { MainTabsParamList, RootStackParamList } from './navigation-types';

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabsNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.tabBarBorder,
        },
      }}>
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
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.semibold },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}>
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
