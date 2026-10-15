import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppView } from '@/components/ui';
import { theme } from '@/theme';

export type ScreenScrollProps = ScrollViewProps & {
  children: React.ReactNode;
};

export function ScreenScroll({ children, contentContainerStyle, ...rest }: ScreenScrollProps) {
  return (
    <AppView style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          {...rest}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing['3xl'],
    gap: theme.spacing['2xl'],
  },
});
