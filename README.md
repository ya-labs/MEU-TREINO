# MEU-TREINO

PWA mobile-first para organizar treinos, controlar séries e gerenciar descansos durante a academia.

## App Expo (React Native)

O aplicativo Expo SDK 57 fica na **raiz do repositório** e requer Node.js 22.13 ou superior. Com nvm, use `nvm install` e `nvm use` para selecionar o Node 22 definido em `.nvmrc`. Execute os comandos nesta pasta:

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
