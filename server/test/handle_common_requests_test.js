import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../src/db/init.js';
import { session } from '../src/mock/current-session.js';
import { handleCommonRequests } from '../src/routes/handle_common_requests.js';

describe('handle common requests', () => {
	let database;	

	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
		database.exec(`INSERT INTO user(username) VALUES('deadpool')`);
	});

	it('=> login should return success response when user have acc', () => {
		const requestInfo = { route: 'login', body: { username: 'deadpool' } };

		const response = handleCommonRequests(requestInfo, database);

		assertEquals(response.success, true);
		assertEquals(response.status, 200);
	});

	it("=> login should return failure response when user doesn't have acc", () => {
		const requestInfo = { route: 'login', body: { username: 'dskdl' } };

		const response = handleCommonRequests(requestInfo, database);

		assertEquals(response.success, false);
		assertEquals(response.status, 401);
	});

	it('=> logout should return success response', () => {
		const requestInfo = { route: 'logout', body: { id: 1 } };
		const response = handleCommonRequests(requestInfo);
		assertEquals(response.success, true);
		assertEquals(response.status, 200);
		assertEquals(session.users, []);
	});

	it('=> logout should return failure response', () => {
		const requestInfo = { route: 'logout', body: 2 };
		const response = handleCommonRequests(requestInfo);
		assertEquals(response.success, false);
		assertEquals(response.status, 401);
		assertEquals(session.users, []);
	});

	it('=> get every story ', () => {
		const requestInfo = { route: 'stories' };
		const response = handleCommonRequests(requestInfo);
		assertEquals(response.success, true);
		assertEquals(response.stories, [
			{
				id: 1,
				authorId: 1,
				title: 'abc',
				content: 'abc',
				isPublished: true,
				claps: [],
				comments: [],
			},
		]);
	});
});
