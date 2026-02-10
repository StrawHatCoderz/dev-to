import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { handleStoryRequests } from "../src/routes/handle_story_requests.js";

describe("handle story requests", () => {
  let database;

  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);
    database.exec(`INSERT INTO user(username) VALUES('deadpool')`);
  });
  // it("=> should create story when story, title is there", () => {
  //   const requestInfo = {
  //     route: "create",
  //     body: {
  //       storyToCreate: { title: "title", content: "content 1", authorId: 1 },
  //     },
  //     params: [],
  //   };
  //   const response = handleStoryRequests(requestInfo);
  //   assertEquals(response.success, true);
  //   assertEquals(response.status, 200);
  //   assertEquals(mockStories, expectedStories);
  // });
});
