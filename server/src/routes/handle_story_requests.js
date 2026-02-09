import { createStory, deleteStory } from "../handlers/story_handlers.js";

export const handleStoryRequests = ({ route, body, params }) => {
  switch (route) {
    case "create": {
      const response = createStory(body, stories)
      return response;
    }
    case "delete": {
      const response = deleteStory(params[0], stories)
      return response;
    }
  }

}