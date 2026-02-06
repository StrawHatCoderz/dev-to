import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from 'jsr:@std/testing/bdd';
import { getUserId, loginHandler } from '../../src/user/login.js';
describe('tests for login functionality', () => {
	let mockUsers;
	beforeEach(() => {
		mockUsers = [
			{
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
				stories: {
					drafts: [],
					published: [],
				},
			},
		];
	});
	describe('tests for login handler method', () => {
		it("when doesn't have account", () => {
			const session = {
				users: [1],
			};
			const response = loginHandler('notAnUser', mockUsers, session);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});
		it('happy login', () => {
			const session = {
				users: [],
			};
			const response = loginHandler('deadpool', mockUsers, session);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
		});
	});
	describe('tests for get user id helper function', () => {
		it('user id is present in users', () => {
			const userId = getUserId('deadpool', mockUsers);
			assertEquals(userId, 1);
		});
		it("when user doesn't have accout", () => {
			const userId = getUserId('imNotUser', mockUsers);
			assertEquals(userId, -1);
		});
	});
});
