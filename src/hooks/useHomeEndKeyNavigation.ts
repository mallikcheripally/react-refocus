import { useEffect } from 'react';

/**
 * useHomeEndKeyNavigation
 *
 * A custom hook to enable Home and End key navigation through focusable elements
 * within a specified container.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - The ref of the container element.
 * @param {string[]} [customSelectors=[]] - Additional selectors for custom focusable elements.
 */
const useHomeEndKeyNavigation = (
    containerRef: React.RefObject<HTMLElement>,
    customSelectors: string[] = []
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!containerRef.current) return;

            const defaultSelectors = [
                'a',
                'button',
                'input',
                'textarea',
                'select',
                'details',
                '[tabindex]:not([tabindex="-1"])'
            ];

            const selectors = defaultSelectors.concat(customSelectors).join(',');
            const focusableElements = Array.from(
                containerRef.current.querySelectorAll<HTMLElement>(selectors)
            ).filter((el) => !el.hasAttribute('disabled'));

            switch (event.key) {
                case 'Home':
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                        event.preventDefault();
                    }
                    break;
                case 'End':
                    if (focusableElements.length > 0) {
                        focusableElements[focusableElements.length - 1].focus();
                        event.preventDefault();
                    }
                    break;
                default:
                    break;
            }
        };

        const container = containerRef.current;
        container?.addEventListener('keydown', handleKeyDown);

        return () => {
            container?.removeEventListener('keydown', handleKeyDown);
        };
    }, [containerRef, customSelectors]);
};

export default useHomeEndKeyNavigation;
