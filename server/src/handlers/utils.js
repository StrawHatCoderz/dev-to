export const findUser = (users, userId, findLabel = 'id') => {
	return users.find((user) => user[findLabel] === userId);
};
