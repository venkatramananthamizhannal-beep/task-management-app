import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taskmaster_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (localStorage.getItem('taskmaster_token')) {
        localStorage.removeItem('taskmaster_token');
        localStorage.removeItem('taskmaster_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
