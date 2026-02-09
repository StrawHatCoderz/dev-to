import { session } from "./mock/current-session.js";
import { login,logout, getEveryStory } from "./handlers/common_handlers.js";
import { mockUsers } from "./mock/mock-user.js";

export const handleCommonReqests = (requestInfo) => {
  const { command, params } = requestInfo;

  switch (command) {
    case "login": {
      const username = params[0];
      const response = login(username, mockUsers, session);
      return response;
    }
    case "logout": {
      const userId = params[0];
      const response = logout(userId, session);
      return response;
    }
    case "get every story": {
      const stories = getEveryStory(mockUsers);
      return stories;
    }

  }

}