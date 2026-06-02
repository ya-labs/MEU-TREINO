import { StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export type ScreenContainerProps = {
  title: string;
  children?: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function ScreenContainer({ title, children, contentStyle }: ScreenContainerProps) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={[styles.content, contentStyle]} edges={['top', 'bottom']}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        {children}
      </SafeAreaView>
    </ThemedView>
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
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
});
