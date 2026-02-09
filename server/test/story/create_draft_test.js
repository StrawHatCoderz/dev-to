import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createDraft, createDraftHandler } from "../../src/story/create_draft.js";

describe("create draft tests", () => {
  it("=> should return draft with given values", () => {
    const expectedDraft = {
      id: 1,
      authorId: 1,
      title: "title",
      content: "content",
    };
    const actualDraft = createDraft("title", "content", 1, 1);
    assertEquals(actualDraft, expectedDraft);
  });
  it(" => should return error if there is no content ", () => {
      const mockDrafts = [];
      const storyToCreate = {title : "title",content: " ",authorId: 1}
      const response = createDraftHandler(storyToCreate, mockDrafts)
      assertEquals(response.success, false);
      assertEquals(response.status, 400);
      assertEquals(mockDrafts.length, 0);
    })
    it(" => should not return error if there is content ", () => {
      const mockDrafts = [];
      const storyToCreate = {title : "title",content: "content",authorId: 1}
      const response = createDraftHandler(storyToCreate, mockDrafts)
      assertEquals(response.success, true);
      assertEquals(response.status, 200);
      assertEquals(mockDrafts.length, 1);
    })
});
