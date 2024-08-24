import { useEffect, useRef } from 'react';
import { isBrowser } from '@/utils/environment';

export const useFocusWithin = (): ((element: HTMLElement | null) => void) => {
    const containerRef = useRef<HTMLElement | null>(null);

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

    const setRef = (element: HTMLElement | null) => {
        if (!isBrowser()) return;
        if (element) {
            containerRef.current = element;
            element.addEventListener('focusin', handleFocusIn);
            element.addEventListener('focusout', handleFocusOut);
        } else if (containerRef.current) {
            containerRef.current.removeEventListener('focusin', handleFocusIn);
            containerRef.current.removeEventListener('focusout', handleFocusOut);
            containerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (isBrowser() && containerRef.current) {
                containerRef.current.removeEventListener('focusin', handleFocusIn);
                containerRef.current.removeEventListener('focusout', handleFocusOut);
            }
        };
    }, []);

    return setRef;
};
