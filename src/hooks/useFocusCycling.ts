import { useEffect } from 'react';

/**
 * useFocusCycling
 *
 * A custom hook to enable cycling focus through focusable elements within a container.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - The ref of the container element.
 * @param {string[]} [customSelectors=[]] - Additional selectors for custom focusable elements.
 */
const useFocusCycling = (containerRef: React.RefObject<HTMLElement>, customSelectors: string[] = []) => {
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
                '[tabindex]:not([tabindex="-1"])',
            ];

            const selectors = defaultSelectors.concat(customSelectors).join(',');
            const focusableElements = Array.from(containerRef.current.querySelectorAll<HTMLElement>(selectors)).filter(
                (el) => !el.hasAttribute('disabled'),
            );

            const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    // Cycle backward
                    if (currentIndex === 0) {
                        focusableElements[focusableElements.length - 1].focus();
                        event.preventDefault();
                    } else {
                        focusableElements[currentIndex - 1].focus();
                        event.preventDefault();
                    }
                } else {
                    // Cycle forward
                    if (currentIndex === focusableElements.length - 1) {
                        focusableElements[0].focus();
                        event.preventDefault();
                    } else {
                        focusableElements[currentIndex + 1].focus();
                        event.preventDefault();
                    }
                }
            }
        };

        const container = containerRef.current;
        container?.addEventListener('keydown', handleKeyDown);

        return () => {
            container?.removeEventListener('keydown', handleKeyDown);
        };
    }, [containerRef, customSelectors]);
};

export default useFocusCycling;
