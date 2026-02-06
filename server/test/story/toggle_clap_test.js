import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { toggleClapHandler } from '../../src/story/toggle_rename.js';

describe('clap tests', () => {
	let mockStories;
	beforeEach(() => {
		mockStories = [
			{
				id: 1,
				title: 'story 1',
				content: 'mock content',
				claps: [],
				comments: [],
			},
		];
	});

	it(' => should clap on valid story', () => {
		const mockStory = mockStories[0];
		const { status, success } = toggleClapHandler(1, mockStory.id, mockStories);

		assertEquals(mockStory.claps.length, 1);
		assertEquals(status, 200);
		assertEquals(success, true);
	});

	it(' => should unclap the valid story', () => {
		const mockStory = mockStories[0];
		toggleClapHandler(1, mockStory.id, mockStories);
		const { status, success } = toggleClapHandler(1, mockStory.id, mockStories);

		assertEquals(mockStory.claps.length, 0);
		assertEquals(status, 200);
		assertEquals(success, true);
	});

	it(' => should handle clapping invalid story id', () => {
		const { status, success } = toggleClapHandler(1, 2, mockStories);

		assertEquals(status, 404);
		assertEquals(success, false);
	});
});
