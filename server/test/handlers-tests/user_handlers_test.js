import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
	follow,
	getUserFollowers,
	getUserFollowing,
	getUserStories,
	unfollow,
} from '../../src/handlers/user_handlers.js';

describe("User Handlers", () => {
  let mockUsers;

  beforeEach(() => {
    mockUsers = [
      {
        id: 1,
        name: "deadpool",
        followers: [],
        following: [],
      },
      {
        id: 2,
        name: "Bkon",
        followers: [],
        following: [],
      },
    ];
  });

  describe("follow test cases", () => {
    it(" => should insert follower into follwers list", () => {
      const response = follow(mockUsers, 1, 2);
      assertEquals(response.success, true);
      assertEquals(response.status, 200);
      const famousGuy = mockUsers.find((user) => user.id === 1);
      assertEquals(famousGuy.followers, [{ id: 1, userId: 1, followerId: 2 }]);
      assertEquals(famousGuy.followers.length, 1);

      const normalGuy = mockUsers.find((user) => user.id === 2);
      assertEquals(normalGuy.following, [{ id: 1, userId: 2, followingId: 1 }]);
      assertEquals(normalGuy.following.length, 1);
    });

    it(" => should fail when following invalid user", () => {
      const response = follow(mockUsers, 3, 2);

      const user = mockUsers.find((user) => user.id === 2);

      assertEquals(response.success, false);
      assertEquals(response.status, 404);
      assertEquals(user.followers.length, 0);
    });
  });

  describe("un-follow test cases", () => {
    it(" => should fail when user is not following anyone", () => {
      const response = unfollow(mockUsers, 2, 1);
      assertEquals(response.success, false);
      assertEquals(response.status, 404);
    });

    it(" => should remove follower", () => {
      mockUsers = [
        {
          id: 1,
          name: "deadpool",
          followers: [{ id: 1, userId: 1, followerId: 2 }],
          following: [],
        },
        {
          id: 2,
          name: "Bkon",
          followers: [],
          following: [{ id: 1, userId: 2, followingId: 1 }],
        },
      ];
      const response = unfollow(mockUsers, 2, 1);
      assertEquals(response.success, true);
      assertEquals(response.status, 200);
      assertEquals(mockUsers, [
        {
          id: 1,
          name: "deadpool",
          followers: [],
          following: [],
        },
        {
          id: 2,
          name: "Bkon",
          followers: [],
          following: [],
        },
      ]);
    });
  });

  describe("user followers tests", () => {
    it(" => should return error when user is not authorized", () => {
      const mockSession = {
        users: [],
      };

      const { status, success } = getUserFollowers(1, mockUsers, mockSession);

      assertEquals(status, 401);
      assertEquals(success, false);
    });

    it(" => should return all followers for authorized user", () => {
      const mockSession = {
        users: [1],
      };

      const { followers, success, status } = getUserFollowers(
        1,
        mockUsers,
        mockSession,
      );

      assertEquals(success, true);
      assertEquals(status, 200);
      assertEquals(followers, []);
    });
  });

  describe("users following test", () => {
    it(" => should return error if user is unauthorised", () => {
      const mockSession = {
        users: [],
      };

      const response = getUserFollowing(1, mockUsers, mockSession);
      assertEquals(response.success, false);
      assertEquals(response.status, 401);
    });

    it(" => should return all followings if authorised", () => {
      const mockSession = {
        users: [1],
      };

      const response = getUserFollowing(1, mockUsers, mockSession);
      assertEquals(response.success, true);
      assertEquals(response.status, 200);
      assertEquals(response.followers, []);
    });
  });

  describe("user stories tests", () => {
    let mockUsers;

    beforeEach(() => {
      mockUsers = [
        {
          id: 1,
          name: "deadpool",
          followers: [],
          following: [],
          stories: [
            {
              id: 1,
              title: "mock story",
              content: "mock content",
            },
          ],
        },
      ];
    });

    it(" => should get all stories : ", () => {
      const mockSession = { users: [1] };

      const actual = getUserStories(1, mockSession, mockUsers);
      assertEquals(actual.stories.length, 1);
      assertEquals(actual.success, true);
      assertEquals(actual.status, 200);
    });

    it(" => should fail with unauthorized user", () => {
      const session = {
        users: [],
      };
      const actual = getUserStories(1, session, mockUsers);
      assertEquals(actual.success, false);
      assertEquals(actual.status, 401);
    });
  });
});
