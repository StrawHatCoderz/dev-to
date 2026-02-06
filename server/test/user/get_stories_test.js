import { assertEquals } from '@std/assert';
import { describe, it } from 'jsr:@std/testing/bdd';
import {
	getStoriesHandler,
	isIdExistInTheSession,
	retrieveUserDetails,
} from '../../src/user/stories.js';

describe('testing the get stories functionality : ', () => {
	describe('validation : ', () => {
		it('providing an id which does not exist in the session', () => {
			const actual = isIdExistInTheSession(1, [2, 3]);
			const expected = false;
			assertEquals(actual, expected);
		});

		it('providing an id which is present in the session : ', () => {
			const actual = isIdExistInTheSession(1, [1]);
			const expected = true;
			assertEquals(actual, expected);
		});
	});

	describe('testing the retrieve user functionality : ', () => {
		it('retrieving the user where id is 1', () => {
			const users = [
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
			const expected = {
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
				stories: {
					drafts: [],
					published: [],
				},
			};
			const actual = retrieveUserDetails(1, users);
			assertEquals(actual, expected);
		});
	});

	describe('get handler functions : ', () => {
		it('providing an user id , where user does not exist in the session: ', () => {
			const actual = getStoriesHandler(2, { users: [1] }, []);
			const expected = false;
			assertEquals(actual.success, expected);
			assertEquals(actual.status, 401);
		});

		it('providing an id which exist in the session  , retrieving the user details : ', () => {
			const users = [
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
			const actual = getStoriesHandler(1, { users: [1] }, users);
			assertEquals(actual.success, true);
			assertEquals(actual.status, 200);
			assertEquals(actual.user, { drafts: [], published: [] });
		});
	});
});
