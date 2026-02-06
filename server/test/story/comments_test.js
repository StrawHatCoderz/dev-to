import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { addComment, getComments } from "../../src/story/comments.js";

describe("story comments", () => {
  describe("addComment", () => {
    let mockComments;
    beforeEach(() => mockComments = []);

    it("comment content is not present", () => {
      const { success, status } = addComment("", 1, mockComments, 1);
      assertEquals(success, false);
      assertEquals(status, 400);
    });

    it("comment content is undefined", () => {
      const { success, status } = addComment(undefined, 1, mockComments, 1);
      assertEquals(success, false);
      assertEquals(status, 400);
    });

    it("successfully adds first comment", () => {
      const { success, status, id: commentId } = addComment(
        "comment 1",
        1,
        mockComments,
        1,
      );

      assertEquals(success, true);
      assertEquals(status, 200);
      assertEquals(commentId, 1);
    });

    it("successfully adds second comment", () => {
      addComment(
        "comment 1",
        1,
        mockComments,
        1,
      );

      const { success, status, id: commentId } = addComment(
        "comment 2",
        1,
        mockComments,
        1,
      );

      assertEquals(success, true);
      assertEquals(status, 200);
      assertEquals(commentId, 2);
    });
  });

  describe("getComments", () => {
    it("storyId not present", () => {
      const mockComments = [];
      addComment("comment 1", 1, mockComments, 1);

      const { success, status, comments } = getComments(2, mockComments);
      assertEquals(success, false);
      assertEquals(status, 400);
      assertEquals(comments, []);
    });

    it("get comments of a story", () => {
      const mockComments = [];
      addComment("comment 1", 1, mockComments, 1);
      addComment("comment 2", 1, mockComments, 1);

      const { success, status, comments } = getComments(1, mockComments);
      assertEquals(success, true);
      assertEquals(status, 200);
      assertEquals(comments, [{
        id: 1,
        content: "comment 1",
        storyId: 1,
        userId: 1,
      }, {
        id: 2,
        content: "comment 2",
        storyId: 1,
        userId: 1,
      }]);
    });
  });

});
