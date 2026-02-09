export const createStory = (title, content, id, authorId) => {
  return {
    id,
    authorId,
    title,
    content,
    claps: [],
    comments: [],
  };
};

export const createStoryHandler = (storyToCreate, stories) => {
  const { title, content, authorId } = storyToCreate;
  const isValidContent = ![content.trim().length, title.trim().length].includes(0);

  if (!isValidContent) {
    return { success: false, status: 400 };
  }

  const id = stories.length + 1;

  const story = createStory(title, content, id, authorId);
  stories.push(story);

  return { success: true, status: 200 };
};
