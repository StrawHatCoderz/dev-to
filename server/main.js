import { DatabaseSync } from 'node:sqlite';
import { initDB } from './src/db/init.js';
const database = new DatabaseSync('dev_to');

initDB(database);
