import { GET_FIRST_PAGE_NEWS, GET_OTHER_PAGE_NEWS } from "../types";

export const otherPageNews = news => ({
  type: GET_OTHER_PAGE_NEWS,
  news
});

export const firstPageNews = news => ({
  type: GET_FIRST_PAGE_NEWS,
  news
});
