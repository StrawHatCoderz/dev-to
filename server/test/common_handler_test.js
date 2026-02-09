import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import {
	getAllStories,
	login,
	logout,
} from '../src/handlers/common_handlers.js';

describe('common handlers', () => {
	let mockUsers;
	beforeEach(() => {
		mockUsers = [
			{
				id: 1,
				username: 'deadpool',
				followers: [],
				following: [],
			},
		];
	});

	describe('login test cases', () => {
		it(" => should fail when user doesn't have account", () => {
			const session = { users: [] };

			const response = login('invalid user', mockUsers, session);

			assertEquals(response.success, false);
			assertEquals(response.status, 401);
			assertEquals(session.users.length, 0);
		});

		it(' => should login sucuessfully', () => {
			const session = { users: [] };

			const response = login('deadpool', mockUsers, session);

			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(session.users.length, 1);
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

	describe('stories test cases', () => {
		it(' => should fail with unauthorized user', () => {
			const mockSession = {
				users: [],
			};
			const mockStories = [{ id: 1, title: 'title' }];

			const response = getAllStories(1, mockSession, mockStories);

			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should return all stories', () => {
			const mockSession = {
				users: [1],
			};
			const mockStories = [{ id: 1, title: 'title' }];

			const response = getAllStories(1, mockSession, mockStories);

			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(response.stories.length, 1);
		});
	});
});
