export const isIdExistInTheSession = (id, users) => {
  return users.includes(id);
};

export const retrieveStoriesById = (id, allStories) => {
  const stories = [];
  for (const story of allStories) {
    if (story.userId === id) stories.push(story);
  }

  return stories;
};

export const getStoriesHandler = (id, session, allStories) => {
  if (!isIdExistInTheSession(id, session.users)) {
    return { success: false, status: 401 };
  }

  const stories = retrieveStoriesById(id, allStories);
  return { success: true, stories, status: 200 };
};

/*

request contain the user id
check the id is present in session
if not send id not exist in the session
if it is there then send the stories as response

session : {
users : []}
*/

// users = { id , name }
// stories = []
// drafts = []
