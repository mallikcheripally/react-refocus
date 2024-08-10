import { useEffect, useRef } from 'react';

import { isBrowser } from '@/utils/environment';
import { isFocusable } from '@/utils/focusUtils';

/**
 * useFocusReturn
 *
 * A custom hook that remembers and restores focus to the previously focused element after certain interactions.
 *
 * @example
 * ```tsx
 * const MyComponent: React.FC = () => {
 *   useFocusReturn();
 *
 *   return (
 *     <div>
 *       <button>Click me</button>
 *     </div>
 *   );
 * };
 * ```
 */
export const useFocusReturn = (): void => {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isBrowser()) return;

        // Save the currently focused element (if any)
        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        return () => {
            const element = previouslyFocusedElement.current;
            if (element && isFocusable(element)) {
                try {
                    element.focus();
                } catch (error) {
                    console.error('Failed to return focus to the previous element:', error);
                }
            }
        };
    }, []);
};
