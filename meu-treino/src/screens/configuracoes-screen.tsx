import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/common';
import { SettingsRow, SettingsSection } from '@/components/configuracoes';
import { AppText, Card } from '@/components/ui';
import { perfilMock } from '@/mocks';
import type { MainTabScreenProps } from '@/navigation/navigation-types';
import { theme } from '@/theme';

export default function ConfiguracoesScreen(_props: MainTabScreenProps<'Configuracoes'>) {
  const [notificacoes, setNotificacoes] = useState(true);
  const [somDescanso, setSomDescanso] = useState(true);
  const iniciais = perfilMock.nome.charAt(0).toUpperCase();

  return (
    <ScreenScroll>
      <AppText variant="largeTitle">Configurações</AppText>

      <Card style={styles.perfil}>
        <View style={styles.avatar}>
          <AppText variant="title2" color="textOnPrimary">
            {iniciais}
          </AppText>
        </View>
        <View style={styles.perfilInfo}>
          <AppText variant="bodyBold">{perfilMock.nome}</AppText>
          <AppText variant="small" color="textSecondary">
            {perfilMock.email}
          </AppText>
        </View>
      </Card>

      <SettingsSection title="Preferências">
        <SettingsRow icon="🌙" label="Tema escuro" type="link" value="Sempre" />
        <SettingsRow
          icon="🔔"
          label="Notificações"
          type="toggle"
          value={notificacoes}
          onValueChange={setNotificacoes}
        />
        <SettingsRow icon="⚖️" label="Unidade de peso" type="link" value="kg" />
      </SettingsSection>

      <SettingsSection title="Treino">
        <SettingsRow icon="⏱️" label="Descanso padrão" type="link" value="40s" />
        <SettingsRow
          icon="🔊"
          label="Som ao finalizar descanso"
          type="toggle"
          value={somDescanso}
          onValueChange={setSomDescanso}
        />
      </SettingsSection>

      <SettingsSection title="Sobre">
        <SettingsRow icon="ℹ️" label="Versão" type="link" value="1.0.0" />
        <SettingsRow icon="📄" label="Termos de uso" type="link" />
      </SettingsSection>

      <SettingsSection title="Conta">
        <SettingsRow icon="🚪" label="Sair" type="link" />
      </SettingsSection>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perfilInfo: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
});
