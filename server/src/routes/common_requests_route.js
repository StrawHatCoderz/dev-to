import * as handlers from '../handlers/common_handlers.js';

const loginRoute = (database, body) => {
	const { username } = body;
	return handlers.login(database, username);
};

const logoutRoute = (database, body) => {
	const { id } = body;
	return handlers.logout(database, id);
};

export const commonRequestRouter = ({ route, body }, database) => {
	const routes = {
		login: loginRoute,
		logout: logoutRoute,
		stories: handlers.getAllStories,
	};

	const router = routes[route];
	const result = router
		? router(database, body)
		: { success: false, status: 404 };

	return new Response(JSON.stringify(result), {
		status: result.status,
		headers: { 'content-type': 'application/json' },
	});
};
