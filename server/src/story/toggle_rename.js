let clapId = 0;

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

export const toggleClapHandler = (userId, storyId, stories) => {
	const story = stories.find((story) => story.id === storyId);

	if (!story) {
		return { success: false, status: 404 };
	}

	const action = isAlreadyClapped(story, userId) ? unClapStory : clapStory;
	action(clapId++, story, userId, storyId);

	return { success: true, status: 200 };
};
