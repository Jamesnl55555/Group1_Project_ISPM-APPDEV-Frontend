import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // send cookies
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Remove token logic entirely for session-based auth
export default axiosInstance;
