/** @jsxImportSource @emotion/react */
import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isBrowser } from 'utils/environment';

/**
 * FocusRingProps
 *
 * @property {ReactNode} children - The content to be rendered inside the FocusRing.
 * @property {CSSProperties} [ringStyle] - Custom styles for the focus ring.
 * @property {string} [className] - Additional class names to apply to the FocusRing container.
 */
interface FocusRingProps {
    children: ReactNode;
    ringStyle?: CSSProperties;
    className?: string;
}

/**
 * Default styles for the focus ring.
 */
const defaultRingStyle: CSSProperties = {
    border: '2px solid #1E90FF', // DodgerBlue color
    boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.5)', // Matching rgba for soft shadow
};

/**
 * Styled component for the focus ring.
 */
const FocusRingWrapper = styled.div<{ ringStyle?: CSSProperties }>`
    position: relative;

    .focus-ring::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        border: 2px solid transparent;
        border-radius: inherit;
        ${({ ringStyle }) =>
                ringStyle &&
                css`
                    ${Object.entries(ringStyle)
                            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
                            .join(' ')}
                `}
    }
`;

/**
 * FocusRing
 *
 * A component that provides a customizable focus ring around its children when they receive focus.
 *
 * @param {FocusRingProps} props - The props for the FocusRing component.
 * @returns {JSX.Element} - The rendered FocusRing component.
 */
export const FocusRing: React.FC<FocusRingProps> = ({ children, ringStyle = defaultRingStyle, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isBrowser()) return;

        const handleFocus = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            if (containerRef.current && containerRef.current.contains(target)) {
                target.classList.add('focus-ring');
            }
        };

        const handleBlur = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            if (containerRef.current && containerRef.current.contains(target)) {
                target.classList.remove('focus-ring');
            }
        };

        const container = containerRef.current;
        container?.addEventListener('focusin', handleFocus);
        container?.addEventListener('focusout', handleBlur);

        return () => {
            container?.removeEventListener('focusin', handleFocus);
            container?.removeEventListener('focusout', handleBlur);
        };
    }, []);

    return (
        <FocusRingWrapper ref={containerRef} className={className} ringStyle={ringStyle}>
            {children}
        </FocusRingWrapper>
    );
};
