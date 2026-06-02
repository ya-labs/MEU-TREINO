import { StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, AppView } from '@/components/ui';
import { theme } from '@/theme';

export type ScreenContainerProps = {
  title: string;
  children?: React.ReactNode;
  contentStyle?: ViewStyle;
};

/** Layout simples para telas placeholder (ainda não implementadas). */
export function ScreenContainer({ title, children, contentStyle }: ScreenContainerProps) {
  return (
    <AppView style={styles.container}>
      <SafeAreaView style={[styles.content, contentStyle]} edges={['top', 'bottom']}>
        <AppText variant="title" style={styles.title}>
          {title}
        </AppText>
        {children}
      </SafeAreaView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing['2xl'],
  },
  title: {
    textAlign: 'center',
  },
});
