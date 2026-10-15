import { getDb } from './client';
import { runMigrations } from './migrations';

export { getDb } from './client';
export * from './repositories';

let initPromise: Promise<void> | null = null;

/** Garante que o banco esteja aberto e migrado. Idempotente. */
export function initDatabase(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      const db = await getDb();
      await runMigrations(db);
    })();
  }
  return initPromise;
}
