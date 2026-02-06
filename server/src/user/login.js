export const getUserId = (username, users) => {
  const user = users.find((user) => username === user.name);
  if (user) {
    return user.id;
  }
  return -1;
};

export const loginHandler = (username, users, session) => {
  const userId = getUserId(username, users);
  const doesUserHaveAccount = userId !== -1;
  if (!doesUserHaveAccount) {
    return { success: false, status: 401 };
  }
  session.users.push(userId);
  return { success: true, status: 200 };
};
