import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "https://mern-ecom-test.onrender.com/";

const http = axios.create({
  baseURL: `${API_BASE}/api`,  // all API requests go through here
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
