import { getUser } from "./follow.js";

export const unfollow = (users, userId, targetId) => {
  const targetFollowers = getUser(users, targetId).followers;
  const userIdxInFollowers = targetFollowers.findIndex((follower) =>
    follower.followerId === userId
  );
  if (userIdxInFollowers === -1) {
    return { success: false, status: 404 };
  }
  targetFollowers.splice(userIdxInFollowers, 1);

  const userFollowingList = getUser(users, userId).following;
  const targetIdxInFollowing = userFollowingList.findIndex((following) =>
    following.followingId === targetId
  );
  userFollowingList.splice(targetIdxInFollowing, 1);

  return { success: true, status: 200 };
};
