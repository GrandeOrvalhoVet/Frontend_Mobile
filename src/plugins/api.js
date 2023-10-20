import axios from "axios";

const api = axios.create({
  baseURL: "http://191.52.57.205:19003/api/",
});

export default api;
