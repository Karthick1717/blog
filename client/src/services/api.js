import axios from "axios";

const API = axios.create({
  baseURL: "http://shuttle.proxy.rlwy.net:41204",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;