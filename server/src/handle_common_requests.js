import { session } from "./current-session.js";
import { getEveryStory, login, logout } from "./handlers/common_handlers.js";
import { mockUsers, stories } from "./user/mock-user.js";

export const handleCommonReqests = ({ route, body }) => {

  switch (route) {
    case "login": {
      const username = body;
      const response = login(username, mockUsers, session);
      return response;
    }
    case "logout": {
      const userId = body;
      const response = logout(userId, session);
      return response;
    }
    case "stories": {
      return getEveryStory(stories);
    }
  }
};
