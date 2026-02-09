const getClapIndex = (story, userId) =>
	story.claps.findIndex((clap) => clap.clappedBy === userId);

const isAlreadyClapped = (story, userId) => {
	return getClapIndex(story, userId) !== -1;
};

const unClapStory = (_id, story, userId, _storyId) => {
	const clapIndex = getClapIndex(story, userId);
	story.claps.splice(clapIndex, 1);
};

const clapStory = (id, story, clappedBy, storyId) => {
	const clap = { id, storyId, clappedBy };
	story.claps.push(clap);
};

const doesStoryExists = (storyId, stories) => {
	return stories.some((story) => story.id === storyId);
};

const isValidContent = (story) => {
	return story.content.length !== 0;
};

export const toggleClap = (userId, storyId, stories) => {
	const story = stories.find((story) => story.id === storyId);

	if (!story) {
		return { success: false, status: 404 };
	}

	const action = isAlreadyClapped(story, userId) ? unClapStory : clapStory;
	const clapId = story.claps.length;
	action(clapId, story, userId, storyId);

	return { success: true, status: 200 };
};

export const addComment = (content, storyId, comments, userId) => {
	if (!content) {
		return { success: false, status: 400 };
	}

	const comment = {
		id: comments.length + 1,
		content,
		storyId,
		userId,
	};

	comments.push(comment);
	return { success: true, status: 200, id: comment.id };
};

export const getComments = (storyId, comments) => {
	const storyComments = comments.filter(
		({ storyId: currentStoryId }) => currentStoryId === storyId,
	);

	if (storyComments.length === 0) {
		return { success: false, status: 400, comments: storyComments };
	}

	return { success: true, status: 200, comments: storyComments };
};

export const getStory = (storyId, stories) => {
	if (!isValidContent(story)) {
		return { success: true, status: 400 };
	}

	if (!doesStoryExists(storyId, stories)) {
		return { success: false, status: 404 };
	}

	const story = stories.find((story) => story.id === id);
	return { success: true, status: 200, story };
};

const addStory = (id, { title, content, authorId }, stories) => {
	const story = {
		id,
		authorId,
		title,
		content,
		claps: [],
		comments: [],
	};

	stories.push(story);
};

export const createStoryHandler = (storyToCreate, stories) => {
	const { title, content } = storyToCreate;
	const isValidContent = ![content.trim().length, title.trim().length].includes(
		0,
	);

	if (!isValidContent) {
		return { success: false, status: 400 };
	}

	const id = stories.length + 1;
	addStory(id, storyToCreate, stories);

	return { success: true, status: 200 };
};

export const deleteStory = (storyId, stories) => {
	const storyIndex = stories.findIndex(
		({ storyId: currentStoryId }) => currentStoryId === storyId,
	);

	if (storyIndex === -1) {
		return { success: false, status: 400 };
	}

	stories.splice(storyIndex, 1);
	return { success: true, status: 200 };
};