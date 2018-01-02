import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios
        .post("//radmvd.local/api/login.php", JSON.stringify(credentials))
        .then(res => res.data)
  }
};
