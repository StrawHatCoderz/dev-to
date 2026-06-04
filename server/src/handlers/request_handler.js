import { commonRequestRouter } from '../routes/common_requests_route.js';
import { storyRequestRouter } from '../routes/story_requests_route.js';
import { userRequestRouter } from '../routes/user_requests_route.js';
import { logRequest } from '../utils.js';

const isCommonRoute = (route) => {
	const commonRoutes = ['login', 'logout', 'stories'];
	return commonRoutes.includes(route);
};

const parseCommonRequest = async (request) => {
	const pathname = new URL(request.url).pathname;
	const { method } = request;
	const [_, route, ...params] = pathname.split('/');
	return method === 'POST'
		? { route, params: [], body: await request.json() }
		: { route, body: {}, params };
};

const parseRequest = async (request) => {
	const pathname = new URL(request.url).pathname;
	const { method } = request;
	const [_, __, route, ...params] = pathname.split('/');
	return method === 'POST'
		? { route, params: [], body: await request.json() }
		: { route, body: {}, params };
};

export const requestHandler = async (request, database) => {
	const pathname = new URL(request.url).pathname;
	const [_, rootRoute] = pathname.split('/');

	logRequest(request.method, pathname);
	if (isCommonRoute(rootRoute)) {
		const requestInfo = await parseCommonRequest(request);
		return commonRequestRouter(requestInfo, database);
	}

	if (rootRoute === 'story') {
		const requestInfo = await parseRequest(request);
		return storyRequestRouter(requestInfo, database);
	}

	if (rootRoute === 'user') {
		const requestInfo = await parseRequest(request);
		return userRequestRouter(requestInfo, database);
	}

	return new Response(JSON.stringify({ error: 'Not Found' }), {
		status: 404,
		headers: { 'content-type': 'application/json' },
	});
};
