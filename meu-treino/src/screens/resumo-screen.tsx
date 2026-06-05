import { useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { StatsGrid } from '@/components/resumo';
import { AppText, AppView, Button, Card } from '@/components/ui';
import { useWorkout } from '@/hooks/use-workout';
import { resumoSessaoMock } from '@/mocks';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';

export default function ResumoScreen({ navigation, route }: RootStackScreenProps<'Resumo'>) {
  const { treino, loading } = useWorkout(route.params?.treinoId);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading || !treino) {
    return (
      <AppView style={[styles.root, styles.centered]}>
        <ActivityIndicator color={theme.colors.primary} />
      </AppView>
    );
  }

  const resumo = {
    ...resumoSessaoMock,
    treinoNome: treino.nome,
    exercicios: treino.exercicios.length,
  };

  return (
    <AppView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="largeTitle" style={styles.titulo}>
            Treino concluído! 🎉
          </AppText>
          <AppText variant="body" color="textSecondary">
            Mandou bem, continue assim.
          </AppText>
        </View>

        <StatsGrid resumo={resumo} />

        <Card style={styles.treinoRow}>
          <WorkoutBadge label={treino.label} size="sm" />
          <View style={styles.info}>
            <AppText variant="bodyBold">{resumo.treinoNome}</AppText>
            <AppText variant="small" color="textSecondary">
              {resumo.data}
            </AppText>
          </View>
          <AppText variant="body" color="success">
            ✓
          </AppText>
        </Card>

        <View style={styles.actions}>
          <Button label="Concluir" onPress={() => navigation.navigate('MainTabs')} />
          <Button
            label="Ver resumo"
            variant="outline"
            onPress={() => navigation.navigate('MainTabs')}
          />
        </View>
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  titulo: {
    textAlign: 'center',
  },
  treinoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
