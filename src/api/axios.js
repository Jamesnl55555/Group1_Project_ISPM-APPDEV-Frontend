import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
  headers: {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
  }
  return config;
});
export default axiosInstance;
