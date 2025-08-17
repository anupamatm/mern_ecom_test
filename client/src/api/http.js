import axios from "axios";

export const API_BASE = "http://localhost:5000";  // 👈 add this

const http = axios.create({
  baseURL: `${API_BASE}/api`,  // all API requests go through here
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
