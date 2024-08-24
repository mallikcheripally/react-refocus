import { useEffect, useRef } from 'react';

import { isBrowser } from '@/utils/environment';
import { isFocusable } from '@/utils/focusUtils';

/**
 * useFocusReturn
 *
 * A custom hook that remembers and restores focus to the previously focused element after certain interactions.
 */
export const useFocusReturn = (): void => {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isBrowser()) return;

        const currentFocusedElement = document.activeElement as HTMLElement;

        // Avoid saving <body> or null as the focused element
        if (currentFocusedElement && currentFocusedElement.tagName !== 'BODY' && isFocusable(currentFocusedElement)) {
            previouslyFocusedElement.current = currentFocusedElement;
        }

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
