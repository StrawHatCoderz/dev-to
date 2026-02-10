import { describe, it, beforeEach } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { handleStoryRequests } from "../src/routes/handle_story_requests.js";
import { DatabaseSync } from "node:sqlite";
import { initDB } from "../src/db/init.js";

describe("handle story requests", () => {
  let database;

  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);
    database.exec(`INSERT INTO user(username) VALUES('deadpool')`);
  });
  it("=> should create story when story, title is there", () => {
    const requestInfo = {
      route: "create",
      body: {
        storyToCreate: { title: "title", content: "content 1", authorId: 1 },
      },
      params: [],
    };
    const response = handleStoryRequests(requestInfo, database);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(response.storyId, 1);
  });
  it("=> should not create story when title is not there", () => {
    const requestInfo = {
      route: "create",
      body: {
        storyToCreate: { title: "", content: "content 1", authorId: 1 },
      },
      params: [],
    };
    const response = handleStoryRequests(requestInfo, database);
    assertEquals(response.success, false);
    assertEquals(response.status, 400);
  });
  it("=> should delete the story when id is present", () => {
    const requestInfo = {
      route: "delete",
      body: {
        id : 1
      },
      params : []
    }
    const requestToInsert = {
      route: "create",
      body: {
        storyToCreate: { title: "title 1", content: "content 1", authorId: 1 },
      },
      params: [],
    }
    handleStoryRequests(requestToInsert, database);
    const response = handleStoryRequests(requestInfo, database);
    assertEquals(response.success, true);
    assertEquals(response.status, 200)
  })
  it("=> should not delete the story when id is not present", () => {
    const requestInfo = {
      route: "delete",
      body: {
        id : 5
      },
      params : []
    }
    
    const response = handleStoryRequests(requestInfo, database);
    assertEquals(response.success, false);
    assertEquals(response.status, 400)
  })
});
