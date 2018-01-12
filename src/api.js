import axios from "axios";

export default {
  user: {
    checkAuth: () => axios.get("/api/checkAuth.php").then(res => res.data),
    login: credentials =>
      axios
        .post("/api/login.php", JSON.stringify(credentials))
        .then(res => res.data),
    logout: () => axios.get("/api/logout.php").then(res => res.data),
    signup: credentials =>
      axios
        .post("/api/signup.php", JSON.stringify(credentials))
        .then(res => res.data)
  },
  main: {
    getMain: () => axios.post("/api/getMain.php").then(res => res.data)
  },
  moderate: {
    publish: data =>
      axios.post("/api/addNews.php", JSON.stringify(data)).then(res => res.data)
  }
};
