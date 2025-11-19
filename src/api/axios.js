import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true, 
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Restore token from localStorage on app startup
const token = localStorage.getItem('auth_token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
