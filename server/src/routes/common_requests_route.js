import { getAllStories, login, logout } from "../handlers/common_handlers.js";
import { session } from "../mock/current-session.js";
import { mockStories } from "../mock/mock-user.js";

export const handleCommonRequests = ({ route, body }, database) => {
  switch (route) {
    case "login": {
      const {username} = body;
      return login(database, username);
    }

    case "logout": {
      const {id} = body;
      return logout(id, session);
    }

    case "stories": {
      return getAllStories(mockStories);
    }
  }
};
