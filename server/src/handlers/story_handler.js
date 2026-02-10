import { findStory } from './utils.js';

const isAlreadyClapped = (database, userId, storyId) => {
	const query = `
		SELECT 1
		FROM claps
		WHERE story_id = ? AND clapped_by = ?
		LIMIT 1
	`;
	const statement = database.prepare(query);
	return statement.get(storyId, userId) !== undefined;
};

const unClapStory = (database, clappedBy, storyId) => {
	const query = `
		DELETE FROM claps
		WHERE story_id = ? AND clapped_by = ?
	`;
	const statement = database.prepare(query);
	return statement.run(storyId, clappedBy);
};

const clapStory = (database, clappedBy, storyId) => {
	const query = `
		INSERT INTO claps(story_id, clapped_by)
		VALUES (?, ?)
	`;
	const statement = database.prepare(query);
	return statement.run(storyId, clappedBy);
};

const removeStory = (database, storyId) => {
	const query = `DELETE FROM stories where story_id = ?`;
	const statement = database.prepare(query);
	return statement.run(storyId);
};

const insertStory = (database, storyToCreate) => {
	const { title, content, authorId } = storyToCreate;
	const query = `INSERT INTO stories(title, content, author_id) VALUES (?,?,?)`;
	const statement = database.prepare(query);
	return statement.run(title, content, authorId);
};

export const deleteStory = (database, storyId) => {
	const story = findStory(database, storyId);
	if (story.length < 1) {
		return { success: false, status: 400 };
	}

	removeStory(database, storyId);

	return { success: true, status: 200 };
};

export const createStory = (database, storyToCreate) => {
	const { title, content } = storyToCreate;
	const isValidContent = ![content.trim().length, title.trim().length].includes(
		0,
	);

	if (!isValidContent) {
		return { success: false, status: 400 };
	}

	const { lastInsertRowid } = insertStory(database, storyToCreate);

	return { success: true, status: 200, storyId: lastInsertRowid };
};

export const toggleClap = (database, userId, storyId) => {
	const story = findStory(database, storyId);

	if (story.length === 0) {
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

	if (!story) {
		return { success: false, status: 400 };
	}

	const query = `
		INSERT INTO comments(story_id, content, commented_by)
		VALUES(?, ?, ?)
	`;
	const statement = database.prepare(query);
	const result = statement.run(storyId, content, userId);
	return { success: true, status: 200, id: result.lastInsertRowid };
};

export const getComments = (database, storyId) => {
	const story = findStory(database, storyId);

	if (!story) {
		return { success: false, status: 400 };
	}

	const query = `
		SELECT story_id,content,commented_by,commented_on
		FROM comments
		WHERE story_id = ?
	`;
	const statement = database.prepare(query);
	const result = statement.all(storyId);

	if (storyComments.length === 0) {
		return { success: false, status: 400, comments: storyComments };
	}

	return { success: true, status: 200, comments: storyComments };
};

export const retrieveStoryById = (database, id) => {
	const query = `SELECT * FROM stories WHERE story_id = ?`;
	const statement = database.prepare(query);
	return statement.get(id);
};

export const getStory = (storyId) => {
	const story = retrieveStoryById(storyId);
	if (story === undefined) {
		return { success: false, status: 404 };
	}

	return { success: true, status: 200, story };
};
