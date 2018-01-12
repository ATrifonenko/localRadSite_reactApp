import { GET_NEWS_TITLE } from "../types";
import api from "../api";

export const newsTitle = title => ({
  type: GET_NEWS_TITLE,
  title
});

export const getNewsTitle = requestedUser => dispatch =>
  api.dashboard.news
    .getTitle(requestedUser)
    .then(res => dispatch(newsTitle(res.title)));
