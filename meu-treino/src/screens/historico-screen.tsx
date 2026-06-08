import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/common';
import { WorkoutBadge } from '@/components/home';
import { AppText, Card } from '@/components/ui';
import { useSessions } from '@/hooks/use-sessions';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import { formatDiaRelativo, formatDuracaoMin } from '@/utils';

export default function HistoricoScreen(_props: RootStackScreenProps<'Historico'>) {
  const { sessions, loading, reload } = useSessions();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <ScreenScroll>
        <AppText variant="largeTitle">Histórico</AppText>
        <AppText variant="body" color="textSecondary">
          Você ainda não concluiu nenhum treino. Quando finalizar um, ele aparece aqui.
        </AppText>
      </ScreenScroll>
    );
  }

  return (
    <ScreenScroll>
      <AppText variant="largeTitle">Histórico</AppText>

      <View style={styles.list}>
        {sessions.map((sessao) => (
          <Card key={sessao.id} style={styles.item}>
            <WorkoutBadge label={sessao.treinoLabel} size="sm" />
            <View style={styles.meta}>
              <AppText variant="bodyBold">{sessao.treinoNome}</AppText>
              <AppText variant="small" color="textSecondary">
                {formatDiaRelativo(sessao.fimEm)} · {formatDuracaoMin(sessao.duracaoSegundos)}
              </AppText>
              <AppText variant="small" color="textMuted">
                {sessao.series} séries · {sessao.exercicios} exercícios
              </AppText>
            </View>
          </Card>
        ))}
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  list: {
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  meta: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
