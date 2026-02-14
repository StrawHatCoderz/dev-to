import { assertEquals } from "@std/assert/equals";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { DatabaseSync } from "node:sqlite";
import { initDB } from "../../src/db/init.js";
import { getUserFollowing } from "../../src/handlers/get_user_following.js";


describe("test for the getting user followers : ", () => {
  let database;
  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);

    database.prepare(`insert into followers(user_id, follower_id) values(1, 2)`)
      .run();
    database.prepare(`insert into followers(user_id, follower_id) values(1, 3)`)
      .run();
  });

  it("user is not present in the session : ", () => {
    const result = getUserFollowing(database, 1);
    assertEquals(result.success, false);
    assertEquals(result.status, 401);
  });

  it("user present in the session : retrieving the followers with user id , but he is not following any one", () => {
    database.prepare(`insert into session(user_id) values(1)`).run();
    const result = getUserFollowing(database, 1);
    assertEquals(result.success, true);
    assertEquals(result.status, 200);
    assertEquals(result.records, []);
  });

  it("user with id one following two user ", () => {
    database.prepare(`insert into followers(user_id, follower_id) values(2, 1)`)
      .run();
    database.prepare(`insert into followers(user_id, follower_id) values(3, 1)`)
      .run();
    database.prepare(`insert into session(user_id) values(1)`).run();
    const result = getUserFollowing(database, 1);
    console.log(result.records)
    assertEquals(result.success, true);
    assertEquals(result.status, 200);
    assertEquals(result.records.length, 2)
  });
});

