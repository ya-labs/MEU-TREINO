import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/components/ui';
import { theme } from '@/theme';

export type SummarySectionProps = {
  treinosConcluidos: number;
  seriesRealizadas: number;
  tempoTreinandoHoras: number;
};

type SummaryItem = {
  icon: string;
  valor: string;
  rotulo: string;
  accent: keyof typeof theme.colors;
};

export function SummarySection({
  treinosConcluidos,
  seriesRealizadas,
  tempoTreinandoHoras,
}: SummarySectionProps) {
  const itens: SummaryItem[] = [
    {
      icon: '🏋️',
      valor: String(treinosConcluidos),
      rotulo: 'Treinos concluídos',
      accent: 'primary',
    },
    {
      icon: '⚡',
      valor: String(seriesRealizadas),
      rotulo: 'Séries realizadas',
      accent: 'warning',
    },
    {
      icon: '⏱️',
      valor: `${tempoTreinandoHoras}h`,
      rotulo: 'Tempo treinando',
      accent: 'info',
    },
  ];

  return (
    <View style={styles.section}>
      <AppText variant="title2">Resumo</AppText>
      <View style={styles.grid}>
        {itens.map((item) => (
          <Card key={item.rotulo} style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: theme.colors.surfaceMuted }]}>
              <AppText variant="body">{item.icon}</AppText>
            </View>
            <AppText variant="title2" color={item.accent}>
              {item.valor}
            </AppText>
            <AppText variant="small" color="textSecondary" numberOfLines={2}>
              {item.rotulo}
            </AppText>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  card: {
    flex: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    minHeight: 120,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
