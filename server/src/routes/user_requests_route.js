import {
	follow,
	getUserFollowers,
	getUserFollowing,
	getUserStories,
	unfollow,
} from '../handlers/user_handlers.js';

export const handleUserRequest = ({ route, body, params }) => {
	switch (route) {
		case 'follow':
			return follow(database, body.targetId, body.initiatorId);
		case 'unfollow':
			return unfollow(database, body.targetId, body.initiatorId);
		case 'stories':
			return getUserStories(database, params[0]); //params[0] is userId
		case 'get-followers':
			return getUserFollowers(database, params[0]);
		case 'get-following':
			return getUserFollowing(database, params[0]);
	}
};
