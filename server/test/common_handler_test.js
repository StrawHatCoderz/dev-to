import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { login, logout } from '../src/handlers/common_handlers.js';

describe('common handlers', () => {
	let mockUsers;
	beforeEach(() => {
		mockUsers = [
			{
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
			},
		];
	});

	describe('login test cases', () => {
		it(" => should fail when user doesn't have account", () => {
			const session = [];
			const response = login('notAnUser', mockUsers, session);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
			assertEquals(session.length, 0);
		});

		it(' => should login sucuessfully', () => {
			const session = { users: [] };
			const response = login('deadpool', mockUsers, session);
			console.log(response);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
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
});
