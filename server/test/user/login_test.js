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
				following: []
			},
		];
	});
	describe('tests for login handler method', () => {
		it("when user doesn't have account", () => {
			const session = []
			const response = loginHandler('notAnUser', mockUsers, session);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
			assertEquals(session.length, 0);
		});
		it('happy login', () => {
			const session = [{id : 1}];
			const response = loginHandler('deadpool', mockUsers, session);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
		});
	});
	describe.ignore('tests for get user id helper function', () => {
		it('user id is present in users', () => {
			const userId = getUserId('deadpool', mockUsers);
			assertEquals(userId, 1);
		});
		it("when user doesn't have account", () => {
			const userId = getUserId('imNotUser', mockUsers);
			assertEquals(userId, -1);
		});
	});
});
