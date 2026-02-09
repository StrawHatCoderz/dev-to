import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  parseGetRequest,
  parsePostRequest,
  parseRequest,
} from "../src/request_handler.js";

describe("test for request handler : ", () => {
  describe("testing the parser : ", () => {
    let request;
    let url;

    beforeEach(() => {
      request = new Request("http://localhost:8000/login/praveen");
      url = new URL(request.url);
    });

    it("==> testing parse get request : ", () => {
      const actual = parseGetRequest(url.pathname);
      const expected = { command: "login", params: ["praveen"] };
      assertEquals(actual, expected);
    });

    it("==> parsing the post request : ", async () => {
      request = new Request("http://localhost:8000/story", {
        method: "POST",
        body: JSON.stringify({ story: "my profile", content: "something" }),
      });
      url = new URL(request.url);
      const actual = await parsePostRequest(url.pathname, request);
      const expected = {
        command: "story",
        params: { story: "my profile", content: "something" },
      };
      assertEquals(actual, expected);
    });

    it("==> testing main parse functionality , passing the get request : ", async () => {
      const actual = await parseRequest(request);
      const expected = { command: "login", params: ["praveen"] };
      assertEquals(actual, expected);
    });

    it("==> testing the main functionality , where request type is post : ", async () => {
      request = new Request("http://localhost:8000/story", {
        method: "POST",
        body: JSON.stringify({ story: "my profile", content: "something" }),
      });
      url = new URL(request.url);
      const actual = await parsePostRequest(url.pathname, request);
      const expected = {
        command: "story",
        params: { story: "my profile", content: "something" },
      };
      assertEquals(actual, expected);
    });
  });
});
