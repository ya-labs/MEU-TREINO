import { StyleSheet, View } from 'react-native';

import { theme } from '@/theme';

export function Divider() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: theme.borderWidth.hairline,
    backgroundColor: theme.colors.border,
  },
});
