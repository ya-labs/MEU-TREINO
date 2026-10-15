import * as SQLite from 'expo-sqlite';

import { DB_NAME } from '@/constants/config';

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Abre (uma única vez) e retorna a conexão com o banco SQLite.
 * O acesso ao banco deve passar sempre por aqui; nenhuma tela abre conexão.
 */
export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  dbInstance = db;
  return db;
}
