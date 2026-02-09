import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { handleCommonReqests } from "../src/handle_common_requests.js";
import { session } from "../src/current-session.js";

describe("handle common requests", () => {
  it("=> login should return success response", () => {
    const requestInfo = { command: "login", params: ["deadpool"] };
    const response = handleCommonReqests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(session.users, [1]);
  });
  it("=> login should return failure response", () => {
    const requestInfo = { command: "login", params: ["dksl"] };
    const response = handleCommonReqests(requestInfo);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
    assertEquals(session.users, [1]);
  });
  it("=> logout should return success response", () => {
    const requestInfo = { command: "logout", params: [1] };
    const response = handleCommonReqests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(session.users, []);
  });
  it("=> logout should return failure response", () => {
    const requestInfo = { command: "logout", params: [2] };
    const response = handleCommonReqests(requestInfo);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
    assertEquals(session.users, []);
  })
  it("=> get every story ", () => {
    const requestInfo = { command: "stories" };
    const stories = handleCommonReqests(requestInfo);
    assertEquals(stories, [{
	id : 1,
	authorId: 1,
	title: "abc",
	content: "abc",
	isPublished: true
}])
  })
});
