import { StyleSheet, View } from 'react-native';

import { Chip, SectionHeader } from '@/components/ui';
import { DEFAULT_REST_OPTIONS } from '@/constants/config';
import { theme } from '@/theme';

export type RestChipsProps = {
  valor: number;
  onChange: (segundos: number) => void;
};

export function RestChips({ valor, onChange }: RestChipsProps) {
  return (
    <View style={styles.section}>
      <SectionHeader title="Descanso padrão" />
      <View style={styles.row}>
        {DEFAULT_REST_OPTIONS.map((segundos) => (
          <Chip
            key={segundos}
            label={`${segundos}s`}
            selected={valor === segundos}
            onPress={() => onChange(segundos)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
