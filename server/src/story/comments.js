export const addComment = (commentContent, storyId, comments, userId) => {
  if (!commentContent) {
    return { success: false, status: 400 };
  }

  const comment = {
    id: comments.length + 1,
    commentContent,
    storyId,
    userId,
  };

  comments.push(comment);
  return { success: true, status: 200, id: comment.id };
};
