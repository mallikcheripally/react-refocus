import React, {
    useRef,
    useEffect,
    ReactNode,
    forwardRef,
    useImperativeHandle,
    HTMLAttributes,
    useCallback,
} from 'react';

import { getFocusableElements } from 'utils/focusUtils';
import { isBrowser } from 'utils/environment';

/**
 * FocusTrapProps
 *
 * @property {ReactNode} children - The content to be rendered inside the FocusTrap.
 * @property {string} [className] - Additional class names to apply to the FocusTrap container.
 */
interface FocusTrapProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

/**
 * FocusTrap
 *
 * Traps focus within the specified container, ensuring keyboard navigation
 * remains within the container.
 *
 * @param {FocusTrapProps} props - The props for the FocusTrap component.
 * @returns {JSX.Element} - The rendered FocusTrap component.
 */
export const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>(({ children, className, ...rest }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const trapFocus = useCallback((event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const focusableElements = containerRef.current ? getFocusableElements(containerRef.current) : null;

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }, []);

    const handleFocus = useCallback((event: FocusEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            event.stopPropagation();
            const focusableElements = getFocusableElements(containerRef.current);
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }, []);

    useEffect(() => {
        if (!isBrowser()) return;

        const container = containerRef.current;
        container?.addEventListener('keydown', trapFocus);
        document.addEventListener('focusin', handleFocus);

        return () => {
            container?.removeEventListener('keydown', trapFocus);
            document.removeEventListener('focusin', handleFocus);
        };
    }, [trapFocus, handleFocus]);

    return (
        <div ref={containerRef} className={className} {...rest}>
            {children}
        </div>
    );
});

FocusTrap.displayName = 'FocusTrap';
