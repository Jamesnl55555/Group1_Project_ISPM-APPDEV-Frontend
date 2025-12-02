import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ensures cookies are sent
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Optional: intercept requests to always attach token (if it changes dynamically)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
