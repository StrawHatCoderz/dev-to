import {
	addClapQuery,
	addCommentQuery,
	addIntoPublishedStoriesQuery,
	addStoryQuery,
	deleteClapQuery,
	deleteStoryQuery,
	getClapStatusQuery,
	getCommentQuery,
} from '../db/queries.js';
import { findStory, findUser } from '../utils.js';

const isAlreadyClapped = (database, userId, storyId) => {
	const query = getClapStatusQuery();
	const statement = database.prepare(query);
	return statement.get(storyId, userId) !== undefined;
};

const unClapStory = (database, clappedBy, storyId) => {
	const query = deleteClapQuery();
	const statement = database.prepare(query);
	return statement.run(storyId, clappedBy);
};

const clapStory = (database, clappedBy, storyId) => {
	const query = addClapQuery();
	const statement = database.prepare(query);
	return statement.run(storyId, clappedBy);
};

const removeRecord = (database, storyId) => {
	const query = deleteStoryQuery();
	const statement = database.prepare(query);
	return statement.run(storyId);
};

const insertIntoStories = (database, story) => {
	const { title, content, authorId, isPublished } = story;
	const isStoryPublished = isPublished ? '1' : '0';

	const query = addStoryQuery();
	const statement = database.prepare(query);

	return statement.run(title, content, authorId, isStoryPublished);
};

const insertIntoPublished = (database, storyId) => {
	const query = addIntoPublishedStoriesQuery();
	const statement = database.prepare(query);
	return statement.run(storyId);
};

const isValidStoryContent = (title, content) =>
	title.trim().length !== 0 && content.trim().length !== 0;

const shouldPublish = (isPublished) => isPublished;

export const deleteStory = (database, storyId) => {
	const story = findStory(database, storyId);
	if (!story) {
		return { success: false, status: 400 };
	}

	removeRecord(database, storyId);

	return { success: true, status: 200 };
};

export const createStory = (database, story) => {
	const { title, content } = story;

	if (!isValidStoryContent(title, content)) {
		return { success: false, status: 400 };
	}

	const { lastInsertRowid } = insertIntoStories(database, story);
	console.log(story);
	if (shouldPublish(story.isPublished)) {
		insertIntoPublished(database, lastInsertRowid);
	}

	return { success: true, status: 200, storyId: lastInsertRowid };
};

export const toggleClap = (database, userId, storyId) => {
	const story = findStory(database, storyId);

	if (!story) {
		return { success: false, status: 404 };
	}

	const action = isAlreadyClapped(database, userId, storyId)
		? unClapStory
		: clapStory;
	action(database, userId, storyId);

	return { success: true, status: 200 };
};

export const addComment = (database, userId, storyId, content) => {
	if (!content) {
		return { success: false, status: 400 };
	}

	const story = findStory(database, storyId);
	const user = findUser(database, userId);

	if (!story || !user) {
		return { success: false, status: 400 };
	}

	const query = addCommentQuery();

	const statement = database.prepare(query);
	const result = statement.run(storyId, content, userId);

	return { success: true, status: 200, id: result.lastInsertRowid };
};

export const getComments = (database, storyId) => {
	const story = findStory(database, storyId);

	if (!story) {
		return { success: false, status: 400 };
	}

	const query = getCommentQuery();

	const statement = database.prepare(query);
	const result = statement.all(storyId);

	return { success: true, status: 200, comments: result };
};

export const getStory = (database, storyId) => {
	const story = findStory(database, storyId);

	if (!story) {
		return { success: false, status: 404 };
	}

	return { success: true, status: 200, story };
};
