import axios from 'axios';
import { logger } from '../utils/logger';

/**
 * Centralized API configuration
 */

// Validate required environment variables
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_BACKEND_URL environment variable is not defined');
}

/**
 * Configured axios instance for API calls
 */
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor - log requests in development
 */
apiClient.interceptors.request.use(
    (config) => {
        logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        logger.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - handle common errors
 */
apiClient.interceptors.response.use(
    (response) => {
        logger.debug(`API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;

        logger.error(`API Error [${status}]:`, message);

        // Handle common HTTP errors
        if (status === 401) {
            logger.warn('Unauthorized - redirecting to login may be needed');
        } else if (status === 403) {
            logger.warn('Forbidden - insufficient permissions');
        } else if (status === 404) {
            logger.warn('Resource not found');
        } else if (status >= 500) {
            logger.error('Server error - please try again later');
        }

        return Promise.reject(error);
    }
);

/**
 * Helper to create FormData requests
 */
export const createFormDataRequest = (url, data, files = []) => {
    const formData = new FormData();

    // Append JSON data
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    });

    // Append files
    files.forEach(file => {
        formData.append('images', file);
    });

    return apiClient.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
