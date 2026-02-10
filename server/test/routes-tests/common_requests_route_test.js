import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import { login } from '../../src/handlers/common_handlers.js';
import { commonRequestRouter } from '../../src/routes/common_requests_route.js';

describe('handle common requests', () => {
	let database;
	let userId;

	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
		userId = database
			.prepare("insert into user(username) values('deadpool') RETURNING id")
			.get().id;
	});

	it(' => should route to login', async () => {
		const requestInfo = { route: 'login', body: { username: 'deadpool' } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it(' => should route to logout', async () => {
		const { userId } = login(database, 'deadpool');
		const requestInfo = { route: 'logout', body: { id: userId } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it(' => should route to get stories', async () => {
		const requestInfo = { route: 'stories' };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status, stories } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
		assertEquals(stories, []);
	});

	it(' => should fail for invalid route', async () => {
		const requestInfo = {
			route: 'invalid',
			body: {},
			params: [],
		};

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, false);
		assertEquals(status, 404);
	});
});
