import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import { storyRequestRouter } from '../../src/routes/story_requests_route.js';

describe('handle story requests', () => {
	let database;

	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
		database.exec(`INSERT INTO user(username) VALUES('deadpool')`);
	});
	it('=> should create story when story, title is there', () => {
		const requestInfo = {
			route: 'create',
			body: {
				storyToCreate: {
					title: 'title',
					content: 'content 1',
					authorId: 1,
					isPublished: false,
				},
			},
			params: [],
		};
		const response = storyRequestRouter(requestInfo, database);
		assertEquals(response.success, true);
		assertEquals(response.status, 200);
		assertEquals(response.storyId, 1);
	});
	it('=> should not create story when title is not there', () => {
		const requestInfo = {
			route: 'create',
			body: {
				storyToCreate: {
					title: '',
					content: 'content 1',
					authorId: 1,
					isPublished: false,
				},
			},
			params: [],
		};
		const response = storyRequestRouter(requestInfo, database);
		assertEquals(response.success, false);
		assertEquals(response.status, 400);
	});
	it('=> should delete the story when id is present', () => {
		const requestInfo = {
			route: 'delete',
			body: {
				id: 1,
			},
			params: [],
		};
		const requestToInsert = {
			route: 'create',
			body: {
				storyToCreate: {
					title: 'title 1',
					content: 'content 1',
					authorId: 1,
					isPublished: false,
				},
			},
			params: [],
		};
		storyRequestRouter(requestToInsert, database);
		const response = storyRequestRouter(requestInfo, database);
		assertEquals(response.success, true);
		assertEquals(response.status, 200);
	});
	it('=> should not delete the story when id is not present', () => {
		const requestInfo = {
			route: 'delete',
			body: {
				id: 5,
			},
			params: [],
		};

		const response = storyRequestRouter(requestInfo, database);
		assertEquals(response.success, false);
		assertEquals(response.status, 400);
	});
});
