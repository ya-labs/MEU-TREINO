import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button, Input, Stepper } from '@/components/ui';
import { theme } from '@/theme';

export type NovoExercicio = {
  nome: string;
  series: number;
};

export type AddExerciseSheetProps = {
  visible: boolean;
  onClose: () => void;
  onAdicionar: (exercicio: NovoExercicio) => void;
};

export function AddExerciseSheet({ visible, onClose, onAdicionar }: AddExerciseSheetProps) {
  const [nome, setNome] = useState('');
  const [series, setSeries] = useState(3);

  useEffect(() => {
    if (visible) {
      setNome('');
      setSeries(3);
    }
  }, [visible]);

  const podeAdicionar = nome.trim().length > 0;

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Novo exercício">
      <View style={styles.content}>
        <Input
          label="Nome do exercício"
          placeholder="Ex.: Supino inclinado"
          value={nome}
          onChangeText={setNome}
          autoFocus
        />

        <View style={styles.seriesRow}>
          <AppText variant="caption" color="textSecondary">
            Séries
          </AppText>
          <Stepper value={series} onChange={setSeries} min={1} max={10} />
        </View>

        <Button
          label="Adicionar"
          disabled={!podeAdicionar}
          onPress={() => onAdicionar({ nome: nome.trim(), series })}
        />
        <Button label="Cancelar" variant="outline" onPress={onClose} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  seriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
