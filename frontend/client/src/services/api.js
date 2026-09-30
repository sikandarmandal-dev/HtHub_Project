import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8080/api' : undefined), timeout: 20000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const dataOf = (response) => response.data.data;
export const errorOf = (error) => error.response?.data?.message || 'Something went wrong. Please try again.';
export default api;
