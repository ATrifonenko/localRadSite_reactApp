import { GET_NEWS_TITLE, IS_EDIT_NEWS } from "../types";

export default function dashboard(
  state = { news: [], count: 0, isEditNews: "" },
  action = {}
) {
  switch (action.type) {
    case GET_NEWS_TITLE:
      return {
        ...state,
        news: action.dashboardNews.news,
        count: action.dashboardNews.count
      };
    case IS_EDIT_NEWS:
      return { ...state, isEditNews: action.newsId };
    default:
      return state;
  }
}
