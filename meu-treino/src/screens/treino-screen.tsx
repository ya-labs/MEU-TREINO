import { useLayoutEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SetDots } from '@/components/treino';
import { AppText, AppView, Button, ProgressRing } from '@/components/ui';
import { useWorkout } from '@/hooks/use-workout';
import { useWorkoutSession } from '@/hooks/use-workout-session';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';

export default function TreinoScreen({ navigation, route }: RootStackScreenProps<'Treino'>) {
  const { treino, loading } = useWorkout(route.params?.treinoId);
  const { exIndex, serie, exercicio, totalExercicios, proximoExercicioNome, registrarSerie, salvarSessao } =
    useWorkoutSession(treino);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: treino?.nome ?? 'Treino',
      headerRight: () => (
        <Pressable
          accessibilityRole="button"
          hitSlop={theme.hitSlop}
          onPress={() => navigation.navigate('MainTabs')}
          style={({ pressed }) => pressed && styles.pressed}>
          <AppText variant="caption" color="danger">
            Abandonar
          </AppText>
        </Pressable>
      ),
    });
  }, [navigation, treino?.nome]);

  if (loading || !treino || !exercicio) {
    return (
      <AppView style={[styles.root, styles.centered]}>
        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <AppText variant="caption" color="textSecondary">
            Treino sem exercícios.
          </AppText>
        )}
      </AppView>
    );
  }

  const finalizarSerie = async () => {
    const resultado = registrarSerie();

    if (resultado.concluido) {
      const sessao = await salvarSessao();
      navigation.navigate('Resumo', { sessionId: sessao?.id, treinoId: treino.id });
      return;
    }

    navigation.navigate('Descanso', resultado.descanso);
  };

  return (
    <AppView style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.top}>
          <AppText variant="title2">{exercicio.nome}</AppText>
          <AppText variant="caption" color="textSecondary">
            Exercício {exIndex + 1} de {totalExercicios}
          </AppText>
        </View>

        <View style={styles.center}>
          <ProgressRing color={theme.colors.primary}>
            <AppText variant="caption" color="textSecondary">
              SÉRIE
            </AppText>
            <AppText variant="largeTitle">
              {serie} / {exercicio.series}
            </AppText>
          </ProgressRing>
          <SetDots total={exercicio.series} atual={serie} />
        </View>

        <View style={styles.bottom}>
          <AppText variant="caption" color="textMuted">
            Próximo exercício
          </AppText>
          <AppText variant="bodyBold">{proximoExercicioNome}</AppText>
          <Button label="Finalizar série" onPress={finalizarSerie} />
        </View>
      </SafeAreaView>
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
  safe: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  center: {
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  bottom: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  pressed: {
    opacity: 0.6,
  },
});
