export const createFollower = (id, userId, followerId) => {
  return {
    id , userId, followerId 
  }
}

export const createFollowing = (id, userId, followingId) => {
  return {
    id, userId, followingId
  }
}

export const getUser = (users, userId) => {
  return users.find(user => user.id === userId);
}

export const follow = (users, userId, followerUserId) => {
  const user = getUser(users, userId);
  if (!user) {
    return { success: false, status: 404 };
  }
  const follower = createFollower(user.followers.length + 1, userId, followerUserId);
  user.followers.push(follower);

  const followerUser = getUser(users, followerUserId);
  const following = createFollowing(followerUser.following.length + 1, followerUserId, userId)
  followerUser.following.push(following);

  return { success: true, status: 200 };

}