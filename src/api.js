import axios from "axios";

export default {
  user: {
    checkAuth: () => axios.get("/api/users/checkAuth").then(res => res.data),
    login: credentials =>
      axios.post("/api/users/login", credentials).then(res => res.data),
    logout: () => axios.get("/api/users/logout").then(res => res.data),
    signup: credentials =>
      axios.post("/api/users/signup", credentials).then(res => res.data)
  },
  main: {
    getMain: () => axios.get("/api/getMain").then(res => res.data),
    getFile: filePath =>
      axios.get(filePath, { responseType: "blob" }).then(res => res)
  },
  dashboard: {
    news: {
      addNews: data =>
        axios
          .post("/api/news/addNews", data, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => res.data),
      editNews: data =>
        axios
          .post("/api/news/editNews", data, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => res.data),
      deleteNews: data =>
        axios.post("/api/news/delNews", data).then(res => res.data),
      getTitle: () => axios.post("/api/news/getTitle").then(res => res.data)
    }
  },
  phonebook: {
    getAll: () =>
      axios.get("/api/phonebook/getPhoneBook").then(res => res.data),
    edit: data =>
      axios.post("/api/phonebook/editPhoneBook", data).then(res => res.data),
    delPerson: data =>
      axios.post("/api/phonebook/delPerson", data).then(res => res.data)
  }
};
