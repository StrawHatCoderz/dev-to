import {
	addUserToSessionQuery,
	findStoryQuery,
	findUserQuery,
	getStoriesQuery,
	isAuthorizedQuery,
} from '../db/queries.js';

export const findUser = (database, target, findByColumn = 'id') => {
	const query = findUserQuery(findByColumn);
	const statement = database.prepare(query);
	return statement.get(findByColumn, target);
};

export const addUserToSession = (database, userId) => {
	const query = addUserToSessionQuery();
	const statement = database.prepare(query);
	return statement.run(userId);
};

export const isAuthorized = (database, userId) => {
	const query = isAuthorizedQuery();
	const statement = database.prepare(query);
	return statement.get(userId) !== undefined;
};

export const retrieveStories = (database) => {
	const query = getStoriesQuery();
	const statement = database.prepare(query);
	return statement.all();
};

export const removeUserFromSession = (database, userId) => {
	const query = removeUserFromSessionQuery();
	const statement = database.prepare(query);
	return statement.run(userId);
};

export const findStory = (database, storyId) => {
	const query = findStoryQuery();
	const statement = database.prepare(query);

	return statement.get(storyId);
};
