import { addComment, createStory, deleteStory, getComments, getStory, toggleClap } from "../handlers/story_handlers1.js";
import { mockStories } from "../mock/mock-user.js";

export const handleStoryRequests = ({ route, body, params }, database) => {
  switch (route) {
    case "create": {
      return createStory(database, body.storyToCreate);
    }
    case "delete": {
      return deleteStory(database, body.id);
    }
    case "story": {
      const storyId = params[0];
      return getStory(storyId, mockStories)
    }
    case "get-comments": {
      const storyId = params[0];
      return getComments(storyId, comments)
    }
    case "add-comment": {
      return addComment(body.content, body.storyId, comments, body.userId)
    }
    case "toggle-clap": {
      return toggleClap(body.userId, body.storyId, mockStories)
    }
  }
};

