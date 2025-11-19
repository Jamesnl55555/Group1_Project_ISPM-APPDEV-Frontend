import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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
