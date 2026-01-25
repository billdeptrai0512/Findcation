/**
 * Centralized logging utility
 * Only logs in development mode to avoid console pollution in production
 */

const isDev = import.meta.env.DEV;

export const logger = {
    /**
     * Log general information (development only)
     */
    log: (...args) => {
        if (isDev) {
            console.log(...args);
        }
    },

    /**
     * Log warnings (development only)
     */
    warn: (...args) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    /**
     * Log errors (always logged, even in production)
     */
    error: (...args) => {
        console.error(...args);
    },

    /**
     * Log debug information (development only)
     */
    debug: (...args) => {
        if (isDev) {
            console.debug(...args);
        }
    },

    /**
     * Log table data (development only)
     */
    table: (data) => {
        if (isDev) {
            console.table(data);
        }
    }
};
