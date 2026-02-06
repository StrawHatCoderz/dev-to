export const isIdExistInTheStories = (storyId, stories) => {
  return stories.some((story) => story.id === storyId);
};

export const retrieveStoryById = (id, stories) => {
  return stories.find((story) => story.id === id);
};

export const doesContentExist = (story) => {
  return story.content.length !== 0;
}

export const getStory = (storyId, stories) => {
  if (!isIdExistInTheStories(storyId, stories)) {
    return { success: false, status: 404 };
  }
  const story = retrieveStoryById(storyId, stories);
  if (!doesContentExist(story)) {
    return { success: true, status: 400 };
  }
  return { success: true, status: 200 , story};
};
