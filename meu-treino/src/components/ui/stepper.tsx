import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { theme } from '@/theme';

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function Stepper({ value, onChange, min = 1, max = 20 }: StepperProps) {
  const decrementar = () => onChange(Math.max(min, value - 1));
  const incrementar = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.row}>
      <IconButton
        icon="−"
        background="surfaceMuted"
        onPress={decrementar}
        disabled={value <= min}
        accessibilityLabel="Diminuir"
      />
      <AppText variant="title2" style={styles.value}>
        {value}
      </AppText>
      <IconButton
        icon="+"
        background="surfaceMuted"
        onPress={incrementar}
        disabled={value >= max}
        accessibilityLabel="Aumentar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  value: {
    minWidth: 32,
    textAlign: 'center',
  },
});
