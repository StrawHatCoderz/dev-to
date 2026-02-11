import {
	addUserToSession,
	fetchStories,
	findUser,
	isAuthorized,
	removeUserFromSession,
} from '../utils.js';

export const login = (database, username) => {
	const user = findUser(database, username, 'username');
	if (!user) {
		return { success: false, status: 401 };
	}

	if (isAuthorized(database, user.id)) {
		return { success: false, status: 401 };
	}

	addUserToSession(database, user.id);

	return { success: true, status: 200, userId: user.id };
};

export const logout = (database, id) => {
	const user = findUser(database, id);

	if (!isAuthorized(database, user.id)) {
		return { success: false, status: 401 };
	}

	removeUserFromSession(database, user.id);
	return { success: true, status: 200 };
};

export const getAllStories = (database) => {
	const stories = fetchStories(database);
	return { status: 200, success: true, stories };
};
