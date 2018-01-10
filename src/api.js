import axios from "axios";

export default {
  user: {
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
  }
};
