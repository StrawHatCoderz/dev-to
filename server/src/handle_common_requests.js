import { session } from "./mock/current-session.js";
import { login,logout, getEveryStory } from "./handlers/common_handlers.js";
import { mockUsers } from "./mock/mock-user.js";

export const handleCommonReqests = ({route , body}) => {


  switch (route) {
    case "login": {
      const username = body[0];
      const response = login(username, mockUsers, session);
      return response;
    }
    case "logout": {
      const userId = body[0];
      const response = logout(userId, session);
      return response;
    }
    case "stories": {
      return getEveryStory(stories);
    }
  }
};
