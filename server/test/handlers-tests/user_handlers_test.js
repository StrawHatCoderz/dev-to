import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import { login } from '../../src/handlers/common_handlers.js';
import { follow } from '../../src/handlers/follow.js';
import { getUserFollowers } from '../../src/handlers/user_followers.js';

describe('User Handlers', () => {
	let database;
	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
	});

	describe('follow test cases', () => {
		it(' => should insert follower into follwers list', () => {
			// deadpool is following perter parker
			const { userId } = login(database, 'deadpool');
			const targetId = 2;

			const { success, status } = follow(database, targetId, userId);

			assertEquals(success, true);
			assertEquals(status, 200);
		});

		it(' => should fail when user follows his own account', () => {
			const { userId } = login(database, 'deadpool');
			const targetId = userId;

			const { success, status } = follow(database, targetId, userId);

			assertEquals(success, false);
			assertEquals(status, 401);
		});

		it(' => should fail when following invalid user', () => {
			const { userId } = login(database, 'deadpool');
			const targetId = 999;

			const { success, status } = follow(database, targetId, userId);

			assertEquals(success, false);
			assertEquals(status, 404);
		});
	});

	describe.ignore('un-follow test cases', () => {
		it(' => should fail when user is not following anyone', () => {
			const response = unfollow(mockUsers, 2, 1);
			assertEquals(response.success, false);
			assertEquals(response.status, 404);
		});

		it(' => should remove follower', () => {
			mockUsers = [
				{
					id: 1,
					name: 'deadpool',
					followers: [{ id: 1, userId: 1, followerId: 2 }],
					following: [],
				},
				{
					id: 2,
					name: 'Bkon',
					followers: [],
					following: [{ id: 1, userId: 2, followingId: 1 }],
				},
			];
			const response = unfollow(mockUsers, 2, 1);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(mockUsers, [
				{
					id: 1,
					name: 'deadpool',
					followers: [],
					following: [],
				},
				{
					id: 2,
					name: 'Bkon',
					followers: [],
					following: [],
				},
			]);
		});
	});

	describe('user followers tests', () => {
		it(' => should return error when user is not authorized', () => {
			const { success, status } = getUserFollowers(database, 1);

			assertEquals(success, false);
			assertEquals(status, 401);
		});

		it(' => should return all followers for authorized user', () => {
			const initiator = login(database, 'deadpool');
			const target = login(database, 'peter parker');

			// deadpool is following peter parker
			follow(database, target.userId, initiator.userId);
			// get all followers of peter parker
			const { followers, success, status } = getUserFollowers(
				database,
				target.userId,
			);

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(followers.length, 1);
		});
	});

	describe.ignore('users following test', () => {
		it(' => should return error if user is unauthorised', () => {
			const mockSession = {
				users: [],
			};

			const response = getUserFollowing(1, mockUsers, mockSession);
			assertEquals(response.success, false);
			assertEquals(response.status, 401);
		});

		it(' => should return all followings if authorised', () => {
			const mockSession = {
				users: [1],
			};

			const response = getUserFollowing(1, mockUsers, mockSession);
			assertEquals(response.success, true);
			assertEquals(response.status, 200);
			assertEquals(response.followers, []);
		});
	});

	describe.ignore('user stories tests', () => {
		let mockUsers;

		beforeEach(() => {
			mockUsers = [
				{
					id: 1,
					name: 'deadpool',
					followers: [],
					following: [],
					stories: [
						{
							id: 1,
							title: 'mock story',
							content: 'mock content',
						},
					],
				},
			];
		});

		it(' => should get all stories : ', () => {
			const mockSession = { users: [1] };

			const actual = getUserStories(1, mockSession, mockUsers);
			assertEquals(actual.stories.length, 1);
			assertEquals(actual.success, true);
			assertEquals(actual.status, 200);
		});

		it(' => should fail with unauthorized user', () => {
			const session = {
				users: [],
			};
			const actual = getUserStories(1, session, mockUsers);
			assertEquals(actual.success, false);
			assertEquals(actual.status, 401);
		});
	});
});
