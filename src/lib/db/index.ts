import "server-only";

import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { count } from "drizzle-orm";
import * as schema from "./schema";
import { seedDatabase } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  const db = drizzle(sqlite, { schema });

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      car_brand TEXT NOT NULL,
      problem TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT '2gis',
      review_date TEXT NOT NULL,
      is_visible INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin'
    );
  `);

  const [{ value: userCount }] = db
    .select({ value: count() })
    .from(schema.users)
    .all();

  if (userCount === 0) {
    seedDatabase(db);
  }

  return db;
}

declare global {
  // eslint-disable-next-line no-var
  var __rdAutoDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

export function getDb() {
  if (!global.__rdAutoDb) {
    global.__rdAutoDb = ensureDatabase();
  }
  return global.__rdAutoDb;
}
