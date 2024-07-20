import { useEffect } from 'react';

/**
 * useArrowKeyNavigation
 *
 * A custom hook to enable arrow key navigation through focusable elements
 * within a specified container.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - The ref of the container element.
 * @param {string[]} [customSelectors=[]] - Additional selectors for custom focusable elements.
 */
const useArrowKeyNavigation = (
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

            const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    if (currentIndex < focusableElements.length - 1) {
                        focusableElements[currentIndex + 1].focus();
                        event.preventDefault();
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    if (currentIndex > 0) {
                        focusableElements[currentIndex - 1].focus();
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

export default useArrowKeyNavigation;
