/**
 * Checks if the code is running in a browser environment.
 *
 * @returns {boolean} - True if running in a browser, otherwise false.
 */
export const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';
