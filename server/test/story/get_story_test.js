import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  doesContentExist,
  getStory,
  isIdExistInTheStories,
  retrieveStoryById,
} from "../../src/story/get_story.js";

describe("test getStory : ", () => {
  describe("validating the id : ", () => {
    it(" => id exist in the given stories : ", () => {
      const actual = isIdExistInTheStories(1, [{ id: 1 }]);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("id does not exist : ", () => {
      const actual = isIdExistInTheStories(1, [{ id: 2 }]);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("retrieving the story by id : ", () => {
    it("retrieving the story where id is 1", () => {
      const actual = retrieveStoryById(1, [{ id: 1 }]);
      const expected = { id: 1 };
      assertEquals(actual, expected);
    });
  });

  describe("testing whether story contain content or not : ", () => {
    it("does story with id 1 contain content :", () => {
      const actual = doesContentExist({ id: 1, content: "" });
      const expected = false;
      assertEquals(actual, expected);
    });

    it("story contain some content : ", () => {
      const actual = doesContentExist({
        id: 1,
        content: "which contain some data",
      });

      const expected = true;
      assertEquals(actual, expected);
    });
  });

  describe("testing the main function : ", () => {
    it("id does not exist : ", () => {
      const actual = getStory(1, [{ id: 2 }]);
      assertEquals(actual.status, 404);
    });

    it("id does exist but content is exist : ", () => {
      const actual = getStory(1, [{ id: 1, content: "" }]);
      assertEquals(actual.status, 400);
    });

    it('id exist and content also not empty :', () => {
      const actual = getStory(1, [{id : 1, content : 'Hi, There!'}]);
      assertEquals(actual.success, true);
      assertEquals(actual.status, 200)
    })
  });
});
