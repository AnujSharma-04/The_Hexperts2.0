// src/apiService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api'; // Flask backend URL

// Axios instance with Authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token'); // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const register = (name, email, phone, district, password) => {
    return api.post('/register', { name, email, phone, district, password });
  };

export const getNotifications = () => {
  return api.get('/notifications');
};

export const reportDisaster = (disasterData) => {
  return api.post('/disasters/report', disasterData);
};

// Other API calls can go here

export default api;
