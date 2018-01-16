import { GET_NEWS_TITLE, IS_EDIT_NEWS } from "../types";

export default function dashboard(
  state = { news: [], isEditNews: "" },
  action = {}
) {
  switch (action.type) {
    case GET_NEWS_TITLE:
      return { ...state, news: action.dashboardNews.news };
    case IS_EDIT_NEWS:
      return { ...state, isEditNews: action.newsId };
    default:
      return state;
  }
}
