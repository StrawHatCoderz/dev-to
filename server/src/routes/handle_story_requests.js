import { createStory, deleteStory } from "../handlers/story_handlers.js";
import { mockStories } from "../mock/mock-user.js";

export const handleStoryRequests = ({ route, body, params }) => {
  switch (route) {
    case "create": {
      return createStory(body, mockStories);
    }
    case "delete": {
      const response = deleteStory(params[0], mockStories);
      return response;
    }
  }
};
