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

	it('=> login should return success response when user have acc', async () => {
		const requestInfo = { route: 'login', body: { username: 'deadpool' } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it("=> login should return failure response when user doesn't have acc", async () => {
		const requestInfo = { route: 'login', body: { username: 'dskdl' } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, false);
		assertEquals(status, 401);
	});

	it('=> logout should return success response', async () => {
		const { userId } = login(database, 'deadpool');
		const requestInfo = { route: 'logout', body: { id: userId } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it('=> logout should return failure response', async () => {
		const requestInfo = { route: 'logout', body: { id: userId } };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, false);
		assertEquals(status, 401);
	});

	it('=> get every story ', async () => {
		const requestInfo = { route: 'stories' };

		const response = commonRequestRouter(requestInfo, database);
		const { success, status, stories } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
		assertEquals(stories, []);
	});
});
