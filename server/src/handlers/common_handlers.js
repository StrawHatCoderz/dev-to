import {
	addUserToSession,
	findUserInDB,
	isAuthorized,
	isAuthorizedInDB,
} from './utils.js';

export const login = (database, username) => {
	const user = findUserInDB(database, username, 'username');
	if (!user) {
		return { success: false, status: 401 };
	}

	if (isAuthorizedInDB(database, user.id)) {
		return { success: false, status: 401 };
	}

	addUserToSession(database, user.id);

	return { success: true, status: 200 };
};

export const logout = (userId, currentSession) => {
	if (!isAuthorized(userId, currentSession)) {
		return { success: false, status: 401 };
	}

	const indexOfUserId = currentSession.users.indexOf(userId);

	currentSession.users.splice(indexOfUserId, 1);
	return { success: true, status: 200 };
};

export const getAllStories = (userId, currentSession, stories) => {
	if (!isAuthorized(userId, currentSession)) {
		return { success: false, status: 401 };
	}

	return { status: 200, success: true, stories };
};
