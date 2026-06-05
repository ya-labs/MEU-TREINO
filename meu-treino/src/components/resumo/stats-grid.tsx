import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/components/ui';
import { theme } from '@/theme';
import type { ResumoSessao } from '@/types';

export type StatsGridProps = {
  resumo: ResumoSessao;
};

export function StatsGrid({ resumo }: StatsGridProps) {
  const itens = [
    { valor: resumo.tempo, rotulo: 'Tempo' },
    { valor: String(resumo.series), rotulo: 'Séries' },
    { valor: String(resumo.exercicios), rotulo: 'Exercícios' },
  ];

  return (
    <Card elevated style={styles.card}>
      {itens.map((item) => (
        <View key={item.rotulo} style={styles.item}>
          <AppText variant="title2">{item.valor}</AppText>
          <AppText variant="small" color="textSecondary">
            {item.rotulo}
          </AppText>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});
