import { findUser, isAuthorized } from './utils.js';

export const login = (username, users, currentSession) => {
	const user = findUser(users, username, 'name');
	console.log(user)

	if (!user) {
		return { success: false, status: 401 };
	}

	if (isAuthorized(user.id, currentSession)) {
		return { success: false, status: 401 };
	}

	currentSession.users.push(user.id);
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
	console.log(userId, currentSession)
	
	if (!isAuthorized(userId, currentSession)) {
		return { success: false, status: 401 };
	}

	return { status: 200, success: true, stories };
};
