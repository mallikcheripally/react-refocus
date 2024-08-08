import React, { forwardRef, ReactNode } from 'react';

import { isBrowser } from '@/utils/environment';

/**
 * FocusableProps
 *
 * @property {ReactNode} children - The content to be rendered inside the Focusable component.
 * @property {number} [tabIndex=0] - The tabIndex to make the element focusable.
 * @property {() => void} [onFocus] - Optional focus event handler.
 * @property {() => void} [onBlur] - Optional blur event handler.
 * @property {string} [className] - Additional class names to apply to the Focusable container.
 */
interface FocusableProps {
    children: ReactNode;
    tabIndex?: number;
    onFocus?: () => void;
    onBlur?: () => void;
    className?: string;
}

/**
 * Focusable
 *
 * A wrapper component that makes any element focusable, managing focus and blur events effectively.
 *
 * @param {FocusableProps} props - The props for the Focusable component.
 * @returns {JSX.Element} - The rendered Focusable component.
 */
export const Focusable = forwardRef<HTMLDivElement, FocusableProps>(
    ({ children, tabIndex = 0, onFocus, onBlur, className }, ref) => {
        const handleFocus = () => {
            if (isBrowser() && onFocus) {
                onFocus();
            }
        };

        const handleBlur = () => {
            if (isBrowser() && onBlur) {
                onBlur();
            }
        };

        return (
            <div
                ref={ref}
                tabIndex={tabIndex}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={className}
            >
                {children}
            </div>
        );
    }
);

Focusable.displayName = 'Focusable';
