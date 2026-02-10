import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../src/db/init.js';
import { getAllStories, login } from '../src/handlers/common_handlers.js';

describe('common handlers', () => {
	let database;
	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
		database.exec("insert into user(username) values('deadpool')");
	});

	describe('login test cases', () => {
		it(" => should fail when user doesn't have account", () => {
			const response = login(database, 'invalid user');

			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should login sucuessfully', () => {
			const response = login(database, 'deadpool');

			assertEquals(response.success, true);
			assertEquals(response.status, 200);
		});

		it(' => should fail when trying to login in login session', () => {
			login(database, 'deadpool');

			const response = login(database, 'deadpool');

			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});
	});

	describe('logout test cases', () => {
		it(' => should fail when user is not in session', () => {
			const mockSession = {
				users: [],
			};

			const response = logout(1, mockSession);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should logout sucuessfully', () => {
			const mockSession = {
				users: [1],
			};

			const response = logout(1, mockSession);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(mockSession.users.length, 0);
		});
	});
	describe('logout test cases', () => {
		it(' => should fail when user is not in session', () => {
			const response = logout(database, 'deadpool');
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should logout sucuessfully when user logged in ', () => {
			login(database, 'deadpool');
			const response = logout(database, 'deadpool');
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
		});
	});

	describe('stories test cases', () => {
		it(' => should fail with unauthorized user', () => {
			const response = getAllStories(database, 100);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should return all stories', () => {
			login(database, 'deadpool');

			const response = getAllStories(database, 1);
			console.log(response);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(response.stories.length, 0);
		});
	});
});
