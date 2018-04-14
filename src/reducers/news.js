import { GET_NEWS } from "../types";

export default function news(
  state = {news:[]},
  action = {}
) {
  switch (action.type) {
    case GET_NEWS:
      return { news: action.news };
    default:
      return state;
  }
}
