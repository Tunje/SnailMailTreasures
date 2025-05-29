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

export default api;
