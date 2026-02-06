import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
getStoriesHandler,
  isIdExistInTheSession,
  retrieveStoriesById,
} from "../../src/user/stories.js";

describe("testing the get stories functionality : ", () => {
  describe("testing id Exist in the session or not : ", () => {
    it("id 1, is exist in the session : ", () => {
      const session = [{ id: 1 }, { id: 2 }];
      const actual = isIdExistInTheSession(1, session);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("id 1 , does not exist in the session : ", () => {
      const actual = isIdExistInTheSession(1, []);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("retrieve the stories by user id: ", () => {
    it("retrieving the all stories , whose id is 1", () => {
      const stories = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
      const actual = retrieveStoriesById(1, stories);
      assertEquals(actual, [{ id: 1, userId: 1 }, { id: 2, userId: 1 }]);
    });

    it("retrieves the stories by user id , but there are not stories on his name :", () => {
      const stories = [];
      const actual = retrieveStoriesById(1, stories);
      assertEquals(actual, []);
    });
  });

  describe("test case for main function ", () => {
    it("passing an user id which is existing in the session : ", () => {
      const session = [{ id: 1 }];
      const stories = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
			const actual = getStoriesHandler(1, session, stories);
			assertEquals(actual.success, true);
			assertEquals(actual.status, 200)
    });

		it('passing an user id where that id is not exist in the session :', () => {
			const session = [];
      const stories = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
			const actual = getStoriesHandler(1, session, stories);
			assertEquals(actual.success, false);
			assertEquals(actual.status, 401)
		})
  });
});
