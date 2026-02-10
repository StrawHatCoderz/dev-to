import {
	addUserToSession,
	findUser,
	isAuthorized,
	removeUserFromSession,
	retrieveStories,
} from './utils.js';

export const login = (database, username) => {
	const user = findUser(database, username, 'username');
	if (!user) {
		return { success: false, status: 401 };
	}

	if (isAuthorized(database, user.id)) {
		return { success: false, status: 401 };
	}

	addUserToSession(database, user.id);

	return { success: true, status: 200 };
};

export const getAllStories = (database, userId) => {
	if (!isAuthorized(database, userId)) {
		return { success: false, status: 401 };
	}

	const stories = retrieveStories(database);
	return { status: 200, success: true, stories };
};

export const logout = (database, username) => {
	const user = findUser(database, username, 'username');

	if (!isAuthorized(database, user.id)) {
		return { success: false, status: 401 };
	}
	removeUserFromSession(database, user.id);
	return { success: true, status: 200 };
};
