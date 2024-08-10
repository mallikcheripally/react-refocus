import { useEffect, useRef, RefObject } from 'react';

import { isBrowser } from '@/utils/environment';

/**
 * useFocusWithin
 *
 * A custom hook that manages focus within a specified container. It detects if any child element
 * within the container has focus.
 *
 * @returns {RefObject<HTMLElement>} - A ref to attach to the container element.
 *
 * @example
 * ```tsx
 * const MyComponent: React.FC = () => {
 *   const containerRef = useFocusWithin();
 *
 *   return (
 *     <div ref={containerRef}>
 *       <input type="text" placeholder="Focus within me" />
 *       <button>Focusable Button</button>
 *     </div>
 *   );
 * };
 * ```
 */
export const useFocusWithin = (): RefObject<HTMLElement> => {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isBrowser()) return;

        const handleFocusIn = (event: FocusEvent) => {
            if (containerRef.current && containerRef.current.contains(event.target as Node)) {
                containerRef.current.classList.add('focus-within');
            }
        };

        const handleFocusOut = (event: FocusEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
                containerRef.current.classList.remove('focus-within');
            }
        };

        const container = containerRef.current;
        container?.addEventListener('focusin', handleFocusIn);
        container?.addEventListener('focusout', handleFocusOut);

        return () => {
            container?.removeEventListener('focusin', handleFocusIn);
            container?.removeEventListener('focusout', handleFocusOut);
        };
    }, []);

    return containerRef;
};
