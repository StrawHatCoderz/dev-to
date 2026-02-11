import { commonRequestRouter } from '../routes/common_requests_route.js';
import { handleStoryRequests } from '../routes/story_requests_route.js';
import { handleUserRequest } from '../routes/user_requests_route.js';

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
	const [_, _, route, ...params] = pathname.split('/');
	return method === 'POST'
		? { route, params: [], body: await request.json() }
		: { route, body: {}, params };
};

export const requestHandler = async (request, database) => {
	const pathname = new URL(request.url).pathname;
	const [_, rootRoute] = pathname.split('/');

	if (isCommonRoute(rootRoute)) {
		const requestInfo = await parseCommonRequest(request);
		return await commonRequestRouter(requestInfo, database);
	} else if (rootRoute === 'story') {
		const requestInfo = await parseRequest(request);
		return await handleStoryRequests(requestInfo);
	} else if (rootRoute === 'user') {
		const requestInfo = await parseRequest(request);
		return await handleUserRequest(requestInfo);
	}
};
