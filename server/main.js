import { DatabaseSync } from 'node:sqlite';
import { initDB } from './src/db/init.js';
import { requestHandler } from './src/request_handler.js';
const database = new DatabaseSync('dev_to.db');

const createRequestHandler = (database) => requestHandler(request, database);

export const main = () => {
	initDB(database);
	Deno.serve(createRequestHandler(database));
};

main();
