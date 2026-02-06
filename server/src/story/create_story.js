export const createStoryHandler = (content, authorId, stories, isDraft) => {
  if (isDraft) {
    stories.drafts.push(content);
  } else {
    stories.published.push(content);
  }

}