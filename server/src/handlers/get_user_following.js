// CREATE TABLE IF NOT EXISTS followers (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER NOT NULL,
//   follower_id INTEGER NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
//   FOREIGN KEY (follower_id) REFERENCES user(id) ON DELETE CASCADE
// );

import { getFollowingQuery } from "../db/queries.js";
import { isAuthorized } from "../utils.js";

/*
  id   user_id  follower_id

  1       1         2

  2       1         3

  3       2         1

  4       2         3

  5       3         1

  6       3         2

*/

export const getUserFollowing = (database, userId) => {
  if (!isAuthorized(database, userId)) {
    return { success: false, status: 401 };
  }

  const query = getFollowingQuery();
  const statement = database.prepare(query);
  const records = statement.all(userId);
  return {success : true, status : 200, records}
};
