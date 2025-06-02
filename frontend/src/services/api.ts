import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://snailmailtreasures.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the base URL for debugging
console.log('API Base URL:', api.defaults.baseURL);

// Add a request interceptor to include the JWT token in the Authorization header
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
