const isIdExistInTheSession = (id, users) => {
  return users.includes(id);
};

export const getStoriesHandler = (id, session, users) => {
  if (!isIdExistInTheSession(id, session.users)) {
    return { error: true, errMsg: "id does not exist in the session" };
  }
  return { error : false}
};

/*

request contain the user id
check the id is present in session
if not send id not exist in the session
if it is there then send the stories as response

session : {
users : []}
*/
