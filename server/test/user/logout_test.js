import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { logout } from "../../src/user/logout.js";

describe("user logout", () => {
  it("user is unauthorised", () => {
    const mockSession = {
      users: [],
    };

    const response = logout(1, mockSession);
    assertEquals(response.success, false);
    assertEquals(response.status, 401);
  });
  it("user is authorised", () => {
    const mockSession = {
      users: [1],
    };

    const response = logout(1, mockSession);
    assertEquals(response.success, true);
    assertEquals(response.status, 200);
  });
});
