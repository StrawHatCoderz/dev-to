import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import { login } from '../../src/handlers/common_handlers.js';
import { createStory } from '../../src/handlers/story_handler.js';
import {
	follow,
	getUserFollowers,
	getUserFollowing,
	getUserStories,
	unfollow,
} from '../../src/handlers/user_handlers.js';

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

		it(' => should fail following user twice', () => {
			const { userId } = login(database, 'deadpool');
			const targetId = 999;

			follow(database, targetId, userId);
			const { success, status } = follow(database, targetId, userId);

			assertEquals(success, false);
			assertEquals(status, 404);
		});
	});

	describe('un-follow test cases', () => {
		it(' => should fail for invalid target', () => {
			const { userId } = login(database, 'deadpool');

			const { success, status } = unfollow(database, 2, userId);
			assertEquals(success, false);
			assertEquals(status, 401);
		});

		it(' => should remove follower', () => {
			const initiator = login(database, 'deadpool');
			const target = login(database, 'peter parker');

			follow(database, target.userId, initiator.userId);
			const response = unfollow(database, target.userId, initiator.userId);

			assertEquals(response.success, true);
			assertEquals(response.status, 200);
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

	describe('users following test', () => {
		it(' => should fail with unauthorized user', () => {
			const { success, status } = getUserFollowing(database, 1);

			assertEquals(success, false);
			assertEquals(status, 401);
		});

		it(' => should return list of user followings', () => {
			const initiator = login(database, 'deadpool');
			const target = login(database, 'peter parker');

			// deadpool is following peter parker
			follow(database, target.userId, initiator.userId);

			// get deadpool following list
			const { followings, success, status } = getUserFollowing(
				database,
				initiator.userId,
			);

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(followings.length, 1);
		});
	});

	describe('user stories tests', () => {
		it('=> success should fail when user is not authorized', () => {
			const { success, status } = getUserStories(database, 1);

			assertEquals(success, false);
			assertEquals(status, 401);
		});

		it(' => should return all published and drafts of user', () => {
			const { userId } = login(database, 'deadpool');

			const { success, status, stories, drafts } = getUserStories(
				database,
				userId,
			);

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(stories, []);
			assertEquals(drafts, []);
		});

		it(' => should return published stories after publishing a story', () => {
			const { userId } = login(database, 'deadpool');

			const story = {
				title: 'title 1',
				content: 'content 1',
				authorId: userId,
				isPublished: true,
			};
			createStory(database, story);

			const { success, status, stories, drafts } = getUserStories(
				database,
				userId,
			);

			const { title, content, author_id } = stories[0];
			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(title, 'title 1');
			assertEquals(content, 'content 1');
			assertEquals(author_id, userId);
			assertEquals(drafts, []);
		});

		it(' => should return drafts after creating a draft', () => {
			const { userId } = login(database, 'deadpool');
			const draft = {
				title: 'title 1',
				content: 'content 1',
				authorId: userId,
				isPublished: false,
			};

			createStory(database, draft);
			const { success, status, stories, drafts } = getUserStories(
				database,
				userId,
			);
			const { title, content, author_id } = drafts[0];

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(title, 'title 1');
			assertEquals(content, 'content 1');
			assertEquals(author_id, userId);
			assertEquals(stories, []);
		});

		it(' => should return both drafts and published after creating them', () => {
			const { userId } = login(database, 'deadpool');
			const draft = {
				title: 'title 1',
				content: 'content 1',
				authorId: userId,
				isPublished: false,
			};
			const story = {
				title: 'title 2',
				content: 'content 1',
				authorId: userId,
				isPublished: true,
			};

			createStory(database, draft);
			createStory(database, story);
			const { success, status, stories, drafts } = getUserStories(
				database,
				userId,
			);
			assertEquals(success, true);
			assertEquals(status, 200);

			assertEquals(stories[0].title, 'title 2');
			assertEquals(stories[0].content, 'content 1');
			assertEquals(stories[0].author_id, userId);

			assertEquals(drafts[0].title, 'title 1');
			assertEquals(drafts[0].content, 'content 1');
			assertEquals(drafts[0].author_id, userId);
		});
	});
});
