// stories : {
//   drafts : [{
//     title : abc title,
//     storyContent : abcd content
//     storyId : 1,
//     authorId : 1,
//     claps : 10,
//     comments: []
//   }]
// }

export const createStory = (title, content, id, authorId) => {
  return {
    id,
    title,
    content,
    authorId,
    claps: [],
    comments: [],
  };
};

export const createStoryHandler = (storyToCreate, stories, isDraft) => {
  const { title, content, authorId } = storyToCreate;
  const isValidContent = ![content.trim().length, title.trim().length].includes(0);

  if (!isValidContent) {
    return { success: false, status: 400 };
  }

  const id = (isDraft) ? stories.drafts.length + 1 : stories.published.length + 1;

  const story = createStory(title, content, id, authorId);
  isDraft ? stories.drafts.push(story) : stories.published.push(story);

  return { success: true, status: 200 };
};
