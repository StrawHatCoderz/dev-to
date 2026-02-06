const isIdExistInTheSession = (id, session) => {
  return id in session;
}

export const getStoriesHandler = (id, session, users) => {
  if (isIdExistInTheSession(id, session)) {
    return { error: true, errMsg: "id does not exist in the session" };
  }
};

/*

request contain the user id
check the id is present in session
if not send id not exist in the session
if it is there then send the stories as response
*/
