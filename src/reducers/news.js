import { GET_FIRST_PAGE_NEWS, GET_OTHER_PAGE_NEWS } from "../types";

export default function news(
  state = {
    firstPage: [],
    otherPage: [],
    count: 0,
    page: 1
  },
  action = {}
) {
  switch (action.type) {
    case GET_FIRST_PAGE_NEWS:
      return {
        ...state,
        firstPage: action.news.news,
        count: action.news.count,
        page: action.news.page
      };
    case GET_OTHER_PAGE_NEWS:
      return {
        ...state,
        otherPage: action.news.news,
        count: action.news.count,
        page: action.news.page
      };
    default:
      return state;
  }
}
