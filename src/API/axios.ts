import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Get the authentication token from storage (e.g., localStorage, sessionStorage)
    const authToken = localStorage.getItem('authToken');

    // If a token exists, add it to the request headers
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }    
    // Return the modified config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;