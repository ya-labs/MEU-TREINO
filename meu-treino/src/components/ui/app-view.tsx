import { View, type ViewProps } from 'react-native';

import { theme, type ColorToken } from '@/theme';

export type AppViewProps = ViewProps & {
  background?: ColorToken;
};

export function AppView({ background = 'background', style, ...rest }: AppViewProps) {
  return <View style={[{ backgroundColor: theme.colors[background] }, style]} {...rest} />;
}
