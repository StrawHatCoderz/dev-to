import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { getUserStories } from "../../src/handlers/user_handlers_story.js";
import { DatabaseSync } from "node:sqlite";
import { initDB } from "../../src/db/init.js";

describe("get user stories", () => {
  let database;
  let userId;
  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);
    userId = database.prepare(`INSERT INTO user (username) VALUES('peter parker 1') RETURNING id`).run().lastInsertRowid;
    console.log(userId);
  });
  it("success should fail when user is not authorized", () => {
    const { success, status } = getUserStories(database, userId);
    assertEquals(success, false);
    assertEquals(status, 401);
  });
});
