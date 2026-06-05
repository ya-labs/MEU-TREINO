import { Children, Fragment, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Card, Divider } from '@/components/ui';
import { theme } from '@/theme';

export type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const linhas = Children.toArray(children);

  return (
    <View style={styles.section}>
      <AppText variant="caption" color="textMuted" style={styles.title}>
        {title.toUpperCase()}
      </AppText>
      <Card>
        {linhas.map((linha, index) => (
          <Fragment key={index}>
            {index > 0 ? <Divider /> : null}
            {linha}
          </Fragment>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.sm,
  },
  title: {
    paddingHorizontal: theme.spacing.xs,
  },
});
