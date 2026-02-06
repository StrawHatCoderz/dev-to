import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { getUserFolllowers } from '../../src/user/followers.js';

describe('user followers tests', () => {
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

	it('should return error when user is not authorized', () => {
		const mockSession = {
			users: [],
		};

		const { status, sucuess } = getUserFolllowers(1, mockUsers, mockSession);
		assertEquals(status, 401);
		assertEquals(sucuess, false);
	});

	it('should return all followers for authorized user', () => {
		const mockSession = {
			users: [1],
		};

		const { followers, sucuess, status } = getUserFolllowers(
			1,
			mockUsers,
			mockSession,
		);
		assertEquals(sucuess, true);
		assertEquals(status, 200);
		assertEquals(followers, []);
	});
});
