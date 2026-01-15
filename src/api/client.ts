import axios from 'axios';

const API_BASE_URL = 'https://api.your-backend.com'; // todo: replace with env var

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor to inject the token into every request
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('session_token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
