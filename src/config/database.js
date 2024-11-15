import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();
const db = createClient({
  url: 'libsql://epic-yellowjacket-raulrangelxd.turso.io',
  authToken: process.env.DB_token,
});

export const createTables = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      username TEXT,
      password TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS groups(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      title TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) 
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS groupUsers(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId INTEGER,
      userId INTEGER,
      notified BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (groupId) REFERENCES groups(id)
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId INTEGER,
      title TEXT,
      description TEXT,
      status TEXT,
      FOREIGN KEY (groupId) REFERENCES groups(id) 
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS taskUsers(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskId INTEGER,
      userId INTEGER,
      notified BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (taskId) REFERENCES tasks(id) 
      );
    `);
  } catch (e) {
    console.log('error creating tables', e);
  }
};

export const deleteTables = async () => {
  try {
    await db.execute('DROP TABLE taskUsers;');
    await db.execute('DROP TABLE tasks;');
    await db.execute('DROP TABLE groupUsers;');
    await db.execute('DROP TABLE groups;');
  } catch (e) {
    console.log('error deleting tables', e);
  }
};

export default db;
