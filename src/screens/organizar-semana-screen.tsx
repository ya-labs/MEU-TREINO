import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/common';
import { DayScheduleRow, WorkoutPickerSheet } from '@/components/organizar-semana';
import { AppText, Button } from '@/components/ui';
import { DIAS_SEMANA } from '@/constants/config';
import { useWeeklySchedule } from '@/hooks/use-weekly-schedule';
import { useWorkouts } from '@/hooks/use-workouts';
import type { MainTabScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import type { DiaSemana } from '@/types';

export default function OrganizarSemanaScreen({ navigation }: MainTabScreenProps<'OrganizarSemana'>) {
  const { agenda, setDay } = useWeeklySchedule();
  const { workouts } = useWorkouts();
  const [diaEmEdicao, setDiaEmEdicao] = useState<DiaSemana | null>(null);

  const diaLabelAtual = DIAS_SEMANA.find((dia) => dia.key === diaEmEdicao)?.label;

  const treinoDoDia = (dia: DiaSemana) => {
    const treinoId = agenda?.[dia];
    if (!treinoId) return null;
    return workouts.find((treino) => treino.id === treinoId) ?? null;
  };

  const selecionarTreino = (treinoId: string | null) => {
    if (diaEmEdicao) {
      setDay(diaEmEdicao, treinoId);
    }
    setDiaEmEdicao(null);
  };

  return (
    <ScreenScroll>
      <View style={styles.header}>
        <AppText variant="largeTitle">Organizar semana</AppText>
        <AppText variant="body" color="textSecondary">
          Selecione o treino de cada dia
        </AppText>
      </View>

      <View style={styles.list}>
        {DIAS_SEMANA.map((dia) => (
          <DayScheduleRow
            key={dia.key}
            diaLabel={dia.label}
            treino={treinoDoDia(dia.key)}
            onPress={() => setDiaEmEdicao(dia.key)}
          />
        ))}
      </View>

      <Button label="Concluir organização" onPress={() => navigation.navigate('Home')} />

      <WorkoutPickerSheet
        visible={diaEmEdicao !== null}
        diaLabel={diaLabelAtual}
        treinos={workouts}
        onClose={() => setDiaEmEdicao(null)}
        onSelecionar={selecionarTreino}
      />
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.xs,
  },
  list: {
    gap: theme.spacing.sm,
  },
});
