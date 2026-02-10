import { findUser } from '../utils.js';

const addFollower = (id, userId, followerId, user) => {
	const follower = {
		id,
		userId,
		followerId,
	};

	user.followers.push(follower);
};

const addFollowing = (id, userId, followingId, user) => {
	const following = {
		id,
		userId,
		followingId,
	};
	user.following.push(following);
};

const removeFromFollowers = (followers, initiatorId) => {
	const initiatorIndex = followers.findIndex(
		(follower) => follower.followerId === initiatorId,
	);

	if (initiatorIndex === -1) {
		return { success: false };
	}

	followers.splice(initiatorIndex, 1);
	return { success: true };
};

const removeFromFollowing = (followings, targetId) => {
	const targetIdxInFollowing = followings.findIndex(
		(following) => following.followingId === targetId,
	);

	followings.splice(targetIdxInFollowing, 1);
};

export const getUserFollowers = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = findUser(users, userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUsersFollowing = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = findUser(users, userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUserStories = (userId, session, users) => {
	const isAuthorizedUser = session.users.includes(userId);
	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = findUser(users, userId);

	return { success: true, stories: user.stories, status: 200 };
};

export const follow = (users, targetId, initiatorId) => {
	const user = findUser(users, targetId);
	if (!user) {
		return { success: false, status: 404 };
	}

	addFollower(user.followers.length + 1, targetId, initiatorId, user);

	const initiatorUser = findUser(users, initiatorId);
	addFollowing(
		initiatorUser.following.length + 1,
		initiatorId,
		targetId,
		initiatorUser,
	);

	return { success: true, status: 200 };
};

export const unfollow = (users, initiatorId, targetId) => {
	const targetFollowers = findUser(users, targetId).followers;
	const { success } = removeFromFollowers(targetFollowers, initiatorId);

	if (!success) {
		return { success, status: 404 };
	}

	const userFollowingList = findUser(users, initiatorId).following;
	removeFromFollowing(userFollowingList, targetId);

	return { success: true, status: 200 };
};
