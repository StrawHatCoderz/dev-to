export const isIdExistInTheSession = (id, users) => {
  return users.includes(id);
};

export const retrieveUserDetails = (id, users) => {
  return users.find((user) => user.id === id);
};

export const getStoriesHandler = (id, session, users) => {
  if (!isIdExistInTheSession(id, session.users)) {
    return { success: false, status : 401 };
  }

  const user = retrieveUserDetails(id, users);
  return { success: true, user: user.stories , status : 200};
};

/*

request contain the user id
check the id is present in session
if not send id not exist in the session
if it is there then send the stories as response

session : {
users : []}
*/
