export const getClapStatusQuery = () => `
  SELECT 1
  FROM claps
  WHERE story_id = ? AND clapped_by = ?
  LIMIT 1`;

export const deleteClapQuery = () => `
  DELETE FROM claps
  WHERE story_id = ? AND clapped_by = ?`;

export const addClapQuery = () => `
  INSERT INTO claps(story_id, clapped_by)
  VALUES (?, ?)`;

export const deleteStoryQuery = () => `
  DELETE FROM stories
  WHERE story_id = ?`;

export const addStoryQuery = () => `
  INSERT INTO stories(title, content, author_id, is_published)
  VALUES (?,?,?,?)`;

export const addIntoPublishedStoriesQuery = () => `
  INSERT INTO published_stories(story_id)
  VALUES (?)`;

export const addCommentQuery = () => `
  INSERT INTO comments(story_id, content, commented_by)
  VALUES(?, ?, ?)`;

export const getCommentQuery = () => `
  SELECT story_id, content, commented_by, commented_on
  FROM comments
  WHERE story_id = ?`;

export const findUserQuery = (findByColumn) => `
  SELECT id, username FROM user
  WHERE ${findByColumn} = ?`;

export const addUserToSessionQuery = () => `
  INSERT INTO session(user_id)
  VALUES(?)`;

export const removeUserFromSessionQuery = () => `
  DELETE FROM session
  WHERE user_id = ?`;

export const isAuthorizedQuery = () => `
  SELECT 1
  FROM session
  WHERE user_id = ?
  LIMIT 1`;

export const getStoriesQuery = () => `
  SELECT story_id, title, content, author_id, is_published, created_on, updated_on
  FROM stories`;

export const findStoryQuery = () => `
  SELECT story_id, title, content, author_id, is_published, created_on, updated_on
  FROM stories
  WHERE story_id = ?`;

export const getFollowingQuery = () => `SELECT * FROM user 
  INNER JOIN followers 
  ON user.id = followers.user_id
  WHERE followers.follower_id = ?`;
export const getUserFollowersQuery = () => `
  SELECT follower_id, username
  FROM followers f
  JOIN user u
  ON u.id = f.user_id
  WHERE user_id = ?
`;

export const addFollowerQuery = () => `
  INSERT INTO followers(user_id, follower_id)
  VALUES (?, ?)
`;
