import { useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { WorkoutBadge } from '@/components/home';
import { StatsGrid } from '@/components/resumo';
import { AppText, AppView, Button, Card } from '@/components/ui';
import { useSessao } from '@/hooks/use-workout-session';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import type { ResumoSessao, TreinoLabel } from '@/types';
import { formatSeconds } from '@/utils';

function formatarConclusao(epochMs: number): string {
  const hora = new Date(epochMs).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `Hoje • ${hora}`;
}

export default function ResumoScreen({ navigation, route }: RootStackScreenProps<'Resumo'>) {
  const { sessao, loading } = useSessao(route.params?.sessionId);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading) {
    return (
      <AppView style={[styles.root, styles.centered]}>
        <ActivityIndicator color={theme.colors.primary} />
      </AppView>
    );
  }

  const label: TreinoLabel = sessao?.treinoLabel ?? 'A';
  const resumo: ResumoSessao = {
    treinoNome: sessao?.treinoNome ?? 'Treino',
    data: sessao ? formatarConclusao(sessao.fimEm) : 'Concluído agora',
    tempo: formatSeconds(sessao?.duracaoSegundos ?? 0),
    series: sessao?.series ?? 0,
    exercicios: sessao?.exercicios ?? 0,
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
          <WorkoutBadge label={label} size="sm" />
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
