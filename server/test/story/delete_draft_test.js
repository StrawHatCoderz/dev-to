import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { deleteDraft } from "../../src/handlers/story/delete_draft.js";

describe("delete draft", () => {
  it("==> should handle invalid draftId", () => {
    const mockDrafts = [
      {
        draftId: 1,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
    ];

    const { success, status } = deleteDraft(2, mockDrafts);
    assertEquals(success, false);
    assertEquals(status, 400);
  });
  
  it("==> should delete a draft", () => {
    const mockDrafts = [
      {
        draftId: 2,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
      {
        draftId: 1,
        title: "abc title",
        content: "abcd content",
        authorId: 1,
      },
    ];

    const { success, status } = deleteDraft(1, mockDrafts);
    assertEquals(success, true);
    assertEquals(status, 200);
  });
});
