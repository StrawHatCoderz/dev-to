export const login = (username, users, session) => {
	const user = users.find((user) => username === user.name);

	if (!user) {
		return { success: false, status: 401 };
	}

	session.users.push(user.id);
	return { success: true, status: 200 };
};

export const logout = (userId, currentSession) => {
	const isUserAuthorized = currentSession.users.includes(userId);

	if (!isUserAuthorized) {
		return { success: false, status: 401 };
	}

	const indexOfUserId = currentSession.users.indexOf(userId);

	currentSession.users.splice(indexOfUserId, 1);
	return { success: true, status: 200 };
};

export const getEveryStory = (stories) => {
	return stories;
};
