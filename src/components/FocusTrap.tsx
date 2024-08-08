import React, { useRef, useEffect, ReactNode, forwardRef, useImperativeHandle, HTMLAttributes } from 'react';

import { getFocusableElements } from '@/utils/focusUtils';
import { isBrowser } from '@/utils/environment';

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

    useEffect(() => {
        if (!isBrowser() || !containerRef.current) return;

        const trapFocus = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            const focusableElements = Array.from(
                // @ts-ignore
                getFocusableElements(containerRef.current) as NodeListOf<HTMLElement>,
            );

            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

            if (event.shiftKey) {
                if (currentIndex <= 0) {
                    lastElement.focus();
                    event.preventDefault();
                } else {
                    focusableElements[currentIndex - 1].focus();
                    event.preventDefault();
                }
            } else {
                if (currentIndex === -1 || currentIndex >= focusableElements.length - 1) {
                    firstElement.focus();
                    event.preventDefault();
                } else {
                    focusableElements[currentIndex + 1].focus();
                    event.preventDefault();
                }
            }
        };

        const handleFocus = (event: FocusEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                event.stopPropagation();
                const focusableElements = Array.from(
                    getFocusableElements(containerRef.current) as NodeListOf<HTMLElement>,
                );
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        };

        const currentContainer = containerRef.current;
        currentContainer.addEventListener('keydown', trapFocus);
        currentContainer.addEventListener('focusin', handleFocus);

        return () => {
            currentContainer.removeEventListener('keydown', trapFocus);
            currentContainer.removeEventListener('focusin', handleFocus);
        };
    }, [containerRef]);

    return (
        <div ref={containerRef} className={className} {...rest} tabIndex={-1}>
            {children}
        </div>
    );
});

FocusTrap.displayName = 'FocusTrap';
