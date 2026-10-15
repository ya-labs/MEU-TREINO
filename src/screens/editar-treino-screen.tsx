import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/common';
import {
  AddExerciseSheet,
  ExerciseRow,
  RestInput,
  type NovoExercicio,
} from '@/components/editar-treino';
import { AppText, Button, IconButton, Input, SectionHeader } from '@/components/ui';
import { DEFAULT_REST_SECONDS } from '@/constants/config';
import { workoutRepository } from '@/database';
import { salvarTreino, useWorkout } from '@/hooks/use-workout';
import type { RootStackScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';
import type { Exercicio } from '@/types';

export default function EditarTreinoScreen({
  navigation,
  route,
}: RootStackScreenProps<'EditarTreino'>) {
  const treinoId = route.params?.treinoId;
  const { treino } = useWorkout(treinoId);

  const [nome, setNome] = useState('');
  const [foco, setFoco] = useState('');
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [descanso, setDescanso] = useState(DEFAULT_REST_SECONDS);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (treino) {
      setNome(treino.nome);
      setFoco(treino.foco);
      setExercicios(treino.exercicios);
    }
  }, [treino]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: treinoId ? 'Editar Treino' : 'Novo Treino',
      headerRight: treinoId
        ? () => (
            <IconButton
              icon="🗑️"
              background="surface"
              color="danger"
              onPress={async () => {
                await workoutRepository.remove(treinoId);
                navigation.goBack();
              }}
              accessibilityLabel="Excluir treino"
            />
          )
        : undefined,
    });
  }, [navigation, treinoId]);

  const adicionarExercicio = ({ nome: nomeEx, series }: NovoExercicio) => {
    setExercicios((atual) => [
      ...atual,
      {
        id: `novo-${Date.now()}`,
        nome: nomeEx,
        series,
        descansoSegundos: descanso,
      },
    ]);
    setSheetVisible(false);
  };

  const removerExercicio = (id: string) => {
    setExercicios((atual) => atual.filter((exercicio) => exercicio.id !== id));
  };

  const salvar = async () => {
    if (salvando) {
      return;
    }
    setSalvando(true);
    await salvarTreino({
      id: treinoId,
      dados: {
        nome: nome.trim() || 'Novo treino',
        foco: foco.trim(),
      },
      exercicios: exercicios.map(({ nome: n, series, descansoSegundos }) => ({
        nome: n,
        series,
        descansoSegundos,
      })),
    });
    navigation.goBack();
  };

  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <Input
        label="Nome do treino"
        placeholder="Ex.: Treino A"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="Descrição (opcional)"
        placeholder="Ex.: Peito e tríceps"
        value={foco}
        onChangeText={setFoco}
      />

      <View style={styles.section}>
        <SectionHeader
          title="Exercícios"
          actionLabel="+ Adicionar"
          onAction={() => setSheetVisible(true)}
        />
        {exercicios.length === 0 ? (
          <AppText variant="caption" color="textMuted">
            Nenhum exercício ainda. Toque em “Adicionar”.
          </AppText>
        ) : (
          <View style={styles.list}>
            {exercicios.map((exercicio) => (
              <ExerciseRow
                key={exercicio.id}
                exercicio={exercicio}
                onRemover={() => removerExercicio(exercicio.id)}
              />
            ))}
          </View>
        )}
      </View>

      <RestInput valor={descanso} onChange={setDescanso} />

      <Button label="Salvar alterações" onPress={salvar} disabled={salvando} />

      <AddExerciseSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onAdicionar={adicionarExercicio}
      />
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: theme.spacing.lg,
  },
  section: {
    gap: theme.spacing.md,
  },
  list: {
    gap: theme.spacing.sm,
  },
});
