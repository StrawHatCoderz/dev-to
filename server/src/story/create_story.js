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
    comments : []
  }
}

let storyId = 0;

export const createStoryHandler = (title, content, authorId, stories, isDraft) => {
  const isValidContent = ![content.trim().length, title.trim().length].includes(0);
  if (!isValidContent) {
    return { success: false, status: 400 };
  }

  const story = createStory(title, content, ++storyId, authorId);
  (isDraft) ? stories.drafts.push(story) : stories.published.push(story);

  return { success: true, status: 200 };
}