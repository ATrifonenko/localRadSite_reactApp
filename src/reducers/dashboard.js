import { GET_NEWS_TITLE } from "../types";

export default function dashboard(state = { news: [] }, action = {}) {
  switch (action.type) {
    case GET_NEWS_TITLE:
      return action.title;
    default:
      return state;
  }
}
