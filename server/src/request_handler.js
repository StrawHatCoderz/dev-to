import { handleCommonReqests } from './handle_common_requests.js';

export const parseGetRequest = (path) => {
	const [_, ...args] = path.split('/');

	const [route, ...body] = args;
	return { route, body };
};

export const parsePostRequest = async (path, request) => {
	const [_, route] = path.split('/');
	const body = await request.json();
	return { route, body };
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
	const parsedRequest = await parseRequest(request);
	const response = handleCommonReqests(parsedRequest);
	console.log(response);
	return new Response(response);
};
