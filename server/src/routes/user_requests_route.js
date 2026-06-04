import {
	follow,
	getUserFollowers,
	getUserFollowing,
	getUserStories,
	unfollow,
} from '../handlers/user_handlers.js';

export const userRequestRouter = ({ route, body, params }, database) => {
	const routes = {
		follow: (database, body) =>
			follow(database, body.targetId, body.initiatorId),
		unfollow: (database, body) =>
			unfollow(database, body.targetId, body.initiatorId),
		stories: (database, _body, params) => getUserStories(database, params[0]),
		followers: (database, _body, params) =>
			getUserFollowers(database, params[0]),
		following: (database, _body, params) =>
			getUserFollowing(database, params[0]),
	};

	const router = routes[route];
	const result = router
		? router(database, body, params)
		: { success: false, status: 404 };

	return new Response(JSON.stringify(result), {
		status: result.status,
		headers: { 'content-type': 'application/json' },
	});
};
