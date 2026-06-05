import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { theme } from '@/theme';
import { getTreinoLabelColor } from '@/utils';
import type { TreinoLabel } from '@/types';

export type WorkoutBadgeProps = {
  label: TreinoLabel;
  size?: 'sm' | 'md';
};

export function WorkoutBadge({ label, size = 'md' }: WorkoutBadgeProps) {
  const colorKey = getTreinoLabelColor(label);
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        isSmall ? styles.sm : styles.md,
        { backgroundColor: theme.colors[colorKey] },
      ]}>
      <AppText variant={isSmall ? 'caption' : 'bodyBold'} color="textOnPrimary">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
  },
  md: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
  },
});
