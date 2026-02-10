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

export const addComment = (content, storyId, comments, userId) => {
	if (!content) {
		return { success: false, status: 400 };
	}

	const comment = {
		id: comments.length + 1,
		content,
		storyId,
		userId,
	};

	comments.push(comment);
	return { success: true, status: 200, id: comment.id };
};

export const getComments = (storyId, comments) => {
	const storyComments = comments.filter(
		({ storyId: currentStoryId }) => currentStoryId === storyId,
	);

	if (storyComments.length === 0) {
		return { success: false, status: 400, comments: storyComments };
	}

	return { success: true, status: 200, comments: storyComments };
};

export const getStory = (storyId, stories) => {
	const story = stories.find((story) => story.id === storyId);

	if (!doesStoryExists(storyId, stories)) {
		return { success: false, status: 404 };
	}

	return { success: true, status: 200, story };
};

export const createStory = (storyToCreate, stories) => {
	const { title, content } = storyToCreate;
	const isValidContent = ![content.trim().length, title.trim().length].includes(
		0,
	);

	if (!isValidContent) {
		return { success: false, status: 400 };
	}

	const id = stories.length + 1;
	addStory(id, storyToCreate, stories);

	return { success: true, status: 200 };
};

export const deleteStory = (storyId, stories) => {
	const storyIndex = stories.findIndex(
		({ storyId: currentStoryId }) => currentStoryId === storyId,
	);

	if (storyIndex === -1) {
		return { success: false, status: 400 };
	}

	stories.splice(storyIndex, 1);
	return { success: true, status: 200 };
};
