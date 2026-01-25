import { logger } from './logger';

/**
 * Centralized error handling utility
 */

/**
 * Extract user-friendly error message from error object
 */
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.message) {
        return error.message;
    }

    return 'Đã xảy ra lỗi. Vui lòng thử lại.';
};

/**
 * Handle API errors with consistent logging and messaging
 * @param {Error} error - The error object
 * @param {string} context - Context description (e.g., "Fetch Staycations")
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error, context) => {
    const message = getErrorMessage(error);
    const status = error.response?.status;

    logger.error(`[${context}] Error ${status ? `(${status})` : ''}:`, message);

    return message;
};

/**
 * Handle async operations with error handling
 * @param {Function} asyncFn - Async function to execute
 * @param {string} context - Context description
 * @param {Function} onError - Optional error callback
 */
export const withErrorHandling = async (asyncFn, context, onError) => {
    try {
        return await asyncFn();
    } catch (error) {
        const message = handleApiError(error, context);

        if (onError) {
            onError(message);
        }

        throw error;
    }
};
