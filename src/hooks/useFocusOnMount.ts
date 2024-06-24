import { useEffect, useRef, RefObject } from 'react';
import { isFocusable } from 'utils/focusUtils';
import { isBrowser } from 'utils/environment';

/**
 * useFocusOnMount
 *
 * A custom hook that automatically sets focus on the referenced element when the component mounts.
 *
 * @param {boolean} [shouldFocus=true] - Optional boolean to conditionally apply focus.
 * @returns {RefObject<HTMLElement>} - A ref to attach to the element that should receive focus on mount.
 *
 * @example
 * ```tsx
 * const MyComponent: React.FC = () => {
 *   const focusRef = useFocusOnMount();
 *
 *   return (
 *     <input ref={focusRef} type="text" placeholder="Focus on mount" />
 *   );
 * };
 * ```
 */
export const useFocusOnMount = (shouldFocus: boolean = true): RefObject<HTMLElement> => {
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isBrowser()) return;

        if (shouldFocus && elementRef.current && isFocusable(elementRef.current)) {
            try {
                elementRef.current.focus();
            } catch (error) {
                console.error('Failed to focus element:', error);
            }
        }
    }, [shouldFocus]);

    return elementRef;
};
