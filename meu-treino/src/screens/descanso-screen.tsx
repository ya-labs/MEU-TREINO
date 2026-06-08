import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, AppView, Button, ProgressRing } from '@/components/ui';
import { useRestTimer } from '@/hooks/use-rest-timer';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import { formatSeconds } from '@/utils';

export default function DescansoScreen({ navigation, route }: RootStackScreenProps<'Descanso'>) {
  const {
    treinoNome = 'Treino',
    exercicioNome = 'Próximo exercício',
    serieAtual,
    totalSeries,
    duracaoSegundos = 40,
  } = route.params ?? {};

  const voltarParaTreino = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const restante = useRestTimer(duracaoSegundos, voltarParaTreino);

  return (
    <AppView style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.top}>
          <AppText variant="title2">Descanso</AppText>
          <AppText variant="caption" color="textSecondary">
            {treinoNome}
          </AppText>
        </View>

        <View style={styles.center}>
          <ProgressRing color={theme.colors.success} filled>
            <AppText variant="timer">{formatSeconds(restante)}</AppText>
            <AppText variant="caption" color="textSecondary">
              descansando
            </AppText>
          </ProgressRing>
        </View>

        <View style={styles.bottom}>
          <AppText variant="caption" color="textMuted">
            Próximo
          </AppText>
          <AppText variant="bodyBold">
            {exercicioNome}
            {serieAtual && totalSeries ? ` · Série ${serieAtual} de ${totalSeries}` : ''}
          </AppText>
          <Button label="Pular descanso" onPress={voltarParaTreino} />
        </View>
      </SafeAreaView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  },
  bottom: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});
