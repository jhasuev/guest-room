import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jsonbin.io/v3/b/680a7eee8561e97a5006c544",
  headers: {
    Accept: "application/json",
    "X-Master-Key":
      "$2a$10$9QfohfhkDfNZnGPkr4ZdAe1ZHDQf/QhYFPEHd9gdr/85uOxz/GXEW",
  },
});

api.interceptors.response.use(
  ({ data }) => {
    console.log("data", data);

    return data.record;
  },

  (error) => {
    console.log("error", error);

    return Promise.reject(error);
  }
);

export default api;
