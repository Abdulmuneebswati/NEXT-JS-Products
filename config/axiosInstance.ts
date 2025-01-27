import axios from 'axios';
import { cookies } from 'next/headers';

const newRequest = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/`,
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
