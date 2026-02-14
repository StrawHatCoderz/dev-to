import { DatabaseSync } from 'node:sqlite';
import { requestHandler } from './src/handlers/request_handler.js';

const createRequestHandler = () => {
	const database = new DatabaseSync('dev_to.db');
	return (request) => requestHandler(request, database);
};

export const main = () => {
	Deno.serve(createRequestHandler());
};

main();
