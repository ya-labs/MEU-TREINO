# MEU-TREINO

PWA mobile-first para organizar treinos, controlar séries e gerenciar descansos durante a academia.

## App Expo (React Native)

O aplicativo fica em **`meu-treino/`**. Sempre rode os comandos Expo a partir dessa pasta:

```bash
cd meu-treino
npm install
npx expo start -c
```

Na raiz do repositório você também pode usar:

```bash
npm start
```

(isso delega para `meu-treino` automaticamente)

**Não rode `npx expo start` na raiz** — isso fazia o Metro usar dependências erradas (SDK 56) e gerava erro de incompatibilidade com o Expo Go (SDK 54).
