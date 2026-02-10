import { commonRequestRouter } from '../routes/common_requests_route.js';
import { handleStoryRequests } from '../routes/story_requests_route.js';
import { handleUserRequest } from '../routes/user_requests_route.js';

const parseCommonRequest = async (pathname, method, request) => {
	const [_, route, ...params] = pathname.split('/');
	return method === 'POST'
		? { route, params: [], body: await request.json() }
		: { route, body: {}, params };
};

const parseRequest = async (pathname, method, request) => {
	const [_, __, route, params] = pathname.split('/');
	return method === 'POST'
		? { route, params: [], body: await request.json() }
		: { route, body: {}, params };
};

const commonRoutes = ['login', 'logout', 'stories'];

export const requestHandler = async (request, database) => {
	let response;
	const pathname = new URL(request.url).pathname;
	const [_, route] = pathname.split('/');

	if (commonRoutes.includes(route)) {
		const requestInfo = await parseCommonRequest(
			pathname,
			request.method,
			request,
		);
		response = await commonRequestRouter(requestInfo, database);
	} else if (route === 'story') {
		const requestInfo = await parseRequest(pathname, request.method, request);
		response = await handleStoryRequests(requestInfo);
	} else if (route === 'user') {
		const requestInfo = await parseRequest(pathname, request.method, request);
		response = await handleUserRequest(requestInfo);
	} else {
		response = 'Invalid Request';
	}

	return new Response(response);
};
