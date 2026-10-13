import mysql from 'mysql2/promise';

// One pool per server process. In `next dev` this module is re-evaluated on
// every hot reload (and once per server bundle), so a plain module-level
// createPool leaked a fresh 10-connection pool each time until MySQL hit
// max_connections ("ER_CON_COUNT_ERROR: Too many connections"). Caching it on
// globalThis makes every re-evaluation reuse the same pool.
function createPool() {
  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Close connections that sit idle, so an idle site holds few or none.
    maxIdle: 2,
    idleTimeout: 60000,
  });
}

const pool = globalThis.__gvvMysqlPool ?? createPool();
globalThis.__gvvMysqlPool = pool;

export default pool;
