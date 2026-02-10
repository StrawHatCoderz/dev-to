export const findUser = (users, target, findByLabel = 'id') => {
	return users.find((user) => user[findByLabel] === target);
};

export const findUserInDB = (database, target, findByColumn = 'id') => {
	const query = `SELECT id, username FROM user WHERE ? = ?`;
	const statement = database.prepare(query);

	return statement.get(findByColumn, target);
};

export const addUserToSession = (database, userId) => {
	const query = `INSERT INTO session(user_id) VALUES(?)`;
	const statement = database.prepare(query);
	return statement.run(userId);
};

export const isAuthorizedInDB = (database, userId) => {
	const query = `SELECT 1 FROM session WHERE user_id = ? LIMIT 1`;
	const statement = database.prepare(query);
	return statement.get(userId) !== undefined;
};

export const retrieveStories = (database) => {
	const query = `SELECT * FROM stories`;
	const statement = database.prepare(query);
	return statement.all();
};

export const removeUserFromSession = (database, userId) => {
	const query = `DELETE FROM session WHERE user_id = ?`;
	const statement = database.prepare(query);
	return statement.run(userId);
};

export const isAuthorized = (userId, session) => {
	return session.users.includes(userId);
};

export const findStory = (database, storyId) => {
	const query = `
		SELECT story_id, title, content, author_id, is_published, created_on, updated_on
		FROM stories
		WHERE story_id = ?
	`;
	const statement = database.prepare(query);
	
	return statement.all(storyId);
};
