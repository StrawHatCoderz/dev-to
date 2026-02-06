import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { addComment } from "../../src/story/comments.js";

describe("story comments", () => {
  it("comment content is not present", () => {
    const mockComments = [];
    const { success, status } = addComment("", 1, mockComments, 1);
    assertEquals(success, false);
    assertEquals(status, 400);
  });

  it("comment content is undefined", () => {
    const mockComments = [];
    const { success, status } = addComment(undefined, 1, mockComments, 1);
    assertEquals(success, false);
    assertEquals(status, 400);
  });

  it("successfully adds first comment", () => {
    const mockComments = [];

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
    const mockComments = [];
    addComment(
      "comment 1",
      1,
      mockComments,
      1,
    )

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
