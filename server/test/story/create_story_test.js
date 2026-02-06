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
  it("==>should return error if there is no content [drafts] ", () => {
    const mockStories = { drafts: [], published: [] };
    const storyToCreate = {title : "title",content: " ",authorId: 1}
    const response = createStoryHandler(storyToCreate, mockStories, true)
    assertEquals(response.success, false);
    assertEquals(response.status, 400);
    assertEquals(mockStories.drafts.length, 0);

  })
  it("==>should not return error if there is content [drafts]", () => {
    const mockStories = { drafts: [], published: [] };
    const storyToCreate = {title : "title",content: "content",authorId: 1}
    const response = createStoryHandler(storyToCreate, mockStories, true)
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(mockStories.drafts.length, 1);
  })
  it("==>should return error if there is no content [published]", () => {
    const mockStories = { drafts: [], published: [] };
    const storyToCreate = {title : "title",content: " ",authorId: 1}
    const response = createStoryHandler(storyToCreate, mockStories, false)
    assertEquals(response.success, false);
    assertEquals(response.status, 400);
    assertEquals(mockStories.published.length, 0);

  })
  it("==>should not return error if there is content [published]", () => {
    const mockStories = { drafts: [], published: [] };
    const storyToCreate = {title : "title",content: "content",authorId: 1}
    const response = createStoryHandler(storyToCreate, mockStories, false)
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(mockStories.published.length, 1);
  })
})


