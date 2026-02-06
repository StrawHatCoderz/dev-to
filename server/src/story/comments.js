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
  const storyComments = comments.filter(({ storyId: currentStoryId }) =>
    currentStoryId === storyId
  );

  if (storyComments.length === 0) {
    return { success: false, status: 400, comments: storyComments };
  }
  return { success: true, status: 200, comments: storyComments };
};
