import axios from 'axios';

const BASE_URL_CALL_API = process.env.REACT_APP_BASE_URL_API

const api = axios.create({
    baseURL: BASE_URL_CALL_API,
    withCredentials: true, 
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      window.location.href = "/login"
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default api;