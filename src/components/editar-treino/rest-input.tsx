import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Input, SectionHeader } from '@/components/ui';
import { REST_MAX_SECONDS, REST_MIN_SECONDS } from '@/constants/config';
import { theme } from '@/theme';

export type RestInputProps = {
  valor: number;
  onChange: (segundos: number) => void;
};

/** Campo numérico simples para o descanso, limitado a 30–300 segundos. */
export function RestInput({ valor, onChange }: RestInputProps) {
  const [texto, setTexto] = useState(String(valor));

  useEffect(() => {
    setTexto(String(valor));
  }, [valor]);

  const confirmar = () => {
    const numero = parseInt(texto, 10);
    const limpo = Number.isNaN(numero)
      ? valor
      : Math.min(REST_MAX_SECONDS, Math.max(REST_MIN_SECONDS, numero));
    setTexto(String(limpo));
    onChange(limpo);
  };

  return (
    <View style={styles.section}>
      <SectionHeader title="Descanso padrão" />
      <View style={styles.row}>
        <Input
          value={texto}
          onChangeText={(t) => setTexto(t.replace(/\D/g, ''))}
          onBlur={confirmar}
          keyboardType="number-pad"
          maxLength={3}
          style={styles.input}
        />
        <AppText variant="body" color="textSecondary">
          segundos
        </AppText>
      </View>
      <AppText variant="small" color="textMuted">
        Entre {REST_MIN_SECONDS} e {REST_MAX_SECONDS} segundos. Aplicado aos novos exercícios.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  input: {
    width: 96,
    textAlign: 'center',
  },
});
