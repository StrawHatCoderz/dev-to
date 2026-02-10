import { findStory } from "./utils.js";

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

const doesStoryExists = (storyId, stories) => {
  return stories.some((story) => story.id === storyId);
};

const addStory = (id, { title, content, authorId, isPublished }, stories) => {
  const story = {
    id,
    authorId,
    title,
    content,
    claps: [],
    isPublished,
    comments: [],
  };

  stories.push(story);
};

export const toggleClap = (userId, storyId, stories) => {
  const story = stories.find((story) => story.id === storyId);

  if (!story) {
    return { success: false, status: 404 };
  }

  const action = isAlreadyClapped(story, userId) ? unClapStory : clapStory;
  const clapId = story.claps.length;
  action(clapId, story, userId, storyId);

  return { success: true, status: 200 };
};

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
  const storyComments = comments.filter(
    ({ storyId: currentStoryId }) => currentStoryId === storyId,
  );

  if (storyComments.length === 0) {
    return { success: false, status: 400, comments: storyComments };
  }

  return { success: true, status: 200, comments: storyComments };
};

export const getStory = (storyId, stories) => {
  const story = stories.find((story) => story.id === storyId);

  if (!doesStoryExists(storyId, stories)) {
    return { success: false, status: 404 };
  }

  return { success: true, status: 200, story };
};

const insertStory = (database, storyToCreate) => {
  const { title, content, authorId } = storyToCreate;
  const query = `INSERT INTO stories(title, content, author_id) VALUES (?,?,?)`;
  const statement = database.prepare(query);
  return statement.run(title, content, authorId);
};

export const createStory = (database, storyToCreate) => {
  const { title, content } = storyToCreate;
  const isValidContent = ![content.trim().length, title.trim().length].includes(
    0,
  );

  if (!isValidContent) {
    return { success: false, status: 400 };
  }

  const { lastInsertRowid } = insertStory(database, storyToCreate);

  return { success: true, status: 200, storyId: lastInsertRowid };
};
const removeStory = (database, storyId) => {
  const query = `DELETE FROM stories where story_id = ?`;
  const statement = database.prepare(query);
  return statement.run(storyId);
};

export const deleteStory = (database, storyId) => {
  const story = findStory(database, storyId);
  if (story.length < 1) {
    return { success: false, status: 400 };
  }

  removeStory(database, storyId);

  return { success: true, status: 200 };
};
