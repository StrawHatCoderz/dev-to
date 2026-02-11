import {
	addComment,
	createStory,
	deleteStory,
	getComments,
	getStory,
	toggleClap,
} from '../handlers/story_handler.js';

const createStoryRoute = (database, body) => {
	const { storyToCreate: story } = body;
	return createStory(database, story);
};

const deleteStoryRoute = (database, body) => {
	const { id } = body;
	return deleteStory(database, id);
};

const getStoryRoute = (database, _body, params) => {
	const storyId = params[0];
	return getStory(database, storyId);
};

const getAllCommentsRoute = (database, _body, params) => {
	const storyId = params[1];
	return getComments(database, storyId);
};

const postCommentRoute = (database, body) => {
	const { content, storyId, userId } = body;
	return addComment(database, userId, storyId, content);
};

const commentsRoute = (database, body, params) => {
	const router = params[0] === 'get' ? getAllCommentsRoute : postCommentRoute;
	return router(database, body, params);
};

const clapRoute = (database, body) => {
	const { userId, storyId } = body;
	return toggleClap(database, userId, storyId);
};

export const storyRequestRouter = ({ route, body, params }, database) => {
	const routes = {
		create: createStoryRoute,
		delete: deleteStoryRoute,
		story: getStoryRoute,
		comments: commentsRoute,
		clap: clapRoute,
	};

	const router = routes[route];
	const result = router
		? router(database, body, params)
		: { success: false, status: 404 };

	return new Response(JSON.stringify(result));
};
