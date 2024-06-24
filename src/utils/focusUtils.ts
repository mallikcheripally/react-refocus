/**
 * Utility function to determine if an element is focusable.
 *
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} - True if the element is focusable, otherwise false.
 */
export const isFocusable = (element: HTMLElement): boolean => {
    if (!element) return false;

    const focusableSelectors = [
        'a[href]',
        'button',
        'textarea',
        'input',
        'select',
        'iframe',
        '[contenteditable="true"]',
        '[tabindex]:not([tabindex="-1"])'
    ];

    return focusableSelectors.some((selector) => element.matches(selector));
};

/**
 * Utility function to get all focusable elements within a container.
 *
 * @param {HTMLElement} container - The container to search within.
 * @returns {NodeListOf<HTMLElement>} - A list of focusable elements.
 */
export const getFocusableElements = (container: HTMLElement): NodeListOf<HTMLElement> => {
    return container.querySelectorAll(
        'a[href], button, textarea, input, select, iframe, [contenteditable="true"], [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
};
