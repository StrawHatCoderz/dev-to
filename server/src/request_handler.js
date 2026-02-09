import { getRequestHandler } from "./get_handler.js";
import { postRequestHandler } from "./post_handler.js";

const methods = {
  GET: getRequestHandler,
  POST: postRequestHandler,
};

export const requestHandler = (request) => {
  const method = request.method;
  methods[method](request);
};
