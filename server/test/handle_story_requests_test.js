import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { handleStoryRequests } from "../src/routes/handle_story_requests.js";
import { mockStories } from "../src/mock/mock-user.js";

describe("handle story requests", () => {
  it("=> should create story when story, title is there", () => {
    const requestInfo = {
      route: "create",
      body: {
        title: "title 1",
        content: "content 1",
        authorId: 1,
        isPublished: true,
      },
      params: [],
    };
    const expectedStories = [
  {
    authorId: 1,
    claps: [],
    comments: [],
    content: "abc",
    id: 1,
    isPublished: true,
    title: "abc",
  }, {
    authorId: 1,
    claps: [],
    comments: [],
    content: "content 1",
    id: 2,
    isPublished: true,
    title: "title 1",
  }
];

    const response = handleStoryRequests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(mockStories, expectedStories);
  });
})