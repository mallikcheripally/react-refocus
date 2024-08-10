import {useEffect, useRef, RefObject, MutableRefObject} from 'react';

import { isFocusable } from '@/utils/focusUtils';
import { isBrowser } from '@/utils/environment';

/**
 * useFocusOnMount
 *
 * A custom hook that automatically sets focus on the referenced element when the component mounts.
 *
 * @param {boolean} [shouldFocus=true] - Optional boolean to conditionally apply focus.
 * @returns {MutableRefObject<HTMLElement>} - A ref to attach to the element that should receive focus on mount.
 */
export const useFocusOnMount = <T extends HTMLElement = HTMLElement>(shouldFocus: boolean = true): React.MutableRefObject<T | null> => {
    const elementRef: MutableRefObject<T | null> = useRef<T | null>(null);

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
