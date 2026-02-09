export const parseGetRequest = (path) => {
  const [_, ...args] = path.split("/");
  const [command, ...params] = args;
  return { command, params };
};

export const parsePostRequest = async (path, request) => {
  const [_, command] = path.split("/");
  const params = await request.json();
  return { command, params };
};

const methodHandler = {
  GET: parseGetRequest,
  POST: parsePostRequest,
};

export const parseRequest = async (request) => {
  const pathname = new URL(request.url).pathname;
  return await methodHandler[request.method](pathname, request);
};

export const requestHandler = async (request) => {
  await parseRequest(request);
};
