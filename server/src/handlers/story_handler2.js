// const getClapIndex = (story, userId) =>
// 	story.claps.findIndex((clap) => clap.clappedBy === userId);

// const isAlreadyClapped = (story, userId) => {
// 	return getClapIndex(story, userId) !== -1;
// };

// const unClapStory = (_id, story, userId, _storyId) => {
// 	const clapIndex = getClapIndex(story, userId);
// 	story.claps.splice(clapIndex, 1);
// };

// const clapStory = (id, story, clappedBy, storyId) => {
// 	const clap = { id, storyId, clappedBy };
// 	story.claps.push(clap);
// };

// const doesStoryExists = (storyId, stories) => {
// 	return stories.some((story) => story.id === storyId);
// };

// const addStory = (id, { title, content, authorId, isPublished }, stories) => {
// 	const story = {
// 		id,
// 		authorId,
// 		title,
// 		content,
// 		claps: [],
// 		isPublished,
// 		comments: [],
// 	};

// 	stories.push(story);
// };

// export const toggleClap = (userId, storyId, stories) => {
// 	const story = stories.find((story) => story.id === storyId);

// 	if (!story) {
// 		return { success: false, status: 404 };
// 	}

// 	const action = isAlreadyClapped(story, userId) ? unClapStory : clapStory;
// 	const clapId = story.claps.length;
// 	action(clapId, story, userId, storyId);

// 	return { success: true, status: 200 };
// };

// export const getComments = (storyId, comments) => {
// 	const storyComments = comments.filter(
// 		({ storyId: currentStoryId }) => currentStoryId === storyId,
// 	);

// 	if (storyComments.length === 0) {
// 		return { success: false, status: 400, comments: storyComments };
// 	}

// 	return { success: true, status: 200, comments: storyComments };
// };

// export const createStory = (storyToCreate, stories) => {
// 	const { title, content } = storyToCreate;
// 	const isValidContent = ![content.trim().length, title.trim().length].includes(
// 		0,
// 	);

// 	if (!isValidContent) {
// 		return { success: false, status: 400 };
// 	}

// 	const id = stories.length + 1;
// 	addStory(id, storyToCreate, stories);

// 	return { success: true, status: 200 };
// };

// export const deleteStory = (storyId, stories) => {
// 	const storyIndex = stories.findIndex(
// 		({ storyId: currentStoryId }) => currentStoryId === storyId,
// 	);

// 	if (storyIndex === -1) {
// 		return { success: false, status: 400 };
// 	}

// 	stories.splice(storyIndex, 1);
// 	return { success: true, status: 200 };
// };

export const retrieveStoryById = (database, id) => {
  const query = `SELECT * FROM stories WHERE story_id = ?`;
  const statement = database.prepare(query);
  return statement.get(id);
};

export const getStory = (storyId) => {
  const story = retrieveStoryById(storyId);
  if (story === undefined) {
    return { success: false, status: 404 };
  }

  return { success: true, status: 200, story };
};

export const insertComment = (database, storyId, content, commented_by) => {
  const query =
    `INSERT INTO comments (story_id, content, commented_by) values (?, ?, ?)`;
  const insertStatement = database.prepare(query);
  return insertStatement.run(storyId, content, commented_by);
};

export const createComment = (storyId, content, commented_by) => {
  if (!content) return { success: false, status: 400 };
  const { lastInsertRowId } = insertComment(storyId, content, commented_by);
  return { success: true, status: 200, id: lastInsertRowId };
};
