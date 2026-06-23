import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim();
const API = axios.create({
  baseURL: backendUrl ? `${backendUrl.replace(/\/$/, "")}/api` : "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

export default API; 
