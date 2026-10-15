import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { theme } from '@/theme';

export type HomeHeaderProps = {
  frase: string;
};

export function HomeHeader({ frase }: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <AppText variant="largeTitle">Home</AppText>
        <AppText variant="subtitle" style={styles.greeting}>
          Olá, Bom Treino!
        </AppText>
        <AppText variant="body" color="textSecondary">
          {frase}
        </AppText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notificações"
        style={({ pressed }) => [styles.bell, pressed && styles.bellPressed]}>
        <AppText variant="body">🔔</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  greeting: {
    marginTop: theme.spacing.sm,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellPressed: {
    opacity: 0.7,
  },
});
