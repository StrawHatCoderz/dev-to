import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { getUsersFollowing } from "../../src/user/following.js";

describe("users following test", () => {
  let mockUsers;

  beforeEach(() => {
    mockUsers = [
      {
        id: 1,
        name: "deadpool",
        followers: [],
        following: [],
        stories: {
          drafts: [],
          published: [],
        },
      },
    ];
  });

  it("should return error if user is unauthorised", () => {
    const mockSession = {
      users: [],
    };

    const response = getUsersFollowing(1, mockUsers, mockSession);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
  });

  it("should return all followings if authorised", () => {
    const mockSession = {
      users: [1],
    };

    const response = getUsersFollowing(1, mockUsers, mockSession);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(response.followers, []);
  });
});
