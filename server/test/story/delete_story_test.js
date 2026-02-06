import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { deleteStory } from "../../src/story/delete_story.js";

describe("delete story", () => {
  it("==> should handle invalid storyId", () => {
    const mockStories = [
      {
        storyId: 1,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
    ];

    const { success, status } = deleteStory(2, mockStories);
    assertEquals(success, false);
    assertEquals(status, 400);
  });
  
  it("==> should delete a story", () => {
    const mockStories = [
      {
        storyId: 2,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
      {
        storyId: 1,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
    ];

    const { success, status } = deleteStory(1, mockStories);
    assertEquals(success, true);
    assertEquals(status, 200);
  });
});
