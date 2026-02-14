import {
	addFollowerQuery,
	getPublishedStoriesQuery,
	getUserDraftsQuery,
	getUserFollowersQuery,
	getUserFollowingQuery,
	isValidFollowerQuery,
	removeFollowerQuery,
} from '../db/queries.js';
import { findUser, isAuthorized } from '../utils.js';

const doesFollowerExists = (database, userId, followerId) => {
	const query = isValidFollowerQuery();
	const statement = database.prepare(query);

	const result = statement.get(userId, followerId);
	return result !== undefined;
};

const getStories = (database, userId) => {
	const query = getPublishedStoriesQuery();
	const statement = database.prepare(query);
	return statement.all(userId);
};

const getDrafts = (database, userId) => {
	const query = getUserDraftsQuery();
	const statement = database.prepare(query);
	return statement.all(userId);
};

export const getUserFollowers = (database, userId) => {
	if (!isAuthorized(database, userId)) {
		return { success: false, status: 401 };
	}

	const query = getUserFollowersQuery();
	const statement = database.prepare(query);
	const followers = statement.all(userId);

	return { success: true, followers, status: 200 };
};

export const getUserFollowing = (database, userId) => {
	if (!isAuthorized(database, userId)) {
		return { success: false, status: 401 };
	}

	const query = getUserFollowingQuery();
	const statement = database.prepare(query);
	const followings = statement.all(userId);

	return { success: true, status: 200, followings };
};

export const getUserStories = (database, userId) => {
	const isAuthorizedUser = isAuthorized(database, userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const stories = getStories(database, userId);
	const drafts = getDrafts(database, userId);

	return { success: true, status: 200, stories, drafts };
};

export const follow = (database, targetId, initiatorId) => {
	if (targetId === initiatorId) {
		return { success: false, status: 401 };
	}

	if (doesFollowerExists(database, targetId, initiatorId)) {
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

export const unfollow = (database, targetId, initiatorId) => {
	const target = findUser(database, targetId);
	if (!target) {
		return { success: false, status: 404 };
	}

	if (!doesFollowerExists(database, targetId, initiatorId)) {
		return { success: false, status: 401 };
	}

	const query = removeFollowerQuery();
	const statement = database.prepare(query);
	statement.run(initiatorId);

	return { success: true, status: 200 };
};
