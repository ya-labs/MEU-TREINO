# MEU-TREINO

PWA mobile-first para organizar treinos, controlar séries e gerenciar descansos durante a academia.

## App Expo (React Native)

O aplicativo Expo SDK 54 fica na **raiz do repositório**. Execute os comandos nesta pasta:

```bash
npm ci
npm start -- --clear
```

Para abrir uma plataforma específica:

```bash
npm run android
npm run ios
npm run web
```

`npm run ios` abre o simulador iOS e exige macOS/Xcode. Para testar no celular físico, inicie com `npm start` e abra o QR code no Expo Go.

Após instalar as dependências, `npx expo start -c` também pode ser executado diretamente na raiz: o `package.json` agora contém as dependências do app e os scripts Expo, sem delegação para uma subpasta.
