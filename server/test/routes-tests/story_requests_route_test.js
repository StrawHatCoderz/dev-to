import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { DatabaseSync } from 'node:sqlite';
import { initDB } from '../../src/db/init.js';
import { commonRequestRouter } from '../../src/routes/common_requests_route.js';
import { storyRequestRouter } from '../../src/routes/story_requests_route.js';

describe('route story requests', () => {
	let database;
	let userId;

	beforeEach(() => {
		database = new DatabaseSync(':memory:');
		initDB(database);
		userId = database
			.prepare("insert into user(username) values('deadpool') RETURNING id")
			.get().id;
	});

	it(' => should route to create story route', async () => {
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
		const { success, status, storyId } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
		assertEquals(storyId, 1);
	});

	it(' => should route delete story route', async () => {
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
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it(' => should route get story route', async () => {
		const requestInfo = {
			route: 'story',
			body: {
				id: 1,
			},
			params: [1],
		};

		const createStoryRequest = {
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

		storyRequestRouter(createStoryRequest, database);
		const response = storyRequestRouter(requestInfo, database);
		const { success, status, story } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
		assertEquals(story.title, 'title 1');
	});

	it.ignore(' => should route comments route (get comments)', async () => {
		const requestInfo = {
			route: 'comments',
			body: {
				id: 1,
			},
			params: ['get', 1],
		};

		const createStoryRequest = {
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

		storyRequestRouter(createStoryRequest, database);
		const response = storyRequestRouter(requestInfo, database);
		const { success, status, comments } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
		assertEquals(comments.length, 0);
	});

	it.ignore(' => should route comments route (add comments)', async () => {
		const loginRequest = {
			route: 'login',
			body: {
				username: 'deadpool',
			},
		};

		const user = commonRequestRouter(loginRequest, database);
		const { userId } = await user.json();

		const createStoryRequest = {
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

		const story = storyRequestRouter(createStoryRequest, database);
		const { storyId } = await story.json();

		const addCommentRequest = {
			route: 'comments',
			body: {
				content: 'sample comment',
				userId,
				storyId,
			},
			params: ['add'],
		};

		const response = storyRequestRouter(addCommentRequest, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it.ignore(' => should route clap route', async () => {
		const loginRequest = {
			route: 'login',
			body: {
				username: 'deadpool',
			},
		};

		const user = commonRequestRouter(loginRequest, database);
		const { userId } = await user.json();

		const createStoryRequest = {
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

		const story = storyRequestRouter(createStoryRequest, database);
		const { storyId } = await story.json();

		const clapRequest = {
			route: 'clap',
			body: {
				userId,
				storyId,
			},
			params: [],
		};

		const response = storyRequestRouter(clapRequest, database);
		const { success, status } = await response.json();

		assertEquals(success, true);
		assertEquals(status, 200);
	});

	it(' => should fail for invalid route', async () => {
		const requestInfo = {
			route: 'invalid',
			body: {},
			params: [],
		};

		const response = storyRequestRouter(requestInfo, database);
		const { success, status } = await response.json();

		assertEquals(success, false);
		assertEquals(status, 404);
	});
});
