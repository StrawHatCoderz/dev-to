export const deleteStory = (storyId, stories) => {
  const storyIndex = stories.findIndex(({ storyId: currentStoryId }) =>
    currentStoryId === storyId
  );

  if (storyIndex === -1) {
    return { success: false, status: 400 };
  }

  stories.splice(storyIndex, 1);
  return { success: true, status: 200 };
};
