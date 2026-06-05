import { DarkTheme, NavigationContainer, type Theme as NavigationTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initDatabase } from '@/database';
import { theme } from '@/theme';
import { RootNavigator } from '@/navigation';

const navigationTheme: NavigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    notification: theme.colors.primary,
  },
};

export default function App() {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setPronto(true))
      .catch((erro) => {
        console.error('Falha ao inicializar o banco de dados', erro);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {pronto ? (
          <NavigationContainer theme={navigationTheme}>
            <RootNavigator />
          </NavigationContainer>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.background,
            }}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        )}
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
