import axios from 'axios';
import { cookies } from 'next/headers';

const newRequest = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

newRequest.interceptors.request.use(
  async (config) => {
    const token = (await cookies()).get('session')?.value;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
