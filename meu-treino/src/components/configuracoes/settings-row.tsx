import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/ui';
import { theme } from '@/theme';

type BaseProps = {
  icon?: string;
  label: string;
};

type ToggleProps = BaseProps & {
  type: 'toggle';
  value: boolean;
  onValueChange: (value: boolean) => void;
};

type LinkProps = BaseProps & {
  type?: 'link';
  value?: string;
  onPress?: () => void;
};

export type SettingsRowProps = ToggleProps | LinkProps;

export function SettingsRow(props: SettingsRowProps) {
  const conteudo = (
    <View style={styles.row}>
      {props.icon ? <AppText variant="body">{props.icon}</AppText> : null}
      <AppText variant="body" style={styles.label}>
        {props.label}
      </AppText>
      {props.type === 'toggle' ? (
        <Switch
          value={props.value}
          onValueChange={props.onValueChange}
          trackColor={{ true: theme.colors.primary, false: theme.colors.surfaceMuted }}
          thumbColor={theme.colors.text}
        />
      ) : (
        <View style={styles.right}>
          {props.value ? (
            <AppText variant="caption" color="textSecondary">
              {props.value}
            </AppText>
          ) : null}
          <AppText variant="caption" color="textMuted">
            ›
          </AppText>
        </View>
      )}
    </View>
  );

  if (props.type === 'toggle') {
    return conteudo;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={props.onPress}
      style={({ pressed }) => pressed && styles.pressed}>
      {conteudo}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  label: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  pressed: {
    opacity: 0.6,
  },
});
