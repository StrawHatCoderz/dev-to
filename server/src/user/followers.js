export const getUserFolllowers = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { sucuess: false, status: 401 };
	}

	const user = users.find((user) => user.id === userId);
	const followers = user.followers;

	return { sucuess: true, followers, status: 200 };
};
