import { GET_NEWS } from "../types";

const allNews = news => ({
  type: GET_NEWS,
  news
});

export default allNews;