import axios from 'axios';
import {setupInterceptors} from './interceptors';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error('API base URL is not defined in .env file')
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    handlers: {'content-Type': 'application/json'},
    withCredentials: true
});

setupInterceptors(axiosInstance);

export default axiosInstance;