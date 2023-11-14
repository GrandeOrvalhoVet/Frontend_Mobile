import axios from "axios";

const api = axios.create({
  baseURL: "https://grandeorvalho-dev-scbe.3.us-1.fl0.io/api/",
});

export default api;
