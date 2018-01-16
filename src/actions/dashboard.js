import { GET_NEWS_TITLE, IS_EDIT_NEWS } from "../types";
import api from "../api";

export const newsTitle = dashboardNews => ({
  type: GET_NEWS_TITLE,
  dashboardNews
});

export const editingNews = newsId => ({
  type: IS_EDIT_NEWS,
  newsId
});

export const getNewsTitle = requestedUser => dispatch =>
  api.dashboard.news
    .getTitle(requestedUser)
    .then(res => dispatch(newsTitle(res.dashboardNews)));

export const editingNewsState = newsId => dispatch => {
  dispatch(editingNews(newsId));
};
