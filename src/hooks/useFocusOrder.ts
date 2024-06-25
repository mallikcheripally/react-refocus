import { useRef, useEffect } from 'react';

/**
 * useFocusOrder
 *
 * A hook to manage the tab order of an element dynamically.
 *
 * @param {number} order - The tab order for the element.
 * @returns {React.RefObject<HTMLElement>} - A ref object to be attached to the element.
 */
export const useFocusOrder = (order: number): React.RefObject<HTMLElement> => {
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.tabIndex = order;
        }
    }, [order]);

    return elementRef;
};
