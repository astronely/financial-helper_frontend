import { handleError } from './errorHandlers';

export const setupInterceptors = (instance) => {
    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.request.use(
        (config) => {
            // console.log(config)
            return config;
        },
        (error) => Promise.reject(error)
    )

    // Response interceptor
    instance.interceptors.response.use(
        (response) => response.data,
        (error) => handleError(error) // Обработка ошибок
    );
};