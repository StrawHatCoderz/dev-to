export const getUser = (users, userId) => {
	return users.find((user) => user.id === userId);
};
