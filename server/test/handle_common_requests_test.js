import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { handleCommonRequests } from "../src/routes/handle_common_requests.js";
import { session } from "../src/mock/current-session.js";

describe("handle common requests", () => {
  it("=> login should return success response when user have acc", () => {
    const requestInfo = { route: "login", body: { username: "deadpool" } };
    const response = handleCommonRequests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(session.users, [1]);
  });
  it("=> login should return failure response when user doesn't have acc", () => {
    const requestInfo = { route: "login", body: { username: "dskdl" } };
    const response = handleCommonRequests(requestInfo);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
    assertEquals(session.users, [1]);
  });
  it("=> logout should return success response", () => {
    const requestInfo = { route: "logout", body: { id: 1 } };
    const response = handleCommonRequests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
    assertEquals(session.users, []);
  });
  it("=> logout should return failure response", () => {
    const requestInfo = { route: "logout", body: 2 };
    const response = handleCommonRequests(requestInfo);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
    assertEquals(session.users, []);
  });
  it("=> get every story ", () => {
    handleCommonRequests({ route: "login", body: { username: "deadpool" } });
    const requestInfo = { route: "stories", params: [1], body: {} };
    const response = handleCommonRequests(requestInfo);
    assertEquals(response.success, true);
    assertEquals(response.status,200)
    assertEquals(response.stories, [{
      id: 1,
      authorId: 1,
      title: "abc",
      content: "abc",
      isPublished: true,
      claps: [],
      comments : []
    }]);
  });
});
