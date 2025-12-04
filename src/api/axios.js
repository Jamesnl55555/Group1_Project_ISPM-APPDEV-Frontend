import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
  headers: {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axiosInstance;
