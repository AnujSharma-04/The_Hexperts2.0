import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api'; // Flask backend URL
const NEWS_API_KEY = 'a6090960782c4e319b13e43f86b09dc2'; // Your News API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything'; // Base URL for News API

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

// Function to fetch latest news about disasters
export const getDisasterNews = async (query = 'disaster OR calamity') => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: query, // Search for articles related to disaster or calamity
        apiKey: NEWS_API_KEY,
        language: 'en', // Set the language to English
        // country: 'in',
        sortBy: 'publishedAt', // Sort news by latest published
      },
    });
    return response.data.articles; // Return the articles list
  } catch (error) {
    console.error('Error fetching disaster news:', error);
    return [];
  }
};

export const login = (email, password) => {
  return api.post('/login', { email, password }, { withCredentials: true });
};

// Alternative login implementation using fetch
export const loginWithFetch = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = (name, email, phone, district, password) => {
  return api.post('/register', { name, email, phone, district, password });
};

export const getNotifications = () => {
  return api.get('/notification/get');
};

export const reportDisaster = (disasterData) => {
  return api.post('/disaster/report', disasterData);  // ✅ Use `api.post` so JWT is included
};



// Other API calls can go here

export default api;
