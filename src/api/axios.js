import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ensures cookies are sent
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axiosInstance;
