import { getUser } from './utils.js';

const addFollower = (id, userId, followerId) => {
	const follower = {
		id,
		userId,
		followerId,
	};

	user.followers.push(follower);
};

const addFollowing = (id, userId, followingId) => {
	const following = {
		id,
		userId,
		followingId,
	};
	followerUser.following.push(following);
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

	const user = users.find((user) => user.id === userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUsersFollowing = (userId, users, currentSession) => {
	const isAuthorizedUser = currentSession.users.includes(userId);

	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = users.find((user) => user.id === userId);
	const followers = user.followers;

	return { success: true, followers, status: 200 };
};

export const getUserStories = (id, session, users) => {
	const isAuthorizedUser = session.users.includes(id);
	if (!isAuthorizedUser) {
		return { success: false, status: 401 };
	}

	const user = users.find((user) => user.id === id);

	return { success: true, user: user.stories, status: 200 };
};

export const follow = (users, targetId, initiatorId) => {
	const user = getUser(users, targetId);
	if (!user) {
		return { success: false, status: 404 };
	}

	addFollower(user.followers.length + 1, targetId, initiatorId, users);

	const initiatorUser = getUser(users, initiatorId);
	addFollowing(initiatorUser.following.length + 1, initiatorId, targetId);

	return { success: true, status: 200 };
};

export const unfollow = (users, initiatorId, targetId) => {
	const targetFollowers = getUser(users, targetId).followers;
	const { success } = removeFromFollowers(targetFollowers, initiatorId);

	if (!success) {
		return { success, status: 404 };
	}

	const userFollowingList = getUser(users, initiatorId).following;
	removeFromFollowing(userFollowingList, targetId);

	return { success: true, status: 200 };
};
