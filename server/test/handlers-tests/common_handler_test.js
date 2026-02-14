import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import {
	getAllStories,
	login,
	logout,
} from '../../src/handlers/common_handlers.js';

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
			const { userId } = login(database, 'deadpool');
			logout(database, userId);
			const response = logout(database, userId);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should logout sucuessfully when user logged in ', () => {
			const { userId } = login(database, 'deadpool');
			const response = logout(database, userId);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
		});
	});

	describe('stories test cases', () => {
		it(' => should return all stories', () => {
			const response = getAllStories(database);

			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(response.stories.length, 0);
		});
	});
});
