import axios from "axios";

const api = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "http://localhost:3000/",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  ({ data }) => {
    console.log("data", data);

    const response = data;
    if (response.status === "success") return response.data;
    throw response.data;
  },

  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error.response.data.data);
  }
);

export default api;
