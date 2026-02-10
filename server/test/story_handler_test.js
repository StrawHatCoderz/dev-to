import { assertEquals } from '@std/assert/equals';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../src/db/init.js';
import {
	addComment,
	createStory,
	deleteStory,
	getComments,
	getStory,
	toggleClap,
} from '../src/handlers/story_handler.js';

describe('story handlers', () => {
	let database;
	let userId;
	let storyId;
	let publishedStoryId;

	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);

		userId = database
			.prepare("insert into user(username) values('deadpool1') RETURNING id")
			.get().id;

		storyId = database
			.prepare(
				`
					INSERT INTO stories(title, content, author_id, is_published)
					VALUES('title 1', 'content 1', 1, true)
				`,
			)
			.run().lastInsertRowid;

		publishedStoryId = database
			.prepare(`INSERT INTO published_stories(story_id) VALUES(${storyId})`)
			.run().lastInsertRowid;
	});

	describe('clap test cases', () => {
		it(' => should clap on valid story', () => {
			const { status, success } = toggleClap(
				database,
				userId,
				publishedStoryId,
			);

			assertEquals(status, 200);
			assertEquals(success, true);
		});

		it(' => should unclap the valid story', () => {
			toggleClap(database, userId, publishedStoryId);
			const { status, success } = toggleClap(
				database,
				userId,
				publishedStoryId,
			);

			assertEquals(status, 200);
			assertEquals(success, true);
		});

		it(' => should handle clapping invalid story id', () => {
			const { status, success } = toggleClap(database, userId, 3);
			assertEquals(status, 404);
			assertEquals(success, false);
		});
	});

	describe('comments test cases', () => {
		it(' => addComment: should fail when comment content is not present', () => {
			const { success, status } = addComment(
				database,
				userId,
				publishedStoryId,
				'',
			);
			assertEquals(success, false);
			assertEquals(status, 400);
		});

		it(' => addComment: should add first comment successfully', () => {
			const {
				success,
				status,
				id: commentId,
			} = addComment(database, userId, publishedStoryId, 'comment 1');

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(commentId, 1);
		});

		it(' => addComment: should add second comment successfully', () => {
			addComment(database, userId, publishedStoryId, 'comment 1');

			const {
				success,
				status,
				id: commentId,
			} = addComment(database, userId, publishedStoryId, 'comment 2');

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(commentId, 2);
		});

		it(' => getComment: should fail when storyId not present', () => {
			const { success, status } = getComments(database, 2);

			assertEquals(success, false);
			assertEquals(status, 400);
		});

		it(' => getComment: should return comments of a story successfully', () => {
			addComment(database, userId, publishedStoryId, 'comment 1');

			const { success, status, comments } = getComments(
				database,
				publishedStoryId,
			);

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(comments.length, 1);
		});
	});

	describe('get story test cases', () => {
		it(' => should fail with invalid story id', () => {
			const { success, status } = getStory(database, 3);

			assertEquals(success, false);
			assertEquals(status, 404);
		});

		it(' => should return the story with valid id', () => {
			const { success, story, status } = getStory(database, publishedStoryId);

			assertEquals(success, true);
			assertEquals(status, 200);
			assertEquals(story.title, 'title 1');
		});
	});

	describe('create story tests ', () => {
		it(' => should return all story details', () => {
			const { success, status, storyId } = createStory(database, {
				title: 'title 2',
				content: 'sample content',
				authorId: userId,
			});

			assertEquals(status, 200);
			assertEquals(success, true);
			assertEquals(storyId, 2);
		});

		it(' => should return error if there is no title', () => {
			const { success, status } = createStory(database, {
				title: '',
				content: 'sample content',
				authorId: userId,
			});

			assertEquals(success, false);
			assertEquals(status, 400);
		});

		it(' => should not return error if there is content', () => {
			const { success, status } = createStory(database, {
				title: 'title 2',
				content: '',
				authorId: userId,
			});

			assertEquals(success, false);
			assertEquals(status, 400);
		});
	});

	describe('delete story', () => {
		it(' => should handle invalid storyId', () => {
			const { success, status } = deleteStory(database, 2);

			assertEquals(success, false);
			assertEquals(status, 400);
		});

		it(' => should delete a story', () => {
			const { success, status } = deleteStory(database, publishedStoryId);

			assertEquals(success, true);
			assertEquals(status, 200);
		});
	});
});
