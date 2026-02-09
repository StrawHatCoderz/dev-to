import { createStoryHandler } from "./story/create_story.js";
import { deleteStory } from "./story/delete_story.js";
import { stories } from "./user/mock-user.js";

export const handleStoryRequests = ({ route, body, params }) => {
  switch (route) {
    case "create": {
      const response = createStoryHandler(body, stories)
      return response;
    }
    case "delete": {
      const response = deleteStory(params[0], stories)
      return response;
    }
  }

  


}