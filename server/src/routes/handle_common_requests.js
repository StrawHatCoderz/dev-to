import { getAllStories, login, logout } from "../handlers/common_handlers.js";
import { session } from "../mock/current-session.js";
import { mockStories, mockUsers } from "../mock/mock-user.js";

export const handleCommonRequests = ({ route, body, params }) => {
  switch (route) {
    case "login": {
      const {username} = body;
      return login(username, mockUsers, session);
    }

    case "logout": {
      const {id} = body;
      return logout(id, session);
    }

    case "stories": {
      return getAllStories(params[0], session, mockStories);
    }
  }
};
