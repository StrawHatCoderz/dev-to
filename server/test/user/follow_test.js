import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from '@std/testing/bdd';
import { createFollower, getUser, follow,  createFollowing } from "../../src/user/follow.js";

describe("tests for follow button", () => {
  let mockUsers;
  beforeEach(() => {
     mockUsers = [
			{
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
				
			},
			{
				id: 2,
				name: 'Bkon',
				followers: [],
				following: [],
				
			},
		];

  })
  it("=> should give get user", () => {
     mockUsers = [
			{
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
				stories: {
					drafts: [],
					published: [],
				},
			},
		];
    const user = getUser(mockUsers, 1);
    assertEquals(user, {
				id: 1,
				name: 'deadpool',
				followers: [],
				following: [],
				stories: {
					drafts: [],
					published: [],
				},
			})
  })
  it("=> should create follower", () => {
    const acutalFollower = createFollower(1, 1, 2);
    const expectedFollower = { id: 1, userId: 1, followerId: 2 };
    assertEquals(expectedFollower, acutalFollower)
  })
  it("=> should create following obj", () => {
    const acutalFollowing = createFollowing(1, 2, 3);
    const expectedFollowing = { id: 1, userId: 2, followingId: 3 };
    assertEquals(expectedFollowing, acutalFollowing)

  })
  it("=> should insert follower into follwers list and vice versa", () => {
    const response = follow(mockUsers, 1, 2);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    const famousGuy = mockUsers.find(user => user.id === 1);
    assertEquals(famousGuy.followers, [{id : 1, userId : 1, followerId : 2}])
    assertEquals(famousGuy.followers.length, 1)

    const normalGuy = mockUsers.find(user => user.id === 2);
    assertEquals(normalGuy.following, [{id : 1, userId : 2, followingId : 1}])
    assertEquals(normalGuy.following.length, 1)
  })
})