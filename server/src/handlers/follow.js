import { addFollowerQuery } from '../db/queries.js';
import { findUser } from '../utils.js';

export const follow = (database, targetId, initiatorId) => {
	if (targetId === initiatorId) {
		return { success: false, status: 401 };
	}

	const target = findUser(database, targetId);
	if (!target) {
		return { success: false, status: 404 };
	}

	const query = addFollowerQuery();
	const statement = database.prepare(query);
	statement.run(targetId, initiatorId);

	return { success: true, status: 200 };
};
