import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  getDraftsHandler,
  isIdExistInTheSession,
  retrieveDraftsById,
} from "../../src/user/get_drafts.js";

describe("testing the drafts : ", () => {
  describe("checks whether the user id exist in the session or not : ", () => {
    it("==> id exist is exist in the session : ", () => {
      const session = [{ id: 1 }];
      const actual = isIdExistInTheSession(1, session);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("==> id does not exist in the session : ", () => {
      const actual = isIdExistInTheSession(1, []);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("retrieving the drafts based on the user id : ", () => {
    it("==> retrieving the drafts based on the user id : ", () => {
      const allDrafts = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
      const actual = retrieveDraftsById(1, allDrafts);
      const expected = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
      assertEquals(actual, expected);
    });

    it("==> retrieving the drafts where the drafts are empty :", () => {
      const actual = retrieveDraftsById(1, []);
      const expected = [];
      assertEquals(actual, expected);
    });
  });

  describe("testing the main function :", () => {
    it("==> retrieving the drafts details , where user id : 1 :", () => {
      const actual = getDraftsHandler(1, [{ id: 1 }], [{ id: 1, userId: 1 }]);
      assertEquals(actual.success, true);
      assertEquals(actual.status, 200);
    });

    it("==> giving an id which does not exist in the session : ", () => {
      const actual = getDraftsHandler(1, [], [{ id: 1, userId: 1 }]);
      assertEquals(actual.success, false);
      assertEquals(actual.status, 401);
    });
  });
});
