import { handleCommonRequests } from "./routes/handle_common_requests.js";

export const parseGetRequest = (path) => {
  const [_, route, ...params] = path.split("/");
  return { route, params };
};

export const parsePostRequest = async (path, request) => {
  const [_, route] = path.split("/");
  const body = await request.json();
  return { route, body };
};

const methodHandler = {
  GET: parseGetRequest,
  POST: parsePostRequest,
};

export const parseRequest = async (request) => {
  const pathname = new URL(request.url).pathname;
  const parser = methodHandler[request.method];
  return await parser(pathname, request);
};

export const requestHandler = async (request) => {
  const parsedRequest = await parseRequest(request);
  const pathname = new URL(request.url).pathname;
  const prefix = pathname.split("/")[0] || "/";

  const handlers = {
    "/": handleCommonRequests,
  };

  const handler = handlers[prefix];
  if (!handler) return new Response("Invalid Route");

  const response = handler(parsedRequest);
  console.log(response);
  return new Response(response);
};
