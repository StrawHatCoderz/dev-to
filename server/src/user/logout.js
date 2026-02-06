export const logout = (userId, currentSession) => {
  const isAuthorizedUser = currentSession.users.includes(userId);

  if (!isAuthorizedUser) {
    return { success: false, status: 401 };
  }
  const userIdIndex = currentSession.users.indexOf(userId);

  currentSession.users.splice(userIdIndex, 1);
  return { success: true, status: 200 };
};
