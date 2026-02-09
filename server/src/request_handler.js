import { getRequestHandler } from "./handle_user_requests.js";
import { postRequestHandler } from "./handle_story_requests.js";

const methods = {
  GET: getRequestHandler,
  POST: postRequestHandler,
};

export const requestHandler = (request) => {
  const method = request.method;
  methods[method](request);
};
