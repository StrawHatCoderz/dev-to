import { findUser } from './utils.js';

const isAuthorized = (userId, session) => {
	return session.users.includes(userId);
};

export const login = (username, users, currentSession) => {
	const user = findUser(users, username, 'username');

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

export const getEveryStory = (userId, currentSession, stories) => {
	if (!isAuthorized(userId, currentSession)) {
		return { success: false, status: 401 };
	}

	return { status: 200, success: true, stories };
};
