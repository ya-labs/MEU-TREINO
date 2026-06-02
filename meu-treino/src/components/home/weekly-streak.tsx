import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import type { WeekDayStatus } from '@/mocks/home-mock';
import { theme } from '@/theme';

export type WeeklyStreakProps = {
  dias: WeekDayStatus[];
};

export function WeeklyStreak({ dias }: WeeklyStreakProps) {
  return (
    <View style={styles.section}>
      <AppText variant="title2">Sequência semanal</AppText>
      <View style={styles.row}>
        {dias.map((dia, index) => (
          <View key={`${dia.initial}-${index}`} style={styles.day}>
            <View
              style={[
                styles.circle,
                dia.isToday && styles.circleToday,
                dia.completed && styles.circleCompleted,
              ]}>
              {dia.completed ? (
                <AppText variant="caption" color="textOnPrimary">
                  ✓
                </AppText>
              ) : (
                <AppText variant="caption" color={dia.isToday ? 'primary' : 'textMuted'}>
                  {dia.initial}
                </AppText>
              )}
            </View>
          </View>
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
    justifyContent: 'space-between',
  },
  day: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  },
  circleToday: {
    borderColor: theme.colors.primary,
  },
  circleCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
});
