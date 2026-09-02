// Creates any missing tables from db/schema.sql against the DB configured in
// .env.local. Safe to re-run — every statement is CREATE TABLE IF NOT EXISTS,
// so existing tables/data are left untouched.
// Usage: node scripts/run-schema.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const PROJECT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Minimal .env.local parser (KEY="VALUE" or KEY=VALUE, one per line, ignores comments/blank).
function parseEnv(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const envText = fs.readFileSync(path.join(PROJECT_DIR, ".env.local"), "utf8");
const env = parseEnv(envText);

const conn = await mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  multipleStatements: true,
});

console.log(`Connected to ${env.MYSQL_HOST}/${env.MYSQL_DATABASE} as ${env.MYSQL_USER}`);

const [beforeRows] = await conn.query("SHOW TABLES");
const beforeTables = beforeRows.map((r) => Object.values(r)[0]);
console.log("Tables BEFORE:", beforeTables);

const schemaSql = fs.readFileSync(path.join(PROJECT_DIR, "db", "schema.sql"), "utf8");
await conn.query(schemaSql);
console.log("Ran db/schema.sql (CREATE TABLE IF NOT EXISTS for each table).");

const [afterRows] = await conn.query("SHOW TABLES");
const afterTables = afterRows.map((r) => Object.values(r)[0]);
console.log("Tables AFTER:", afterTables);

const created = afterTables.filter((t) => !beforeTables.includes(t));
console.log("Newly created:", created.length ? created : "(none — all already existed)");

await conn.end();
