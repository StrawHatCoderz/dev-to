const commonRouteHandler = async (pathname, method, request) => {
  const [_, route, ...params] = pathname.split("/");
  return (method === "POST")
    ? { route, params: [], body: await request.json() }
    : { route, body: {}, params };
};

const storyHandler = async (pathname, method, request) => {
  const [_, _, route, params] = pathname.split("/");
  return (method === "POST")
    ? { route, params: [], body: await request.json() }
    : { route, body: {}, params };
};

const userHandler = async (pathname, method, request) => {
  const [_, _, route, params] = pathname.split("/");
  return (method === "POST")
    ? { route, params: [], body: await request.json() }
    : { route, body: {}, params };
};

const commonRoutes = ["login", "logout", "stories"];

export const requestHandler = (request) => {
  let response;
  const pathname = new URL(request.url).pathname;
  const [_, route] = pathname.split("/");

  if (commonRoutes.includes(route)) {
    response = commonRouteHandler(pathname, request.method);
  } else if (route === "story") {
    response = storyHandler();
  } else if (route === "user") {
    response = userHandler();
  } else {
    response = "Invalid Request";
  }

  return new Response(response);
};
/*

common handler :
  login
  logout
  stories

user handler :

story handler
*/

/*

common handler :
  login
  logout
  stories

user handler :

story handler
*/
