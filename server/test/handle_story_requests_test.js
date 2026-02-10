import { describe, it , beforeEach} from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { retrieveStoryById } from "../src/handlers/story_handler2.js";
import { DatabaseSync } from "node:sqlite";
import { initDB } from "../src/db/init.js";

describe("handle story requests", () => {
  let database;

  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);
    database.exec(`INSERT INTO user(username) VALUES('deadpool')`);
  });

  describe("testing the get story functionality : ", () => {
    describe("retrieve the story from the stories : ", () => {
      it("no id is present in stories table : ", () => {
        const actual = retrieveStoryById(database, 1);
        const expected = undefined;
        assertEquals(actual, expected)
      });
    });

  });
});
