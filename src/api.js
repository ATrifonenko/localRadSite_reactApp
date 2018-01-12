import axios from "axios";

export default {
  user: {
    checkAuth: () =>
      axios.get("/api/users/checkAuth.php").then(res => res.data),
    login: credentials =>
      axios
        .post("/api/users/login.php", JSON.stringify(credentials))
        .then(res => res.data),
    logout: () => axios.get("/api/users/logout.php").then(res => res.data),
    signup: credentials =>
      axios
        .post("/api/users/signup.php", JSON.stringify(credentials))
        .then(res => res.data)
  },
  main: {
    getMain: () => axios.post("/api/getMain.php").then(res => res.data)
  },
  dashboard: {
    news: {
      addNews: data =>
        axios
          .post("/api/news/addNews.php", JSON.stringify(data))
          .then(res => res.data),
      getTitle: () => axios.post("/api/news/getTitle.php").then(res => res.data)
    }
  }
};
