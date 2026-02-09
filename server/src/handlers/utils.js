export const findUser = (users, userId, findLabel = 'id') => {
	return users.find((user) => user[findLabel] === userId);
};

export const isAuthorized = (userId, session) => {
	return session.users.includes(userId);
};
