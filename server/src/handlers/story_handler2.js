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

const doesStoryExists = (storyId, stories) => {
	return stories.some((story) => story.id === storyId);
};

const addStory = (id, { title, content, authorId, isPublished }, stories) => {
	const story = {
		id,
		authorId,
		title,
		content,
		claps: [],
		isPublished,
		comments: [],
	};

	stories.push(story);
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

	return { success: true, status: 200, comments: result };
};

export const getStory = (storyId, stories) => {
	const story = retrieveStoryById(storyId);
	if (!doesStoryExists(storyId, stories)) {
		return { success: false, status: 404 };
	}

	return { success: true, status: 200, story };
};

export const insertComment = (database, storyId, content, commented_by) => {
  const query =
    `INSERT INTO comments (story_id, content, commented_by) values (?, ?, ?)`;
  const insertStatement = database.prepare(query);
  return insertStatement.run(storyId, content, commented_by);
};

export const createComment = (storyId, content, commented_by) => {
  if (!content) return { success: false, status: 400 };
  const { lastInsertRowId } = insertComment(storyId, content, commented_by);
  return { success: true, status: 200, id: lastInsertRowId };
};
