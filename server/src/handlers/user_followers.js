import { getUserFollowersQuery } from '../db/queries.js';
import { isAuthorized } from '../utils.js';

export const getUserFollowers = (database, userId) => {
	if (!isAuthorized(database, userId)) {
		return { success: false, status: 401 };
	}

	const query = getUserFollowersQuery();
	const statement = database.prepare(query);
	const followers = statement.all(userId);

	return { success: true, followers, status: 200 };
};
