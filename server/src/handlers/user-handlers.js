export const getUserFollowers = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = users.find((user) => user.id === userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUsersFollowing = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = users.find((user) => user.id === userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUserStories = (id, session, users) => {
	const isAuthorizedUser = session.users.includes(id);
	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = users.find((user) => user.id === id);

	return { success: true, user: user.stories, status: 200 };
};
