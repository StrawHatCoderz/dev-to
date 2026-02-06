import { assertEquals } from '@std/assert';
import { beforeEach, describe, it } from 'jsr:@std/testing/bdd';
import { createStory, createStoryHandler } from "../../src/story/create_story.js";



describe("create story tests ", () => {
  it("==>should return all story deatails", () => {
    const expectedStory = {
      title: "title",
      content: "content",
      id: 1,
      authorId: 1,
      claps: [],
      comments : []
    }
    const story = createStory("title", "content", 1, 1);
    assertEquals(story, expectedStory)
  })
  it("==>should return error if there is no content ", () => {
    const response = createStoryHandler("title", "", 1, { drafts: [], published: [] }, true)
    assertEquals(response.success, false);
    assertEquals(response.status, 400);
  })
  it("==>should not return error if there is content ", () => {
    const response = createStoryHandler("title", "content", 1, { drafts: [], published: [] }, true)
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
  })
})


