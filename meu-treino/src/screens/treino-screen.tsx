import { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SetDots } from '@/components/treino';
import { AppText, AppView, Button, ProgressRing } from '@/components/ui';
import { useWorkout } from '@/hooks/use-workout';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';

export default function TreinoScreen({ navigation, route }: RootStackScreenProps<'Treino'>) {
  const { treino, loading } = useWorkout(route.params?.treinoId);
  const [exIndex, setExIndex] = useState(0);
  const [serie, setSerie] = useState(1);

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

  if (loading || !treino || treino.exercicios.length === 0) {
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

  const exercicio = treino.exercicios[exIndex];
  const totalExercicios = treino.exercicios.length;
  const proximoExercicio = treino.exercicios[exIndex + 1]?.nome ?? 'Último exercício';

  const finalizarSerie = () => {
    const ehUltimaSerie = serie >= exercicio.series;
    const ehUltimoExercicio = exIndex >= totalExercicios - 1;

    if (ehUltimaSerie && ehUltimoExercicio) {
      navigation.navigate('Resumo', { treinoId: treino.id });
      return;
    }

    const proximoIndex = ehUltimaSerie ? exIndex + 1 : exIndex;
    const proximaSerie = ehUltimaSerie ? 1 : serie + 1;

    setExIndex(proximoIndex);
    setSerie(proximaSerie);

    navigation.navigate('Descanso', {
      treinoNome: treino.nome,
      exercicioNome: treino.exercicios[proximoIndex].nome,
      serieAtual: proximaSerie,
      totalSeries: treino.exercicios[proximoIndex].series,
      duracaoSegundos: exercicio.descansoSegundos,
    });
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
          <AppText variant="bodyBold">{proximoExercicio}</AppText>
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
