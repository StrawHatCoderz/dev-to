import { isValidFollowerQuery, removeFollowerQuery } from '../db/queries.js';
import { findUser } from '../utils.js';

export const isValidFollower = (database, userId, followerId) => {
	const query = isValidFollowerQuery();
	const statement = database.prepare(query);

	const result = statement.get(userId, followerId);
	return result !== undefined;
};

export const unfollow = (database, targetId, initiatorId) => {
	const target = findUser(database, targetId);
	if (!target) {
		return { success: false, status: 404 };
	}

	if (!isValidFollower(database, targetId, initiatorId)) {
		return { success: false, status: 401 };
	}

	const query = removeFollowerQuery();
	const statement = database.prepare(query);
	statement.run(initiatorId);

	return { success: true, status: 200 };
};
