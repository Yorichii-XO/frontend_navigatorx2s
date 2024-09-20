import axios from 'axios';
import router from '../router'; // Adjust the path if needed

// Request Interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized access
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;