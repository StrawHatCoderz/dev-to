import { isAuthorized} from "../utils.js";

export const getStories = (database, userId) => {
  const query = `SELECT * FROM stories WHERE is_published = 1 AND author_id = (?)`;
  const statement = database.prepare(query);
  return statement.all(userId);
}

export const getDrafts = (database, userId) => {
  const query = `SELECT * FROM stories WHERE is_published = 0 AND author_id = (?)`;
  const statement = database.prepare(query);
  return statement.all(userId);
}

export const getUserStories = (database, userId) => {
  const isAuthorizedUser = isAuthorized(database, userId);

  if (!isAuthorizedUser) {
    return { success: false, status: 401 };
  }

  const stories = getStories(database, userId);
  const drafts = getDrafts(database, userId);

  return {success : true, status : 200, stories, drafts}
}

