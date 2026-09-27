import * as mysql from 'mysql2/promise';

type MysqlState = {
  connection: mysql.Connection | null;
  pending: Promise<mysql.Connection> | null;
};

const globalState = globalThis as typeof globalThis & { __vendiproMysql?: MysqlState };

function state(): MysqlState {
  if (!globalState.__vendiproMysql) {
    globalState.__vendiproMysql = { connection: null, pending: null };
  }
  return globalState.__vendiproMysql;
}

function dbConfig(): mysql.ConnectionOptions {
  return {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'pos_db',
    connectTimeout: 8_000,
  };
}

/** Una sola conexión MySQL por proceso (también si el bundle evalúa el módulo dos veces). */
export async function getMysqlSingleton(): Promise<mysql.Connection> {
  const current = state();
  if (current.connection) return current.connection;
  if (!current.pending) {
    current.pending = mysql.createConnection(dbConfig()).then((connection) => {
      current.connection = connection;
      connection.on('error', () => {
        if (current.connection === connection) current.connection = null;
      });
      return connection;
    }).finally(() => {
      current.pending = null;
    });
  }
  return current.pending;
}

export async function releaseMysqlSingleton(): Promise<void> {
  const current = state();
  const connection = current.connection;
  current.connection = null;
  current.pending = null;
  if (!connection) return;
  try {
    await connection.end();
  } catch {
    // Ya estaba cerrada (wait_timeout de Hostinger).
  }
}
