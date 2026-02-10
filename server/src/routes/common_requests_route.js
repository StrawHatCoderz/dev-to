import { getAllStories, login, logout } from '../handlers/common_handlers.js';

const loginRoute = (database, body) => {
	const { username } = body;
	return login(database, username);
};

const logoutRoute = (database, body) => {
	const { id } = body;
	return logout(database, id);
};

export const commonRequestRouter = ({ route, body }, database) => {
	const routes = {
		login: loginRoute,
		logout: logoutRoute,
		stories: getAllStories,
	};
	const router = routes[route];
	if (!router) return { success: false, status: 404 };
	const result = router(database, body);

	return new Response(JSON.stringify(result));
};
