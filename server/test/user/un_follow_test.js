import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { unfollow } from "../../src/user/un_follow.js";

describe("un follow tests", () => {
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
  //{id : 1, userId : 1, followerId : 2}
  //{ id: 1, userId: 2, followingId: 1 }
  it("=> should return false coz user is not following target", () => {
    const response = unfollow(mockUsers, 2, 1);
    assertEquals(response.success, false);
    assertEquals(response.status, 404);
  });
  it("=> should delete user instance in target followers list", () => {
      mockUsers = [
      {
        id: 1,
        name: "deadpool",
        followers: [{id : 1, userId : 1, followerId : 2}],
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
      ] )
  });

});
