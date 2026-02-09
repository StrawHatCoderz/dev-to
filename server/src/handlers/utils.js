export const findUser = (users, userId) => {
	return users.find((user) => user.id === userId);
};
